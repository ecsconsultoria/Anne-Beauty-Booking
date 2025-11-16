# ✅ Checklist Pré-Deploy

Use este checklist antes de fazer push no GitHub!

---

## 🔍 Verificações Técnicas

- [ ] Arquivo `Procfile` existe na raiz
- [ ] `package.json` tem script `"start": "node src/server.js"`
- [ ] Arquivo `src/server.js` existe e está OK
- [ ] Pasta `src/routes/` tem: admin.js, booking.js, client.js
- [ ] Pasta `views/` tem todos os arquivos .ejs
- [ ] Pasta `public/` tem css/ e js/ com arquivos
- [ ] Arquivo `src/database.js` tem tabela `unavailable_slots`
- [ ] Todas as dependências estão em `package.json`

---

## 🔐 Segurança

- [ ] Senha admin está como `anne2025` (será mudada depois)
- [ ] Não há senhas/chaves em arquivos .env
- [ ] Não há credenciais no código
- [ ] `.gitignore` inclui `node_modules/`, `data/`

---

## 📝 Documentação

- [ ] README.md existe e atualizado
- [ ] RESUMO_RAPIDO.md criado
- [ ] GUIA_RENDER_COMPLETO.md criado
- [ ] ATUALIZACOES.md criado

---

## 🧪 Testes Locais

Antes de fazer push, teste localmente:

```powershell
# 1. Reinstalar dependências
npm install

# 2. Iniciar servidor
npm start

# 3. Testar URLs:
# - http://localhost:3000/client/booking
# - http://localhost:3000/admin/login (senha: anne2025)
# - http://localhost:3000/admin/dashboard

# 4. Testar agendamento
# - Preencha formulário
# - Veja se salva no banco

# 5. Testar gerenciar horários
# - Acesse admin
# - Clique em "Gerenciar Horários"
# - Bloqueie um horário
# - Verifique se desaparece para clientes
```

---

## 📦 Pasta Git

Antes de fazer push, verifique:

```powershell
# Ver status
git status

# Deve mostrar todos os arquivos novos/modificados
# Se estiver tudo OK, prossiga

# Ver branches
git branch

# Deve estar em "main"
```

---

## 🚀 GitHub Setup

- [ ] Repositório criado em GitHub
- [ ] Nome do repo é: `anne-beauty-booking`
- [ ] Repo está em modo **PUBLIC**
- [ ] GitHub Token criado (se necessário)

---

## 🟠 Render Setup

- [ ] Conta Render criada
- [ ] GitHub conectado ao Render
- [ ] Você escolheu Node como environment
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Plan: **Free** selecionado

---

## 📱 Funcionalidades para Testar

### Cliente:
- [ ] Formulário carrega
- [ ] Pode selecionar serviço
- [ ] Data picker funciona
- [ ] Horários aparecem corretamente
- [ ] Segunda-sexta mostra 14-18h
- [ ] Sábado mostra 10-18h
- [ ] Domingo está desabilitado
- [ ] Pode enviar agendamento
- [ ] Confirmação aparece
- [ ] Link WhatsApp funciona

### Admin:
- [ ] Login com `anne2025` funciona
- [ ] Dashboard carrega
- [ ] Estatísticas aparecem
- [ ] Tabela de agendamentos lista
- [ ] Botão "Gerenciar Horários" aparece
- [ ] Modal de horários abre
- [ ] Consegue bloquear horário
- [ ] Consegue bloquear data inteira
- [ ] Lista de bloqueios aparece
- [ ] Consegue desbloquear
- [ ] Cliente não vê horários bloqueados

---

## 🔄 Último Commit

Antes do push final:

```powershell
# Status
git status

# Add tudo
git add .

# Commit
git commit -m "Versão final pronta para Render"

# Push
git push origin main
```

---

## 📞 Se Algo Der Errado

### Build failed no Render?
1. Verifique `package.json` está OK
2. Verifique `Procfile` existe
3. Verifique `src/server.js` existe
4. Veja logs no Render (Settings → Logs)

### Senha não funciona?
1. Limpe cookies (Ctrl+Shift+Delete)
2. Tente modo incógnito
3. Verifique valor em `src/routes/admin.js`

### Horários não bloqueiam?
1. Verifique `src/database.js` tem tabela `unavailable_slots`
2. Verifique `src/routes/admin.js` tem as novas rotas
3. Verifique `views/admin-dashboard.ejs` tem o novo código

---

## ✨ Tudo Pronto?

Se todos os itens estão marcados:

```powershell
# Faça o push final
git push origin main

# Vá no Render
# Clique em "New Web Service"
# Selecione anne-beauty-booking
# Configure (veja RESUMO_RAPIDO.md)
# Clique em "Create Web Service"
# Aguarde 5-10 minutos!
```

✅ **Seu site estará online!**

---

**Boa sorte! 🚀**
