const express = require("express");
const { Toy } = require("../models/Toy.model");
const { auth } = require("../middlewares/auth");
const { getToys, getToysByName,getToysByCat,editToy, deleteToy, getToyById, addToy } = require("../controllers/toy.controller");
const router = express.Router();


router.get("/", getToys);

router.get("/search", getToysByName);

router.get("/category/:catname", getToysByCat);

router.post("/", auth(), addToy);

router.patch("/:id", auth(), editToy);

router.delete("/:id", auth(), deleteToy);

router.get("/single/:id", getToyById);

module.exports = router;