const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    id: { type: String, unique: true },

    name: { type: String, require: true, },

    email: { type: String, require: true, unique: true },

    password: { type: String, require: true, },

    date_created: { type: Date, default: Date.now() },

    role: { type: String, default: "user", enum: ['user', 'admin'] }
});

userSchema.pre("save", function(next){
    this.id = String(this._id);
    next();
})
module.exports= mongoose.model('User', userSchema);