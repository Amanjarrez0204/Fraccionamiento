const mongoose = require(`mongoose`);

const userTony = new mongoose.Tony({

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
        required:[true, `El rol es obligatorio`],
    }

});
module.exports = mongoose.model(`User`, userTony);