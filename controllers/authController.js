// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const pool = require('../db/pool');

// exports.register = async (req, res) => {
//   const { name,  password, is_admin = false } = req.body;

//   if (  !password || !name) {
//     return res.status(400).json({ error: 'Faltan campos' });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       'INSERT INTO users (name,  password, is_admin) VALUES ($1, $2, $3,) RETURNING id, name,  is_admin',
//       [name,  hashedPassword, is_admin]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('❌ Error al registrar usuario:', error.message);
//     res.status(500).json({ error: 'Error al registrar usuario' });
//   }
// };

// exports.login = async (req, res) => {
//   const { usuario, contrasena } = req.body;
//             console.log(await pool.query(
//             "SELECT * FROM usuarios",
//         ));
//   try {
//     const result = await pool.query('SELECT * FROM usuarios WHERE name = $1', [usuario]);
//     if (result.rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

//     const user = result.rows[0];
//     const match = await bcrypt.compare(contrasena, user.password);
//     if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

//     const token = jwt.sign(
//       { id: user.id, is_admin: user.is_admin },
//       process.env.JWT_SECRET,
//       { expiresIn: '2h' }
//     );

//     res.json({
//       success:
//       token,
//       user: { id: user.id, name: user.name, is_role: user.user_role, is_contrasena: user.password },
//     });
//   } catch (error) {
//     console.error('Error al iniciar sesión:', error.message);
//     res.status(500).json({ error: 'Error en el servidor' });
//   }
// };


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');

exports.register = async (req, res) => {
  const { name, password, user_role } = req.body;

  if (!name || !password || !user_role) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  const rolesPermitidos = ['estudiante', 'docente', 'administrador'];
  if (!rolesPermitidos.includes(user_role)) {
    return res.status(400).json({ error: 'Rol no permitido' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO usuarios (name, password, user_role) VALUES ($1, $2, $3) RETURNING id, name, user_role',
      [name, hashedPassword, user_role]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error.message);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE name = $1', [usuario]);
    if (result.rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

    const user = result.rows[0];
    const match = await bcrypt.compare(contrasena, user.password);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, role: user.user_role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, role: user.user_role },
    });
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
