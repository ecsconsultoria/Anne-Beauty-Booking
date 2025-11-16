# 🌐 Anne Beauty Booking System - API Documentation

## Overview

Complete REST API documentation for the Anne Beauty booking system.

---

## Base URL

```
http://localhost:3000
```

---

## Authentication

The admin endpoints require a password parameter in the query string or request body:

```
password=anne2025
```

Default password: `anne2025`  
⚠️ **Change this in production!** See customization guide.

---

## API Endpoints

### BOOKING ENDPOINTS

#### 1. Get Available Dates

**Endpoint:** `GET /api/booking/available-dates`

**Description:** Retrieves all dates available for booking (next 30 days)

**Request:**
```bash
curl http://localhost:3000/api/booking/available-dates
```

**Response (200 OK):**
```json
[
  {
    "date": "2025-11-20"
  },
  {
    "date": "2025-11-21"
  }
]
```

**Response (500 Error):**
```json
{
  "error": "Erro ao buscar datas"
}
```

---

#### 2. Get Available Time Slots

**Endpoint:** `GET /api/booking/available-times/:date`

**Description:** Retrieves available time slots for a specific date

**Parameters:**
- `date` (path, required): Date in YYYY-MM-DD format

**Request:**
```bash
curl http://localhost:3000/api/booking/available-times/2025-11-20
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "start_time": "09:00",
    "end_time": "09:30",
    "booked": 0
  },
  {
    "id": 2,
    "start_time": "09:30",
    "end_time": "10:00",
    "booked": 0
  }
]
```

**Response (500 Error):**
```json
{
  "error": "Erro ao buscar horários"
}
```

---

#### 3. Create Booking

**Endpoint:** `POST /api/booking/create`

