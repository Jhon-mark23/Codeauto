module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'Develeoper',
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  api.sendMessage(`𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 👾
━━━━━━━━━━━━━━━
  ★ Adduser 
  ★ Ai
  ★ Cleo
  ★ Music 
  ★ Pedro 
  ★ Shoti
━━━━━━━━━━━━━━━
𝗕𝗼𝘁 𝗼𝘄𝗻𝗲𝗿: 𝚁𝚎𝚗𝚣 𝙲𝚕𝚎𝚘

𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗔𝗶: https://codebuddy.great-site.net

𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 𝗬𝗧: https://www.youtube.com/@CodeBuddySolutions`, threadID, messageID);
};
module.exports.handleEvent = async function({
  api,
  event,
  prefix
}) {
  const {
    threadID,
    messageID,
    body
  } = event;
  const message = prefix ? 'This is my prefix: ' + prefix : "𝗖𝗼𝗱𝗲𝗕𝘂𝗱𝗱𝘆 👾
━━━━━━━━━━━━━━━
 Sorry, I don't have a prefix.
━━━━━━━━━━━━━━━";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
}
