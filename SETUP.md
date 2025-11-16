# 🚀 INSTRUÇÕES DE INSTALAÇÃO - Anne Beauty Booking System

## ⚠️ Pré-requisitos

### 1. Instalar Node.js

Node.js não está detectado no seu sistema. Siga os passos abaixo:

#### Windows:
1. Acesse https://nodejs.org/
2. Baixe a versão **LTS (Long Term Support)** - recomendado
3. Execute o instalador
4. Durante a instalação, marque a opção "Automatically install the necessary tools..."
5. Complete a instalação
6. Reinicie o computador

#### Verificar Instalação:
Abra o PowerShell e execute:
```powershell
node --version
npm --version
```

Você deve ver algo como:
```
v18.x.x
9.x.x
```

## 📦 Instalar Dependências do Projeto

Após instalar o Node.js e reiniciar, abra PowerShell e execute:

```powershell
cd "c:\Users\ECS\OneDrive - ECS Consultoria\PYTHON\anne-beauty-booking"
npm install
```

Isso vai instalar todas as dependências necessárias.

## ▶️ Iniciar o Sistema

```powershell
npm start
```

O servidor vai iniciar em: **http://localhost:3000**

## 📱 Acessar o Sistema

Abra seu navegador e acesse:

- **Para Clientes**: http://localhost:3000/client/booking
- **Para Admin**: http://localhost:3000/admin/login
  - Senha: `anne2025`

## 🐛 Se tiver problemas

### Erro: "npm: O termo não é reconhecido"
- Significa que Node.js não foi instalado ou o PATH não foi atualizado
- Reinstale o Node.js e reinicie o computador

### Erro: "sqlite3 não consegue compilar"
- Windows precisa de ferramentas de compilação
- Durante a instalação do Node.js, selecione "Automatically install the necessary tools..."
- Ou instale manualmente: Python 3 e Visual Studio Build Tools

### Porta 3000 já está em uso
- Mude a porta no arquivo `src/server.js`:
  ```javascript
  const PORT = process.env.PORT || 3001; // Altere 3001 para outra porta
  ```

## 📞 Suporte

Em caso de problemas, entre em contato:
📱 Anne Beauty: (11) 9.6167-2313

---

**Após completar a instalação do Node.js, execute `npm install` novamente!**
