import mongoose from 'mongoose'
import validator from 'validator'
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema(
    {
        updated: { type: Date, default: Date.now() },
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        description:{
            type: String,
        },
        image:{
            type: String,
        },
        published:{
            type: String,
            default:'false',
            validate: (value) => {
                return validator.isBoolean(value)
            }
        },
        typeTable: {
            type: [mongoose.Schema.Types.ObjectId]
        },
    }
)

// Pagintaion plugin using mongoose, to be used in product controller
ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', ProductSchema);



export default Product;