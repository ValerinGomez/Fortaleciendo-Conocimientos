const pool = require("./db/pool"); // o "./db" si tu archivo se llama distinto

(async () => {
  try {
    const result = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'grados_semestre';
    `);
    console.log("📋 Columnas en la tabla grados_semestre:");
    console.table(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener columnas:", error);
  } finally {
    pool.end();
  }
})();

