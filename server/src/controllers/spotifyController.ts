import { Request, Response } from 'express';
import pool from '../database';

class SpotifyController{

  // Método para obtener el token de la base de datos
  public async getToken(req: Request, res: Response): Promise<void> {
    const { idUser } = req.params;

    try {
      const result = await pool.query('SELECT Token FROM Usuario WHERE IdUsuario = ?', [idUser]);
      if (result.length > 0) {
        res.json({ access_token: result[0].Token });
      } else {
        res.status(404).json({ error: 'Token no encontrado para el usuario' });
      }
    } catch (err) {
      console.error('Error al obtener el token:', err);
      res.status(500).json({ error: 'Error al obtener el token' });
    }
  }


  //Metodo para actualizar el token
  public async update(req: Request, res: Response): Promise<void> {
    const {idUser} = req.params;   // Obtener el ID de usuario de los parámetros de URL
    const {token} = req.body;      // Obtener el token del cuerpo de la solicitud

    console.log('Token de spotify:', token);
    console.log('IdUsuario:', idUser);
  
    try {
      const result = await pool.query('UPDATE Usuario SET SpotiToken = ? WHERE IdUsuario = ?', [token, idUser]);
      if (result.affectedRows > 0) {
        res.json({ message: 'Token se actualizo correctamente'});
      } else {
        res.status(404).json({ error: 'El usuario no fue encontrado o no se actualizó el token'});
      }
    } catch (err) {
      console.error('Error al actualizar el token:', err);
      res.status(500).json({ error: 'Error al actualizar el token' });
    }
  }
}

export default new SpotifyController;
