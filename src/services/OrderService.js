const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")
const EmailService = require('../services/EmailService')

const createOrder = async (newOrder) => {
  const {
    orderItems,
    paymentMethod,
    itemPrice,
    shippingPrice,
    totalPrice,
    fullName,
    address,
    city,
    phone,
    delivery,
    user,
    isPaid,
    paidAt,
    email
  } = newOrder;

  let isOutOfStock = false;
  const updatedProducts = [];

  try {
    for (const order of orderItems) {
      const productData = await Product.findOne({ _id: order.product });
      updatedProducts.push(productData); // Thêm sản phẩm vào mảng updatedProducts

      if (!productData || productData.countInStock < order.amount) {
        isOutOfStock = true;
      }
    }

    if (isOutOfStock) {
      // Nếu có sản phẩm không đủ hàng
      for (const productData of updatedProducts) {
        // Đặt lại đối tượng sản phẩm với số lượng hàng tồn kho không bị trừ
        await productData.save();
      }

      return {
        status: 'ERR',
        message: 'Không đủ hàng',
      };
    }

    for (const order of orderItems) {
      const productData = updatedProducts.find((product) => product._id.equals(order.product));

      productData.countInStock -= order.amount;
      productData.selled += order.amount;
      await productData.save();
    }

    const createdOrder = await Order.create({
      orderItems,
      shippingAddress: {
        fullName,
        address,
        city, phone
      },
      paymentMethod,
      itemPrice,
      shippingPrice,
      totalPrice,
      delivery,
      user: user,
      isPaid,
      paidAt,
    })

    if (createdOrder) {
      await EmailService.sendEmail(email, orderItems)
      return {
        status: 'OK',
        message: 'Đã tạo đơn hàng thành công',
      };
    }
  } catch (error) {
    return {
      status: 'ERR',
      message: error.message,
    };
  }
};

const getDetailOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      })
      if (order === null) {
        resolve({
          status: 'OK',
          message: 'This Order not exist'
        })
      }
      resolve({
        status: 'OK',
        message: 'Success',
        data: order
      })
    } catch (error) {
      reject(error)
    }
  })
}

const getMyDetailOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      })
      if (order === null) {
        resolve({
          status: 'OK',
          message: 'This Order not exist'
        })
      }
      resolve({
        status: 'OK',
        message: 'Success',
        data: order
      })
    } catch (error) {
      reject(error)
    }
  })
}

const deleteOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = []
      const promises = data.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
          },
          {
            $inc: {
              countInStock: +order.amount,
              selled: -order.amount
            }
          },
          { new: true }
        )
        if (productData) {
          order = await Order.findByIdAndDelete(id)
          if (order === null) {
            resolve({
              status: 'ERR',
              message: 'The order is not defined'
            })
          }
        } else {
          return {
            status: 'OK',
            message: 'ERR',
            id: order.product
          }
        }
      })
      const results = await Promise.all(promises)
      const newData = results && results[0] && results[0].id

      if (newData) {
        resolve({
          status: 'ERR',
          message: `San pham voi id: ${newData} khong ton tai`
        })
      }
      resolve({
        status: 'OK',
        message: 'success',
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getAllOrder = (id) => {
  return new Promise(async (resolve, reject) => {
      try {
          const checkOrder = await Order.findOne({
              _id:id,
          })
          const allOrder = await Order.find()
          resolve({
              status: 'OK',
              message: 'All Order is here',
              data: allOrder
          })
      } catch (error) {
          reject(error)
      }
  }) 
}

module.exports = {
  createOrder,
  getDetailOrder,
  getMyDetailOrder,
  deleteOrder,
  getAllOrder
}