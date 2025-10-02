// Importamos Express para crear el servidor
const express = require('express');
const path = require('path');
const app = express();

// Definimos el puerto (Pterodactyl puede usar variables de entorno)
const PORT = process.env.SERVER_PORT || process.env.PORT || 3032;

// --- Cargador de Rutas ---
const tiktokRoutes = require('./routes/tiktok');            
const instagramRoutes = require('./routes/instagramvid');   
const facebookRoutes = require('./routes/facebookvid');     
const youtubeRoutes = require('./routes/youtube');          
const twitterRoutes = require('./routes/twitter');          
const shortenerRoutes = require('./routes/shortener');      
const qrcodeRoutes = require('./routes/qrcode');            
const screenshotRoutes = require('./routes/screenshot');    
const geminisRoutes = require('./routes/geminis');          // 🆕 ChatGPT
const imagehdRoutes = require('./routes/hd'); // 🆕
const r34Routes = require('./routes/r34'); // 🆕

// --- Archivos Estáticos ---
app.use(express.static(path.join(__dirname, 'public')));

// Categoría: /api/download
app.use('/api/download', tiktokRoutes);
app.use('/api/download', instagramRoutes);
app.use('/api/download', facebookRoutes);
app.use('/api/download', youtubeRoutes);
app.use('/api/download', twitterRoutes);

// Categoría: /api/tools
app.use('/api/tools', shortenerRoutes);
app.use('/api/tools', qrcodeRoutes);
app.use('/api/tools', screenshotRoutes);

// Categoría: /api/ai
app.use('/api/ai', geminisRoutes); // 🆕 ChatGPT
app.use('/api/ai', imagehdRoutes); // 🆕 image enhancer

app.use('/api/nsfw', r34Routes); // 🆕 image enhancer

// --- Ruta de Bienvenida (API Info) ---
app.get('/api', (req, res) => {
    res.json({
        status: true,
        message: '¡Bienvenido a tu API! El servidor está funcionando.',
        endpoints: {
            youtube: '/api/download/youtube?url=VIDEO_URL',
            tiktok: '/api/download/tiktok?url=VIDEO_URL',
            instagram: '/api/download/instagram?url=VIDEO_URL',
            facebook: '/api/download/facebook?url=VIDEO_URL',
            twitter: '/api/download/twitter?url=VIDEO_URL',
            shortener: '/api/tools/shortener?url=ENLACE',
            qrcode: '/api/tools/qr?text=TEXTO_O_URL',
            chatgpt: '/api/ai/chatgpt?text=MENSAJE' // 🆕 agregado
        }
    });
});

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciamos el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});


// ==========================
//  Consola interactiva 🔥
// ==========================
const readline = require("readline");
const { spawn } = require("child_process");

// Inicia shell interactiva (bash o sh)
const shell = spawn("bash", [], { stdio: "pipe" });

// Interfaz para escribir desde Node a la shell
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

// Mostrar la salida de la consola en tiempo real
shell.stdout.on("data", (data) => {
  process.stdout.write(data.toString());
});

shell.stderr.on("data", (data) => {
  process.stderr.write(data.toString());
});

// Captura comandos que escribas en la terminal de Node
rl.on("line", (line) => {
  shell.stdin.write(line + "\n");
});

// Si la shell se cierra, salir del proceso
shell.on("close", (code) => {
  console.log(`\n[Shell cerrada con código ${code}]`);
  process.exit(0);
});
