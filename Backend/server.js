require('dotenv').config(); // Cargar variables de entorno
const app = require('./app.js'); // Importar la app express

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log`(✅ Servidor corriendo en http://localhost:${PORT});`
});