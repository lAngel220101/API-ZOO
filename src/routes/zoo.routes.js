// Otra manera de escribir js   
// import {Router} from 'express';

// Traemos la libreria que nos permite crear rutas Router
// Con las llaves especifico que me traiga de Express Router y application
const {Router,application} = require('express');

const router = Router();
//Se agregan funciones desde el controlador
const {getAllZoo,getOneZoo,getZooBudget,getZooNombre,createZoo} = require('../controllers/zoo.controller'); 

//Se definen rutas o enpoints
router.get('/api/allZoo', getAllZoo);
router.get('/api/zoo/id/:id', getOneZoo);
router.get('/api/zoo/budget', getZooBudget);
router.post('/api/zoo/findByNombre', getZooNombre);
router.post('/api/zoo/createZoo', createZoo);

//Se exportan todos los modulos
module.exports = router;

// probando para ver los cambios 