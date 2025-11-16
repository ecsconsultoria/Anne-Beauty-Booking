// ==================== CONFIGURAÇÃO ====================
const PHONE_NUMBER = '5511961672313'; // Número do WhatsApp da Anne Beauty
const BUSINESS_NAME = 'Anne Beauty';

// Mapeamento de nomes de serviços
const serviceNames = {
  'manicure': 'Manicure',
  'pedicure': 'Pedicure',
  'cilios': 'Cílios',
  'combo_mani_pedi': 'Manicure + Pedicure',
  'combo_completo': 'Manicure + Pedicure + Cílios'
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookingForm');
  form.addEventListener('submit', handleSubmit);

  // Desabilitar datas passadas no date picker
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('appointmentDate').setAttribute('min', today);

  // Quando a data mudar, validar e atualizar horários disponíveis
  document.getElementById('appointmentDate').addEventListener('change', function(e) {
    const selectedDate = new Date(e.target.value + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay();
    
    // 0 = domingo, 6 = sábado
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      alert('⚠️ Anne Beauty funciona de segunda a sexta. Por favor, selecione outro dia.');
      this.value = '';
      resetTimeSlots();
      return false;
    }
    
    // Atualizar horários disponíveis baseado nos já reservados
    updateAvailableTimeSlots(e.target.value);
  });
});

// ==================== HANDLER DO FORMULÁRIO ====================
function handleSubmit(e) {
  e.preventDefault();

  // Coletar dados
  const formData = new FormData(document.getElementById('bookingForm'));
  const data = {
    clientName: formData.get('clientName'),
    clientPhone: formData.get('clientPhone'),
    clientEmail: formData.get('clientEmail'),
    service: formData.get('service'),
    appointmentDate: formData.get('appointmentDate'),
    appointmentTime: formData.get('appointmentTime'),
    notes: formData.get('notes')
  };

  // Validar
  if (!data.clientName || !data.clientPhone || !data.service || !data.appointmentDate || !data.appointmentTime) {
    alert('❌ Por favor, preenchaa todos os campos obrigatórios!');
    return;
  }

  // Verificar se horário já foi reservado
  if (isTimeSlotBooked(data.appointmentDate, data.appointmentTime)) {
    alert('❌ Desculpe! Este horário já foi reservado. Escolha outro.');
    updateAvailableTimeSlots(data.appointmentDate);
    return;
  }

  // Salvar localmente
  saveBookingLocally(data);

  // Exibir confirmação
  showConfirmation(data);
}

