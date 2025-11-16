# 🔐 Guia de Login - Problema Resolvido

## ✅ O que foi corrigido:

1. Adicionado suporte a cookies
2. Melhorado o middleware de autenticação
3. Instalada dependência `cookie-parser`

---

## 🚀 Como usar agora:

### Passo 1: Reinstalar dependências
```powershell
cd "C:\Users\ECS\OneDrive - ECS Consultoria\PYTHON\anne-beauty-booking"
npm install
```

### Passo 2: Iniciar o servidor
```powershell
npm start
```

### Passo 3: Acessar o painel
1. Abra seu navegador
2. Vá para: **http://localhost:3000/admin/login**
3. Digite a senha: **anne2025**
4. Clique em "Entrar"

---

## 📝 Senhas Disponíveis

**Senha Padrão:** `anne2025`

Se não funcionar, tente sem espaços:
- `anne2025` ✅

---

## 🔧 Testar Diferentes Formas:

### Forma 1: Via Formulário (Recomendado)
1. Vá para: http://localhost:3000/admin/login
2. Digite: `anne2025`
3. Clique: Entrar

### Forma 2: Via URL
```
http://localhost:3000/admin/dashboard?password=anne2025
```

---

## ❌ Se ainda não funcionar:

### Solução 1: Limpar Cache
1. Abra DevTools (F12)
2. Vá para "Application"
3. Limpe "Local Storage" e "Cookies"
4. Recarregue a página (Ctrl+Shift+R)
5. Tente novamente

### Solução 2: Usar Incógnito
1. Abra abas anônimas (Ctrl+Shift+N)
2. Vá para: http://localhost:3000/admin/login
3. Digite a senha

### Solução 3: Reiniciar Servidor
```powershell
# No PowerShell, pressione Ctrl+C para parar
# Depois rode novamente:
npm start
```

---

## 🆘 Se continuar com erro:

Execute estes passos:

```powershell
# 1. Parar o servidor (Ctrl+C)

# 2. Limpar módulos
rmdir node_modules -Recurse -Force

# 3. Limpar cache npm
npm cache clean --force

# 4. Reinstalar tudo
npm install

# 5. Iniciar novamente
npm start
```

---

## ✅ Você verá isto quando funcionar:

```
✅ Senha aceita
✅ Redirect para dashboard
✅ Ver lista de agendamentos
✅ Ver estatísticas
```

---

## 📞 Senha Padrão do Sistema

**Admin Password:** `anne2025`

### Como Mudar (Opcional):

Se quiser trocar a senha, edite o arquivo:
```
src/routes/admin.js
```

Procure por:
```javascript
if (password !== 'anne2025') {
```

E troque `'anne2025'` pela sua senha desejada.

---

## ✨ Tudo pronto!

Agora a autenticação deve funcionar corretamente!

**Próximo passo:** Teste o login com a senha `anne2025`
