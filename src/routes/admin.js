const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');

// Middleware simples de autenticação (pode ser melhorado)
const checkAuth = (req, res, next) => {
  const password = req.query.password || req.body.password || req.cookies.admin_auth;
  // Senha padrão - MUDE ISTO EM PRODUÇÃO!
  if (password !== 'anne2025') {
    return res.status(401).render('admin-login', { error: 'Senha incorreta' });
  }
  next();
};

// GET - Página de login admin
router.get('/login', (req, res) => {
  res.render('admin-login', { error: null });
});

// POST - Validar senha
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password !== 'anne2025') {
    return res.render('admin-login', { error: 'Senha incorreta' });
  }
  res.cookie('admin_auth', password, { 
    httpOnly: true, 
    secure: true, 
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000 
  });
  res.redirect('/admin/dashboard');
});

// GET - Dashboard (requer autenticação)
router.get('/dashboard', checkAuth, (req, res) => {
  const db = getDatabase();
  let responded = false;
  
  // Timeout de 10 segundos
  const timeout = setTimeout(() => {
    if (!responded) {
      responded = true;
      console.error('Timeout ao carregar dashboard');
      return res.render('admin-dashboard', { 
        appointments: [], 
        stats: { total: 0, confirmed: 0, cancelled: 0, completed: 0 },
        error: 'Timeout ao carregar dados'
      });
    }
  }, 10000);
  
  db.all(
    `SELECT * FROM appointments 
     WHERE appointment_date >= date('now')
     ORDER BY appointment_date ASC, appointment_time ASC`,
    (err, appointments) => {
      clearTimeout(timeout);
      
      if (responded) return;
      responded = true;
      
      if (err) {
        console.error('Erro ao carregar appointments:', err);
        return res.render('admin-dashboard', { 
          appointments: [], 
          stats: { total: 0, confirmed: 0, cancelled: 0, completed: 0 },
          error: 'Erro ao carregar agendamentos'
        });
      }
      
      // Calcular estatísticas
      const stats = {
        total: appointments.length,
        confirmed: appointments.filter(a => a.status === 'confirmed').length,
        cancelled: appointments.filter(a => a.status === 'cancelled').length,
        completed: appointments.filter(a => a.status === 'completed').length
      };

      res.render('admin-dashboard', { appointments, stats, error: null });
    }
  );
});

// GET - API para agendamentos futuros
router.get('/api/appointments', (req, res) => {
  const db = getDatabase();
  
  db.all(
    `SELECT * FROM appointments 
     WHERE appointment_date >= date('now')
     ORDER BY appointment_date ASC, appointment_time ASC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
      }
      res.json(rows);
    }
  );
});

// POST - Cancelar agendamento
router.post('/api/appointments/:id/cancel', checkAuth, (req, res) => {
  const db = getDatabase();
  const { id } = req.params;

  db.run(
    `UPDATE appointments SET status = 'cancelled' WHERE id = ?`,
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao cancelar agendamento' });
      }
      res.json({ success: true, message: 'Agendamento cancelado' });
    }
  );
});

// POST - Marcar como concluído
router.post('/api/appointments/:id/complete', checkAuth, (req, res) => {
  const db = getDatabase();
  const { id } = req.params;

  db.run(
    `UPDATE appointments SET status = 'completed' WHERE id = ?`,
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao marcar como concluído' });
      }
      res.json({ success: true, message: 'Agendamento marcado como concluído' });
    }
  );
});

// GET - Gerar link de compartilhamento
router.get('/generate-link', checkAuth, (req, res) => {
  const linkId = Math.random().toString(36).substring(2, 10);
  const bookingLink = `${req.protocol}://${req.get('host')}/client/booking`;
  
  res.json({
    link: bookingLink,
    whatsapp: `https://wa.me/5511961672313?text=Olá! Agende seu serviço de manicure, pedicure e cílios: ${bookingLink}`
  });
});

// ==================== GERENCIAR HORÁRIOS INDISPONÍVEIS ====================

// GET - API para obter horários/datas indisponíveis
router.get('/api/unavailable-slots', checkAuth, (req, res) => {
  const db = getDatabase();
  
  db.all(
    `SELECT * FROM unavailable_slots 
     WHERE is_unavailable = 1
     ORDER BY date DESC, time DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar indisponibilidades' });
      }
      res.json(rows || []);
    }
  );
});

// POST - Bloquear horário/data
router.post('/api/unavailable-slots', checkAuth, (req, res) => {
  const db = getDatabase();
  const { date, time, reason } = req.body;

  if (!date || !time) {
    return res.status(400).json({ error: 'Data e horário obrigatórios' });
  }

  db.run(
    `INSERT OR REPLACE INTO unavailable_slots (date, time, is_unavailable, reason)
     VALUES (?, ?, 1, ?)`,
    [date, time, reason || ''],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao bloquear horário' });
      }
      res.json({ success: true, message: 'Horário bloqueado com sucesso' });
    }
  );
});

// DELETE - Desbloquear horário/data
router.delete('/api/unavailable-slots/:id', checkAuth, (req, res) => {
  const db = getDatabase();
  const { id } = req.params;

  db.run(
    `DELETE FROM unavailable_slots WHERE id = ?`,
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao desbloquear horário' });
      }
      res.json({ success: true, message: 'Horário desbloqueado' });
    }
  );
});

// POST - Bloquear data inteira
router.post('/api/unavailable-dates', checkAuth, (req, res) => {
  const db = getDatabase();
  const { date, reason } = req.body;

  if (!date) {
    return res.status(400).json({ error: 'Data obrigatória' });
  }

  // Bloquear todos os horários do dia
  const times = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  
  times.forEach(time => {
    db.run(
      `INSERT OR REPLACE INTO unavailable_slots (date, time, is_unavailable, reason)
       VALUES (?, ?, 1, ?)`,
      [date, time, reason || 'Data bloqueada']
    );
  });

  res.json({ success: true, message: 'Data bloqueada completamente' });
});

module.exports = router;
