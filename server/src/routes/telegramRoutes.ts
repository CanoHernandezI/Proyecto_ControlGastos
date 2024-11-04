import { Router } from 'express';
import { sendMessageToTelegram } from '../controllers/telegramController';

const router = Router();

router.post('/send', sendMessageToTelegram);

export default router;
