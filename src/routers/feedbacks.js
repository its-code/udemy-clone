const express =  require("express")
const router = express.Router()
const feedbacks = require("../models/feedback")
const auth = require("../middleware/auth")

// Routers for feedbacks (HTTP Method : get,post,patch and delete)

router.post('/feedbacks',auth,async (req,res)=>{  
    const feedback = new feedbacks({
        ...req.body,
        owner: req.user._id
    })

    try{
       await feedback.save()
       res.status(201).send(feedback)
    }catch(e){
       res.status(500).send(e)
    }
})


// get feedbacks?score >= 8 etc

router.get('/feedbacks',auth,async (req,res)=>{

    const match = {}
    const sort = []

    if(req.query.score){
        match.score = req.query.score >= 8
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1
    }

    try{
        await req.user.populate({
            path: 'feedbacks',
            match,
            option: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

        res.send(req.user.feedbacks)
        }catch(e){
            res.status(400).send(e)
        }
})

router.get('/feedback/:id',auth,async (req,res)=>{
    
    const _id = req.params.id


    try{
        // const feedbackID= await feedbacks.findById(_id)
        const feedbackID = await feedbacks.findOne({ _id , 'owner': req.user._id, 'course': req.course._id})      
        console.log(feedbackID)    
        if(!feedbackID){
          return res.status(404).send()
        }
        res.send(feedbackID)
  
      }catch(e){
          res.status(400).send(e)
      }
})

router.patch('/feedbacks/:id',auth,async (req,res)=>{
    
    const updates = Object.keys(req.body) 
    const propertiesFeedback = ['score','discription']
    const isValid = updates.every( update => propertiesFeedback.includes(update))

    if(!isValid)
        return res.status(400).send()

    try{

      const feedbackUp = await feedbacks.findOne({_id: req.params.id, owner: req.user._id})  
    //   const feedbackUp = await feedbacks.findByIdAndUpdate(req.params.id, req.body , { new:true, runValidators: true})
      if(!feedbackUp){
         return res.status(404).send()
      }
      updates.forEach( update => feedbackUp[update] = req.body[update] )

      await feedbackUp.save()
      res.send(feedbackUp)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/feedbacks/:id',auth, async (req,res)=>{
    try{
        const delFeedback = await feedbacks.findOneAndDelete({ _id:req.params.id, owner: req.user._id })
        if(!delFeedback){
            return res.status(404).send()
        } 
        res.send(delFeedback)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router