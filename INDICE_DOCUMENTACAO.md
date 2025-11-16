# 📚 Índice de Documentação - Anne Beauty

Bem-vindo! Use este índice para navegar pela documentação.

---

## 🚀 COMECE AQUI

### Para Publicar Rapidamente:
1. **[RESUMO_RAPIDO.md](RESUMO_RAPIDO.md)** - 5 minutos, versão express

### Para Entender Tudo:
2. **[GUIA_RENDER_COMPLETO.md](GUIA_RENDER_COMPLETO.md)** - Guia detalhado passo a passo

### Antes de Fazer Push:
3. **[CHECKLIST_PRE_DEPLOY.md](CHECKLIST_PRE_DEPLOY.md)** - Verificações finais

---

## 📖 DOCUMENTAÇÃO COMPLETA

### Visão Geral
- **[README.md](README.md)** - Documentação completa do projeto
- **[ESTRUTURA_PROJETO.md](ESTRUTURA_PROJETO.md)** - Estrutura de pastas e arquivos

### Alterações Recentes
- **[ATUALIZACOES.md](ATUALIZACOES.md)** - Sábado + Gerenciador de Horários (✨ NOVO)

### Setup & Configuração
- **[QUICK_START.md](QUICK_START.md)** - Início rápido local
- **[SETUP.md](SETUP.md)** - Configuração detalhada

### Publicação
- **[GITHUB_PAGES_GUIDE.md](GITHUB_PAGES_GUIDE.md)** - Publicar em GitHub Pages (versão estática)
- **[GUIA_RENDER_COMPLETO.md](GUIA_RENDER_COMPLETO.md)** - Publicar em Render (versão completa)
- **[RESUMO_RAPIDO.md](RESUMO_RAPIDO.md)** - Resumo 5 minutos

### Desenvolvimento
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Referência de APIs
- **[FEATURES_CHECKLIST.md](FEATURES_CHECKLIST.md)** - Lista de funcionalidades

### Sistemas
- **[SYSTEM_SUMMARY.md](SYSTEM_SUMMARY.md)** - Resumo técnico do sistema

---

## 🎯 POR OBJETIVO

### "Quero publicar rapidinho"
→ Leia: [RESUMO_RAPIDO.md](RESUMO_RAPIDO.md)

### "Quero entender cada detalhe"
→ Leia: [GUIA_RENDER_COMPLETO.md](GUIA_RENDER_COMPLETO.md)

### "Não sei por onde começar"
→ Leia: [README.md](README.md) depois [QUICK_START.md](QUICK_START.md)

### "Quero rodar localmente antes"
→ Leia: [QUICK_START.md](QUICK_START.md)

### "Qual é a arquitetura do sistema?"
→ Leia: [SYSTEM_SUMMARY.md](SYSTEM_SUMMARY.md)

### "Como usar as APIs?"
→ Leia: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### "Quero GitHub Pages, não Render"
→ Leia: [GITHUB_PAGES_GUIDE.md](GITHUB_PAGES_GUIDE.md)

### "Preciso de segurança antes de publicar"
→ Leia: [CHECKLIST_PRE_DEPLOY.md](CHECKLIST_PRE_DEPLOY.md)

### "O que mudou de novo?"
→ Leia: [ATUALIZACOES.md](ATUALIZACOES.md)

---

## ✨ NOVIDADES (v2.0)

✅ **Sábado agora disponível** (10:00-18:00)  
✅ **Gerenciador de horários no painel admin** (bloquear/desbloquear)  
✅ **Nova tabela no banco:** `unavailable_slots`  
✅ **Novos guias:** RESUMO_RAPIDO.md, GUIA_RENDER_COMPLETO.md  
✅ **Procfile** criado para Render  

Leia [ATUALIZACOES.md](ATUALIZACOES.md) para mais detalhes.

---

## 🔧 TECNOLOGIAS

- **Backend:** Node.js + Express.js
- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Database:** SQLite3
- **Templating:** EJS
- **Auth:** Cookie-based
- **Hosting:** Render (recomendado) ou GitHub Pages

---

