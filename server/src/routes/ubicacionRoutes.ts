import { Router } from 'express';
import { ubicacionController } from '../controllers/ubicacionController';

class UbicacionRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post('/guardar', ubicacionController.guardarUbicacion);
    this.router.put('/actualizar-salida', ubicacionController.actualizarHoraSalida);
    this.router.get('/rutas/:idUsuario', ubicacionController.obtenerRutas);
  }
}

const ubicacionRoutes = new UbicacionRoutes();
export default ubicacionRoutes.router;
