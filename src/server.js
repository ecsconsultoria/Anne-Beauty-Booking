const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { initializeDatabase } = require('./database');
const { generateBookingLink } = require('./utils/linkGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Helpers disponíveis nas views EJS
app.locals.formatServiceName = (service) => {
  const names = {
    'manicure': 'Manicure',
    'pedicure': 'Pedicure',
    'cilios': 'Cílios',
    'combo_mani_pedi': 'Manicure + Pedicure',
    'combo_completo': 'Manicure + Pedicure + Cílios'
  };
  return names[service] || service;
};

app.locals.formatStatus = (status) => {
  const statuses = {
    'confirmed': '✅ Confirmado',
    'completed': '✔️ Concluído',
    'cancelled': '❌ Cancelado'
  };
  return statuses[status] || status;
};

// Initialize Database
initializeDatabase();

// Routes
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');

app.use('/api/booking', bookingRoutes);
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌟 Vip & Bella Booking System rodando em http://localhost:${PORT}`);
  console.log(`📱 Acesse a página de admin: http://localhost:${PORT}/admin`);
});
