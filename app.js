const express = require(`express`);
const bodyParser = require (`body-parser`);
const cors =require (`cors`);

const jwt = require(`jsonwebtoken`);
 const bcrypt = require (`bcryptjs`);
 const mongoose = require (`mongoose`);
 const dotenv = require (`dotenv`);

 dotenv.config({path:`./config.env`});

 //Rutas aqui
 const userRoutes = require (`./routes/userRoutes`);



 const app = express(); // app es una instancia de express
 app.use(cors()); // permitir peticiones de otros dominios

 app.use(express.json({limit:`50mb`}));
app.use(express.static(`${__dirname}/public`));

app.set(`jwtkey`,`Raton%020400%`); //Clave secreta para firmar tokens
 

const port = 3001;

app.use('/api/users',userRoutes);

 //conectar a la base de datos
 const DB = process.env.DATABASE;

 mongoose.connect(DB,{

 }).then (connection=>{
     console.log("Conectado a la base")
 });
   




app.listen(port,()=>{
console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.get(`/api/fraccionamientoLomas`,(req, res)=>{
    res.send("Welcome Lomas");
});

app.post(`/api/Nombre`, (req, res)=>{
    let cuerpoRequest = req.body;
    let Nombre1 = req.body.Nombre1;
    let respuesta = "Bienvenido:" + Nombre1
    res.send(respuesta);
});
