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
                id: {
                    type: String,
                    required: true,
                },
                revenue: {
                    type: Number,
                    default: 0
                }
            }

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
        joinRank: { type: Number, default: 0 },
        style: { type: String, default: 'bg-white text-black' }
    },
    {
        timestamps: true,
    }
);

mongoose.model('User', UserSchema, 'user');
