const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');
const { generateAppointmentId } = require('../utils/linkGenerator');

// GET - Obter datas disponíveis
router.get('/available-dates', (req, res) => {
  const db = getDatabase();
  
  db.all(
    `SELECT date FROM available_dates 
     WHERE is_active = 1 AND date >= date('now')
     ORDER BY date ASC
     LIMIT 30`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar datas' });
      }
      res.json(rows);
    }
  );
});

// GET - Obter horários disponíveis para uma data
router.get('/available-times/:date', (req, res) => {
  const db = getDatabase();
  const { date } = req.params;
  
  let responded = false;
  
  // Timeout de 5 segundos
  const timeout = setTimeout(() => {
    if (!responded) {
      responded = true;
      console.error('Timeout ao buscar horários para data:', date);
      // Retornar horários padrão em caso de timeout
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
  }, 5000);

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
          { start_time: '10:00', end_time: '11:00' },
          { start_time: '11:00', end_time: '12:00' },
          { start_time: '12:00', end_time: '13:00' },
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
          { start_time: '10:00', end_time: '11:00' },
          { start_time: '11:00', end_time: '12:00' },
          { start_time: '12:00', end_time: '13:00' },
          { start_time: '14:00', end_time: '15:00' },
          { start_time: '15:00', end_time: '16:00' },
          { start_time: '16:00', end_time: '17:00' },
          { start_time: '17:00', end_time: '18:00' }
        ];
        return res.json(defaultTimes);
      }
      
      res.json(rows);
    }
  );
});

// POST - Criar novo agendamento
router.post('/create', (req, res) => {
  const db = getDatabase();
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
  
  // Timeout de 10 segundos
  const timeout = setTimeout(() => {
    if (!responded) {
      responded = true;
      console.error('Timeout ao inserir agendamento');
      return res.status(500).json({ 
        error: 'Timeout ao processar agendamento. Tente novamente.' 
      });
    }
  }, 10000);

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
