const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim: true  
  },
  discription:{
    type: String,
    required: true,
    trim: true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  }
},{
  timestamps: true
})

//Creating a Course Model
const Courses = mongoose.model('Courses',courseSchema)

module.exports = Courses