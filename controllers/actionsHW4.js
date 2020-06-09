const {
  userHW4Model
} = require('../model/model')
const{ Conflict}=require('./errorController')
const{ UnAuthorized}=require('./errorController')
// require('dotenv').config({path:path.join(__dirname,'./env')})

const helperFunction = require('./helperFuncion')

////////////////////////////////////////////////////////////////////////////////
///////////////////////////ADD USER//////////////////
exports.addUserHW4 = async (req, res, next) => {
  try {
    const {
      email,
      password,
      subscription
    } = req.body


    const existUser = await userHW4Model.findOne({
      email
    })
    if (existUser) {
     await res.status(409).json({
        message: 'Email Is already in use'})
      throw new Conflict("Email Already Exist")

      

    }
    const hashPass = await helperFunction.createHashPass(password);
    const newUser = await userHW4Model.create({
      email: email,
      password: hashPass
    })
    return res.status(201).json({
      id: newUser._id,
      email: newUser.email,
      subscription: newUser.subscription

    })
  } catch (error) {
    console.log('error---------------------', error)
    res.status(403).send()

  }
}
////////////////////////////////////////////////////////////////
////////////////////LOGIN USER//////////////////////////////////
exports.loginUser = async (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  const isValidUser = await userHW4Model.findOne({
    email
  })
  if (!isValidUser) {
    res.status(401).json({
      message: "incorrect email or password"
    })
    throw new UnAuthorized("Email or password incorrect")

  }
  const isPassValid = await helperFunction.comparePass(password, isValidUser.password)

  if (!isPassValid) {
    res.status(401).json({
      message: "incorrect email or password"
    })
   throw new UnAuthorized("Email or password incorrect")
  }
  const authToken = await helperFunction.createToken(isValidUser)
  await userHW4Model.findByIdAndUpdate(isValidUser._id, {
    $set: {
      token: authToken
    }
  }, {
    new: true
  })

  await res.cookie('token', authToken, {
    httpOnly: true
  })

  return res.status(200).json({
    id: isValidUser._id,
    email: isValidUser.email,
    subscription: isValidUser.subscription,
    token: authToken

  })

}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// TOKEN VALIDATION
exports.tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.cookie.substring(6)


    try {
      await helperFunction.verifyToken(token)
    } catch (err) {
      console.log('TOk', err)
      next(err)
    }
    const user = await userHW4Model.findOne({
      token
    })

    if (!user) {
  
      res.status(404).json({
        message: "Unauthorized"
      })
     throw new UnAuthorized("Email or password incorrect")
    }

    req.user = user

    next()

  } catch (error) {
    console.log('TOKENVALIDERROR------')
    next(err)

  }


}
///////////////////////////////////////////////////////
/////////////////////
// LOGOUT USER/

exports.logOutUsers = async (req, res, next) => {
  const {
    id
  } = req.user
  if (!id) {
    res.status(404).json({
      message: "User not found"
    })
    throw new UnAuthorized("User not found")
    
  }
  const user = await userHW4Model.findByIdAndUpdate(id, {
    $set: {
      token: null
    }
  })

  res.cookie('token', null, {
    httpOnly: true
  })
  return res.status(299).send()

}


/////////////////////////////////////////////////////////////////////////// 
///////////////////////////////CURRETN USER///////////////////////////////
exports.getCurrentUser = async (req, res, next) => {
  try {
    const token = req.headers.cookie.substring(6)
    const user = await userHW4Model.findOne({
      token
    })
    return res.status(200).json({
      user
    })

  } catch (err) {
    console.log('CURRENTUSERERROR', )
    res.status(404).send()
  }

}