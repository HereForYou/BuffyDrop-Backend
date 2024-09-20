process.env.NODE_ENV = process.env.NODE_ENV || "development";
var express = require("./config/express"),
    mongoose = require("./config/mongoose"),
    config = require("./config/config"),
    fs = require("fs"),
    http = require("http"),
    https = require("https");

// const { init } = require("./config/socket");
const path = require('path'); // Import path module for file paths
const Setting = require("./models/setting.model");
var { taskList, admin, inviteRevenue, dailyRevenue,
    BOT_TOKEN, BOT_DESCRIPTION, WEB_APP_URL, WEB_SITE_URL, BOT_CERTIFICATION, TELEGRAM_TOKEN, GROUP_USERNAME } = require("./config/Constants");

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
    // .getChat(GROUP_USERNAME)
    .getChat('@BuffyDrop44')
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
const desText1 = "🔥 Receive rewards based on your rank for joining the Buffy bot. But when will this process end? Did you wait to join the bot later to get more tokens?";
const midText1 = "No one knows ... 😈\n"; // Replace with your desired description
const cert1 = "Early users receive a much higher reward percentage for inviting others to the bot, so join quickly!\n\nClick to launch Buffy"; // Replace with your desired certificate text
TGbot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Send the animation (GIF)
    console.log("called start command", groupId);
    const gifPath = path.join(__dirname, 'video.mp4'); // Ensure 3.gif is in the same directory as your script

    // Send the animation (GIF)
    const combinedText = `${desText1}\n\n${midText1}\n${cert1}`;

    // Send the animation with a caption
    TGbot.sendAnimation(groupId, gifPath, {
        caption: combinedText, reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Launch Buffy🍖',
                        url: "https://t.me/BuffyDropbot/Buffy Drop"
                        // url: WEB_SITE_URL, // Use callback_data for button actions
                    }
                ]
            ]
        }
    })
        .then(() => {
            console.log('Animation and message sent successfully.');
        })
        .catch((error) => {
            console.error('Error sending animation or message:', error);
        });
    // });

    console.log('Bot is running...');
});
TGbot.on('callback_query', (callbackQuery) => {
    const groupId = callbackQuery.message.chat.id;

    // Handle the action based on the callback data
    if (callbackQuery.data === 'launch_buffy') {
        TGbot.sendMessage(groupId, `Launching Buffy...`);
        // You can open the web app link here as needed
        // For example, you might send a message with the URL
        TGbot.sendMessage(groupId, `Open the web app here: ${WEB_APP_URL}`);
    }
});
// TGbot.launch();
TGbot.on("polling_error", (error) => {
    console.log("Polling error:");
});

const desText = BOT_DESCRIPTION;
const cert = BOT_CERTIFICATION;

mongoose().then(async () => {
    await SettingInitialize();
    const allowedOrigins = ['http://localhost:5173', 'https://buffydrop.xyz',];
    var app = express();
    app.use((req, res, next) => {
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        next();
    });
    // var server = http.createServer(app);
    // const io = init(server);

    // io.on('connection', (socket) => {
    //     console.log('A user connected');

    //     socket.on('disconnect', () => {
    //         console.log('A user disconnected');
    //     });
    // });

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.post('/api/user/joinTG/:id', (req, res) => {
        let USER_TEL_ID = req.params.id;
        console.log("user id---", USER_TEL_ID, "--goroup id----", groupId);
        TGbot
            .getChatMember(groupId, USER_TEL_ID)
            .then(() => {
                console.log("this id exist in this channel")
                res.status(200).send({ status: true })
            })
            .catch(err => {
                console.log("this id don't exist in this channel")
                res.status(200).send({ status: false })
            })
    })
    const options = {
        key: fs.readFileSync("./cert/privkey.pem"),
        cert: fs.readFileSync("./cert/fullchain.pem")
    };

    https.createServer(options, app).listen(443, "78.141.204.6", () => {
        console.log(`Server running at https://78.141.204.6/`);
        app.post('/api/user/joinTG/:id', (req, res) => {
            let USER_TEL_ID = req.params.id;
            console.log("user id---", USER_TEL_ID, "--goroup id----", groupId);
            TGbot
                .getChatMember(groupId, USER_TEL_ID)
                .then(() => {
                    console.log("this id exist in this channel")
                    res.status(200).send({ status: true })
                })
                .catch(err => {
                    console.log("this id don't exist in this channel")
                    res.status(200).send({ status: false })
                })
        })
    });

    // server.listen(config.port, () => {
    //     console.log(`Server is running at http://localhost:${config.port}`)
    // });


});

async function SettingInitialize() {

    try {
        const existingSetting = await Setting.findOne({});
        if (!existingSetting) {
            const defaultSetting = new Setting({
                taskList,
                admin,
                inviteRevenue,
                dailyRevenue,
            });
            await defaultSetting.save();
            console.log('Default Setting Document Created');
        } else {
            console.log('Default Setting Document Already Exists');
        }
    } catch (error) {
        console.error('Error ensuring default Setting:');
    }
}



bot.command("start", (ctx) => {
    // First, send the image
    console.log("**************start command**********")
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