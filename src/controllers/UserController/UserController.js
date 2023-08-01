const UserService = require('../../services/UserService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the email is required'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the confirPassword the same as password'
            })
        }
        const respond = await UserService.createUser(req.body)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const isCheckEmail = reg.test(email)
        if (!email || !password ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the email is required'
            })
        // } else if (password !== confirmPassword) {
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'the confirPassword the same as password'
        //     })
        }
        const respond = await UserService.loginUser(req.body)
        const { refresh_token, ...newRefresh } = respond
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict',
            path: '/',
        })
        return res.status(200).json({ ...newRefresh, refresh_token})  
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    const data = req.body
    try {
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ERROR'
            })
        }
        const respond = await UserService.updateUser(userId, data)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id
    try {
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ERROR'
            })
        }
        const respond = await UserService.deleteUser(userId)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteManyUser = async (req, res) => {
    const ids = req.body.ids
    try {
        if(!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ERROR'
            })
        }
        const respond = await UserService.deleteManyUser(ids)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const respond = await UserService.getAllUsers()
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getUserDetail = async (req, res) => {
    try {
        const userId = req.params.id
        const respond = await UserService.getUserDetail(userId)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status:'OK',
            message: 'Logout successful'
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserDetail,
    logoutUser,
    deleteManyUser
}