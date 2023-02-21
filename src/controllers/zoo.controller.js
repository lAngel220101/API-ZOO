// los datos de mi conexion a  la bd se colocan aqui ya que no lo exportamos, y de esta manera cualquiera que acceda mediante postamn, insomnia, fronted mediante un fetch no pueda acceder a mi bd
// Traemos conexion de piscina de pg
const {Pool} = require('pg');

// Cuando vemos un new significa que estamos creando un objeto
// const pool2 = new Pool();
const pool_zoo = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'abc123',
    database: 'zoo_sql',
    port: 5432
});

const getAllZoo = async (req,res) => {

    const response = await pool_zoo.query('SELECT * FROM zoos');
    // console.log(response.rows[2].zoo_name);
    res.status(300).json(response.rows);
};

const getOneZoo = async (req,res) => {

    const {id} = req.params;
    let response;
    try {
        response = await pool_zoo.query('SELECT * FROM zoos WHERE id_zoo = $1',[id]);
    } catch(e) {
        res.status(500).json({
            "error": e.message
        })
        return;
    }
    
    if(response.rows.length == 0){
        res.status(404).json({
            "error:":"Tu registro no es encuentra en la base"
        })
        return;
    }
    res.status(200).json(response.rows);
};

const getZooBudget = async (req,res) => {
    let response;

    try {
        response = await pool_zoo.query('SELECT * FROM zoos ORDER BY budget DESC');
    } catch (e){
        res.status(500).json({
            "error": e.message
        })
        return;
    }
    res.status(200).json(response.rows);
}

const getZooNombre = async (req,res) => {
    const {nombre} = req.body;
    let response;
    let sentencia_like = "%"+nombre.toLowerCase()+"%";

    try {
        response = await pool_zoo.query('SELECT * FROM zoos WHERE LOWER(zoo_name) LIKE $1',[sentencia_like]);
    } catch (e){
        res.status(500).json({
            "error": e.message
        })
        return;
    }

    if(response.rows.length == 0){
        res.status(404).json({
            "error":"Tu registro no se encuentra en la base"
        })
        return;
    }

    res.status(200).json(response.rows);
}

const createZoo = async (req,res) =>{
    const {zoo_name,city_id,zoo_size,budget} = req.body;
    let response;
    try{
        response = await pool_zoo.query('INSERT INTO zoos(zoo_name,city_id,zoo_size,budget) VALUES($1,$2,$3,$4)',[zoo_name,city_id,zoo_size,budget]);
    }catch(e){
        res.status(500).json({
            "error": e.message
        })
        return;
    }

    res.status(200).json(response.rows);
}

module.exports = {
    getAllZoo,
    getOneZoo,
    getZooBudget,
    getZooNombre,
    createZoo
}