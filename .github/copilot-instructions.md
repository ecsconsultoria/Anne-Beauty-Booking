# Copilot Instructions - Anne Beauty Booking System

## Project Overview
Sistema de agendamento online para Anne Beauty - serviços de manicure, pedicura e cílios.

### Stack Tecnológico
- **Backend**: Node.js com Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Database**: SQLite3
- **Mobile-First**: Responsivo para todos os dispositivos

### Arquitetura
- `/src` - Backend (servidor, rotas, banco de dados)
- `/views` - Templates EJS (interface)
- `/public` - Assets estáticos (CSS, JavaScript)
- `package.json` - Dependências do projeto

### Funcionalidades Principais
1. **Cliente**: Agendamento via link compartilhado
2. **Admin**: Painel de gerenciamento de agendamentos
3. **WhatsApp**: Integração para confirmações
4. **Calendário**: Seleção inteligente de datas/horários

## Configuração e Execução

### Instalação
```bash
npm install
```

### Execução
```bash
npm start
```

Acesso:
- Cliente: http://localhost:3000/client/booking
- Admin: http://localhost:3000/admin/login (senha: anne2025)

## Desenvolvimento

### Arquivos Principais a Conhecer
- `src/server.js` - Servidor principal
- `src/database.js` - Inicialização do banco
- `src/routes/booking.js` - APIs para cliente
- `src/routes/admin.js` - APIs e views para admin
- `public/js/booking.js` - Lógica frontend do cliente
- `views/` - Templates das páginas

### Próximos Passos Recomendados
- Melhorar autenticação do admin
- Adicionar notificações real-time
- Implementar integração com WhatsApp Business API
- Adicionar suporte a múltiplos prestadores
- Implementar sistema de avaliações/feedback

---

✨ **Pronto para usar e customizar!**
