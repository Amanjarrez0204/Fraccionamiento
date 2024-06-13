const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,`El nombre de usuario es obligatorio`],
    },
    password:{
        type:String,
        required:[true, `La contraseña es obligatoria`],
    },
    role:{
        type:String,
        required:[true, `El roll es obligatorio`],
    }

});
module.exports = mongoose.model(`User`, userSchema);