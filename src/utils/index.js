const Jwtservice = require('../services/Jwtservice')

const refreshToken = async (req, res) => {
    try {
        // const token = req.cookies.refresh_token // dùng cookie cho localhost
        let token = req.headers.token?.split(' ')[1] //dùng trên render.com
        if(!token) {
            return res.status(200).json({
                status:'ERR',
                message:'The token is required'
            })
        }
        const respond = await Jwtservice.refreshTokenService(token)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    refreshToken
}