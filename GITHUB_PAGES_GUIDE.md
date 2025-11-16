# 🚀 Publicar Anne Beauty no GitHub Pages

## ✅ Seu Site Está 100% Pronto!

Tudo configurado e testado:

✅ Horários: **14:00 às 18:00** (intervalo de 1 hora)  
✅ Dias: **Segunda a sexta**  
✅ Bloqueio automático de horários duplicados  
✅ Design responsivo (mobile, tablet, desktop)  
✅ Integração com WhatsApp  
✅ Agendamentos salvos no navegador  

---

## 📋 Publicar em 5 Minutos

### **Passo 1: Criar Repositório no GitHub**

1. Vá para: https://github.com
2. Clique em **"+"** (canto superior direito)
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name:** `anne-beauty`
   - **Description:** "Sistema de agendamentos online"
   - **Visibility:** Public ✅
   - ⚠️ NÃO marque "Add a README file"
5. Clique em **"Create repository"**
### **Passo 2: Fazer Upload dos Arquivos**

1. Clique em **"Add file"** → **"Upload files"**
2. **Selecione ou arraste** estes 3 arquivos:
   - `index.html`
   - `styles.css`
   - `script.js`

   (Estão em: `C:\Users\ECS\OneDrive - ECS Consultoria\PYTHON\anne-beauty-booking\docs\`)

3. Na mensagem de commit, escreva:
   ```
   Initial commit - Anne Beauty booking system
   ```
4. Clique em **"Commit changes"**

### **Passo 3: Ativar GitHub Pages**

1. Vá em **Settings** (engrenagem)
2. No menu esquerdo, clique em **"Pages"**
3. Mude de "None" para **"Deploy from a branch"**
4. Selecione branch: **main**
5. Selecione pasta: **/ (root)** (NÃO /docs, pois você fez upload dos arquivos na raiz)
6. Clique em **"Save"**

⏳ **Aguarde 2-3 minutos...**

### **Passo 4: Seu Site Está Online!** 🎉

Você verá:
> "Your site is published at: `https://SEU_USUARIO.github.io/anne-beauty`"

**Abra este link no navegador!**

---

## Usando a Linha de Comando (Alternativo)

Se preferir usar PowerShell:

```powershell
# 1. Navegue até a pasta do projeto
cd "C:\Users\ECS\OneDrive - ECS Consultoria\PYTHON\anne-beauty-booking"

# 2. Inicialize o Git
git init

# 3. Configure seus dados (use seu email/nome do GitHub)
git config user.email "seu@email.com"
git config user.name "Seu Nome"

# 4. Adicione os arquivos
git add docs/

# 5. Faça o commit
git commit -m "Initial commit - Anne Beauty booking system"

# 6. Adicione o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/anne-beauty.git

# 7. Envie para o GitHub
git branch -M main
git push -u origin main
```

---

## 📱 Compartilhar com Clientes

### Link Direto:
```
https://seu-usuario.github.io/anne-beauty
```

### Via WhatsApp:
```
Olá! Agende seu horário: https://seu-usuario.github.io/anne-beauty 💅
```

### Via QR Code:
1. Acesse: https://qr-code-generator.com/
2. Cole seu link
3. Baixe o QR code

---

## 👨‍💼 Como Acessar os Agendamentos (Admin)

### **Método 1: Ver no Console (Recomendado)**

1. **Abra seu site**: https://seu-usuario.github.io/anne-beauty
2. **Pressione:** `F12` ou `Ctrl+Shift+I`
3. **Clique em:** "Console"
4. **Digite:**
   ```javascript
   getBookings()
   ```
5. **Pressione Enter** → ✅ Vê todos os agendamentos!

**Exemplo do resultado:**
```javascript
[
  {
    id: "booking_1234567890_abc123def456",
    clientName: "Maria Silva",
    clientPhone: "(11) 9.8765-4321",
    clientEmail: "maria@email.com",
    service: "manicure",
    appointmentDate: "2025-11-20",
    appointmentTime: "14:00",
    notes: "Gosto de cor vermelha",
    createdAt: "2025-11-16T10:30:00.000Z",
    status: "pending"
  },
  // ... mais agendamentos
]
```

---

### **Método 2: Ver Estatísticas**

No Console, digite:
```javascript
getBookingStats()
```

Resultado:
```javascript
{
  total: 5,           // Total de agendamentos
  confirmed: 5,       // Confirmados
  completed: 0,       // Concluídos
  cancelled: 0        // Cancelados
}
```

---

### **Método 3: Exportar em Excel/PDF**

1. **Console → Digite:**
   ```javascript
   JSON.stringify(getBookings(), null, 2)
   ```
2. **Clique direito** no resultado → **"Copy"**
3. **Cole em:** Bloco de Notas, Word, Excel, Google Sheets, etc.

---

## ⚙️ Horários Configurados

| Horário | Duração |
|---------|---------|
| 14:00 - 15:00 | 1 hora |
| 15:00 - 16:00 | 1 hora |
| 16:00 - 17:00 | 1 hora |
| 17:00 - 18:00 | 1 hora |

**Dias:** Segunda a Sexta  
**Finais de semana:** Bloqueados automaticamente  
**Horários duplicados:** Bloqueados (um cliente por horário por dia)

---

## 🔧 Personalizar o Site

### Mudar Telefone:
1. Abra `script.js` no GitHub
2. Procure por:
   ```javascript
   const PHONE_NUMBER = '5511961672313';
   ```
3. Mude para seu número
4. Salve

### Mudar Cores:
1. Abra `styles.css`
2. Procure por `#667eea` (cor principal)
3. Mude para a cor que desejar
4. Salve

### Adicionar Mais Horários:
1. Abra `index.html`
2. Procure por `<option value="14:00">`
3. Adicione novas linhas (ex: `<option value="13:00">13:00 - 14:00</option>`)
4. Salve

---

## 💾 Dados e Privacidade

✅ **Dados salvos no navegador** (localStorage) do cliente  
✅ **Nenhum servidor externo** recebe os dados  
✅ **Privacidade garantida**  
✅ **Sem custos** de banco de dados  

⚠️ Se o cliente **limpar cache/cookies**, os dados dele serão perdidos.

---

## Próximos Passos

✅ Site online!

Opcionalmente:
- [ ] Adicionar domínio customizado
- [ ] Melhorar design
- [ ] Migrar para Heroku (se quiser backend completo)

---

**Parabéns! Seu sistema de agendamentos Anne Beauty está online! 🎉**
