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
  cooldown: 0,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  
  if (!input) {
    api.sendMessage(`✧⁠     ∩_∩
✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  
┏━━∪∪━━━━━━━━━┓ 
✿      𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆       ✿
┗━━━━━━━━━━━━━┛ ━━━━━━━━━━━━━━━  
How can I help you today?
━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    return;
  }
  
  api.setMessageReaction('🔍', event.messageID, () => {}, true);
  
  try {
    const { data } = await axios.get(`https://openaikey-x20f.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    let response = `✧⁠     ∩_∩
✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  
┏━━∪∪━━━━━━━━━┓ 
✿      𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆       ✿
┗━━━━━━━━━━━━━┛ ━━━━━━━━━━━━━━━ \n${data.response}
━━━━━━━━━━━━━━━`;
    api.sendMessage(response, event.threadID, event.messageID);
  } catch (error) {
    api.setMessageReaction('⚠️', event.messageID, () => {}, true);
  }
};
