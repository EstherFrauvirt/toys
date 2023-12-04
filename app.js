const express = require("express");
const app = express();
const userRoute=require('./routes/user.routes');
const toyRoute=require('./routes/toy.routes');
app.use(express.json());


app.get("/test", (req, res) => {
    res.json({ msg: "works properly" });
});
app.use('/api/v1/users',userRoute);
app.use('/api/v1/toys',toyRoute);
/* Global error handler */
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(400).send({ msg: error.message });
});


module.exports.app = app;