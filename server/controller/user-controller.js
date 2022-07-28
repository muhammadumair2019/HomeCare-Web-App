import {postmodel,validatePost} from '../model/post.js';

import {User,validate} from '../model/user.js'

import bcrypt from 'bcrypt'
import Joi from 'Joi'
import {sendEmail} from '../utils/sendEmail.js' 
import passwordComplexity from 'joi-password-complexity'


export const getAds = async (request, response) => {
    try{
        const posts = await postmodel.find();
        response.status(200).json(posts);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const getAllFeed = async (request, response) => {
    try{
        const posts = await postmodel.find().sort({date:1});
        response.status(200).json(posts);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}


export const postAd = async (request, response) => {
    const post = request.body;
    console.log(request.body)
    
    try{
		const { error } = validatePost(request.body);
		if (error)
			return response.status(400).send({ message: error.details[0].message });

		const newPost = new postmodel(post);
        await newPost.save();
        response.status(201).json(newPost);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}


export const getAdById = async (request, response) => {
    try{
        const post = await postmodel.findById(request.params.id);
        response.status(200).json(post);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}


export const editAd = async (request, response) => {
    let post = request.body;

    
    try{
		const { error } = validatePost(request.body);
		if (error)
			return response.status(400).send({ message: error.details[0].message });

		const editAd = new postmodel(post);
        await postmodel.updateOne({_id: request.params.id}, editAd);
        response.status(201).json(editAd);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}


export const deleteAd = async (request, response) => {
    try{
        await postmodel.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

export const getContactbyId = async (request, response) => {
    try{
        const post = await postmodel.findById(request.params.id);

        response.status(200).json(post.phone);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

//signup
export const users = async (req, res) => {

	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
        
		const userauth = await User.findOne({ email: req.body.email });
        const token = userauth.generateAuthToken();

		return res.status(200).send({data: token ,    message: "logged in successfully",user:userauth });

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};



export const auth = async (req, res) => {
	try {
        
        
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });
        
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
        
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();

        
       
		res.status(200).send({data: token ,    message: "logged in successfully",user:user });
        console.log("Data: " , token)
        console.log("Data: " , user)
        
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

export const sendPasswordLink = async (req, res) => {
	try {
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label("Email"),
		});
		const { error } = emailSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.send({ message: "User with given email does not exist!" });

		const url = `http://localhost:3000/password-reset/${user._id}/`;
		await sendEmail(user.email, "Password Reset", url);

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

export const verifyPasswordResetLink = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

export const setNewPassword = async (req, res) => {
	try {
		const passwordSchema = Joi.object({
			password: passwordComplexity().required().label("Password"),
		});
		const { error } = passwordSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		if (!user.verified) user.verified = true;

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user.password = hashPassword;
		await user.save();

		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

export const editUser = async (request, response) => {
    let user = request.body;
	console.log(request.params.id)
	
    
	
    
    try{
		// const { error } = validatePost(request.body);
		// if (error)
		// 	return response.status(400).send({ message: error.details[0].message });

		// const edituser = User(user);
        await User.findByIdAndUpdate({'_id': request.params.id}, user);
        // // response.status(201).json(edituser);
		const userr = await User.findOne({ email: request.body.email });

		

		response.status(200).send({message: "updated successfully",user:userr });

    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

export const adminauth = async (req, res) => {
	try {
        
        
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });
        
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
        
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if (user.isAdmin != req.body.isAdmin)
			return res.status(401).send({ message: "Not Authorized" });
		// const token = user.generateAuthToken();

        
       
		res.status(200).send({message: "logged in successfully"});
        // console.log("Data: " , token)
        // console.log("Data: " , user)
        
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

export const getAdminAds = async (request, response) => {
    try{
        const posts = await postmodel.find();
        response.status(200).json(posts);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const deleteAdminAd = async (request, response) => {
    try{
        await postmodel.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}


export const AdminAddUsers = async (req, res) => {

	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
        

		return res.status(200).send({ message: "logged in successfully" });

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

export const getusers = async (request, response) => {
    try{
		console.log('hey')
        const users = await User.find()
		console.log(users);
        response.status(200).json(users);
		
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

