const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { app } = require("./app");


dotenv.config();
const mongoURL = process.env.MONGO_URL;
console.log(mongoURL);

const connectToDB = () => {
    mongoose.connect(mongoURL)
        .then((con) => {
            console.log(`connected to database: ${mongoURL}`);
        }).catch((error) => {
            console.error("Error to connect to database");
            console.error(error);
        });
};
connectToDB();

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`the server is running on port: ${PORT}`);
});
