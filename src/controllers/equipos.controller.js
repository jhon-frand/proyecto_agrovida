import { pool } from "../database/conection.js";

export const registrarEquipo = async(req, res) => {
    try {
        let {num_referencia, nombre, fecha_ingreso, descripcion, tipo} = req.body;
        let sql = `insert into equipos (num_referencia, nombre, fecha_ingreso, descripcion, tipo) values ('${num_referencia}', '${nombre}', '${fecha_ingreso}', '${descripcion}', '${tipo}')`;

        let [rows] = await pool.query(sql);
        if (rows.affectedRows>0) {
            return res.status(200).json({"msg":"equipo registrado con éxito"});
        } else {
            return res.status(403).json({"msg":"equipo no registrado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const actualizarEquipo =  async(req, res) => {
    try {
        let id = req.params.id;
        let {num_referencia, nombre, fecha_ingreso, descripcion, tipo, estado} = req.body;
        let sql = `UPDATE equipos SET 
                    num_referencia = ?,
                    nombre = ?,
                    fecha_ingreso = ?,
                    descripcion = ?,
                    tipo = ?,
                    estado = ?
                    WHERE id_equipo = ?`;
        let [rows] = await pool.query(sql, [num_referencia, nombre, fecha_ingreso, descripcion, tipo, estado, id]);

        if (rows.affectedRows>0) {
            return res.status(200).json({"msg":"equipo actualizado con éxito"});
        } else {
            return res.status(403).json({"msg":"equipo no actualizado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const listarEquipos = async(req, res) => {
    try {
        const [result] = await pool.query('select * from equipos');

        if (result.length>0) {
            return res.status(200).json(result);
        } else {
            return res.status(403).json({"msg":"equipos no encontrados"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const buscarEquipo = async(req, res) =>{
    try {
        let id = req.params.id;
        let sql = `SELECT * from equipos where id_equipo = ?`;
        let [rows] = await pool.query(sql, [id]);

        if (rows.length>0) {
            return res.status(200).json({"msg":"equipo encontrado: ", "equipo": rows[0]});
        } else {
            return res.status(404).json({"msg":"equipo no encontrado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const actualizarEstado = async (req, res) => {
    try {
        let id = req.params.id;
        let {estado} = req.body;
        let sql = `UPDATE equipos SET estado = ? WHERE id_equipo = ?`;
        let [rows] = await pool.query(sql, [estado, id]);

    if (rows.affectedRows>0) {
            return res.status(200).json({"msg":"estado actualizado con éxito"});
        } else {
            return res.status(403).json({"msg":"estado no actualizado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};