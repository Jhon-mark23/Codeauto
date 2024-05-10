const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "cleo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Churchill, mod by Cleo",
    description: "EDUCATIONAL",
    usePrefix: false,
    commandCategory: "AI",
    usages: "ai2 [question]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args}) {
    const uid = event.senderID;
    const info = await api.getUserInfo(event.senderID);
    const name = info[event.senderID].name;
    const query = args.join(' ');
    
    if (!query)
      return api.sendMessage(`🗨 | 𝙲𝚕𝚎𝚘 | 
━━━━━━━━━━━━━━━━ Hello! 👋 How can I assist you today?`, event.threadID, event.messageID);
    
    const question = `In this conversation, you're Cleo. Add some emoji on your content to make it adorable ${name}. Now answer the following make it detailed: ` + query;

    try {
       api.setMessageReaction("⏱️", event.messageID, () => {}, true);

      const userInput = encodeURIComponent(question);

        const apiUrl = `https://openaikey-x20f.onrender.com/api?prompt=${userInput}`;

        const respons = await axios.get(apiUrl);
        const answer = respons.data.response;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
    const aiq = `🗨 | 𝙲𝚕𝚎𝚘 | 
━━━━━━━━━━━━━━━━
 ${answer}`;
      api.sendMessage(aiq, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        api.setMessageReaction("⚠️", event.messageID, () => {}, true);
    }
};
                             
