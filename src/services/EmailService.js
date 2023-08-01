const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config()


const sendEmail = async (email, orderItems) => {
   const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.MAIL_ACCOUNT,
          pass: process.env.MAIL_PASSWORD
        }
      });
      let imageAttachments = []
      let listItem = ''
      orderItems.forEach((order) => {
        listItem += `<div>Bạn đã đặt <b> ${order.name}</b> với số lượng <b> ${order.amount} </b>với giá cho một sản phẩm là <b>${order.price-(order.price*(order.discount / 100))} VND</b><b>(Đã bao gồm ưu đãi giảm giá)</b></div>
        <div>Bên dưới là hình các sản phẩm bạn đã đặt</div>`
        imageAttachments.push({path:order.image})
      })
      
      // async..await is not allowed in global scope, must use a wrapper
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: process.env.MAIL_ACCOUNT, // sender address
          to: email, // list of receivers
          subject: "Cảm ơn bạn đã đặt hàng tại shop", // Subject line
          text: "Hello world?", // plain text body
          html: `<b>Bạn đã đặt hàng thành công tại shop</b>${listItem}`,
          attachments: imageAttachments // html body
        });
}

module.exports = {
    sendEmail
}