**Description:** Creates a new appointment

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "client_name": "Maria Silva",
  "client_phone": "(11) 99999-9999",
  "client_email": "maria@email.com",
  "service": "manicure",
  "appointment_date": "2025-11-20",
  "appointment_time": "09:00",
  "notes": "Prefer red color"
}
```

**Request Example:**
```bash
curl -X POST http://localhost:3000/api/booking/create \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Maria Silva",
    "client_phone": "(11) 99999-9999",
    "service": "manicure",
    "appointment_date": "2025-11-20",
    "appointment_time": "09:00"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "appointment_id": "abc12345def67890",
  "message": "Agendamento confirmado! Você receberá uma confirmação via WhatsApp."
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Dados obrigatórios faltando"
}
```

**Response (500 Error):**
```json
{
  "error": "Erro ao criar agendamento"
}
```

**Field Validation:**
- `client_name` (required): Min 2 characters
- `client_phone` (required): Any format
- `client_email` (optional): Valid email format
- `service` (required): One of: manicure, pedicure, cilios, combo_mani_pedi, combo_completo
- `appointment_date` (required): Valid date YYYY-MM-DD
- `appointment_time` (required): Valid time HH:MM
- `notes` (optional): Any text

---

#### 4. Get Appointment Details

**Endpoint:** `GET /api/booking/:id`

**Description:** Retrieves details of a specific appointment

**Parameters:**
- `id` (path, required): Appointment ID (UUID)

**Request:**
```bash
curl http://localhost:3000/api/booking/abc12345def67890
```

**Response (200 OK):**
```json
{
  "id": "abc12345def67890",
  "client_name": "Maria Silva",
  "client_phone": "(11) 99999-9999",
  "client_email": "maria@email.com",
  "service": "manicure",
  "appointment_date": "2025-11-20",
  "appointment_time": "09:00",
  "status": "confirmed",
  "notes": "Prefer red color",
  "created_at": "2025-11-16 14:30:00"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Agendamento não encontrado"
}
```

**Response (500 Error):**
```json
{
  "error": "Erro ao buscar agendamento"
}
```

---

### ADMIN ENDPOINTS

#### 1. Admin Login

**Endpoint:** `GET /admin/login`

**Description:** Returns the login page

**Request:**
```bash
curl http://localhost:3000/admin/login
```

**Response:** HTML login form

---

#### 2. Process Admin Login

**Endpoint:** `POST /admin/login`

**Description:** Authenticates admin user

**Request Headers:**
```
Content-Type: application/x-www-form-urlencoded
```

**Request Body:**
```
password=anne2025
```

**Response (Success):**
- Redirects to: `/admin/dashboard`
- Sets cookie: `admin_auth`

**Response (Failure):**
- Returns login page with error message

---

#### 3. Admin Dashboard

**Endpoint:** `GET /admin/dashboard`

**Description:** Returns the admin dashboard (protected)

**Query Parameters:**
- `password` (optional): If not authenticated via cookie

**Request:**
```bash
curl "http://localhost:3000/admin/dashboard?password=anne2025"
```

**Response (200 OK):** HTML dashboard page

**Response (401 Unauthorized):**
```html
<p>Senha incorreta</p>
```

---

#### 4. Get All Appointments

**Endpoint:** `GET /admin/api/appointments`

**Description:** Lists all future appointments

**Request Headers:**
```
Content-Type: application/json
```

**Request:**
```bash
curl http://localhost:3000/admin/api/appointments
```

**Response (200 OK):**
```json
[
  {
    "id": "abc12345def67890",
    "client_name": "Maria Silva",
    "client_phone": "(11) 99999-9999",
    "client_email": "maria@email.com",
    "service": "manicure",
    "appointment_date": "2025-11-20",
    "appointment_time": "09:00",
    "status": "confirmed",
    "notes": "Prefer red color",
    "created_at": "2025-11-16 14:30:00"
  }
]
```

**Response (500 Error):**
```json
{
  "error": "Erro ao buscar agendamentos"
}
```

---

#### 5. Complete Appointment

**Endpoint:** `POST /admin/api/appointments/:id/complete`

**Description:** Marks an appointment as completed

**Parameters:**
- `id` (path, required): Appointment ID
- `password` (query, required): Admin password

**Request Headers:**
```
Content-Type: application/json
```

**Request:**
```bash
curl -X POST "http://localhost:3000/admin/api/appointments/abc12345def67890/complete?password=anne2025" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Agendamento marcado como concluído"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Senha incorreta"
}
```

**Response (500 Error):**
```json
{
  "error": "Erro ao marcar como concluído"
}
```

---

#### 6. Cancel Appointment

**Endpoint:** `POST /admin/api/appointments/:id/cancel`

**Description:** Cancels an appointment

**Parameters:**
- `id` (path, required): Appointment ID
- `password` (query, required): Admin password

**Request Headers:**
```
Content-Type: application/json
```

**Request:**
```bash
curl -X POST "http://localhost:3000/admin/api/appointments/abc12345def67890/cancel?password=anne2025" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Agendamento cancelado"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Senha incorreta"
}
```

**Response (500 Error):**
```json
{
  "error": "Erro ao cancelar agendamento"
}
```

---

#### 7. Generate Booking Link

**Endpoint:** `GET /admin/generate-link`

**Description:** Generates a shareable booking link

**Query Parameters:**
- `password` (required): Admin password

**Request:**
```bash
curl "http://localhost:3000/admin/generate-link?password=anne2025"
```

**Response (200 OK):**
```json
{
  "link": "http://localhost:3000/client/booking",
  "whatsapp": "https://wa.me/5511961672313?text=Olá!%20Agende%20seu%20serviço%20de%20manicure..."
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Senha incorreta"
}
```

---

### CLIENT ENDPOINTS

#### 1. Booking Page

**Endpoint:** `GET /client/booking`

**Description:** Returns the client booking page

**Request:**
```bash
curl http://localhost:3000/client/booking
```

**Response:** HTML booking form

---

#### 2. Confirmation Page

**Endpoint:** `GET /client/confirmation/:id`

**Description:** Returns the booking confirmation page

**Parameters:**
- `id` (path, required): Appointment ID

**Request:**
```bash
curl http://localhost:3000/client/confirmation/abc12345def67890
```

**Response:** HTML confirmation page

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Wrong password |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Database/processing error |

---

## Data Types & Formats

### Service Types
- `manicure` - Manicure service
- `pedicure` - Pedicure service
- `cilios` - Eyelash service
- `combo_mani_pedi` - Manicure + Pedicure
- `combo_completo` - All services

### Status Types
- `confirmed` - Appointment confirmed
- `completed` - Service completed
- `cancelled` - Appointment cancelled

### Date Format
- `YYYY-MM-DD` (e.g., 2025-11-20)

### Time Format
- `HH:MM` (24-hour, e.g., 09:00, 14:30)

### Phone Format
- Any format accepted (e.g., (11) 99999-9999, 11999999999)

---

## Error Handling

All error responses include an `error` field:

```json
{
  "error": "Description of what went wrong"
}
```

Common errors:
- "Dados obrigatórios faltando" - Required fields missing
- "Erro ao buscar datas" - Database error fetching dates
- "Erro ao buscar horários" - Database error fetching times
- "Erro ao criar agendamento" - Booking creation failed
- "Agendamento não encontrado" - Appointment doesn't exist
- "Senha incorreta" - Wrong password
- "Erro ao buscar agendamentos" - Database error

---

## Rate Limiting

Currently no rate limiting. Implement in production!

---

## CORS

CORS is enabled for all origins. In production, restrict to your domain:

Edit `src/server.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

