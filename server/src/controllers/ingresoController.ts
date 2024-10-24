import { Request, Response } from 'express';
import pool from '../database';

class IngresoController {
  public async list(req: Request, res: Response): Promise<void> {
    const { idUser } = req.params;
    try {
      const ingresos = await pool.query('SELECT * FROM Ingreso WHERE IdUsuario = ?', [idUser]);
      res.json({ ingresos });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los ingresos' });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { idUser } = req.params;
    const ingreso = req.body;

    console.log('IdUsuario:', idUser);
    console.log('Ingreso:', ingreso);

    ingreso.IdUsuario = idUser;

    try {
      await pool.query('INSERT INTO Ingreso SET ?', [ingreso]);
      res.json({ message: 'Ingreso guardado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear el ingreso' });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    try {
      await pool.query('DELETE FROM Ingreso WHERE IdIngreso = ? AND IdUsuario = ?', [id, idUser]);
      res.json({ message: 'El ingreso fue eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el ingreso' });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    const ingreso = req.body;

    console.log('IdIngreso:', id);
    console.log('IdUsuario:', idUser);
    console.log('Ingreso:', ingreso);

    try {
      const result = await pool.query('UPDATE Ingreso SET ? WHERE IdIngreso = ? AND IdUsuario = ?', [ingreso, id, idUser]);
      if (result.affectedRows > 0) {
        res.json({ message: 'El ingreso fue actualizado' });
      } else {
        res.status(404).json({ error: 'El ingreso no fue encontrado o el usuario no coincide' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el ingreso' });
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    try {
      const ingreso = await pool.query('SELECT * FROM Ingreso WHERE IdIngreso = ? AND IdUsuario = ?', [id, idUser]);
      if (ingreso.length > 0) {
        // Convertir FechaIngreso a YYYY-MM-DD
        ingreso[0].FechaIngreso = ingreso[0].FechaIngreso.toISOString().split('T')[0];
        res.json(ingreso[0]);
      } else {
        res.status(404).json({ text: 'El ingreso no existe' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el ingreso' });
    }
  }
}

export const ingresoController = new IngresoController();
export default ingresoController;
