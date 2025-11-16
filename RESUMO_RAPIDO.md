# 🚀 Resumo Rápido - Publicar em Render (3 Passos)

## ⚡ 5 MINUTOS = SEU SITE ONLINE

---

## 📌 PASSO 1: Push no GitHub (3 min)

Abra **PowerShell** e execute:

```powershell
cd "C:\Users\ECS\OneDrive - ECS Consultoria\PYTHON\anne-beauty-booking"

git init
git config user.email "seu@email.com"
git config user.name "Seu Nome"
git add .
git commit -m "Anne Beauty - Sistema Online"
git remote add origin https://github.com/SEU_USUARIO/anne-beauty-booking.git
git branch -M main
git push -u origin main
```

✅ **Pronto!**

---

## 🎯 PASSO 2: Ir no Render (2 min)

1. Acesse: https://render.com
2. **Sign up with GitHub**
3. Autorize
4. Clique em **"New Web Service"**
5. Selecione repositório **anne-beauty-booking**

✅ **Conectado!**

---

## ⚙️ PASSO 3: Configurar e Deploy

Preencha assim:
```
Name:           anne-beauty
Environment:    Node
Build Command:  npm install
Start Command:  npm start
Plan:           Free ✅
```

Clique em **"Create Web Service"**

⏳ **Aguarde 5-10 minutos...**

✅ **Seu site está online!**

---

## 🌐 Links de Acesso

Após deploy terminar, você terá um link como:
```
https://anne-beauty-xxxxx.onrender.com
```

### Clientes Agendando:
```
https://anne-beauty-xxxxx.onrender.com/client/booking
```

### Você Gerenciando:
```
https://anne-beauty-xxxxx.onrender.com/admin/login
Senha: anne2025
```

---

## ⚠️ Mude a Senha DEPOIS!

No seu repositório GitHub, edite:
- `src/routes/admin.js`
- Procure por `'anne2025'`
- Mude para uma senha forte
- Commit e push (deploy automático)

---

## 📱 Compartilhe com Clientes:

```
Agende online: https://anne-beauty-xxxxx.onrender.com/client/booking
```

---

**Pronto! 🎉 Sistema online em 5 minutos!**

Para guia completo, leia: **GUIA_RENDER_COMPLETO.md**
