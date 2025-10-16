const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

// Enrutadores
const productoRoutes = require('./routes/productoRoutes');
const tiendaRoutes = require('./routes/tiendaRoutes');
const personaRoutes = require('./routes/personaRoutes');
//const clienteRoutes = require('./routes/clienteRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración CORS
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

// Crear carpeta uploads si no existe
const uploadDir = path.join(__dirname, 'public', 'uploads');
fs.mkdir(uploadDir, { recursive: true })
  .catch(err => console.error('Error al crear carpeta uploads:', err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para páginas del frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* app.get('/clientes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'clientes.html'));
}); */

app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'productos.html'));
});

app.get('/tiendas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tiendas.html'));
});

app.get('/personas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'personas/listar.html'));
});
app.get('/personas/crear', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'personas/crear.html'));
});
app.get('/personas/editar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'personas/editar.html'));
});


// Rutas API
app.use('/api/productos', productoRoutes);
app.use('/api/tiendas', tiendaRoutes);
//app.use('/api/clientes', clienteRoutes);
app.use('/api/personas', personaRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
