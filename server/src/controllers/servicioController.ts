import { Request, Response } from 'express';
import pool from '../database';

class ServicioController {
  public async list(req: Request, res: Response): Promise<void> {
    const { idUser } = req.params;
    try {
      const servicios = await pool.query('SELECT * FROM Servicio WHERE IdUsuario = ?', [idUser]);
      res.json({ servicios });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los servicios' });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { idUser } = req.params;
    const servicio = req.body;

    console.log('IdUsuario:', idUser);
    console.log('Servicio:', servicio);

    servicio.IdUsuario = idUser;

    try {
      await pool.query('INSERT INTO Servicio SET ?', [servicio]);
      res.json({ message: 'Servicio guardado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear el Servicio' });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    try {
      await pool.query('DELETE FROM Servicio WHERE IdServicio = ? AND IdUsuario = ?', [id, idUser]);
      res.json({ message: 'El Servicio fue eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el Servicio' });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    const servicio = req.body;

    console.log('IdServicio:', id);
    console.log('IdUsuario:', idUser);
    console.log('Servicio:', servicio);

    try {
      const result = await pool.query('UPDATE Servicio SET ? WHERE IdServicio = ? AND IdUsuario = ?', [servicio, id, idUser]);
      if (result.affectedRows > 0) {
        res.json({ message: 'El servicio fue actualizado' });
      } else {
        res.status(404).json({ error: 'El servicio no fue encontrado o el usuario no coincide' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    try {
      const servicio = await pool.query('SELECT * FROM Servicio WHERE IdServicio = ? AND IdUsuario = ?', [id, idUser]);
      if (servicio.length > 0) {
        // Convertir FechaServicio a YYYY-MM-DD
        servicio[0].FechaServicio = servicio[0].FechaServicio.toISOString().split('T')[0];
        res.json(servicio[0]);
      } else {
        res.status(404).json({ text: 'El servicio no existe' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el servicio' });
    }
  }
}

export const servicioController = new ServicioController();
export default servicioController;
