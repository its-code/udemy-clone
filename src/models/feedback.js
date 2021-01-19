const mongoose = require('mongoose')


const feedbackSchema = new mongoose.Schema({
  score:{
    type: Number,
    required: true,
    trim: true  
  },
  fbdiscription:{
    type: String,
    required: true,
    trim: true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  course:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Courses'
  }
},{
  timestamps: true
})

//Creating a Course Model
const Feedbacks = mongoose.model('Feedbacks',feedbackSchema)

module.exports = Feedbacks