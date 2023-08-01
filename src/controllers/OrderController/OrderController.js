const OrderService = require('../../services/OrderService')

const createOrder = async (req, res) => {
    try {
        const {paymentMethod,  itemPrice, shippingPrice, totalPrice, fullName, address, city, phone, delivery } = req.body
        if ( !paymentMethod || !itemPrice ||  shippingPrice < 0 || !totalPrice || !fullName || !address || !city || !phone || !delivery) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is required'
            })
        } 
        const respond = await OrderService.createOrder(req.body)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailOrder = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'no valid user'
            })
        }
        const respond = await OrderService.getDetailOrder(userId)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getMyDetailOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if(!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'no valid order'
            })
        }
        const respond = await OrderService.getMyDetailOrder(orderId)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const data = req.body.orderItems
        const orderId = req.body.orderId
        if(!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'no valid order'
            })
        }
        const respond = await OrderService.deleteOrder(orderId, data )
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const respond = await OrderService.getAllOrder()
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


module.exports = {
    createOrder,
    getDetailOrder,
    getMyDetailOrder,
    deleteOrder,
    getAllOrder
}