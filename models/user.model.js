var mongoose = require('mongoose'), Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        tgId: {
            type: String,
            required: [true, 'Insert Tg Id.'],
        },
        userName: {
            type: String,
            default: '',
        },
        firstName: {
            type: String,
            default: '',
        },
        lastName: {
            type: String,
            default: '',
        },
        totalPoints: {
            type: Number,
            default: 0.000,
        },
        curPoints: {
            type: Number,
            default: 0.000,
        },
        countDown: {
            type: Number,
            default: 0,
        },
        lastLogin: {
            type: Date,
            default: Date.now(),
        },
        inviteLink: {
            type: String,
            default: '',
        },
        isInvited: {
            type: Boolean,
            default: false,
        },
        friends: [
            {
                type: String,
                required: true,
            },
        ],
        task: [
            {
                type: String,
                required: true,
            },
        ],
        intervalId: {
            type: Number,
            default: 0,
        },
        level: {
            type: Number,
            default: 1,
        },
        power: {
            id: {
                type: Number,
                default: 1,
            },
            value: {
                type: Number,
                default: 2, // MH
            },
            coinsToBoost: {
                type: Number,
                default: 0, // Min
            },
        },
        dailyTimeLimit: {
            id: {
                type: Number,
                default: 1,
            },
            value: {
                type: Number,
                default: 30, // Min
            },
            coinsToBoost: {
                type: Number,
                default: 0, // Min
            },
        },
        dex: {
            id: {
                type: Number,
                default: 1,
            },
            name: {
                type: String,
                default: 30,
            },
            img: {
                type: String,
                default: '',
            },
        },
        joinRank: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

mongoose.model('User', UserSchema, 'user');
