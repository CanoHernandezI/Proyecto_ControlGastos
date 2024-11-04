import TelegramBot from 'node-telegram-bot-api';
import keys from '../keys';

const bot = new TelegramBot(keys.telegramConfig.apiKey, { polling: true });

export const initializeTelegramBot = () => {
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text || '';

        if (text.toLowerCase() === '/start') {
            bot.sendMessage(chatId, '¡Hola! Soy tu asistente de control de gastos. ¿En qué puedo ayudarte?');
        } else if (text.toLowerCase().includes('gasto')) {
            bot.sendMessage(chatId, 'Puedes registrar un gasto en la aplicación o ver el historial de tus gastos.');
        } else {
            bot.sendMessage(chatId, 'Lo siento, no entiendo el mensaje. Intenta con otro comando.');
        }
    });
};

export const sendMessageToTelegram = async (req: any, res: any) => {
    const { chatId, message } = req.body;
    try {
        await bot.sendMessage(chatId, message);
        res.json({ success: true, message: 'Mensaje enviado' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error enviando mensaje' });
    }
};
