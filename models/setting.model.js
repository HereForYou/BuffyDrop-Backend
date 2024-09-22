var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var SettingSchema = new Schema(
    {
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
            default: 1 // Min
        }
    },
    {
        timestamps: true,
    }
);

mongoose.model("Setting", SettingSchema, "setting");
module.exports = mongoose.model("Setting", SettingSchema, "setting");
