import { Request, Response } from 'express';
import pool from "../database";

class UsuarioController {
    public async list(req: Request, res: Response): Promise<void> {
        const usuarios = await pool.query('SELECT * FROM Usuario');
        res.json({ usuarios });
      }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            await pool.query('INSERT INTO Usuario set ?', [req.body]);
            res.json({ message: 'User Saved' });
        } catch (err) {
            res.status(500).json({ error: 'Error al crear usuario' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { idUser } = req.params;
        await pool.query('DELETE FROM Usuario WHERE IdUsuario = ?', [idUser]);
        res.json({ message: 'The user was deleted' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { idUser } = req.params;
        await pool.query('UPDATE Usuario set ? WHERE IdUsuario = ?', [req.body, idUser]);
        res.json({ message: 'The user was updated' });
    }

    public async getUserOrCheckUsername(req: Request, res: Response): Promise<void> {
        const { identifier } = req.params;
    
        if (isNaN(Number(identifier))) {
            const usuario = await pool.query('SELECT * FROM Usuario WHERE Usuario = ?', [identifier]);
            if (usuario.length > 0) {
                res.json({ exists: true });
            } else {
                res.json({ exists: false });
            }
        } else {
            const usuario = await pool.query('SELECT * FROM Usuario WHERE IdUsuario = ?', [identifier]);
            if (usuario.length > 0) {
                res.json(usuario[0]);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    }

    public async getTipoUsuario(req: Request, res: Response): Promise<void> {
        const { idUser } = req.params;  // se obtiene el IdUsuario de la URL
        const tipoUsuarioResult = await pool.query('SELECT TipoUsuario FROM Usuario WHERE IdUsuario = ?', [idUser]);
    
        if (tipoUsuarioResult.length > 0) {
            const tipoUsuario = tipoUsuarioResult[0].TipoUsuario;
            res.json({ tipoUsuario });  // devolver el campo tipoUsuario
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}




export const usuarioController = new UsuarioController();
export default usuarioController;
