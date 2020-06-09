const mongoose = require('mongoose')
const {
  Schema
} = require('mongoose')




const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  }

})

UserModel = mongoose.model(
  'Contacts', userSchema)


const userHW4Schema = new Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free"
  },
  token: String
})
// async function findByEmail(email) {
//   return await findOne({
//     email
//   })


// }
userHW4Model = mongoose.model("User", userHW4Schema)
// console.log('findByemail', findByEmail)
// userHW4Schema.statics.findByEmail=findByEmail






module.exports = {
  UserModel,
  userHW4Model
}