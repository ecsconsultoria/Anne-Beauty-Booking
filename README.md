# 🌟 Anne Beauty - Sistema de Agendamento Online

Um sistema simples e elegante para agendamento online de serviços de manicure, pedicura e cílios.

## 🎯 Características

- ✅ **Interface Mobile-First**: Totalmente responsiva e otimizada para celular
- 👥 **Link de Compartilhamento**: A manicure compartilha um link único com os clientes
- 📅 **Calendário Inteligente**: Clientes veem datas disponíveis para agendamento
- ⏰ **Horários Flexíveis**: Sistema de slots de horário configurável
- 🔐 **Painel Administrativo**: Dashboard para gerenciar todos os agendamentos
- 💬 **Integração WhatsApp**: Confirmações automáticas via WhatsApp
- 📱 **Serviços**: Manicure, Pedicura, Cílios e Combos

## 📋 Requisitos

- Node.js v14+ 
- npm ou yarn
- Navegador moderno

## 🚀 Instalação e Uso

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o servidor

```bash
npm start
```

O sistema estará disponível em: `http://localhost:3000`

### 3. Acessar as páginas

- **Cliente**: http://localhost:3000/client/booking
- **Admin**: http://localhost:3000/admin/login
  - Senha padrão: `anne2025`

## 📱 Fluxo do Cliente

1. Cliente clica no link compartilhado
2. Preenche seus dados (nome, telefone, email)
3. Seleciona o serviço desejado
4. Escolhe a data entre as disponíveis
5. Seleciona o horário disponível
6. Confirma o agendamento
7. Recebe confirmação por WhatsApp

## 👩‍💼 Fluxo do Admin (Manicure)

1. Fazer login com a senha
2. Ver painel com estatísticas
3. Gerenciar agendamentos (confirmar, completar, cancelar)
4. Gerar e compartilhar link de agendamento no WhatsApp
5. Ver detalhes de cada cliente

## 🔧 Configuração

### Alterar a senha do admin

Edite o arquivo `src/routes/admin.js` e procure por:

```javascript
if (password !== 'anne2025') {
```

Altere `'anne2025'` para sua senha desejada.

### Adicionar/Remover horários

Os horários são definidos no arquivo `src/database.js` na função `createTables()`.

### Alterar número de WhatsApp

O número padrão é `(11) 9.6167-2313`. Para alterar:

1. `src/routes/admin.js` - linha com `5511961672313`
2. `views/admin-dashboard.ejs` - link do WhatsApp
3. `public/js/booking.js` - variável `COMPANY_PHONE`

## 📊 Estrutura do Banco de Dados

### Tabela: appointments
- `id` - ID único do agendamento
- `client_name` - Nome do cliente
- `client_phone` - Telefone do cliente
- `client_email` - Email do cliente
- `service` - Tipo de serviço
- `appointment_date` - Data do agendamento
- `appointment_time` - Horário do agendamento
- `status` - Status (confirmed, completed, cancelled)
- `notes` - Observações
- `created_at` - Data de criação

### Tabela: time_slots
- `id` - ID do horário
- `start_time` - Hora de início (HH:MM)
- `end_time` - Hora de término (HH:MM)
- `is_active` - Se o horário está ativo

### Tabela: available_dates
- `id` - ID da data
- `date` - Data disponível
- `max_appointments` - Máximo de agendamentos por dia
- `is_active` - Se a data está ativa

## 🌐 Endpoints da API

### Booking (Cliente)
- `GET /api/booking/available-dates` - Obter datas disponíveis
- `GET /api/booking/available-times/:date` - Obter horários para uma data
- `POST /api/booking/create` - Criar novo agendamento
- `GET /api/booking/:id` - Obter detalhes do agendamento

### Admin
- `GET /admin/dashboard` - Dashboard do admin
- `POST /admin/login` - Fazer login
- `GET /admin/generate-link` - Gerar link de compartilhamento
- `GET /admin/api/appointments` - Listar agendamentos futuros
- `POST /admin/api/appointments/:id/complete` - Marcar como concluído
- `POST /admin/api/appointments/:id/cancel` - Cancelar agendamento

## 💡 Dicas de Uso

- Use URLs como: `http://seusite.com/client/booking` para compartilhar com clientes
- Gere o link via WhatsApp direto do painel admin
- Mantenha o painel aberto para monitorar novos agendamentos em tempo real
- Marque agendamentos como "Concluído" depois da realização do serviço

## 🔐 Segurança

⚠️ **IMPORTANTE**: Esta é uma versão inicial com autenticação básica. Para produção, considere:

- [ ] Implementar autenticação mais robusta (JWT, OAuth)
- [ ] Adicionar HTTPS/SSL
- [ ] Validar e sanitizar inputs
- [ ] Implementar rate limiting
- [ ] Usar variáveis de ambiente para configurações sensíveis
- [ ] Fazer backup regular do banco de dados
- [ ] Implementar 2FA para admin

## 📞 Contato

**Anne Beauty**
📱 (11) 9.6167-2313

## 📝 Licença

MIT

---

**Desenvolvido com ❤️ para Anne Beauty**
