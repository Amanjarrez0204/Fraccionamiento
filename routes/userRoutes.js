const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {default:mongoose} = require('mongoose');


const createUser = async(req,res)=>{
    let cuerpoRequest = req.body;
      const _user = await User.exists({username:cuerpoRequest.username});
     if(_user){
         return res.status(400).json({
             message:'El usuario ya existe',
         });
     }else{
        bcrypt.hash(cuerpoRequest.password,10, async(err,hash)=>{
            const user = new User({
                username:cuerpoRequest.username,
                password:hash,
                role:cuerpoRequest.role
            });

            user.save().then(createdUser=>{
                console.log(createdUser._id);
                if(createdUser){
                    res.status(201).json({
                        msg:"Usuario creado",
                        userID:createdUser._id
                    });
                }else{
                    res.status(500).json({
                        msg:"Error al crear usuario"
                    });
                }
            })
        })
    }


};

const autentificar = async ( req, res)=>{
    let cuerpoRequest = req.body;
    User.findOne({ "username":cuerpoRequest.username});

    const _user = await User.findOne({username:cuerpoRequest.username});
     if(_user){
        console.log("Usuario encontrado");
         let passwordGuardado = _user.password;
         bcrypt.compare(cuerpoRequest.password, passwordGuardado,(err, result)=>{
            if(result ===false){
                return res.status(401).json({
                    msg:"Contraseña incorrecta"
                });
            }else{
                console.log("Contraseña correcta")
                const payload = {
                    user:_user
                };

                const token =jwt.sign(payload,`Raton%020400%`,{ expiresIn: `10`})
                res.status(200).json({
                    msg:"Usuarios autentificado",
                    username:_user.username,
                    roles:_user.role,
                    token:token
                });

         }
         })
       
     }else{
        console.log("Usuario no encontrado");
        res.status(404).json({
            msg:"Usuario no encontrado"
        });
     }

};

const getAll = async (req, res)=>{
const usuarios= await    User.find({});
res.status(200).json({
    usuarios:usuarios
})
};
  
const getUser = async (req, res)=>{
    console. log(req.params);
  const _id = req.params.id;
    const usuarioEncontrado =  await User.find({ id :_id},{username:1, role:1});
    if(usuarioEncontrado){
        res.status(200).json({
    usuario:usuarioEncontrado
        }); 
  };
};


const updateUser = async  (req, res)=>{
    let cuerpoRequest = req.body;

    return User.UpdeteOne (
        {_id:req.params.id},
        {  $set:{
            username:cuerpoRequest.username,
            role:cuerpoRequest.role
        } }
    ).then(result=>{
        res.status(200).json({
            msg:"Usuario Actualizado"
        });
    })
};

const delateUser = async (req,res)=>{
    console.log(req.params);
    const id = req.params.id;

    const usuarioEliminado = await User.deleteOne({_id:id},{username:1, password:1, role:1});
    if(usuarioEliminado){
        res.status(200).json({
            usuarioEliminado:usuarioEliminado
        });
    }
};









const router = express.Router();
//endpoints
router.route('/').post(createUser)
                .get(getAll)
                ;

router.route(`/autentificar`).post(autentificar)
router.route(`/:id`)
                    .get(getUser)
                    .patch(updateUser)
                    .delete(delateUser);
module.exports = router;