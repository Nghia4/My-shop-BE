const ProductService = require('../../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description, discount } = req.body
        if (!name || !image || !type || !price || !countInStock || !rating ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is required'
            })
        } 
        const respond = await ProductService.createProduct(req.body)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id
    const data = req.body
    try {
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ERROR'
            })
        }
        const respond = await ProductService.updateProduct(productId, data)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getProductDetail = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId) {
            return res.status(200).json({
                status:'ERROR',
                message:'the ProductId required'
            })
        }
        const respond = await ProductService.getProductDetail(productId)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ERROR'
            })
        }
        const respond = await ProductService.deleteProduct(productId)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteManyProduct = async (req, res) => {
    const ids = req.body.ids
    try {
        if(!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Need atleast 1 product to be selected'
            })
        }
        const respond = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const respond = await ProductService.getAllProducts(limit, Number(page) || 0, sort, filter )
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const respond = await ProductService.getAllType()
        return res.status(200).json(respond)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getProductDetail,
    deleteProduct,
    getAllProducts,
    deleteManyProduct,
    getAllType
}