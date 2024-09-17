process.env.NODE_ENV = process.env.NODE_ENV || "development";
var express = require("./config/express"),
    mongoose = require("./config/mongoose"),
    config = require("./config/config"),
    http = require("http");
const { init } = require("./config/socket");

const Setting = require("./models/setting.model");
var { taskList, dailyTimeLimitList, powerList, levelStandard, admin, inviteRevenue, dailyRevenue,
    dexList, BOT_TOKEN, BOT_DESCRIPTION, WEB_APP_URL, WEB_SITE_URL, BOT_CERTIFICATION, TELEGRAM_TOKEN, GROUP_USERNAME } = require("./config/Constants");

const { Telegraf, Markup } = require("telegraf");
///-Telegram Group monitor bot//////
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
const crypto_js_1 = __importDefault(require('crypto-js'))
Object.defineProperty(exports, '__esModule', { value: true })
const bot = new Telegraf(BOT_TOKEN);
const TelegramBot = require('node-telegram-bot-api')
const TGbot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })
let groupId = 0
let USER_ID = 0
let USER_NAME = 'Leo_mint'
let chatId = 0
console.log("-------------------------------------------------------------------");
console.log(TELEGRAM_TOKEN, GROUP_USERNAME)
console.log("-------------------------------------------------------------------");
TGbot
    .getChat(GROUP_USERNAME)
    .then(chat => {
        groupId = chat.id;
        console.log("----------------------GroupID", groupId);

    })
    .catch(error => {
        // console.log('Error getting chat:')
        if (error.response && error.response.description) {
            console.log('Telegram API response:')
        }
    })


TGbot.onText(/\/start/, msg => {
    chatId = msg.chat.id
    const userID = msg.from.id
    // USER_ID = chatId;
    // console.log('--//---myChatID----//---', chatId)
    const welcomeMessage = 'Hello! Every One! '
    // Send the welcome message with the inline keyboard
    TGbot.sendMessage(groupId, welcomeMessage)
})
TGbot.on('message', async msg => {
    var _a
    chatId = msg.chat.id
    USER_ID = chatId
    const userID = msg.from.id
    USER_NAME = (_a = msg.from) === null || _a === void 0 ? void 0 : _a.username
    if (msg.chat.id === groupId && msg.from.id === userID) {
        console.log(
            `User ${msg.from.username} (ID: ${msg.from.id}) posted a message in the group.`
        )
    }
})
// c(async (req, res) => {

// const gID = require("../app.js")
// let USER_TEL_ID = req.params.id;
// console.log(USER_TEL_ID);
// TGbot
//     .getChatMember(gID.GROUP_ID, USER_TEL_ID)
//     .then(() => {
//         res.status(200).send({ status: true })
//     })
//     .catch(err => {
//         res.status(200).send({ status: false })
//     })
// })
/////-------------------------
const desText = BOT_DESCRIPTION;
const cert = BOT_CERTIFICATION;

mongoose().then(async () => {
    await SettingInitialize();
    var app = express();
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://dog82027.vercel.app');
        next();
    });
    var server = http.createServer(app);
    // app.all(/.*/, (req, res) => {
    //     res.statusCode = 404;
    //     res.send("Invalid Endpoint.");
    // });
    const io = init(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.post('/api/user/joinTG/:id', (req, res) => {
        let USER_TEL_ID = req.params.id;
        console.log(USER_TEL_ID);
        TGbot
            .getChatMember(groupId, USER_TEL_ID)
            .then(() => {
                res.status(200).send({ status: true })
            })
            .catch(err => {
                res.status(200).send({ status: false })
            })
    })
    server.listen(config.port, () => {
        console.log(`Server is running at http://localhost:${config.port}`)
    });
});

async function SettingInitialize() {

    try {
        const existingSetting = await Setting.findOne({});
        if (!existingSetting) {
            const defaultSetting = new Setting({
                dailyTimeLimitList,
                powerList,
                levelStandard,
                taskList,
                admin,
                inviteRevenue,
                dailyRevenue,
                dexList
            });
            await defaultSetting.save();
            console.log('Default Setting Document Created');
        } else {
            console.log('Default Setting Document Already Exists');
        }
    } catch (error) {
        console.error('Error ensuring default Setting:', error);
    }
}



bot.command("start", (ctx) => {
    // First, send the image
    ctx.replyWithPhoto(
        { source: 'img/pic.png' }, // Replace with your image URL or use a file path
        {
            caption: `${desText}\n${cert}`, // This will be the caption under the image
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: `Let's Go`,
                            web_app: { url: WEB_APP_URL }
                        },
                        {
                            text: 'Join Buffy Community',
                            url: WEB_SITE_URL
                        }
                    ]
                ]
            }
        }
    );
});
bot.launch();