var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var SettingSchema = new Schema(
    {
        dailyTimeLimitList: [{
            id: {
                type: Number,
                default: 1
            },
            value: {
                type: Number,
                default: 10
            },
            coinsToBoost: {
                type: Number,
                default: 0
            },
        }],
        powerList: [{
            id: {
                type: Number,
                default: 1
            },
            value: {
                type: Number,
                default: 10
            },
            coinsToBoost: {
                type: Number,
                default: 0
            },
        }],
        taskList: [{
            id: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                default: ""
            },
            image: {
                type: String,
                default: ""
            },
            profit: {
                type: Number,
                default: 0
            },
            link: {
                type: String,
                default: ""
            }
        }],
        dexList: [
            {
                id: {
                    type: Number,
                    default: 0
                },
                name: {
                    type: String,
                },
                img: {
                    type: String,
                    default: ""
                }
            }
        ],
        levelStandard: [{
            level: {
                type: Number,
                default: 0
            },
            coinsToLevelUp: {
                type: Number,
                default: 0
            }
        }],
        admin: [
            {
                id: {
                    type: Number,
                    default: 1
                },
                username: {
                    type: String,
                    default: ""
                }
            }
        ],
        inviteRevenue: {
            type: Number,
            default: 0.1001 // Min
        },
        dailyRevenue: {
            type: Number,
            default: 1000 // Min
        }
    },
    {
        timestamps: true,
    }
);

mongoose.model("Setting", SettingSchema, "setting");
module.exports = mongoose.model("Setting", SettingSchema, "setting");
