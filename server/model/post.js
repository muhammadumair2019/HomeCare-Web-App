import mongoose from 'mongoose';
import Joi from 'joi'

const AdSchema = mongoose.Schema({
    name: {type: String},
    title: {type: String , required:true},
    description: {type: String , required:true},
    phone: {type: Number , required:true},
    price: {type: Number , required:true},
    date: {
        type: Date,
        default: Date.now
    },
    userid: {
        type: String,
        required: true
    }
});

export const postmodel = mongoose.model('post', AdSchema);

export const validatePost = (data) => {
	const schema = Joi.object({
		title: Joi.string().required().label("Title"),
		description: Joi.string().required().label("Description"),
		phone: Joi.number().required().label("Phone"),
		price: Joi.number().required().label("Price"),
	}).unknown();
	return schema.validate(data);
};
