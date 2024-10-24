import { Request, Response } from 'express';
import pool from '../database';

class GastoController {
  public async list(req: Request, res: Response): Promise<void> {
    const { idUser } = req.params;
    try {
      const gastos = await pool.query('SELECT * FROM Gasto WHERE IdUsuario = ?', [idUser]);
      res.json({ gastos });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los gastos' });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { idUser } = req.params;
    const gasto = req.body;

    console.log('IdUsuario:', idUser);
    console.log('Gasto:', gasto);
  
    gasto.IdUsuario = idUser;
  
    try {
      await pool.query('INSERT INTO Gasto SET ?', [gasto]);
      res.json({ message: 'Gasto guardado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear el gasto' });
    }
  }
  

  public async delete(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    try {
      await pool.query('DELETE FROM Gasto WHERE IdGasto = ? AND IdUsuario = ?', [id, idUser]);
      res.json({ message: 'El gasto fue eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el gasto' });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    const gasto = req.body;
  
    console.log('IdGasto:', id);
    console.log('IdUsuario:', idUser);
    console.log('Gasto:', gasto);
  
    try {
      const result = await pool.query('UPDATE Gasto SET ? WHERE IdGasto = ? AND IdUsuario = ?', [gasto, id, idUser]);
      if (result.affectedRows > 0) {
        res.json({ message: 'El gasto fue actualizado' });
      } else {
        res.status(404).json({ error: 'El gasto no fue encontrado o el usuario no coincide' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el gasto' });
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    try {
      const gasto = await pool.query('SELECT * FROM Gasto WHERE IdGasto = ? AND IdUsuario = ?', [id, idUser]);
      if (gasto.length > 0) {
        // Convertir FechaTransaccion a YYYY-MM-DD
        gasto[0].FechaTransaccion = gasto[0].FechaTransaccion.toISOString().split('T')[0];
        res.json(gasto[0]);
      } else {
        res.status(404).json({ text: 'El gasto no existe' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el gasto' });
    }
  }
}

export const gastoController = new GastoController();
export default gastoController;
