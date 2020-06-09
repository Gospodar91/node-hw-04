const bcryptjs = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')


require('dotenv').config({
    path: path.join(__dirname, '../env')
})

exports.createHashPass = async (password) => {
    const
        BCRYPT_SALT = +process.env.BCRYPT_SALT

    return await bcryptjs.hash(password, BCRYPT_SALT);


}
exports.comparePass = async (password, hashPass) => {
    return await bcryptjs.compare(password, hashPass)
}
exports.createToken = async (user) => {
    console.log('process.env', process.env.JWT_SECRET)
    const payload = {
        uid: user._id
    };
    const {
        JWT_SECRET
    } = process.env;
    const {
        JWT_EXPRESSIN
    } = process.env;

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPRESSIN
    })
}
//////
exports.verifyToken = async (token) => {
    const {JWT_SECRET}=process.env

    return jwt.verify(token, JWT_SECRET)

}