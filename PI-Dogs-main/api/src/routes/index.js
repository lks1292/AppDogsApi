const { Router } = require('express');
const dogsRoute = require('./Dogsroute')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/', dogsRoute)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
