// src/config/logger.js
import axios from "axios";
import { format } from "winston";
import { createLogger, transports } from "winston";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Telegramga log yuboruvchi funksiya
async function sendToTelegram(message) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });
  } catch (error) {
    console.error("Telegram log yuborishda xatolik:", error.message);
  }
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
      const logMsg = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      // Har bir logni Telegramga yuboramiz
      sendToTelegram(logMsg);
      return logMsg;
    })
  ),
  transports: [
    new transports.Console() // faqat konsolga chiqaradi
  ],
});

export default logger;
