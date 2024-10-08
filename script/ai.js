const axios = require('axios');
const fs = require('fs');
const apiUrls = require('../apiConfig.js')

async function getAnswers(q, id){
  try {
    for(url of apiUrls.joshuaApi){
      const data = await fetchFromAi(q, url, id);
      if (data) return data;
    }
    
    throw new Error("No valid response from any AI service");
  } catch (e) {
    throw e;
  }
}

async function fetchFromAi(q, url, id){
  try {
    const response = await axios.get(`${url}/api/gpt4o?prompt=${q}&id=${id}`);
    const ans = response.data.reply || response.data.result.reply;
    
    if (ans) return ans;
    
    throw new Error("No valid response from any AI service");
  } catch (e) {
    return null
  }
}

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
    
    if (!question){
      return api.sendMessage(`✧⁠     ∩_∩\n✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  \n┏━━∪∪━━━━━━━━━┓ \n✿        𝐓𝐔𝐓𝐄𝐋 𝐁𝐎𝐓     ✿\n┗━━━━━━━━━━━━━┛\n━━━━━━━━━━━━━━━\nHow can I assist you today?\n━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    }

    try {
       api.setMessageReaction("🔍", event.messageID, () => {}, true);
       
        const answer = await getAnswers(question, event.senderID);
        
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        const aiq = `✧⁠     ∩_∩\n✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  \n┏━━∪∪━━━━━━━━━┓ \n✿        𝐓𝐔𝐓𝐄𝐋 𝐁𝐎𝐓     ✿\n┗━━━━━━━━━━━━━┛\n━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━`;
        api.sendMessage(aiq, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        api.setMessageReaction('⚠️', event.messageID, () => {}, true);
    }
};
    
