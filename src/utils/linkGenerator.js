const { v4: uuidv4 } = require('uuid');

const generateBookingLink = () => {
  const uniqueId = uuidv4().split('-')[0]; // Pegando apenas a primeira parte do UUID
  return `booking/${uniqueId}`;
};

const generateAppointmentId = () => {
  return uuidv4();
};

module.exports = {
  generateBookingLink,
  generateAppointmentId
};
