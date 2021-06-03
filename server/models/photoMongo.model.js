import mongoose from 'mongoose'
import validator from 'validator'

//uses virtual foreign/primary key  relationship based on the ObjectId('<id>')
// https://dbschema.com/2020/06/23/mongodb-virtual-foreign-keys/
const PhotoSchema = new mongoose.Schema(
    {
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            index: true
        },
        sizes: {
            type: [String],
        },
        prices: {
            type: [String],
        },
        images: {
            type: [String],
            index: true
        },
    }
)

const Photo = mongoose.model('Photo', PhotoSchema);


export default Photo;