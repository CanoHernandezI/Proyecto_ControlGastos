"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ubicacionController = void 0;
const database_1 = __importDefault(require("../database"));
const axios_1 = __importDefault(require("axios"));
const mapboxToken = 'pk.eyJ1IjoiaXNhYWNjYW5vaCIsImEiOiJjbTF1MW40djEwOG91MmlvbDVvM2pudDNkIn0.HwWvhLZXDgZCW4Sa3WDYmA';
class UbicacionController {
    guardarUbicacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { idUsuario, latitud, longitud, horaEntrada } = req.body;
            try {
                const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitud},${latitud}.json?access_token=${mapboxToken}`;
                const response = yield axios_1.default.get(url);
                const direccion = ((_a = response.data.features[0]) === null || _a === void 0 ? void 0 : _a.place_name) || 'Dirección no encontrada';
                yield database_1.default.query('INSERT INTO Ubicacion (IdUsuario, Latitud, Longitud, Direccion, HoraEntrada) VALUES (?, ?, ?, ?, ?)', [idUsuario, latitud, longitud, direccion, horaEntrada]);
                res.json({ message: 'Ubicación guardada con éxito' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al guardar la ubicación' });
            }
        });
    }
    actualizarHoraSalida(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUbicacion, horaSalida } = req.body;
            try {
                yield database_1.default.query('UPDATE Ubicacion SET HoraSalida = ? WHERE IdUbicacion = ?', [horaSalida, idUbicacion]);
                res.json({ message: 'Hora de salida actualizada' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al actualizar la hora de salida' });
            }
        });
    }
    obtenerRutas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            try {
                const ubicaciones = yield database_1.default.query('SELECT * FROM Ubicacion WHERE IdUsuario = ? ORDER BY HoraEntrada', [idUsuario]);
                const rutasConTiempo = ubicaciones.map((ubicacion) => {
                    const horaEntrada = new Date(ubicacion.HoraEntrada);
                    const horaSalida = ubicacion.HoraSalida ? new Date(ubicacion.HoraSalida) : null;
                    const tiempoPermanencia = horaSalida ? (horaSalida.getTime() - horaEntrada.getTime()) / (1000 * 60) : null; // Tiempo en minutos
                    return Object.assign(Object.assign({}, ubicacion), { tiempoPermanencia: tiempoPermanencia ? `${tiempoPermanencia.toFixed(2)} minutos` : 'En el lugar' });
                });
                res.json(rutasConTiempo);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al obtener las rutas' });
            }
        });
    }
}
exports.ubicacionController = new UbicacionController();
