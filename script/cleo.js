const axios = require('axios');
const fs = require('fs');
const apiUrls = require('../apiConfig.js')

async function getAnswers(q){
  try {
    for(url of apiUrls.codebuddyApi){
      const data = await fetchFromAi(q, url);
      if (data) return data;
    }
    
    throw new Error("No valid response from any AI service");
  } catch (e) {
    throw e;
  }
}

async function fetchFromAi(q, url){
  try {
    const { data } = await axios.get(`${url}`) await axios.get(`${url}/new/gpt-3_5-turbo?prompt=${q}`);
    if (data) return data.result.reply;
    
    throw new Error("No valid response from any AI service");
  } catch (e) {
    return null
  }
}

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
      return api.sendMessage(`🗨 | 𝙲𝚕𝚎𝚘 | \n━━━━━━━━━━━━━━━━ Hello! 👋 How can I assist you today?`, event.threadID, event.messageID);
      
    const question = `In this conversation, you're Cleo. Add some emoji on your content to make it adorable ${name}. Now answer the following make it detailed: ` + query;

    try {
       api.setMessageReaction("⏱️", event.messageID, () => {}, true);
       
       const answer = await getAnswers(question);
       
       api.setMessageReaction("✅", event.messageID, () => {}, true);
          
       const aiq = `🗨 | 𝙲𝚕𝚎𝚘 | \n━━━━━━━━━━━━━━━━\n${answer}`;
          
       api.sendMessage(aiq, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        api.setMessageReaction("⚠️", event.messageID, () => {}, true);
    }
};
                             
