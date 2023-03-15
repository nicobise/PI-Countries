const {Activities,Countries} = require("../../db")

async function postActivity(req,res){
    try {
        const {name, dificulty, duration, season, country, cualquiera} = req.body
        const locatedIn = await Countries.findAll({
            where:{
                name: country
            }
        })
        if(!locatedIn) return res.status(404).send(`Country ${country} not found`)
        const newActivity = await Activities.create({name, dificulty, duration, season, cualquiera})
        newActivity.addCountries(locatedIn)
        res.status(200).send(`${name} was uploaded succesfully`)
    } catch (error) {
        console.error(error.message)
        res.status(422).send(error.message)
    }
}

module.exports={postActivity}