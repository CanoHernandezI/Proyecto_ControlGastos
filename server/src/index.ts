import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import gastoRoutes from './routes/gastoRoutes';
import ingresoRoutes from './routes/ingresoRoutes';
import servicioRoutes from './routes/servicioRoutes';
import presupuestoRoutes from './routes/presupuestoRoutes';
<<<<<<< HEAD
import morgan from 'morgan';
import cors from 'cors';
=======
import ubicacionRoutes from './routes/ubicacionRoutes';
import twitterRoutes from './routes/twitterRoutes';
import tarjetaRoutes from './routes/tarjetaRoutes';
import telegramRoutes from './routes/telegramRoutes';
import { initializeTelegramBot } from './controllers/telegramController';
import videoRoutes from './routes/videoRoutes';
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/usuario', usuarioRoutes);
        this.app.use('/api/gasto', gastoRoutes);
        this.app.use('/api/ingreso', ingresoRoutes);
        this.app.use('/api/servicio', servicioRoutes);
        this.app.use('/api/presupuesto', presupuestoRoutes);
<<<<<<< HEAD
=======
        this.app.use('/api/ubicacion', ubicacionRoutes);
        this.app.use('/api/twitter', twitterRoutes);
        this.app.use('/api/tarjetas', tarjetaRoutes);
        this.app.use('/api/telegram', telegramRoutes); 
        this.app.use('/api', videoRoutes);
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });

        initializeTelegramBot();
    }
}

const server = new Server();
server.start();
