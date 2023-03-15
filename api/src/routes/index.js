const { Router } = require('express');
const countriesRoute=require("./Countriesroutes")
const activitiesRoutes=require("./ActivitiesRoutes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", countriesRoute)
router.use("/activities", activitiesRoutes)


module.exports = router;
