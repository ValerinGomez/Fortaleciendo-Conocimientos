const pool = require('../db/pool');

// 🟢 Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, user_role FROM usuarios ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error.message);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// 🟡 Editar usuario
exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { name, user_role } = req.body;

  if (!name || !user_role) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    await pool.query(
      'UPDATE usuarios SET name = $1, user_role = $2 WHERE id = $3',
      [name, user_role, id]
    );
    res.json({ message: '✅ Usuario actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error.message);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// 🔴 Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.json({ message: '🗑️ Usuario eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error.message);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};


