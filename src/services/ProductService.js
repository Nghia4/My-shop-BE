const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount } = newProduct
        try {
            // check if product already have !
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The Product already exist'
                })
            }
            // create newProduct
            const createdProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description,
                discount
            })
            if (createdProduct) {
                resolve({
                    status: 'OK',
                    message: 'Product created',
                    data: createdProduct
                })

            }
        } catch (error) {
            reject(error)
        }
    }
    )
}

const updateProduct = (id ,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id:id,
            })
            if(checkProduct === null){
                resolve({
                    status:'OK',
                    message:'User not exist'
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(id,data, {new: true})
            resolve({
                status:'OK',
                message: 'change successful',
                data: updateProduct
            })
            
        } catch (error) {
            reject(error)
        }
    }) 
}

const getProductDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id:id,
            })
            if(checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'This Product not exist'
                })
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: checkProduct
            })
        } catch (error) {
            reject(error)
        }
    }) 
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id:id,
            })
            if(checkProduct === null){
                resolve({
                    status:'OK',
                    message:'Product not exist'
                })
            }
            const deleteProduct = await Product.findByIdAndDelete(id)
            resolve({
                status:'OK',
                message: 'Delete Product Successfully'
            })
            
        } catch (error) {
            reject(error)
        }
    }) 
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({_id: ids})
            resolve({
                status:'OK',
                message: 'Delete Product Successfully'
            })
            
        } catch (error) {
            reject(error)
        }
    }) 
}

const getAllProducts = (limit, page, sort, filter ) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            let allProduct = []
            if(filter) {
                const label = filter[0]
                const allProductFilter = await Product.find({ [label] :{ '$regex' : filter[1] } }).limit(limit).skip(limit * page)
                resolve({
                    status: 'OK',
                    message: 'All Product is here',
                    data: allProductFilter,
                    total: totalProduct,
                    currentPage: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if(sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
            const allProductSort = await Product.find().limit(limit).skip(limit * page).sort(objectSort)
            resolve({
                status: 'OK',
                message: 'All Product is here',
                data: allProductSort,
                total: totalProduct,
                currentPage: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
            }

            if(!limit) {
                allProduct = await Product.find().sort({createdAt: -1, updatedAt: -1})
            }else {
                allProduct = await Product.find().limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
            }
            resolve({
                status: 'OK',
                message: 'All Product is here',
                data: allProduct,
                total: totalProduct,
                currentPage: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (error) {
            reject(error)
        }
    }) 
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {   
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (error) {
            reject(error)
        }
    }) 
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