---

## Authentication

Currently uses simple password authentication. For production:

1. Implement JWT tokens
2. Add password hashing (bcrypt)
3. Add session management
4. Implement password expiry
5. Add 2FA support

---

## Database Queries

The API automatically handles all database operations:

- **Create:** `INSERT INTO appointments ...`
- **Read:** `SELECT * FROM appointments ...`
- **Update:** `UPDATE appointments SET status = ... WHERE id = ...`
- **List:** `SELECT * FROM appointments WHERE appointment_date >= ...`

---

## Request/Response Examples

### Example 1: Book an Appointment

```bash
POST /api/booking/create
Content-Type: application/json

{
  "client_name": "João Silva",
  "client_phone": "(11) 99999-8888",
  "client_email": "joao@email.com",
  "service": "pedicure",
  "appointment_date": "2025-11-25",
  "appointment_time": "14:00",
  "notes": "Prefer nude color"
}

Response:
{
  "success": true,
  "appointment_id": "xyz98765abc43210",
  "message": "Agendamento confirmado! Você receberá uma confirmação via WhatsApp."
}
```

### Example 2: Get Appointment Details

```bash
GET /api/booking/xyz98765abc43210

Response:
{
  "id": "xyz98765abc43210",
  "client_name": "João Silva",
  "client_phone": "(11) 99999-8888",
  "client_email": "joao@email.com",
  "service": "pedicure",
  "appointment_date": "2025-11-25",
  "appointment_time": "14:00",
  "status": "confirmed",
  "notes": "Prefer nude color",
  "created_at": "2025-11-16 15:00:00"
}
```

### Example 3: Mark Appointment as Completed

```bash
POST /admin/api/appointments/xyz98765abc43210/complete?password=anne2025

Response:
{
  "success": true,
  "message": "Agendamento marcado como concluído"
}
```

---

## Testing

### Using curl
```bash
# Test booking endpoint
curl -X POST http://localhost:3000/api/booking/create \
  -H "Content-Type: application/json" \
  -d '{"client_name":"Test","client_phone":"1199999999","service":"manicure","appointment_date":"2025-11-20","appointment_time":"09:00"}'

# Test admin endpoint
curl "http://localhost:3000/admin/api/appointments?password=anne2025"
```

### Using Postman
1. Open Postman
2. Create new requests for each endpoint
3. Set method (GET/POST)
4. Add headers: `Content-Type: application/json`
5. Add body for POST requests
6. Send and view responses

### Using JavaScript Fetch

```javascript
// Book appointment
const bookingData = {
  client_name: "Test User",
  client_phone: "(11) 99999-9999",
  service: "manicure",
  appointment_date: "2025-11-20",
  appointment_time: "09:00"
};

fetch('/api/booking/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bookingData)
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## Performance Tips

- Cache available dates in browser
- Use pagination for large appointment lists
- Implement database indexes on date fields
- Use connection pooling for multiple requests
- Compress responses (gzip)

---

## Future API Enhancements

- [ ] Payment integration
- [ ] SMS notifications
- [ ] Email confirmations
- [ ] Calendar sync (Google, Outlook)
- [ ] Customer reviews/ratings
- [ ] Service pricing
- [ ] Staff management
- [ ] Recurring appointments
- [ ] Custom services
- [ ] Multiple languages

---

## Support

For API issues:
1. Check error messages
2. Verify request format
3. Check database connectivity
4. Review logs in console

---

**📚 Complete API documentation for Anne Beauty Booking System**

For more information, see README.md and QUICK_START.md
