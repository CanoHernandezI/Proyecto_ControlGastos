"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const dialogflow = __importStar(require("@google-cloud/dialogflow"));
const projectId = 'controlgastosbot';
const sessionClient = new dialogflow.SessionsClient();
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const responses = yield sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        res.json({ reply: result === null || result === void 0 ? void 0 : result.fulfillmentText });
    }
    catch (error) {
        console.error('Error en Dialogflow:', error);
        res.status(500).json({ error: 'Error al comunicarse con Dialogflow' });
    }
});
exports.sendMessage = sendMessage;