## 📞 SUPORTE RÁPIDO

| Problema | Solução |
|----------|---------|
| Não sei como publicar | Leia: RESUMO_RAPIDO.md |
| Erro no deploy | Leia: GUIA_RENDER_COMPLETO.md (troubleshooting) |
| Quero ver os agendamentos | Leia: README.md (seção "Admin") |
| Senha não funciona | Veja: CHECKLIST_PRE_DEPLOY.md |
| Horários não bloqueiam | Veja: ATUALIZACOES.md |
| Como customizar? | Leia: QUICK_START.md (customização) |

---

## 🚀 FLUXO RECOMENDADO

1. **Leia:** [README.md](README.md) (5 min)
2. **Teste localmente:** [QUICK_START.md](QUICK_START.md) (10 min)
3. **Verifique:** [CHECKLIST_PRE_DEPLOY.md](CHECKLIST_PRE_DEPLOY.md) (5 min)
4. **Publique:** [RESUMO_RAPIDO.md](RESUMO_RAPIDO.md) (5 min)
5. **Celebre:** 🎉 Sistema online!

**Tempo total: ~25 minutos**

---

## 📊 ESTRUTURA DE ARQUIVOS

```
anne-beauty-booking/
├── 📄 README.md                    ← Comece aqui
├── 📄 QUICK_START.md               ← Setup local
├── 📄 RESUMO_RAPIDO.md             ← ✨ Publ. rápido (5 min)
├── 📄 GUIA_RENDER_COMPLETO.md      ← ✨ Guia detalhado
├── 📄 ATUALIZACOES.md              ← ✨ O que é novo
├── 📄 CHECKLIST_PRE_DEPLOY.md      ← ✨ Checklist final
├── 📄 ESTRUTURA_PROJETO.md         ← ✨ Índice arquivos
├── 📄 API_DOCUMENTATION.md         ← Referência APIs
├── 📄 FEATURES_CHECKLIST.md        ← Features
├── 📄 SYSTEM_SUMMARY.md            ← Visão técnica
├── 📄 GITHUB_PAGES_GUIDE.md        ← GitHub Pages alt.
├── 📄 SETUP.md                     ← Setup avançado
├── 📄 Procfile                     ← ✨ Deploy Render
│
├── 📁 src/                         ← Backend
│   ├── server.js
│   ├── database.js
│   └── routes/
│
├── 📁 views/                       ← Templates EJS
├── 📁 public/                      ← CSS/JS static
├── 📁 docs/                        ← Versão estática
└── 📁 data/                        ← Banco SQLite
```

---

## ✅ VERSÕES SUPORTADAS

| Versão | Status | Publicação | Features |
|--------|--------|-----------|----------|
| Static (GitHub Pages) | ✅ Suportada | GitHub Pages | Básico (sem backend) |
| Full (Node.js) | ✅ Suportada | Render | Completo (com admin) |
| Mobile App | 🔄 Planejado | App Store | Native iOS/Android |

---

## 🎓 APRENDA MAIS

- **Node.js:** https://nodejs.org/
- **Express.js:** https://expressjs.com/
- **Render:** https://render.com/docs
- **GitHub:** https://docs.github.com/
- **SQLite:** https://www.sqlite.org/

---

## 💬 DÚVIDAS?

1. Procure na documentação acima
2. Verifique [CHECKLIST_PRE_DEPLOY.md](CHECKLIST_PRE_DEPLOY.md)
3. Leia [GUIA_RENDER_COMPLETO.md](GUIA_RENDER_COMPLETO.md) (troubleshooting)

---

## 🎉 PRONTO PARA COMEÇAR?

**Próximo passo:**
- Se quer resultado rápido → [RESUMO_RAPIDO.md](RESUMO_RAPIDO.md)
- Se quer aprender tudo → [GUIA_RENDER_COMPLETO.md](GUIA_RENDER_COMPLETO.md)
- Se já leu tudo → [CHECKLIST_PRE_DEPLOY.md](CHECKLIST_PRE_DEPLOY.md) e faça push!

---

**Anne Beauty Sistema Pronto! 🚀** v2.0
