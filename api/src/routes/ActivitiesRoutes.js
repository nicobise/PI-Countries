const { Router } = require('express');
const {postActivity} = require("./controllers/ActivitiesControllers")
const router= Router()

router.post('/',postActivity)

module.exports=router;