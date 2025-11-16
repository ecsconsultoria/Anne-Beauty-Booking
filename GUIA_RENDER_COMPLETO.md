# 🚀 Guia Completo: Publicar Anne Beauty no Render

## 📋 Resumo do Processo

| Etapa | Tempo | O que fazer |
|-------|-------|-----------|
| 1 | 5 min | Fazer push no GitHub |
| 2 | 2 min | Criar conta no Render |
| 3 | 10 min | Fazer deploy |
| **Total** | **17 min** | **Sistema online!** |

---

## 🔵 ETAPA 1: Fazer Push no GitHub (5 minutos)

### Passo 1.1: Criar Repositório no GitHub

1. Acesse: https://github.com
2. Clique em **"+"** (canto superior direito)
3. Selecione **"New repository"**
4. Preencha assim:
   ```
   Repository name:  anne-beauty-booking
   Description:      Sistema de agendamentos online Anne Beauty
   Visibility:       Public ✅
   ```
5. ⚠️ **NÃO marque** "Add a README file"
6. Clique em **"Create repository"**

✅ **Seu repositório foi criado!**

---

### Passo 1.2: Fazer Push do Código

**Abra PowerShell e execute os comandos abaixo:**

```powershell
cd "C:\Users\ECS\OneDrive - ECS Consultoria\PYTHON\anne-beauty-booking"

# Inicializar Git
git init

# Configurar seu usuário (SUBSTITUA COM SEUS DADOS)
git config user.email "seu-email@gmail.com"
git config user.name "Seu Nome"

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Anne Beauty - Sistema de Agendamentos Online"

# Adicionar repositório remoto (SUBSTITUA SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/anne-beauty-booking.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

**⚠️ Se pedir senha:**
- Use seu **GitHub Token** (não sua senha)
- Crie em: https://github.com/settings/tokens
- Clique em "Generate new token"
- Selecione "repo"
- Copie e cola no PowerShell quando pedir

✅ **Código está no GitHub!**

---

## 🟠 ETAPA 2: Criar Conta no Render (2 minutos)

### Passo 2.1: Registrar no Render

1. Acesse: https://render.com
2. Clique em **"Sign up"** (canto superior direito)
3. **Selecione: "Continue with GitHub"**
4. Autorize o acesso (clique em "Authorize")
5. Preencha seus dados básicos
6. Clique em **"Create Account"**

✅ **Conta criada!**

---

## 🟢 ETAPA 3: Fazer Deploy no Render (10 minutos)

### Passo 3.1: Criar Web Service

1. No dashboard do Render, clique em **"New +"** (canto superior esquerdo)
2. Selecione **"Web Service"**

![Render New Web Service](https://docs.render.com/img/new-web-service.png)

---

### Passo 3.2: Conectar Repositório GitHub

1. Clique em **"Connect a repository"**
2. Procure por **`anne-beauty-booking`**
3. Selecione o repositório
4. Clique em **"Connect"**

---

### Passo 3.3: Configurar Deployment

Preencha os campos assim:

| Campo | Valor |
|-------|-------|
| **Name** | `anne-beauty` |
| **Environment** | `Node` |
| **Region** | `São Paulo` (ou próxima) |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` ✅ |

---

### Passo 3.4: Variáveis de Ambiente

**Pule esta seção** (não precisa de variáveis por enquanto)

---

### Passo 3.5: Deploy!

1. Role até o final
2. Clique em **"Create Web Service"**
3. **Aguarde 5-10 minutos** ⏳

Você verá uma tela com logs dizendo:
```
Building...
==> Running build command: `npm install`...
==> Running start command: `npm start`...
✓ Your service is live!
```

✅ **Seu site está online!**

---

## 🎉 ETAPA 4: Acessar seu Site

Após o deployment terminar, você verá um link como:

```
https://anne-beauty-xxxxxx.onrender.com
```

### **Testar o Site:**

#### Clientes Agendando:
```
https://anne-beauty-xxxxxx.onrender.com/client/booking
```
✅ Abra no celular/PC  
✅ Faça um teste de agendamento  

#### Você (Admin) Gerenciando:
```
https://anne-beauty-xxxxxx.onrender.com/admin/login
```
✅ **Senha:** `anne2025`  
✅ Clique em "🕐 Gerenciar Horários"  
✅ Teste bloquear um horário  

---

## 📱 Compartilhar com Clientes

Copie este link e envie pelo WhatsApp:

