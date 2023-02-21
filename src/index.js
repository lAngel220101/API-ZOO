// Jalamos de node_modules express
const express = require('express');
// Express es una función, lo que hacemos es inicializarla y se crea un objeto aunque no es una clase
const app = express();

// Todo lo que enviemos y recibamos es en formato json
app.use(express.json());
// Codificacion en URL, recibiremos parametros desde la URL
// zoologico.com/api/v1/{nombre_zoo} 
app.use(express.urlencoded({extended:false})); 

// Definir rutas
app.use(require('./routes/zoo.routes'));

// Puerto 3000
app.listen(3000);
console.log("Server listening on port 3000");