// ==================== SALVAR AGENDAMENTO LOCALMENTE ====================
function saveBookingLocally(data) {
  // Salvar em localStorage
  const bookings = JSON.parse(localStorage.getItem('anneBeautyBookings') || '[]');
  
  const booking = {
    id: generateId(),
    ...data,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  bookings.push(booking);
  localStorage.setItem('anneBeautyBookings', JSON.stringify(bookings));

  // Log para demonstração
  console.log('✅ Agendamento salvo:', booking);
}

// ==================== GERAR ID ÚNICO ====================
function generateId() {
  return 'booking_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ==================== VERIFICAR SE HORÁRIO JÁ FOI RESERVADO ====================
function isTimeSlotBooked(date, time) {
  const bookings = getBookings();
  return bookings.some(booking => 
    booking.appointmentDate === date && 
    booking.appointmentTime === time
  );
}

// ==================== ATUALIZAR HORÁRIOS DISPONÍVEIS ====================
function updateAvailableTimeSlots(selectedDate) {
  const timeSelect = document.getElementById('appointmentTime');
  const bookedTimes = getBookedTimesForDate(selectedDate);
  
  // Reabilitar todos os horários primeiro
  const options = timeSelect.querySelectorAll('option:not(:first-child)');
  options.forEach(option => {
    option.disabled = false;
    option.textContent = option.value + ' - ' + (parseInt(option.value) + 1) + ':00';
  });
  
  // Desabilitar os horários já reservados
  bookedTimes.forEach(time => {
    const option = timeSelect.querySelector(`option[value="${time}"]`);
    if (option) {
      option.disabled = true;
      option.textContent = `${time} - ${parseInt(time) + 1}:00 (INDISPONÍVEL)`;
    }
  });
  
  // Se houver um valor selecionado e ele estiver desabilitado, limpar
  if (timeSelect.value && timeSelect.options[timeSelect.selectedIndex].disabled) {
    timeSelect.value = '';
  }
}

// ==================== OBTER HORÁRIOS RESERVADOS PARA UMA DATA ====================
function getBookedTimesForDate(date) {
  const bookings = getBookings();
  return bookings
    .filter(booking => booking.appointmentDate === date)
    .map(booking => booking.appointmentTime)
    .sort();
}

// ==================== RESETAR HORÁRIOS ====================
function resetTimeSlots() {
  const timeSelect = document.getElementById('appointmentTime');
  const options = timeSelect.querySelectorAll('option:not(:first-child)');
  options.forEach(option => {
    option.disabled = false;
    option.textContent = option.value + ' - ' + (parseInt(option.value) + 1) + ':00';
  });
  timeSelect.value = '';
}

// ==================== EXIBIR CONFIRMAÇÃO ====================
function showConfirmation(data) {
  // Ocultar formulário
  document.getElementById('bookingForm').style.display = 'none';
  document.querySelector('.booking-section').style.display = 'none';

  // Preparar dados de confirmação
  const formattedDate = formatDate(data.appointmentDate);
  const serviceName = serviceNames[data.service] || data.service;
  const phoneClean = data.clientPhone.replace(/\D/g, '');

  // Preencher confirmação
  document.getElementById('confirmName').textContent = data.clientName;
  document.getElementById('confirmPhone').textContent = data.clientPhone;
  document.getElementById('confirmEmail').textContent = data.clientEmail || '(não informado)';
  document.getElementById('confirmService').textContent = serviceName;
  document.getElementById('confirmDate').textContent = formattedDate;
  document.getElementById('confirmTime').textContent = data.appointmentTime;

  // Mostrar notas se houver
  if (data.notes) {
    document.getElementById('notesSection').style.display = 'block';
    document.getElementById('confirmNotes').textContent = data.notes;
  }

  // Criar link do WhatsApp
  const whatsappMessage = `*Novo Agendamento - ${BUSINESS_NAME}* %0A` +
    `Nome: ${data.clientName} %0A` +
    `Serviço: ${serviceName} %0A` +
    `Data: ${formattedDate} %0A` +
    `Horário: ${data.appointmentTime} %0A` +
    `Telefone: ${data.clientPhone} %0A` +
    `${data.email ? 'Email: ' + data.clientEmail + ' %0A' : ''}` +
    `${data.notes ? 'Observações: ' + data.notes : ''}`;

  const whatsappLink = `https://wa.me/${PHONE_NUMBER}?text=${whatsappMessage}`;
  document.getElementById('whatsappLink').href = whatsappLink;

  // Link de compartilhamento
  const currentUrl = window.location.href;
  document.getElementById('shareLink').value = currentUrl;

  // Exibir seção de confirmação
  document.getElementById('confirmationSection').style.display = 'block';

  // Scroll para o topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== FORMATAR DATA ====================
function formatDate(dateString) {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', options);
}

// ==================== COPIAR LINK ====================
function copyShareLink() {
  const linkInput = document.getElementById('shareLink');
  linkInput.select();
  document.execCommand('copy');
  
  // Feedback visual
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = '✅ Copiado!';
  setTimeout(() => {
    btn.textContent = originalText;
  }, 2000);
}

// ==================== EXPORTAR DADOS (Para Demonstração) ====================
function getBookings() {
  return JSON.parse(localStorage.getItem('anneBeautyBookings') || '[]');
}

function getBookingStats() {
  const bookings = getBookings();
  return {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };
}

// Log de inicialização
console.log('✅ Anne Beauty Booking System carregado');
console.log('📊 Agendamentos no localStorage:', getBookingStats());
