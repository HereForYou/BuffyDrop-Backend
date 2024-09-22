const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const fs = require('fs');

// Connect to your MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.10', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://127.0.0.1:27017/Bleggs', { useNewUrlParser: true, useUnifiedTopology: true });

// Define your new schema
var UserSchema = new Schema(
    {
        tgId: {
            type: String,
            required: [true, "Insert Tg Id."],
        },
        userName: {
            type: String,
            default: "",
        },
        firstName: {
            type: String,
            default: "",
        },
        lastName: {
            type: String,
            default: "",
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
        startFarming: {
            type: Date,
            default: Date.now()
        },
        cliamed: {
            type: Boolean,
            default: true
        },
        inviteLink: {
            type: String,
            default: "",
        },
        isInvited: {
            type: Boolean,
            default: false
        },
        joinRank: {
            type: Number,
            default: 0
        },
        friends: [{
            type: String,
            required: true
        }],
        task: [
            {
                id: {
                    type: String,
                    required: true,
                },
                revenue: {
                    type: Number,
                    default: 0
                }
            }],
        intervalId: {
            type: Number,
            default: 0,
        },
        style: {
            type: String,
            default: 'bg-white text-black'
        }
    },
    {
        timestamps: true,
    }
);

// Create a model
const User = mongoose.model("User", UserSchema, "user");

// Load JSON data
const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Function to transform and insert data
async function insertUsers(data) {
    for (let userData of data.allUsers) {
        const user = new User({
            tgId: userData.tgId,
            userName: userData.userName || '', // Use an empty string if userName is null or undefined
            firstName: userData.firstName,
            lastName: userData.lastName || '', // Use an empty string if lastName is null or undefined
            totalPoints: userData.totalPoints,
            curPoints: userData.curPoints,
            countDown: userData.countDown,
            lastLogin: userData.lastLogin,
            startFarming: userData.startFarming,
            cliamed: userData.cliamed,
            inviteLink: userData.inviteLink,
            isInvited: userData.isInvited,
            friends: userData.friends,
            task: userData.task,
            intervalId: userData.intervalId,
            joinRank: userData.joinRank,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        });

        try {
            await user.save();
            console.log(`User ${user.firstName} inserted successfully`);
        } catch (err) {
            console.error(`Error inserting user ${user.firstName}:`, err);
        }
    }

    // Close the connection after processing
    mongoose.connection.close();
}

// Insert the users into the new schema
insertUsers(jsonData);