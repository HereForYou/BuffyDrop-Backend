
const taskList = [////Daily task list ----->Database schema
    {
        id: "telegram",
        title: "Join our TG channel",
        image: "tg_icon.png",
        profit: 1000,
        link: "https://t.me/BuffyDrop"
    },
    {
        id: "twitter",
        title: "Follow your X account",
        image: "twitter_icon.png",
        profit: 1000,
        link: "https://twitter.com/BuffyDrop"
    },
    {
        id: "instagram",
        title: "Follow us on Instagram",
        image: "instagram_icon.png",
        profit: 1000,
        link: "https://www.instagram.com/BuffyDrop"
    },
    {
        id: "youtube",
        title: "Follow our YouTube Channel",
        image: "youtube_icon.png",
        profit: 1000,
        link: "https://www.youtube.com/c/BuffyDrop"
    },
    {
        id: "tiktok",
        title: "Join out TT channel",
        image: "tt_icon.png",
        profit: 1000,
        link: "https://www.tiktok.com/@BuffyDrop"
    },
];


const admin = [
    {
        id: 1,
        username: '@majedatwi'
    },
    {
        id: 2,
        username: '@hightech0827'
    }
];

const inviteRevenue = 0.1001; // 1000 Buffy
const dailyRevenue = 1000; // 1000 Buffy
// const BOT_TOKEN = '7510686102:AAGUu58pUBz5-2I6fQhwSktEXkxUzVZouqs';//test bot
// const TELEGRAM_TOKEN = '7509197025:AAHDRQQu8qVeZfhix79fbelhat45Wxn8wD0'
const TELEGRAM_TOKEN = "7227899625:AAHPFS9s6RqDgwOj2XJMWi-_bnWT1bAWxaI"///Telegram Channel admin bot token

const GROUP_USERNAME = '@BuffyDrop'//Telegram Channel Name
const BOT_TOKEN = '6889012779:AAFkk_WoA08aACylwba7Mkp9OEDCatnvcbc';///Telegram Mini App bot token
const BOT_DESCRIPTION = `
How early did you join Buffy?  🍖
Discover your rank and unlock your reward!
`;
const BOT_CERTIFICATION = '';
// const WEB_APP_URL = 'https://Buffy-miniapp.vercel.app'//test
// const WEB_APP_URL = 'https://app.Buffy.com';//
const WEB_SITE_URL = 'https://t.me/BuffyDrop';
const WEB_APP_URL = 'https://dog82027.vercel.app'

module.exports = { taskList, admin, inviteRevenue, dailyRevenue, BOT_TOKEN, BOT_DESCRIPTION, BOT_CERTIFICATION, WEB_SITE_URL, WEB_APP_URL, TELEGRAM_TOKEN, GROUP_USERNAME };