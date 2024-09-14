process.env.NODE_ENV = process.env.NODE_ENV || "development";

var express = require("./config/express"),
    mongoose = require("./config/mongoose"),
    config = require("./config/config"),
    http = require("http");
const { init } = require("./config/socket");

const Setting = require("./models/setting.model");
var { taskList, dailyTimeLimitList, powerList, levelStandard, admin, inviteRevenue, dailyRevenue,
    dexList, BOT_TOKEN, BOT_DESCRIPTION, WEB_APP_URL, WEB_SITE_URL, BOT_CERTIFICATION } = require("./config/Constants");

const { Telegraf, Markup } = require("telegraf");
const bot = new Telegraf(BOT_TOKEN);

const desText = BOT_DESCRIPTION;
const cert = BOT_CERTIFICATION;

mongoose().then(async () => {
    await SettingInitialize();
    var app = express();
    var server = http.createServer(app);
    app.all(/.*/, (req, res) => {
        res.statusCode = 404;
        res.send("Invalid Endpoint.");
    });
    const io = init(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

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