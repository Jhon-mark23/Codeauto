const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'Ai2',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  description: "An AI command powered by Hercai",
  usage: "Ai2 [prompt]",
  credits: 'Developer',
  cooldown: 0,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'hercai'. For example: 'Ai2 What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  try {
    const response = await herc.question({
      model: "v3",
      content: input
    });
    api.sendMessage(response.reply, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Something went wrong. Please contact renz if the problem persist.', event.threadID, event.messageID);
  }
};
