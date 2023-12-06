import { Router } from "express";
import { actualizarEquipo, actualizarEstado, buscarEquipo, listarEquipos, registrarEquipo } from "../controllers/equipos.controller.js";
import { validarToken } from "../controllers/validator.controller.js";

const route = Router();

route.post('/registrar', validarToken, registrarEquipo);
route.put('/actualizar/:id', validarToken, actualizarEquipo);
route.get('/listar', listarEquipos);
route.get('/buscar/:id', buscarEquipo);
route.put('/estado/:id', validarToken, actualizarEstado);

export default route;