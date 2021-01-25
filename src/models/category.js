const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
  catrgory_name:{
    type: String,
    required: true,
    trim: true  
  }
},{
  timestamps: true
})

categorySchema.virtual('categories',{
  ref: 'Categories',
  localField: '_id',
  foreignField: 'category'
})
//Creating a Course Model
const Categories = mongoose.model('Categories',categorySchema)

module.exports = Categories