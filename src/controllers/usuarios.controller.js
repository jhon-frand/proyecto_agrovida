import { pool } from "../database/conection.js";

export const registrarUsuario = async(req, res) => {
    try {
        let {identificacion, nombres, apellidos, email, telefono, contraseña, rol} = req.body;
        let sql = `insert into usuarios (identificacion, nombres, apellidos, email, telefono, contraseña, rol) values ('${identificacion}', '${nombres}', '${apellidos}', '${email}', '${telefono}', '${contraseña}', '${rol}')`;

        let [rows] = await pool.query(sql);
        if (rows.affectedRows>0) {
            return res.status(200).json({"msg":"usuario registrado con éxito"});
        } else {
            return res.status(403).json({"msg":"usuario no registrado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const actualizarUsuario =  async(req, res) => {
    try {
        let id = req.params.id;
        let {identificacion, nombres, apellidos, email, telefono, contraseña, rol} = req.body;
        let sql = `UPDATE usuarios SET 
        identificacion = ?,
        nombres = ?,
        apellidos = ?,
        email = ?,
        telefono = ?,
        contraseña = ?,
        rol = ?
        WHERE id_usuario = ?`;
        let [rows] = await pool.query(sql, [identificacion, nombres, apellidos, email, telefono, contraseña, rol, id]);

        if (rows.affectedRows>0) {
            return res.status(200).json({"msg":"usuario actualizado con éxito"});
        } else {
            return res.status(403).json({"msg":"usuario no actualizado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const listarUsuarios = async(req, res) => {
    try {
        const [result] = await pool.query('select * from usuarios');

        if (result.length>0) {
            return res.status(200).json(result);
        } else {
            return res.status(403).json({"msg":"usuarios no encontrados"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const buscarUsuario = async(req, res) =>{
    try {
        let id = req.params.id;
        let sql = `SELECT * from usuarios where id_usuario = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length>0) {
            return res.status(200).json({"msg":"usuario encontrado: ", "usuario": rows[0]});
        } else {
            return res.status(404).json({"msg":"usuario no encontrado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const cambiarEstado = async (req, res) => {
    try {
        let id = req.params.id;
        let {estado} = req.body;
        let sql = `UPDATE usuarios SET estado = ? WHERE id_usuario = ?`;
        let [rows] = await pool.query(sql, [estado, id]);

    if (rows.affectedRows>0) {
            return res.status(200).json({"msg":"estado de usuario actualizado con éxito"});
        } else {
            return res.status(403).json({"msg":"estado de usuario no actualizado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};
