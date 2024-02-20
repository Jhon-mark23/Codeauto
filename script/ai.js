const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`✧⁠     ∩_∩
✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  
┏━━∪∪━━━━━━━━━┓ 
✿     𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 v2    ✿
┗━━━━━━━━━━━━━┛ ━━━━━━━━━━━━━━━
Butangi pod og questions ba🙄
━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    return;
  }
  api.setMessageReaction('🔍', event.messageID, () => {}, true);
  try {
    const {
      data
    } = await axios.get(`https://openaikey.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(`✧⁠     ∩_∩
✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  
┏━━∪∪━━━━━━━━━┓ 
✿     𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 v2    ✿
┗━━━━━━━━━━━━━┛ ━━━━━━━━━━━━━━━
${response}
━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    await api.setMessageReaction('✅', event.messageID, () => {}, true);
  } catch (error) {
    api.sendMessage(`AN ERROR OCCURED IN THE CODEBUDDY SERVER WHILE FETCHING YOUR REQUEST\n\nPLEASE RETYPE YOUR QUESTIONS OR CONTACT THE DEVELOPER, RENZ CLEO IF THERE'S STILL A PROBLEM.`, event.threadID, event.messageID);
  }
};
