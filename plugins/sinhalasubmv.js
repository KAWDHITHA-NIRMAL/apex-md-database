const { cmd } = require('../command');
const config = require('../config');
const { fetchJson, sleep } = require('../lib/functions');

cmd({
  pattern: "mdl",
  desc: "Check bot setting.",
  react: "🎬",
  category: "movie",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
      // Fetch movie details from new API
      let data2 = await fetchJson(`https://www.dark-yasiya-api.site/movie/sinhalasub/search?text=${q}`);
      let urll = await fetchJson(`https://www.dark-yasiya-api.site/movie/sinhalasub/movie?url=${q}`);

      // Check if the API response is valid
      if (!urll || !urll.result || !urll.result.data) {
          return reply("Sorry, I couldn't find any movie data. Please check the link or try again later.");
      }

      // Declare and assign the download links for video qualities
      const quality = urll.result.data.dl_links[0]?.link;
      const quality1 = urll.result.data.dl_links[1]?.link;
      const quality2 = urll.result.data.dl_links[2]?.link;

      // Check if the download links are available
      if (!quality || !quality1 || !quality2) {
          return reply("Sorry, download links for the movie are not available.");
      }

      // Replace "/u/" with "/api/file/" in the links
      let pp = quality.replace("/u/", "/api/file/");
      let pp1 = quality1.replace("/u/", "/api/file/");
      let pp2 = quality2.replace("/u/", "/api/file/");

      // Movie details message
      let msg = `
      🎥 ᴀᴘᴇx ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴇʀ 🎥

☘️ *𝗧ɪᴛʟᴇ : ${urll.result.data.title}*

▫️📅. *𝗥ᴇ𝗟ᴇᴀꜱᴇ 𝗗ᴀ𝖙𝖊 - ${urll.result.data.date}*
▫️🌎. *𝗖ᴏ𝖚𝗻𝖙𝗿𝖞 - ${urll.result.data.country}*
▫️⏱️. *𝗗𝖚𝗿𝗮𝖙𝗂𝗈𝗇 - ${urll.result.data.runtime}*
▫️🎭. *𝗚𝗲𝗻𝗿𝗲𝖘 - ${urll.result.data.category[0]} ${urll.result.data.category[1]} ${urll.result.data.category[2]}*
▫️👨🏻‍💼. *𝗗𝗂𝗿𝗲𝖈𝗍𝗈𝗋 - ${urll.result.data.director}*


▫️🕵️‍♂️. *𝗖𝗮𝘀𝘁 - ${urll.result.data.cast[0].cast_name} ${urll.result.data.cast[1].cast_name}*

▫️📃 *Dᴇꜱᴄʀɪᴘᴛɪᴏɴ*  -

${urll.result.data.description}

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋᴀᴡᴅʜɪᴛʜᴀ ɴɪʀᴍᴀʟ🧑‍💻*`;

      // Download options message
      let downloadOptions = `> *🔢 Please reply with the number you want to select*\n\n🎬 *1.1* | *480p :* ${pp2}\n\n🎬 *1.2* | *720p :* ${pp1}\n\n🎬 *1.3* | *1080p :* ${pp}`;

      // Send movie details with image (use urll.result.data.image instead of movieDetails)
      await conn.sendMessage(from, { 
          image: { url: urll.result.data.images [0] }, // Corrected image URL
          caption: msg 
      }, { quoted: mek });

      // Send download options
      const sentMsg = await conn.sendMessage(from, { text: downloadOptions }, { quoted: mek });

      const messageID = sentMsg.key.id;

      // Listen for the reply to download options
      conn.ev.on('messages.upsert', async (messageUpdate) => {
          const mek = messageUpdate.messages[0];
          if (!mek.message) return;
          const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
          const from = mek.key.remoteJid;
          const sender = mek.key.participant || mek.key.remoteJid;

          // Check if the message is a reply to the previously sent message
          const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

          if (isReplyToSentMsg) {
              await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
              await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

              // Handle the user's selection of video quality
              if (messageType === '1.1') {
                  await conn.sendMessage(from, { document: { url: pp2 }, mimetype: "video/mp4", fileName: `🎬 ᴀᴘᴇx ᴍᴅ 🎬\n${urll.result.data.title}.mkv`, caption: `*🎬Name : ${urll.result.data.title} 480p*\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴘᴇx ᴍᴅ🎥*` }, { quoted: mek });
              } else if (messageType === '1.2') {
                  await conn.sendMessage(from, { document: { url: pp1 }, mimetype: "video/mp4", fileName: `🎬 ᴀᴘᴇx ᴍᴅ 🎬\n${urll.result.data.title}.mkv`, caption: ` *🎬Name :${urll.result.data.title} 720p*\n\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴘᴇx ᴍᴅ🎥*` }, { quoted: mek });
              } else if (messageType === '1.3') {
                  await conn.sendMessage(from, { document: { url: pp }, mimetype: "video/mp4", fileName: `🎬 ᴀᴘᴇx ᴍᴅ 🎬\n${urll.result.data.title}.mkv`, caption: ` *🎬Name :${urll.result.data.title} 1080p*\n\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴘᴇx ᴍᴅ🎥*` }, { quoted: mek });
              }

              // React with confirmation
              await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
              console.log("Response sent successfully✅");
          }
      });
  } catch (e) {
      console.log(e);
      reply(`Error: ${e.message || e}`);
  }
});


