import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes'

/*const express = require('express');
const morgan = require('morgan');
const cors = require('cors');*/

//TODO:Conexion a la Base de Datos
//TODO:Nombre de la base de datos: storetsbd
mongoose.Promise=global.Promise;
const dbUrl = 'mongodb://localhost:27017/storetsbd'
mongoose.connect(dbUrl, {useCreateIndex: true, useNewUrlParser: true})
.then(mongoose => console.log('Conexion de la Base de Datos Establecida '))
.catch(err => console.log(err));

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join (__dirname,'public')))


app.use('/api', router);
app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), () =>{
    console.log('Servidor en el puerto: ' + app.get('port'));
    //console.log(path.join (__dirname,'public'));
})