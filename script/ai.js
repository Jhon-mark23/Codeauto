const axios = require('axios');
const fs = require('fs');
const {
  Hercai
} = require('hercai');
const herc = new Hercai();

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "renzz", 
    description: "EDUCATIONAL",
    usePrefix: false,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args}) {
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
       api.setMessageReaction("🔍", event.messageID, () => {}, true);

        const uid = event.senderID;
        const info = await api.getUserInfo(event.senderID);
        const name = info[event.senderID].name;
        
        const model = "gemini";
        const response = await deku[model](question);
        
        const answer = response;
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        const aiq = `✧⁠     ∩_∩\n✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  \n┏━━∪∪━━━━━━━━━┓ \n✿        𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆      ✿\n┗━━━━━━━━━━━━━┛\n━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━`;
        api.sendMessage(aiq, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        api.setMessageReaction('⚠️', event.messageID, () => {}, true);
    }
};
    
