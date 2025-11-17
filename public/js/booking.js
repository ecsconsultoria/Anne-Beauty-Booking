// Variáveis
const MIN_DATE_DAYS_AHEAD = 1; // Mínimo de dias no futuro para agendamentos
const MAX_DISPLAY_DAYS = 30;   // Máximo de dias para exibir
const COMPANY_PHONE = '5511961672313'; // Sem formatação

document.addEventListener('DOMContentLoaded', () => {
  setupDatePicker();
  setupDateChangeListener();
});

function setupDatePicker() {
  const dateInput = document.getElementById('appointmentDate');
  const today = new Date();
  
  // Calcular data mínima (próximo dia útil)
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + MIN_DATE_DAYS_AHEAD);
  
  // Calcular data máxima (30 dias no futuro)
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + MAX_DISPLAY_DAYS);
  
  // Formatar datas para input (YYYY-MM-DD)
  dateInput.min = formatDateForInput(minDate);
  dateInput.max = formatDateForInput(maxDate);
  
  // Buscar datas disponíveis
  loadAvailableDates();
}

function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadAvailableDates() {
  // Timeout de 10 segundos
  const timeoutId = setTimeout(() => {
    console.warn('Timeout ao carregar datas - prosseguindo com datas padrão');
  }, 10000);
  
  fetch('/api/booking/available-dates', { timeout: 8000 })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(dates => {
      clearTimeout(timeoutId);
      console.log('Datas disponíveis carregadas:', dates);
      // As datas estão carregadas no banco de dados
      // Se nenhuma data estiver lá, usamos todas as datas futuras como disponíveis
      if (dates.length === 0) {
        console.log('Nenhuma restrição de data encontrada. Todos os dias são disponíveis.');
      }
    })
    .catch(error => {
      clearTimeout(timeoutId);
      console.warn('Erro ao carregar datas (continuando com padrão):', error);
      // O sistema continua funcionando mesmo se houver erro ao carregar datas
    });
}

function setupDateChangeListener() {
  const dateInput = document.getElementById('appointmentDate');
  const timeSelect = document.getElementById('appointmentTime');
  
  dateInput.addEventListener('change', (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      loadAvailableTimeSlots(selectedDate);
    }
  });
}

function loadAvailableTimeSlots(date) {
  const timeSelect = document.getElementById('appointmentTime');
  timeSelect.innerHTML = '<option value="">Carregando horários...</option>';
  
  // Timeout de 15 segundos
  const timeoutId = setTimeout(() => {
    console.warn('Timeout ao carregar horários - usando horários padrão');
    loadDefaultTimeSlots(timeSelect);
  }, 15000);
  
  fetch(`/api/booking/available-times/${date}`, { timeout: 10000 })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(slots => {
      clearTimeout(timeoutId);
      timeSelect.innerHTML = '<option value="">Selecione um horário</option>';
      
      if (!slots || slots.length === 0) {
        console.log('Nenhum horário retornado - usando padrão');
        loadDefaultTimeSlots(timeSelect);
        return;
      }
      
      let optionsAdded = 0;
      slots.forEach(slot => {
        // Verificar se o horário está disponível (booked < max_appointments ou não está bloqueado)
        if ((!slot.booked || slot.booked < 1) && !slot.is_unavailable) {
          const option = document.createElement('option');
          option.value = slot.start_time;
          option.textContent = `${slot.start_time} - ${slot.end_time}`;
          timeSelect.appendChild(option);
          optionsAdded++;
        }
      });
      
      if (optionsAdded === 0) {
        timeSelect.innerHTML = '<option value="">Nenhum horário disponível neste dia</option>';
      }
    })
    .catch(error => {
      clearTimeout(timeoutId);
      console.error('Erro ao carregar horários:', error);
      console.log('Carregando horários padrão como fallback');
      loadDefaultTimeSlots(timeSelect);
    });
}

function loadDefaultTimeSlots(timeSelect) {
  // Horários padrão de funcionamento
  const defaultTimes = [
    { start: '10:00', end: '11:00' },
    { start: '11:00', end: '12:00' },
    { start: '12:00', end: '13:00' },
    { start: '14:00', end: '15:00' },
    { start: '15:00', end: '16:00' },
    { start: '16:00', end: '17:00' },
    { start: '17:00', end: '18:00' }
  ];
  
  timeSelect.innerHTML = '<option value="">Selecione um horário</option>';
  
  defaultTimes.forEach(time => {
    const option = document.createElement('option');
    option.value = time.start;
    option.textContent = `${time.start} - ${time.end}`;
    timeSelect.appendChild(option);
  });
}

document.getElementById('bookingForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    client_name: document.getElementById('clientName').value,
    client_phone: document.getElementById('clientPhone').value,
    client_email: document.getElementById('clientEmail').value,
    service: document.getElementById('service').value,
    appointment_date: document.getElementById('appointmentDate').value,
    appointment_time: document.getElementById('appointmentTime').value,
    notes: document.getElementById('notes').value
  };
  
  // Validações
  if (!formData.client_name.trim()) {
    alert('Por favor, insira seu nome completo');
    return;
  }
  
  if (!formData.client_phone.trim()) {
    alert('Por favor, insira seu telefone/WhatsApp');
    return;
  }
  
  if (!formData.appointment_date || !formData.appointment_time) {
    alert('Por favor, selecione data e hora');
    return;
  }
  
  // Mostrar spinner
  document.getElementById('loadingSpinner').style.display = 'block';
  document.getElementById('bookingForm').style.display = 'none';
  
  try {
    const response = await fetch('/api/booking/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Redirecionar para página de confirmação
      window.location.href = `/client/confirmation/${data.appointment_id}`;
    } else {
      alert('Erro ao criar agendamento: ' + data.error);
      document.getElementById('loadingSpinner').style.display = 'none';
      document.getElementById('bookingForm').style.display = 'block';
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao processar agendamento. Tente novamente.');
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('bookingForm').style.display = 'block';
  }
});
