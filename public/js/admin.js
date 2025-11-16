// Admin JavaScript Functions

// Atualizar status de agendamento
async function updateStatus(appointmentId, newStatus) {
  if (!confirm(`Tem certeza que deseja ${newStatus === 'completed' ? 'marcar como concluído' : 'cancelar'} este agendamento?`)) {
    return;
  }

  try {
    const response = await fetch(`/admin/api/appointments/${appointmentId}/${newStatus === 'completed' ? 'complete' : 'cancel'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.success) {
      alert('✅ Agendamento atualizado com sucesso!');
      location.reload();
    } else {
      alert('❌ Erro ao atualizar agendamento');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao processar a requisição');
  }
}

// Mostrar detalhes do agendamento
async function showDetails(appointmentId) {
  try {
    const response = await fetch(`/api/booking/${appointmentId}`);
    const data = await response.json();

    const details = `
      📅 Data: ${new Date(data.appointment_date).toLocaleDateString('pt-BR')}
      🕐 Hora: ${data.appointment_time}
      👤 Nome: ${data.client_name}
      📱 Telefone: ${data.client_phone}
      📧 Email: ${data.client_email || 'Não informado'}
      💅 Serviço: ${formatServiceName(data.service)}
      📝 Status: ${formatStatus(data.status)}
      💬 Notas: ${data.notes || 'Nenhuma observação'}
    `;

    alert(details);
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar detalhes do agendamento');
  }
}

function formatServiceName(service) {
  const names = {
    'manicure': 'Manicure',
    'pedicure': 'Pedicura',
    'cilios': 'Cílios',
    'combo_mani_pedi': 'Manicure + Pedicura',
    'combo_completo': 'Manicure + Pedicura + Cílios'
  };
  return names[service] || service;
}

function formatStatus(status) {
  const statuses = {
    'confirmed': '✅ Confirmado',
    'completed': '✔️ Concluído',
    'cancelled': '❌ Cancelado'
  };
  return statuses[status] || status;
}
