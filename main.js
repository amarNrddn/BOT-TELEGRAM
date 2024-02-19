const MarzkyyBot = require('./app/Bot')
require('dotenv').config()

const token = process.env.TELEGRAM_TOKEN
const polling = { polling: true }

const BotMarzky = new MarzkyyBot(token, polling)

BotMarzky.getSticer()
BotMarzky.getGriting()
BotMarzky.getFollow()
BotMarzky.getQuote()
BotMarzky.getNews()
BotMarzky.getInformationQuake()