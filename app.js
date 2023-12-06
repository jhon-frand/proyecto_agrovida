import express from "express";
import bodyParser from "body-parser"
import { pool } from "./src/database/conection.js";
import equipo from './src/router/equipos.router.js';
import validator from './src/router/validator.router.js';
import preventivo from './src/router/mantenimientos.router.js';
import usuarios from './src/router/usuario.router.js';

const servidor = express();

//configuración
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: true }));

//rutas
servidor.use('/usuario', usuarios);
servidor.use('/equipo', equipo);
servidor.use('/validator', validator);
servidor.use('/mantenimiento', preventivo);

//conexión a la base de datos
(async () => {
    try {
        await pool.query("SELECT 1");
        console.log("conexión establecida");
    } catch (error) {
        console.error("error de conexión: ", error);
    }
})();

//conexión al servidor
servidor.listen(3000, () => {
    console.log('servidor escuhando en el puerto 3000');
})


