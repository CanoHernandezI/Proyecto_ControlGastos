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
exports.sendMessageToTelegram = exports.initializeTelegramBot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const keys_1 = __importDefault(require("../keys"));
const bot = new node_telegram_bot_api_1.default(keys_1.default.telegramConfig.apiKey, { polling: true });
const initializeTelegramBot = () => {
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text || '';
        if (text.toLowerCase() === '/start') {
            bot.sendMessage(chatId, '¡Hola! Soy tu asistente de control de gastos. ¿En qué puedo ayudarte?');
        }
        else if (text.toLowerCase().includes('gasto')) {
            bot.sendMessage(chatId, 'Puedes registrar un gasto en la aplicación o ver el historial de tus gastos.');
        }
        else {
            bot.sendMessage(chatId, 'Lo siento, no entiendo el mensaje. Intenta con otro comando.');
        }
    });
};
exports.initializeTelegramBot = initializeTelegramBot;
const sendMessageToTelegram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, message } = req.body;
    try {
        yield bot.sendMessage(chatId, message);
        res.json({ success: true, message: 'Mensaje enviado' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Error enviando mensaje' });
    }
});
exports.sendMessageToTelegram = sendMessageToTelegram;
