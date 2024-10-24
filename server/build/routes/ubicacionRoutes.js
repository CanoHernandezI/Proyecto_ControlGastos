"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ubicacionController_1 = require("../controllers/ubicacionController");
class UbicacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/guardar', ubicacionController_1.ubicacionController.guardarUbicacion);
        this.router.put('/actualizar-salida', ubicacionController_1.ubicacionController.actualizarHoraSalida);
        this.router.get('/rutas/:idUsuario', ubicacionController_1.ubicacionController.obtenerRutas);
    }
}
const ubicacionRoutes = new UbicacionRoutes();
exports.default = ubicacionRoutes.router;