cmd({
    pattern: "mds",
    desc: "Search and show top Sinhala subtitles.",
    react: "🎬",
    category: "movie",
    filename: __filename
  },
  async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Fetch movie details from the new API
        let data2 = await fetchJson(`https://www.dark-yasiya-api.site/movie/sinhalasub/search?text=${q}`);
        
        // Check if the API response is valid
        if (!data2 || !data2.result || !data2.result.data || data2.result.data.length === 0) {
            return reply("Sorry, I couldn't find any Sinhala subtitles for the movie. Please check the title or try again later.");
        }
  
        // Prepare the list of top films
        const topFilms = data2.result.data.slice(0, 20); // Show top 20 films
        let filmsList = topFilms.map((film, index) => `${index + 1}. *🎬 ${film.title}* - *Link*(${film.link})`).join("\n");
  
        // Movie details message with the link
        let msg = `🎥 ᴀᴘᴇx ᴍᴏᴠɪᴇ Search 🎥
  
  *┃ 🔍 Search Results for:* *${q}*
  
  ${filmsList}
  
  *┃ Please reply with the number of the movie you want to explore.*`;
  
        // Send movie details with image (using a static image URL)
        await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/K5JRNTJ/none-credit22.png' }, // Static image URL
            caption: msg 
        }, { quoted: mek });
  
        // Listen for the reply to movie selection
        const listener = async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
  
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
  
            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === mek.key.id;
  
            if (isReplyToSentMsg) {
                const selectedMovieIndex = parseInt(messageType, 10) - 1;
                if (selectedMovieIndex < 0 || selectedMovieIndex >= topFilms.length || isNaN(selectedMovieIndex)) {
                    return reply("*Invalid movie number. Please select a valid number from the list.*");
                }
  
                const selectedMovie = topFilms[selectedMovieIndex];
  
                // Display movie details after selection
                const movieDetails = `
  🎥 ᴀᴘᴇx ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴇʀ 🎥
  
  ☘️ *𝗧ɪᴛʟᴇ : ${selectedMovie.title}*
  
  ▫️📅. *𝗥ᴇ𝗟ᴇ𝗔𝗦𝗘 𝗗𝗔𝗧𝗘 - ${selectedMovie.date}*
  ▫️🌎. *𝗖𝗢𝗨𝗡𝗧𝗥𝗬 - ${selectedMovie.country}*
  ▫️⏱️. *𝗗𝖚𝗿𝗮𝖙𝗂𝗈𝗇 - ${selectedMovie.runtime}*
  ▫️🎭. *𝗚𝗘𝗡𝗥𝗘𝖲 - ${selectedMovie.category.join(', ')}*
  ▫️👨🏻‍💼. *𝗗𝗂𝗿𝗲𝖈𝗧𝗢𝗋 - ${selectedMovie.director}*
  ▫️🕵️‍♂️. *𝗖𝗮𝘀𝘁 - ${selectedMovie.cast.map(c => c.cast_name).join(', ')}*
  
  ▫️📃 *Description:* 
  ${selectedMovie.description}
  
  > ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋᴀᴡᴅʜɪᴛʜᴀ ɴɪʀᴍᴀʟ🧑‍💻`;
  
                // Send the movie details with static image
                await conn.sendMessage(from, {
                    image: { url: 'https://i.ibb.co/K5JRNTJ/none-credit22.png' }, // Static image URL for the selected movie
                    caption: movieDetails
                }, { quoted: mek });
  
                // React to confirm the selection
                await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
            }
        };
  
        // Start listening for replies
        conn.ev.on('messages.upsert', listener);
  
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message || e}`);
    }
  });
  