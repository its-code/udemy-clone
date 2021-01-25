const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim: true  
  },
  category:{
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'Categories'
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
  },
  enroll: {
    type: Boolean,
    trim: true,
    required: true
  },
  avatar:{
    type: Buffer
  }
},{
  timestamps: true
})

courseSchema.virtual('feedbacks',{
  ref: 'Feedbacks',
  localField: '_id',
  foreignField: 'course'
})



//Creating a Course Model
const Courses = mongoose.model('Courses',courseSchema)

module.exports = Courses