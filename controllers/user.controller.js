const  User  = require('../models/User.model');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

const userJoiSchema = {
    login: Joi.object().keys({
        password: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid')),
    }),
    register: Joi.object().keys({
        password: Joi.string().max(20).required(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid')).required(),
        name: Joi.string().required(),
    })
};

module.exports.register = async (req, res, next) => {
    const body = req.body;
try{
const validateBody = userJoiSchema.register.validate(body);
console.log(validateBody);
    if (validateBody.error){
        return res.status(400).json(validateBody.error.details); 
    }
        

    if (!checkIfUserExists(body.email))
        return res.status(400).json("user with this email already exists");

    const hash = await bcrypt.hash(body.password, 12);
    body.password = hash;

    
        // add to database
    const newUser = new User(body);
        //* somethings to do
    await newUser.save();

        //* generate token
        
        //* response to the client
        return res.status(201).send({name:newUser.name,email:newUser.email});    
}
    
     catch (error) {
        next(error);
    }







}
module.exports.login = async (req, res, next) => {

    const body = req.body;
    try {
        //Todo: validate body
        const validate = userJoiSchema.login.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }

        //check is user exists
        const user = await checkIfUserExists(body.email);
        // if exsits check if password match
        if (!user || ! await bcrypt.compare(body.password, user.password)) {
            throw new Error('Password or email not valid');
        }
        //* generate jwt token
        const token = generateToken(user);
        return res.send({ name:user.name, token:token });
        // send the user object to the client
    } catch (error) {
        next(error);
    }
}
const checkIfUserExists = async (email) => {
    const user = await User.findOne({ email });
    if (user) return user;
    return false;
}