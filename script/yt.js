const fs = require('fs');
const path = require('path');
const axios = require('axios');
const yts = require('yt-search');

module.exports.config = {
  name: "yt",
  hasPermission: 0,
  version: "1.0.0",
  description: "Get YouTube video download link",
  usePrefix: true,
  credits: "Jonell Magallanes",
  cooldowns: 10,
  commandCategory: "Utility"
};

module.exports.run = async function ({ api, event, args }) {
  if (!args[0]) {
    return api.sendMessage(`🥲 Please enter a video name!`,event.threadID);
  }

  try {
    const song = args.join(" ");
    const findingMessage = await api.sendMessage(`🔍 | Finding "${song}". Please wait...`, event.threadID);

    const searchResults = await yts(song);
    const firstResult = searchResults.videos[0];

    if (!firstResult) {
      await api.sendMessage(`❌ | No results found for "${song}".`, event.threadID);
      return;
    }

    const { title, url } = firstResult;

    await api.editMessage(`⏱️ | Video found: "${title}". Retrieving download link...`, findingMessage.messageID);

    const apiUrl = `https://joncll.serv00.net/videodl.php?url=${url}`;
    const response = await axios.get(apiUrl);
    const { video } = response.data;

    if (!video) {
      await api.sendMessage(`❌ | No download link found for "${title}".`, event.threadID);
      return;
    }

    const responseStream = await axios.get(video, {
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const filePath = path.resolve(__dirname, 'cache', `${Date.now()}-${title}.mp4`);
    const fileStream = fs.createWriteStream(filePath);

    responseStream.data.pipe(fileStream);

    fileStream.on('finish', async () => {
      const stats = fs.statSync(filePath);
      const fileSizeInMB = stats.size / (1024 * 1024);

      if (fileSizeInMB > 25) {
        await api.sendMessage(`❌ | The file size exceeds the 25MB limit. Unable to send "${title}".`, event.threadID);
        fs.unlinkSync(filePath);
        return;
      }

      await api.sendMessage({
        body: `🎥 | Here is your video from YouTube: "${title}"\n\nTitle: ${title}\nYouTube Link: ${url}`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID);

      fs.unlinkSync(filePath);
      api.unsendMessage(findingMessage.messageID);
    });

    responseStream.data.on('error', async (error) => {
      console.error(error);
      await api.sendMessage(`❌ | Sorry, there was an error downloading the video: ${error.message}`, event.threadID);
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
    await api.sendMessage(`❌ | Sorry, there was an error retrieving the video: ${error.message}`, event.threadID);
  }
};
