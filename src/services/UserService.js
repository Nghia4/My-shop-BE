const User = require("../models/UserModel")
var bcrypt = require('bcryptjs')
const { generalAccessToken, generalRefreshToken } = require("./Jwtservice")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            // check email alreay exist?
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null) {
                resolve({
                    status:'ERR',
                    message:'the email already exist'
                })
            }
            // hash password
            const hash = bcrypt.hashSync(password, 10)
            // create newUser
            const createdUser = await User.create({
                email,
                password:hash,
                confirmPassword:hash
            })
            if(createdUser){
            resolve({
                status:'OK',
                message: 'account created',
                data: createdUser
            })
            }
        } catch (error) {
            reject(error)
        }
    }) 
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin
        try {
            // check email user if have in database
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null) {
                resolve({
                    status:'ERR',
                    message:'the user or password is not defined'
                })
            }
            // check password with hash
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if(!comparePassword) {
                resolve({
                    status:'ERR',
                    message:'the user or password is not defined'
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await generalRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status:'OK',
                message: 'login successful',
                access_token,
                refresh_token
            })
            
        } catch (error) {
            reject(error)
        }
    }) 
}

const updateUser = (id ,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id:id,
            })
            if(checkUser === null){
                resolve({
                    status:'OK',
                    message:'User not exist'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id,data, {new: true})
            resolve({
                status:'OK',
                message: 'change successful',
                data: updateUser
            })
            
        } catch (error) {
            reject(error)
        }
    }) 
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id:id,
            })
            if(checkUser === null){
                resolve({
                    status:'OK',
                    message:'User not exist'
                })
            }
            const deleteUser = await User.findByIdAndDelete(id)
            resolve({
                status:'OK',
                message: 'Delete Account Successfully'
            })
            
        } catch (error) {
            reject(error)
        }
    }) 
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({_id: ids})
            resolve({
                status:'OK',
                message: 'Delete Product Successfully'
            })
            
        } catch (error) {
            reject(error)
        }
    }) 
}

const getAllUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id:id,
            })
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'All User is here',
                data: allUser
            })
        } catch (error) {
            reject(error)
        }
    }) 
}

const getUserDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id:id,
            })
            if(checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'This User not exist'
                })
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: checkUser
            })
        } catch (error) {
            reject(error)
        }
    }) 
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserDetail,
    deleteManyUser
}