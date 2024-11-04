import * as dialogflow from '@google-cloud/dialogflow';
import { Request, Response } from 'express';

const projectId = 'controlgastosbot';  
const sessionClient = new dialogflow.SessionsClient();

export const sendMessage = async (req: Request, res: Response) => {
  const { message, sessionId } = req.body;

  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'es',  
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({ reply: result?.fulfillmentText });
  } catch (error) {
    console.error('Error en Dialogflow:', error);
    res.status(500).json({ error: 'Error al comunicarse con Dialogflow' });
  }
};
