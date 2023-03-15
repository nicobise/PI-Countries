const { Router } = require('express');
const {getAllCountries,getCountryById}=require('./controllers/CountriesController')
const router= Router()

router.get('/',getAllCountries)
router.get('/:id',getCountryById)
module.exports=router;