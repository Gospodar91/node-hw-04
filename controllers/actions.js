const {
  userModel
} = require('../model/model')
const {
  userHW4Model
} = require('../model/model')

// const jwt = require('jsonwebtoken')
// const JWT_SECRET = 'adasfdsaf'


// require('dotenv').config({path:path.join(__dirname,'./env')})
// const bcryptjs = require('bcrypt')


exports.listContacts = async (req, res) => {
  try {
    const data = await userModel.find()

    return res.status(200).json(data);
  } catch (err) {
    console.log('err----------------------------------------------------------------------------------', err)
    res.send(error);
  }

}
exports.addContact = async (req, res, next) => {

  try {
    const data = await userModel.create(req.body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.findContact = async (req, res) => {
  try {
    console.log('req.params', req.params.contactId)
    const id = req.params.contactId
    const data = await userModel.findOne({
      _id: id
    })
    return res.status(200).json(data)
  } catch (err) {
    res.send(error);
  }

}
exports.deleteContact = async (req, res) => {
  const id = req.params.contactId
  if (id) {
    try {
      const data = await userModel.findByIdAndDelete({
        _id: id
      })
      return res.status(200).json(data)
    } catch (err) {
      res.send(error);
    }
  }

}
exports.updateContact = async (req, res, ) => {
  const id = req.params.contactId
  const newData = req.body
  if (id) {
    try {
      const data = await userModel.findOneAndUpdate({
        _id: id
      }, {
        $set: newData
      }, {
        new: true
      })
      return res.status(200).json(data)
    } catch (err) {
      res.send(error);
    }
  }
}
