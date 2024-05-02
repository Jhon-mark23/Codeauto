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
✿      𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆       ✿
┗━━━━━━━━━━━━━┛ ━━━━━━━━━━━━━━━  
How can I help you today?
━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    return;
  }
  api.setMessageReaction('🔍', event.messageID, () => {}, true);
  try {
    fetch("https://deku-rest-api.replit.app/gpt4?prompt=hi&uid=100")
    .then(e => e.json())
    .then(d => {
      api.sendMessage(`✧⁠     ∩_∩
✧⁠◝( ⁠ꈍ⁠ᴗ⁠ꈍ)◜⁠✧  
┏━━∪∪━━━━━━━━━┓ 
✿      𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆       ✿
┗━━━━━━━━━━━━━┛ ━━━━━━━━━━━━━━━ \n${d.gpt4}
━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
    api.setMessageReaction('✅', event.messageID, () => {}, true);
      })
  } catch (error) {
    api.setMessageReaction('⚠️', event.messageID, () => {}, true);
  }
};
