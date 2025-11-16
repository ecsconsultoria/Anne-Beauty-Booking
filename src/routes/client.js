const express = require('express');
const router = express.Router();

// GET - Página de agendamento do cliente
router.get('/booking', (req, res) => {
  res.render('client-booking');
});

// GET - Confirmação de agendamento
router.get('/confirmation/:id', (req, res) => {
  const { id } = req.params;
  res.render('client-confirmation', { appointmentId: id });
});

module.exports = router;