```
Olá! 👋

Agende seu horário online: 
https://anne-beauty-xxxxxx.onrender.com/client/booking

💅 Manicure
🦶 Pedicura
✨ Cílios

📱 Disponível: Seg-Sex (14h-18h) + Sábado (10h-18h)
📞 (11) 9.6167-2313
```

---

## 🔒 SEGURANÇA: Mudar Senha Padrão

⚠️ **IMPORTANTE:** Mude a senha `anne2025` antes de compartilhar!

### Como Mudar:

1. **Abra no GitHub:**
   - Acesse seu repositório
   - Clique em `src/routes/admin.js`
   - Procure por: `'anne2025'`
   - Mude para uma senha forte (ex: `aB#9xK2@mL`)

2. **Salve e commit:**
   ```powershell
   git add src/routes/admin.js
   git commit -m "Mudar senha admin"
   git push origin main
   ```

3. **Render faz deploy automático** (2-3 min)

---

## 🕐 Gerenciar Horários

### Como Usar:

1. Acesse: `/admin/login` com a nova senha
2. Clique em **"🕐 Gerenciar Horários"**

### Bloquear um Horário:
```
Data: 20/11/2025
Horário: 15:00 - 16:00
Motivo: Almoço
Clique: 🔒 Bloquear Horário
```

### Bloquear Data Inteira:
```
Data: 25/11/2025
Motivo: Feriado
Clique: 🚫 Bloquear Data Inteira
```

---

## 📊 Ver Agendamentos

1. Acesse admin: `/admin/login`
2. Você vê:
   - 📈 **Dashboard** com estatísticas
   - 📋 **Tabela** com todos os agendamentos
   - 🎯 **Status** de cada agendamento
   - 💬 **Link WhatsApp** para contatar cliente

---

## 🔄 Atualizar o Site

Se quiser fazer mudanças no código:

1. **Edite localmente** (seu PC)
2. **Commit e push:**
   ```powershell
   git add .
   git commit -m "Sua mensagem aqui"
   git push origin main
   ```
3. **Render faz deploy automático** (5-10 min)

✅ **Site atualizado!**

---

## 💡 Dicas Importantes

### Site "Dorme"?
- ✅ Normal! Após 15 min sem acesso, dorme (gratuito)
- ✅ Ao acessar novamente, acorda em ~30s
- ✅ Dados não são perdidos

### Domínio Customizado
Para usar `annebeauty.com.br`:
1. Compre domínio em: GoDaddy, Registro.br, etc
2. No Render, vá em **Settings → Custom Domain**
3. Siga as instruções
4. Render fornece os DNS

### Problemas?

| Problema | Solução |
|----------|---------|
| "Build failed" | Verifique `package.json` e `Procfile` |
| "503 Service Unavailable" | Aguarde 5 min, atualize a página |
| "Senha não funciona" | Limpe cookies (Ctrl+Shift+Delete) |
| Site muito lento | Normal no tier free, pode upgradar |

---

## ✅ Checklist Final

- [ ] Criei repositório `anne-beauty-booking` no GitHub
- [ ] Fiz push do código (git push)
- [ ] Criei conta no Render
- [ ] Conectei repositório ao Render
- [ ] Configurei Web Service
- [ ] Aguardei deploy terminar (5-10 min)
- [ ] Testei acesso ao site
- [ ] Testei agendamento no cliente
- [ ] Testei login admin (senha: anne2025)
- [ ] Mudei a senha padrão
- [ ] Testei gerenciar horários
- [ ] Compartilhei link com clientes

---

## 🎯 Próximos Passos

- [ ] Adicione sua logo/branding
- [ ] Configure seu domínio customizado
- [ ] Comece a receber agendamentos
- [ ] Gerencie horários conforme necessário

---

## 📞 Suporte

**Render:** https://docs.render.com/  
**GitHub:** https://docs.github.com/  
**Node.js:** https://nodejs.org/docs/

---

## 🚀 Parabéns!

Seu sistema **Anne Beauty** está **100% online e profissional**!

### ✨ O que você tem agora:

✅ **Clientes** agendando pelo celular  
✅ **Você** gerenciando tudo pelo celular também  
✅ **Horários** bloqueáveis (sábado + segunda a sexta)  
✅ **Banco de dados** centralizado  
✅ **HTTPS** automático  
✅ **100% grátis** (Render tier free)  

---

**Pronto para começar a receber agendamentos? 🎉**

Se tiver dúvida em qualquer etapa, volte a este guia ou consulte:
- Render Docs: https://docs.render.com/
- GitHub Help: https://docs.github.com/
