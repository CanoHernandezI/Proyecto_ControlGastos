import { Router } from 'express';
import spotifyController from '../controllers/spotifyController';


class SpotifyRoutes{
    public router: Router = Router();

    constructor() {
      this.config();
    }
  
    config(): void {
      this.router.put('/token/:idUser', spotifyController.update);
      this.router.get('/token/:idUser', spotifyController.getToken);
    }
  }
  
  const spotifyRoutes = new SpotifyRoutes();
  export default spotifyRoutes.router;
