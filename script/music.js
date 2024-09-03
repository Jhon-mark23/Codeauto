const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: 'music',
    version: '1.0.0',
    role: 0,
    hasPrefix: true,
    aliases: ['sc', 'sing', 'song', 'spotify'],
    description: 'Search and send music as a voice attachment.',
    usage: 'music [song name]',
    credits: 'churchill',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const chillli = args.join(' ');
    const userId = event.senderID;

    if (!chillli) {
        return api.sendMessage('Please provide a song name, for example: music selos', event.threadID, event.messageID);
    }

    const ratbu = `https://ccexplorerapisjonell.vercel.app/api/sc?search=${encodeURIComponent(chillli)}`;

    try {
        const response = await axios.get(ratbu, { responseType: 'arraybuffer' });
        const itlog = Buffer.from(response.data, 'binary');

        const filePath = path.join(__dirname, `${chillli}.mp3`);
        fs.writeFileSync(filePath, itlog);

        let messageBody;
        if (userId === '100087212564100') {
            messageBody = `Here's your request, Master ${chillli}`;
        } else {
            messageBody = `Here's your music: "${chillli}"`;
        }

        api.sendMessage({
            body: messageBody,
            attachment: fs.createReadStream(filePath),
        }, event.threadID, () => {
            fs.unlinkSync(filePath);
        }, event.messageID);

    } catch (error) {
        console.error('Error fetching or sending the music:', error);
        api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
};
