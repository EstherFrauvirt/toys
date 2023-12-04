const { query } = require("express");
const { Toy } = require("../models/Toy.model");

exports.getToys = async (req, res, next) =>{
    const perPage=10;
    const {page}=req.query;
    const skip=(page-1)*perPage;
    console.log(req.query);

    const toys = await Toy.find().skip(skip).limit(perPage);
    res.send(toys);
};

exports.getToysByName = async (req, res, next) =>{
    const {s,page} = req.query;
    const perPage=10;
    const skip=(page-1)*perPage;
    const toys = await Toy.find({ $or: [{ name: s }, { info: s }] }).skip(skip).limit(perPage);
    console.log(toys);
    res.send(toys);
};

exports.getToysByCat = async (req, res, next) =>{
    const {catname} = req.params;
    const {page} = req.query;
    const perPage=10;
    const skip=(page-1)*perPage;
    const toys = await Toy.find({category : catname}).skip(skip).limit(perPage);
    res.send(toys);
};


exports.addToy = async (req, res, next) => {
    const body = req.body;
    const userId = res.locals.userId;
    try {
         const newToy = new Toy(body);
         newToy.user_id = userId;
         console.log(newToy.user_id);
         newToy.id = newToy._id;
         await newToy.save();
         res.status(201).send(newToy);
    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
};

exports.editToy = async (req, res, next) =>{
    const {body,params} = req;
    const {id}=params;
    try {
        const updateToy = await Toy.updateOne({id:id,user_id:res.locals.userId},body);
        console.log(updateToy);
        res.status(201).send(updateToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

exports.deleteToy = async (req, res, next) => {

    const {id}=req.params;
    try{
        const toyDeleted= await Toy.findOneAndDelete({id:id,user_id:res.locals.userId});
        if (!toyDeleted)
            throw new Error("not authorized to delete toy");

        res.send(toyDeleted);
    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }   
};

exports.getToyById = async (req, res, next) =>{
    const {id} = req.params;
    const toy = await Toy.find({id:id});
    res.send(toy);
};