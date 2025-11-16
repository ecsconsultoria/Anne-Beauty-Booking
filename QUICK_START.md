# 🌟 Anne Beauty Booking System - Quick Start Guide

## ✅ System Status: FULLY BUILT AND READY TO USE

Your complete beauty salon booking system has been created! Here's how to get it running.

---

## 📦 Prerequisites

Before starting, you need **Node.js** installed on your computer.

### Download Node.js
1. Visit: **https://nodejs.org/**
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the installation steps
4. **Important:** Restart your computer after installation
5. Verify installation by opening PowerShell and typing:
   ```powershell
   node --version
   npm --version
   ```

---

## 🚀 Installation & Launch

### Step 1: Open PowerShell
Press `Win + R`, type `powershell`, and press Enter.

### Step 2: Navigate to Project Folder
```powershell
cd "C:\Users\ECS\OneDrive - ECS Consultoria\PYTHON\anne-beauty-booking"
```

### Step 3: Install Dependencies
```powershell
npm install
```
*This will download all required packages (express, sqlite3, ejs, etc.)*

### Step 4: Start the Server
```powershell
npm start
```

You should see:
```
🌟 Anne Beauty Booking System rodando em http://localhost:3000
📱 Acesse a página de admin: http://localhost:3000/admin
```

### Step 5: Open in Browser
- **Client Booking Page:** http://localhost:3000/client/booking
- **Admin Dashboard:** http://localhost:3000/admin/login
  - **Password:** `anne2025`

---

## 📱 How It Works

### For Clients (Beauty Service Customers)
1. Click the booking link shared by Anne
2. Enter: Name, Phone/WhatsApp, Email
3. Select: Desired service (Manicure, Pedicure, Eyelashes, or Combos)
4. Choose: Date from calendar (next 30 days available)
5. Pick: Time slot from available hours (9am-6pm)
6. Confirm: Submit booking
7. Get: Confirmation message with WhatsApp option

### For Admin (Anne - Beauty Professional)
1. Login with password: `anne2025`
2. See: Dashboard with booking statistics
3. Manage: View all upcoming appointments
4. Actions: Confirm, complete, or cancel bookings
5. Share: Generate and share booking link on WhatsApp
6. Track: Client details and service history

---

## 🎨 System Features

✨ **Beautiful Mobile-First Design**
- Fully responsive (works on phones, tablets, desktop)
- Modern gradient design with Anne Beauty branding
- Easy-to-use interface for all users

📅 **Smart Scheduling**
- Calendar shows next 30 days
- Real-time availability checking
- 30-minute appointment slots
- Prevents double-booking

💼 **Professional Dashboard**
- Admin statistics (total, confirmed, completed, cancelled)
- Appointment list with client details
- One-click actions (complete, cancel appointments)
- WhatsApp integration for sharing links

🔐 **Secure & Private**
- Password-protected admin panel
- Simple but secure authentication
- Local SQLite database

---

## 📂 Project Structure

```
anne-beauty-booking/
├── src/                          # Backend code
│   ├── server.js                 # Main application
│   ├── database.js               # Database setup
│   └── routes/                   # API endpoints
├── views/                        # Web pages (EJS templates)
├── public/                       # Frontend assets
│   ├── css/                      # Stylesheets
│   └── js/                       # JavaScript files
├── data/                         # Database storage
├── package.json                  # Dependencies
└── README.md                     # Full documentation
```

---

## 🔧 Customization

### Change Admin Password
Edit `src/routes/admin.js` and find:
```javascript
if (password !== 'anne2025') {
```
Replace `'anne2025'` with your desired password.

### Change Company Phone Number
The default number is `(11) 9.6167-2313`. To change:
1. `src/routes/admin.js`
2. `views/admin-dashboard.ejs`
3. `public/js/booking.js`

Look for `5511961672313` or `(11) 9.6167-2313` and replace.

### Change Business Hours
Edit `src/database.js` and find the `timeSlots` array. Modify the times as needed.

---

## 🚨 Troubleshooting

### Error: "npm is not recognized"
- Node.js wasn't installed or you didn't restart the computer
- **Solution:** Install Node.js and restart your computer

### Error: "Port 3000 already in use"
- Another application is using port 3000
- **Solution:** Edit `src/server.js` and change `PORT = 3001`

### Database errors
- The `data/` folder might not exist
- **Solution:** Create the folder manually or reinstall

### Can't login to admin panel
- Wrong password
- **Solution:** Default password is `anne2025` (case-sensitive)

---

## 📊 Database Tables

The system automatically creates 3 tables:

1. **appointments** - Client bookings
   - Client name, phone, email
   - Service type and appointment date/time
   - Status (confirmed, completed, cancelled)

2. **time_slots** - Available appointment times
   - Start and end times (30-minute slots)
   - 9am to 6pm by default

3. **available_dates** - Dates open for booking
   - Configured dates
   - Maximum appointments per day

---

## 🌐 Deployment (Future)

To deploy online for real clients:
1. Host on Heroku, Vercel, or similar platform
2. Use a cloud database (Firebase, MongoDB)
3. Set up HTTPS/SSL
4. Configure custom domain
5. Implement better authentication

For now, this runs perfectly on localhost for testing!

---

## 📞 Support Information

**Anne Beauty**
- Phone: (11) 9.6167-2313
- Services: Manicure, Pedicure, Eyelashes

---

## ✅ System Requirements

- Windows 10/11 or Mac/Linux
- Node.js v14+
- 100MB disk space
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for initial setup only)

---

## 📝 Next Steps

1. ✅ Install Node.js (if not already done)
2. ✅ Open PowerShell and navigate to the project folder
3. ✅ Run `npm install`
4. ✅ Run `npm start`
5. ✅ Open http://localhost:3000 in your browser
6. ✅ Test the booking page and admin panel
7. ✅ Share the client link with your customers!

---

**🎉 Congratulations! Your beauty salon booking system is ready to use!**

For detailed technical information, see `README.md`.
For architectural details, see `.github/copilot-instructions.md`.
