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
            //path of the image aka name
            type: String,
            required: [true, 'You did not upload an image']
        },
        published:{
            type: String,
            default:'false',
            validate: (value) => {
                return validator.isBoolean(value)
            }
        },
        typeTable: {
            type: String,
            required: [true, 'Type of the product is required'],
            enum: ['Photo']
        },
    }
)

// Pagintaion plugin using mongoose, to be used in product controller
ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', ProductSchema);



export default Product;