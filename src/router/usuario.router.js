import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { actualizarUsuario, buscarUsuario, cambiarEstado, listarUsuarios, registrarUsuario } from "../controllers/usuarios.controller.js";

const route = Router();

route.post('/registrar', validarToken, registrarUsuario);
route.put('/actualizar/:id', validarToken, actualizarUsuario);
route.get('/listar', listarUsuarios);
route.get('/buscar/:id', buscarUsuario);
route.put('/estado/:id', validarToken, cambiarEstado);

export default route;