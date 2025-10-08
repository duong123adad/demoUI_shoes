const mongoose = require('mongoose');

const ShoeSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: [true, 'Tên sản phẩm là bắt buộc.'],
        trim: true,
        maxlength: 100
    },

    size: {
        type: String,
        required: false, 
        trim: true,
        default: 'N/A'
    },

    price: {
        type: Number,
        required: [true, 'Giá sản phẩm là bắt buộc.'],
        min: [0, 'Giá không được âm.'],
    },

    image: {
        type: String,
        required: false,
        trim: true
    },

    productCode: {
        type: String,
        required: [true, 'Mã sản phẩm là bắt buộc.'],
        unique: true, // Đảm bảo không có 2 sản phẩm có cùng mã
        trim: true,
        maxlength: 50
    },

    quantity: {
        type: Number,
        required: [true, 'Số lượng là bắt buộc.'],
        min: [0, 'Số lượng không được âm.'],
        default: 0
    },

    description: {
        type: String,
        required: false,
        maxlength: 1000
    },
    
}, {
  
    timestamps: true
});

const Shoe = mongoose.model('Shoe', ShoeSchema);

module.exports = Shoe;