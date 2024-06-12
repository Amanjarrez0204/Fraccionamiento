const express = require(`express`);
const User = require(`../models/user`);
const bcrypt = require (`bcryptjs`);

const {default :mongoose} = require (`mongoose`);

const createUser = async(req, res)=>{
    let cuerpoRequest =req.body;

    User.exists({username:cuerpoRequest.username},(err,doc)=>{
        if (err){
            console.log(err);
        }else{
            console.log(doc);
            if(doc===null){
                bcrypt.hash(cuerpoRequest.password,10, async (err, hash)=>{
                    const newuser = new User({
                        username:cuerpoRequest.username,
                        password:hash,
                        role:cuerpoRequest.role

                    });
                })
            }
        }
    }

    )
};