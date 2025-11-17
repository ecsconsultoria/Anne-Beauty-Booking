const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../data/appointments.db');
let db;

const initializeDatabase = () => {
  // Garantir que o diretório data/ existe
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    console.log('📁 Criando diretório:', dataDir);
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('✅ Diretório criado com sucesso');
  }

  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('✅ Banco de dados conectado:', dbPath);
    
    // Configurar para melhor performance no Render
    db.configure('busyTimeout', 30000); // 30 segundos
    
    // Desabilitar WAL mode (pode causar problemas no Render)
    db.run('PRAGMA journal_mode=DELETE;', (err) => {
      if (err) {
        console.error('Erro ao configurar journal_mode:', err);
      } else {
        console.log('✅ Journal mode configurado');
      }
    });
    
    // Melhorar sincronização
    db.run('PRAGMA synchronous=NORMAL;', (err) => {
      if (err) console.error('Erro ao configurar PRAGMA synchronous:', err);
      else console.log('✅ PRAGMA synchronous configurado');
    });
    
    createTables();
  });
  
  // Tratamento de erros
  db.on('error', (err) => {
    console.error('Erro no banco de dados:', err);
  });
};

const createTables = () => {
  db.serialize(() => {
    // Tabela de agendamentos
    db.run(`
      CREATE TABLE IF NOT EXISTS appointments (
        id TEXT PRIMARY KEY,
        client_name TEXT NOT NULL,
        client_phone TEXT NOT NULL,
        client_email TEXT,
        service TEXT NOT NULL,
        appointment_date TEXT NOT NULL,
        appointment_time TEXT NOT NULL,
        status TEXT DEFAULT 'confirmed',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Erro ao criar tabela appointments:', err);
      else console.log('✅ Tabela appointments ok');
    });

    // Tabela de datas disponíveis
    db.run(`
      CREATE TABLE IF NOT EXISTS available_dates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL UNIQUE,
        max_appointments INTEGER DEFAULT 5,
        is_active INTEGER DEFAULT 1
      )
    `, (err) => {
      if (err) console.error('Erro ao criar tabela available_dates:', err);
      else console.log('✅ Tabela available_dates ok');
    });

    // Tabela de horários
    db.run(`
      CREATE TABLE IF NOT EXISTS time_slots (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        is_active INTEGER DEFAULT 1
      )
    `, (err) => {
      if (err) console.error('Erro ao criar tabela time_slots:', err);
      else console.log('✅ Tabela time_slots ok');
    });

    // Tabela de horários indisponíveis (controle de disponibilidade)
    db.run(`
      CREATE TABLE IF NOT EXISTS unavailable_slots (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        time TEXT,
        is_unavailable INTEGER DEFAULT 1,
        reason TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(date, time)
      )
    `, (err) => {
      if (err) console.error('Erro ao criar tabela unavailable_slots:', err);
      else console.log('✅ Tabela unavailable_slots ok');
    });

    // Inserir horários padrão
    db.all(`SELECT COUNT(*) as count FROM time_slots`, (err, rows) => {
      if (err) {
        console.error('Erro ao verificar time_slots:', err);
        return;
      }
      
      if (rows[0].count === 0) {
        console.log('Inserindo horários padrão...');
        // Todos os horários de 09:00-18:00 (intervalo de 1 hora)
        // Segunda a sexta: 09:00-14:00 será BLOQUEADO automaticamente
        // Segunda a sexta: 14:00-18:00 está DISPONÍVEL
        // Sábado: 10:00-18:00 está DISPONÍVEL
        const timeSlots = [
          { start: '09:00', end: '10:00' }, // Bloqueado seg-sex
          { start: '10:00', end: '11:00' }, // Bloqueado seg-sex
          { start: '11:00', end: '12:00' }, // Bloqueado seg-sex
          { start: '12:00', end: '13:00' }, // Bloqueado seg-sex
          { start: '13:00', end: '14:00' }, // Bloqueado seg-sex
          { start: '14:00', end: '15:00' }, // Disponível
          { start: '15:00', end: '16:00' }, // Disponível
          { start: '16:00', end: '17:00' }, // Disponível
          { start: '17:00', end: '18:00' }  // Disponível
        ];

        timeSlots.forEach(slot => {
          db.run(
            `INSERT INTO time_slots (start_time, end_time) VALUES (?, ?)`,
            [slot.start, slot.end],
            (err) => {
              if (err && !err.message.includes('UNIQUE')) {
                console.error('Erro ao inserir horário:', err);
              }
            }
          );
        });
        console.log('✅ Horários padrão inseridos');
      }
    });
  });
};

const getDatabase = () => db;

module.exports = {
  initializeDatabase,
  getDatabase
};
