const { fetchJson } = require('../lib/functions');
const { cmd, commands } = require('../command');

const apilink = 'https://www.dark-yasiya-api.site';

cmd({
    pattern: "downlink",
    desc: "get movie download links",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure only the owner can execute this command
        if (!isOwner) return reply("*_This is an owner cmd._*");

        // Check if the provided URL is from 'sinhalasub.lk'
        if (!q.startsWith("https://sinhalasub.lk/")) return reply("*_Please give me a sinhalasub.lk URL._*");

        // Add reaction for processing
        await m.react("🔄");

        // Fetch movie details using the API
        const mv = await fetchJson(`${apilink}/movie/sinhalasub/movie?url=${q}`);
        const array = mv.result.data.dl_links;

        let dt = `*_${mv.result.data.title} All Download Links ⬇️_*\n\n`;
        let cap = `\n\n> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴀʀᴜ`;

        // Check if no download links are available
        if (!array || array.length === 0) {
            await reply("*_No download links in this movie._*");
            await m.react("❌");
            return;
        }

        // Format the result string with movie download details
        const result = array.map((movie, index) => 
            `${index + 1}. *Quality :* ${movie.quality}\n*Size :* ${movie.size}\n*Link :* ${movie.link}`).join("\n\n");

        // Send message with movie download links and an image
        await conn.sendMessage(from, {
            image: { url: 'https://i.ibb.co/K5JRNTJ/none-credit22.png' }, 
            caption: `${dt} ${result} ${cap}`
        }, { quoted: mek });

        // Add success reaction after operation
        await m.react("✅");
        console.log("Response sent successfully✅");

    } catch (e) {
        console.log(e);
        await reply(`${e}`);
        await m.react("❌");  // Add failure reaction
    }
});


    

cmd({
    pattern: "dirsend",
    desc: "download direct url",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply("*_This is an owner cmd._*");

        const id = "1234567890@s.whatsapp.net"; // Replace with the target JID

        let a = q;
        let b = a.split(" & ");
        let c = b[0];
        let d = b[1];

        if (!a) return reply(`*_Please give me a direct link & file name. Ex :- .dirsend <direct link> & <file name>_*`);
        if (!d) return reply("*_Please give me a file name._*");

        // Add reaction for processing
        await m.react("🔄");

        await conn.sendMessage(id, { document: { url: c }, mimetype: "video/mp4", fileName: d + ".mp4", caption: "> ɪɴꜰɪɴɪᴛʏ ᴍᴏᴠɪᴇ ᴡᴏʀʟᴅ" });

        // Add correct reaction after successful upload
        await m.react("✅");
        console.log("Response sent successfully✅");

    } catch (e) {
        console.log(e);
        await reply(`${e}`);
        await m.react("❌");  // Add failure reaction
    }
});


cmd({
    pattern: "dirdl",
    desc: "download direct url",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply("*_This is an owner cmd._*");

        if (!q) return reply(`*_Please give me a direct link._*`);

        // Add reaction for processing
        await m.react("🔄");

        await conn.sendMessage(from, { document: { url: q }, mimetype: "video/mp4", fileName: "🎬 ᴀᴘᴇx ᴍᴅ 🎬" + ".mp4", caption: "> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ" });

        // Add correct reaction after successful download
        await m.react("✅");
        console.log("Response sent successfully✅");

    } catch (e) {
        console.log(e);
        await reply(`${e}`);
        await m.react("❌");  // Add failure reaction
    }
});

cmd({
    pattern: "pixdl",
    desc: "Download direct URL",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply("*_This is an owner cmd._*");

        if (!q) return reply(`*_Please provide a direct link._*`);

        // Add reaction for processing
        await m.react("🔄");

        // Construct the Pixeldrain API URL
        const pixeldrainApiUrl = `https://www.dark-yasiya-api.site/download/pixeldrain?url=${encodeURIComponent(q)}`;

        // Fetch the file data from the Pixeldrain API
        const res = await fetch(pixeldrainApiUrl);
        const data = await res.json();

        if (!data.status) {
            return reply(`*_Failed to retrieve file information._*`);
        }

        // Extract file information from the API response
        const { fileName, dl_link } = data.result;

        // Add custom suffix to the file name
        const newFileName = `🎬 ᴀᴘᴇx ᴍᴅ 🎬 ${fileName}`;

        // Send the file from Pixeldrain using the download link
        await conn.sendMessage(from, {
            document: { url: dl_link },
            mimetype: "video/mp4",
            fileName: newFileName,
            caption: `\n*🎬Name :* *${fileName}*\n\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴘᴇx ᴍᴅ🎥*`
        });

        // Add correct reaction after successful download
        await m.react("✅");
        console.log("Response sent successfully✅");

    } catch (e) {
        console.log(e);
        await reply(`${e}`);
        await m.react("❌");  // Add failure reaction
    }
});
