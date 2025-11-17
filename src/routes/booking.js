const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');
const { generateAppointmentId } = require('../utils/linkGenerator');

// GET - Obter datas disponíveis
router.get('/available-dates', (req, res) => {
  try {
    const db = getDatabase();
    
    if (!db) {
      console.error('Banco de dados não inicializado');
      return res.status(503).json({ error: 'Banco de dados indisponível' });
    }
    
    db.all(
      `SELECT date FROM available_dates 
       WHERE is_active = 1 AND date >= date('now')
       ORDER BY date ASC
       LIMIT 30`,
      (err, rows) => {
        if (err) {
          console.error('Erro ao buscar datas:', err);
          return res.status(500).json({ error: 'Erro ao buscar datas' });
        }
        res.json(rows || []);
      }
    );
  } catch (error) {
    console.error('Erro na rota available-dates:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// GET - Obter horários disponíveis para uma data
router.get('/available-times/:date', (req, res) => {
  try {
    const db = getDatabase();
    const { date } = req.params;
    
    if (!db) {
      console.error('Banco de dados não inicializado');
      const defaultTimes = [
        { start_time: '14:00', end_time: '15:00' },
        { start_time: '15:00', end_time: '16:00' },
        { start_time: '16:00', end_time: '17:00' },
        { start_time: '17:00', end_time: '18:00' }
      ];
      return res.json(defaultTimes);
    }

    // Função auxiliar: verificar se é segunda-sexta (1=segunda, 5=sexta)
    const isWeekday = (dateStr) => {
      const dateObj = new Date(dateStr + 'T00:00:00');
      const dayOfWeek = dateObj.getDay();
      return dayOfWeek >= 1 && dayOfWeek <= 5; // 0=domingo, 6=sábado
    };
    
    let responded = false;
    
    // Timeout de 20 segundos (mais generoso para Render)
    const timeout = setTimeout(() => {
      if (!responded) {
        responded = true;
        console.error('Timeout ao buscar horários para data:', date);
        // Retornar horários padrão em caso de timeout
        const defaultTimes = [
          { start_time: '14:00', end_time: '15:00' },
          { start_time: '15:00', end_time: '16:00' },
          { start_time: '16:00', end_time: '17:00' },
          { start_time: '17:00', end_time: '18:00' }
        ];
        res.json(defaultTimes);
      }
    }, 20000);

  db.all(
    `SELECT ts.id, ts.start_time, ts.end_time,
     COUNT(a.id) as booked,
     CASE WHEN us.id IS NOT NULL THEN 1 ELSE 0 END as is_unavailable
     FROM time_slots ts
     LEFT JOIN appointments a ON ts.start_time = a.appointment_time 
     AND a.appointment_date = ? AND a.status = 'confirmed'
     LEFT JOIN unavailable_slots us ON ts.start_time = us.time 
     AND us.date = ? AND us.is_unavailable = 1
     WHERE ts.is_active = 1
     GROUP BY ts.id
     ORDER BY ts.start_time ASC`,
    [date, date],
    (err, rows) => {
      clearTimeout(timeout);
      
      if (responded) return;
      responded = true;
      
      if (err) {
        console.error('Erro ao buscar horários:', err);
        // Retornar horários padrão em caso de erro
        const defaultTimes = [
          { start_time: '14:00', end_time: '15:00' },
          { start_time: '15:00', end_time: '16:00' },
          { start_time: '16:00', end_time: '17:00' },
          { start_time: '17:00', end_time: '18:00' }
        ];
        return res.json(defaultTimes);
      }
      
      if (!rows || rows.length === 0) {
        // Se não houver registros de time_slots, retornar padrão
        const defaultTimes = [
          { start_time: '14:00', end_time: '15:00' },
          { start_time: '15:00', end_time: '16:00' },
          { start_time: '16:00', end_time: '17:00' },
          { start_time: '17:00', end_time: '18:00' }
        ];
        return res.json(defaultTimes);
      }
      
      // Filtrar horários: bloquear 09:00-14:00 em dias úteis (seg-sex)
      const filteredRows = rows.filter(row => {
        // Se for segunda a sexta
        if (isWeekday(date)) {
          // Bloquear horários de 09:00 a 13:59 (até 14:00)
          const startHour = parseInt(row.start_time.split(':')[0]);
          if (startHour < 14) {
            return false; // Bloquear
          }
        }
        return true; // Liberar
      });
      
      // Se todos os horários foram filtrados, retornar padrão
      if (filteredRows.length === 0) {
        const defaultTimes = [
          { start_time: '14:00', end_time: '15:00' },
          { start_time: '15:00', end_time: '16:00' },
          { start_time: '16:00', end_time: '17:00' },
          { start_time: '17:00', end_time: '18:00' }
        ];
        return res.json(defaultTimes);
      }
      
      res.json(filteredRows);
    }
  );
  } catch (error) {
    console.error('Erro na rota available-times:', error);
    const defaultTimes = [
      { start_time: '10:00', end_time: '11:00' },
      { start_time: '11:00', end_time: '12:00' },
      { start_time: '12:00', end_time: '13:00' },
      { start_time: '14:00', end_time: '15:00' },
      { start_time: '15:00', end_time: '16:00' },
      { start_time: '16:00', end_time: '17:00' },
      { start_time: '17:00', end_time: '18:00' }
    ];
    res.json(defaultTimes);
  }
});

// POST - Criar novo agendamento
router.post('/create', (req, res) => {
  try {
    const db = getDatabase();
    
    if (!db) {
      console.error('Banco de dados não inicializado');
      return res.status(503).json({ error: 'Banco de dados indisponível' });
    }
    
    const {
      client_name,
      client_phone,
      client_email,
      service,
      appointment_date,
      appointment_time,
      notes
    } = req.body;

    console.log('Recebendo agendamento:', {
      client_name, client_phone, service, appointment_date, appointment_time
    });

    // Validar dados
    if (!client_name || !client_phone || !service || !appointment_date || !appointment_time) {
      console.error('Dados obrigatórios faltando');
      return res.status(400).json({ error: 'Dados obrigatórios faltando' });
    }

    const appointmentId = generateAppointmentId();
    let responded = false;
    
    // Timeout de 30 segundos (mais generoso para Render)
    const timeout = setTimeout(() => {
      if (!responded) {
        responded = true;
        console.error('Timeout ao inserir agendamento');
        return res.status(500).json({ 
          error: 'Timeout ao processar agendamento. Tente novamente.' 
        });
      }
    }, 30000);

    db.run(
      `INSERT INTO appointments 
     (id, client_name, client_phone, client_email, service, appointment_date, appointment_time, notes, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', datetime('now'))`,
    [appointmentId, client_name, client_phone, client_email, service, appointment_date, appointment_time, notes || ''],
    function(err) {
      clearTimeout(timeout);
      
      if (responded) return;
      responded = true;
      
      if (err) {
        console.error('Erro ao inserir agendamento:', err);
        return res.status(500).json({ 
          error: 'Erro ao criar agendamento: ' + err.message 
        });
      }
      
      console.log('Agendamento criado com sucesso:', appointmentId);
      
      res.json({
        success: true,
        appointment_id: appointmentId,
        message: 'Agendamento confirmado! Você receberá uma confirmação via WhatsApp.'
      });
    }
  );
  } catch (error) {
    console.error('Erro na rota create:', error);
    res.status(500).json({ error: 'Erro ao processar agendamento' });
  }
});

// GET - Obter detalhes do agendamento
router.get('/:id', (req, res) => {
  const db = getDatabase();
  const { id } = req.params;

  db.get(
    `SELECT * FROM appointments WHERE id = ?`,
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar agendamento' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Agendamento não encontrado' });
      }
      res.json(row);
    }
  );
});

module.exports = router;
