dailyTimeLimitList = [
    {
        id: 1,
        value: 30,
        coinsToBoost: 0
    },
    {
        id: 2,
        value: 60,
        coinsToBoost: 50000
    },
    {
        id: 3,
        value: 90,
        coinsToBoost: 100000
    },
    {
        id: 4,
        value: 120,
        coinsToBoost: 200000
    },
    {
        id: 5,
        value: 150,
        coinsToBoost: 300000
    },
    {
        id: 6,
        value: 250,
        coinsToBoost: 400000
    },
    {
        id: 7,
        value: 500,
        coinsToBoost: 1000000
    },
    {
        id: 8,
        value: 600,
        coinsToBoost: 2000000
    },
    {
        id: 9,
        value: 700,
        coinsToBoost: 3000000
    },
    {
        id: 10,
        value: 800,
        coinsToBoost: 4000000
    },
    {
        id: 11,
        value: 900,
        coinsToBoost: 5000000
    },
    {
        id: 12,
        value: 1000,
        coinsToBoost: 10000000
    },
    {
        id: 13,
        value: 1100,
        coinsToBoost: 20000000
    },
    {
        id: 14,
        value: 1200,
        coinsToBoost: 30000000
    },
    {
        id: 15,
        value: 1300,
        coinsToBoost: 40000000
    },
    {
        id: 16,
        value: 1440,
        coinsToBoost: 100000000
    },
]

powerList = [
    {
        id: 1,
        value: 2,
        coinsToBoost: 0
    },
    {
        id: 2,
        value: 4,
        coinsToBoost: 200000
    },
    {
        id: 3,
        value: 6,
        coinsToBoost: 400000
    },
    {
        id: 4,
        value: 8,
        coinsToBoost: 600000
    },
    {
        id: 5,
        value: 10,
        coinsToBoost: 800000
    },
    {
        id: 6,
        value: 12,
        coinsToBoost: 1000000
    },
    {
        id: 7,
        value: 14,
        coinsToBoost: 1200000
    },
    {
        id: 8,
        value: 16,
        coinsToBoost: 1400000
    },
    {
        id: 9,
        value: 18,
        coinsToBoost: 1600000
    },
    {
        id: 10,
        value: 20,
        coinsToBoost: 1800000
    },
    {
        id: 11,
        value: 22,
        coinsToBoost: 2000000
    },
]

const levelStandard = [
    {
        level: 1,
        coinsToLevelUp: 0,
    },
    {
        level: 2,
        coinsToLevelUp: 1000000,
    },
    {
        level: 3,
        coinsToLevelUp: 2000000,
    },
    {
        level: 4,
        coinsToLevelUp: 5000000,
    },
    {
        level: 5,
        coinsToLevelUp: 10000000,
    },
    {
        level: 6,
        coinsToLevelUp: 20000000,
    },
    {
        level: 7,
        coinsToLevelUp: 30000000,
    },
    {
        level: 8,
        coinsToLevelUp: 40000000,
    },
    {
        level: 9,
        coinsToLevelUp: 50000000,
    },
    {
        level: 10,
        coinsToLevelUp: 100000000,
    }
]

const taskList = [
    {
        id: "telegram",
        title: "Join our TG channel",
        image: "telegram.svg",
        profit: 1000,
        link: "https://t.me/bleggs"
    },
    {
        id: "youtube",
        title: "Get Exclusive listing info",
        image: "youtube.svg",
        profit: 1000,
        link: "https://www.youtube.com/@BleggsToken"
    },
    {
        id: "tiktok",
        title: "Get Exclusive listing info",
        image: "youtube.svg",
        profit: 1000,
        link: "https://www.tiktok.com/@bleggstoken"
    },
    {
        id: "twitter",
        title: "Follow your X account",
        image: "twitter.svg",
        profit: 1000,
        link: "https://x.com/BLEGGSToken"
    },
    {
        id: "instagram",
        title: "Choose",
        image: "choose.svg",
        profit: 1000,
        link: "https://www.instagram.com/bleggstoken/"
    },
];

const dexList = [
    {
        id: 1,
        name: "Binance",
        img: ""
    },
    {
        id: 2,
        name: "Bitmart",
        img: ""
    },
    {
        id: 3,
        name: "OKX",
        img: ""
    }
]

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

const inviteRevenue = 1000; // 1000 BLEGGS
const dailyRevenue = 1000; // 1000 BLEGGS
// const BOT_TOKEN = '7510686102:AAGUu58pUBz5-2I6fQhwSktEXkxUzVZouqs';//test bot
const BOT_TOKEN = '5859581801:AAE9IA-R3EbNsiI1YMkYQeSPZAiahHM1q4o';
const BOT_DESCRIPTION = `
Welcome to BLEGGS Miner 🔥

Our Telegram Miner is now live, and you're among the first to experience it in beta! 
Start MINING today and unlock incredible rewards as you grow your crypto stack faster.

How It Works:

🟢 Click "Start Mining" to begin with 2 MH power for 30 minutes.
🟢  Upgrade your power and duration as you earn more BLEGGS.
🟢 Complete daily tasks and invite friends to boost your earnings!

How to use guide follow the link below: 
https://ecosystem.bleggs.com/bleggs-whitepaper/about-products/bleggs-miner/how-to-start-mining
`;
const BOT_CERTIFICATION = '';
// const WEB_APP_URL = 'https://bleggs-miniapp.vercel.app'//test
const WEB_APP_URL = 'https://app.bleggs.com';//
const WEB_SITE_URL = 'https://bleggs.com';


module.exports = { dailyTimeLimitList, powerList, levelStandard, taskList, admin, inviteRevenue, dailyRevenue, dexList, BOT_TOKEN, BOT_DESCRIPTION, BOT_CERTIFICATION, WEB_SITE_URL, WEB_APP_URL };