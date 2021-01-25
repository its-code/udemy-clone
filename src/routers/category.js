const express =  require("express")
const router = express.Router()
const categories = require("../models/category")
const auth = require("../middleware/auth")

// Routers for categories (HTTP Method : post)

router.post('/categories',auth,async (req,res)=>{  
    
    const category = new categories(req.body)

    try{
       await category.save()
       res.status(201).send(category)
    }catch(e){
       res.status(500).send(e)
    }
})

module.exports = router