import { pool } from "../database/conection.js";

export const registrarMantenimientoPreventivo = async(req, res) => {
    try {
        let {tipo_mantenimiento, fecha_mantenimiento, descripcion, fk_user_responsable, fk_equipo, resultado} = req.body;
        let sql = `insert into mantenimientos (tipo_mantenimiento, fecha_mantenimiento, descripcion, fk_user_responsable, fk_equipo, resultado) values ('${tipo_mantenimiento}', '${fecha_mantenimiento}', '${descripcion}', '${fk_user_responsable}', '${fk_equipo}', '${resultado}')`;

        let [rows] = await pool.query(sql);
        if (rows.affectedRows>0) {
            return res.status(200).json({"msg":"matenimiento preventivo registrado con éxito"});
        } else {
            return res.status(403).json({"msg":"mantenimiento preventivo no registrado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const listarMantenimientosPreventivos = async(req, res) => {
    try {
        const [result] = await pool.query('select * from mantenimientos WHERE tipo_mantenimiento = "preventivo"');

        if (result.length>0) {
            return res.status(200).json(result);
        } else {
            return res.status(403).json({"msg":"mantenimientos no encontrados"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const registrarMantenimientoCorrectivo = async(req, res) => {
    try {
        let {tipo_mantenimiento, fecha_mantenimiento, descripcion, nombre_tecnico, telefono_tecnico, fk_user_responsable, fk_equipo, resultado} = req.body;
        let sql = `insert into mantenimientos (tipo_mantenimiento, fecha_mantenimiento, descripcion, nombre_tecnico, telefono_tecnico, fk_user_responsable, fk_equipo, resultado) values ('${tipo_mantenimiento}', '${fecha_mantenimiento}', '${descripcion}', '${nombre_tecnico}', '${telefono_tecnico}', '${fk_user_responsable}', '${fk_equipo}', '${resultado}')`;

        let [rows] = await pool.query(sql);
        if (rows.affectedRows>0) {
            return res.status(200).json({"msg":"matenimiento correctivo registrado con éxito"});
        } else {
            return res.status(403).json({"msg":"mantenimiento correctivo no registrado"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const listarMantenimientosCorrectivos = async(req, res) => {
    try {
        const [result] = await pool.query('select * from mantenimientos WHERE tipo_mantenimiento = "correctivo"');

        if (result.length>0) {
            return res.status(200).json(result);
        } else {
            return res.status(403).json({"msg":"mantenimientos no encontrados"});
        }
    } catch (e) {
        return res.status(500).json({"msg":e.message});
    }
};

export const historialMantenimientosPreventivos = async(req, res) => {
        try {
            let id = req.params.id;
            let sql = `SELECT * from mantenimientos where fk_equipo = ? and tipo_mantenimiento = "preventivo"`;
            let [rows] = await pool.query(sql, [id]);
    
            if (rows.length>0) {
                return res.status(200).json({"msg":"mantenimientos preventivos encontrados: ", "mantenimientos": rows});
            } else {
                return res.status(404).json({"msg":"mantenimientos preventivos no encontrados"});
            }
        } catch (e) {
            return res.status(500).json({"msg":e.message});
        }
    };

    export const historialMantenimientosCorrectivos = async(req, res) => {
        try {
            let id = req.params.id;
            let sql = `SELECT * from mantenimientos where fk_equipo = ? and tipo_mantenimiento = "correctivo"`;
            let [rows] = await pool.query(sql, [id]);
    
            if (rows.length>0) {
                return res.status(200).json({"msg":"mantenimientos correctivos encontrados: ", "mantenimientos": rows});
            } else {
                return res.status(404).json({"msg":"mantenimientos correctivos no encontrados"});
            }
        } catch (e) {
            return res.status(500).json({"msg":e.message});
        }
    };

    export const historialMantenimientos = async(req, res) => {
        try {
            let id = req.params.id;
            let sql = `SELECT * from mantenimientos where fk_equipo = ?`;
            let [rows] = await pool.query(sql, [id]);
    
            if (rows.length>0) {
                return res.status(200).json({"msg":"mantenimientos encontrados: ", "mantenimientos": rows});
            } else {
                return res.status(404).json({"msg":"mantenimientos no encontrados"});
            }
        } catch (e) {
            return res.status(500).json({"msg":e.message});
        }
    };
