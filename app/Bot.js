const TelegramBot = require("node-telegram-bot-api")
const listComand = require('./listComand')

class MarzkyyBot extends TelegramBot {
    constructor(token, polling) {
        super(token, polling)
    }

    getListComand() {
        this.onText(/^!comand$/, (data) => {
            const senMesaageList = listComand.map((comand) => `=> ${comand.comand}\n ${comand.des}`).join('\n')

            this.sendMessage(data.from.id, senMesaageList)
        })
    }
    getSticer() {
        this.on("sticker", (data) => {
            this.sendMessage(data.from.id, data.sticker.emoji)
        })
    }

    getGriting() {
        this.onText(/^!hallo$/, (data) => {
            this.sendMessage(data.from.id, "Haloo Sayang ❤")
        })
    }

    getFollow() {
        this.onText(/^!follow(.+)/, (data, after) => {
            this.sendMessage(data.from.id, `apa maksumu adalah ${after[1]}`)
        })
    }

    getQuote() {
        this.onText(/^!quote$/, async (data) => {
            const apiURL = "https://api.kanye.rest/"
            try {
                const apiCall = await fetch(apiURL)
                const { quote } = await apiCall.json()

                this.sendMessage(data.from.id, quote)
            } catch (error) {
                this.sendMessage(data.from.id, "Maaf saya sedang tidur")
            }
        })
    }

    getNews() {
        this.onText(/^!news$/, async (data) => {
            const apiURL = "https://jakpost.vercel.app/api/category/indonesia/"
            try {
                const apiCall = await fetch(apiURL)
                const response = await apiCall.json()
                const maxNews = 2

                for (let i = 0; i < maxNews; i++) {
                    const news = response.posts[i]
                    const { title, image, headline } = news

                    this.sendPhoto(data.from.id, image, {
                        caption: `judul: ${title} \n\nHeadline:  ${headline}`
                    })

                }

            } catch (error) {
                console.log(error)
            }
        })
    }

    getInformationQuake() {
        const quakeEndpoint = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"

        try {
            this.onText(/^!quake$/, async (data) => {
                const apiCall = await fetch(quakeEndpoint)
                const response = await apiCall.json()
                const { gempa } = response.Infogempa
                const { Wilayah, Magnitude, Tanggal, Jam, Kedalaman, Shakemap } = gempa

                const imgSourceUrl = "https://data.bmkg.go.id/DataMKG/TEWS/" + Shakemap

                this.sendPhoto(data.from.id, imgSourceUrl, {
                    caption: `Info gempa terbaru ${Tanggal} / ${Jam}:\n\nwilayah: ${Wilayah}\nBesaran: ${Magnitude} SR\nKedalaman: ${Kedalaman}\n\n`
                })
            })
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = MarzkyyBot