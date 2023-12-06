import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { historialMantenimientos, historialMantenimientosCorrectivos, historialMantenimientosPreventivos, listarMantenimientosCorrectivos, listarMantenimientosPreventivos, registrarMantenimientoCorrectivo, registrarMantenimientoPreventivo } from "../controllers/mantenimientos.controller.js";

const route = Router();

route.post('/registrarpreventivo', validarToken, registrarMantenimientoPreventivo);
route.post('/registrarcorrectivo', validarToken, registrarMantenimientoCorrectivo);
route.get('/listarpreventivos', listarMantenimientosPreventivos);
route.get('/listarcorrectivos', listarMantenimientosCorrectivos);
route.get('/historialpreventivos/:id', historialMantenimientosPreventivos);
route.get('/historialcorrectivos/:id', historialMantenimientosCorrectivos);
route.get('/historialmantenimientos/:id', historialMantenimientos);

export default route;