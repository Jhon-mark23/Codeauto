const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Churchill", // modified by Joshua Apostol
    description: "EDUCATIONAL",
    usePrefix: false,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args, botname, admin}) {
    const question = args.join(' ');
    
    if (!question)
      return api.sendMessage(`✧⁠     ∩_∩
✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  
┏━━∪∪━━━━━━━━━┓ 
✿        𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆      ✿
┗━━━━━━━━━━━━━┛
━━━━━━━━━━━━━━━
How can I assist you today?
━━━━━━━━━━━━━━━`, event.threadID, event.messageID);

    try {
       api.setMessageReaction("⏰", event.messageID, () => {}, true);
        const info1 = await new Promise(resolve => {
        api.sendMessage("⏰ Please wait...", event.threadID, (err, info1) => {
        resolve(info1);
       }, event.messageID);
      });

        const uid = event.senderID;
        const info = await api.getUserInfo(event.senderID);
        const name = info[event.senderID].name;

      const userInput = encodeURIComponent(question);

        const apiUrl = `https://markdevs-last-api.onrender.com/gpt4?prompt=${userInput}&uid=${uid}`;
        
        const respons = await axios.get(apiUrl);
        const answer = respons.data.gpt4;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
    const aiq = `✧⁠     ∩_∩
✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  
┏━━∪∪━━━━━━━━━┓ 
✿        𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆      ✿
┗━━━━━━━━━━━━━┛ ━━━━━━━━━━━━━━━
${answer}
━━━━━━━━━━━━━━━`;
      api.editMessage(aiq, info1.messageID, () => {});
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
