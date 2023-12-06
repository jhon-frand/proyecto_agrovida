import { pool } from "../database/conection.js";
import jsonWebToken from "jsonwebtoken";

export const validarUsuario = async (req, res) => {
    try {
        let {email, contraseña} = req.body;
        let sql = `SELECT id_usuario, nombres, rol from usuarios WHERE email = '${email}' and contraseña = '${contraseña}'`;
        let [rows] = await pool.query(sql);

        if (rows.length > 0) {
            let token = jsonWebToken.sign({user:rows}, process.env.SECRET, {expiresIn:process.env.TIME});

            return res.status(200).json({"msg":"usuario autorizado", "token": token});
        } else {
            return res.status(404).json({"msg":"usuario no autorizado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const validarToken = async(req, res, next) => {
    try {
        let token_usuario = req.headers['token'];
        if (!token_usuario) {
            return res.status(402).json({"msg":"token requerido"});
        } else {
            let decode = jsonWebToken.verify(token_usuario, process.env.SECRET,(error, decoded) => {
                if(error) return res.status(402).json({
                    "msg":"Token inválido"});
                    else next();
            });
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};