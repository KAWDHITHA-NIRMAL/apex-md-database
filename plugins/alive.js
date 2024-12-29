const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const pdfUrl = 'https://i.ibb.co/HKj1N5j/none-credit22.png';

cmd({
    pattern: "alive",
    desc: "To get the menu.",
    react: "📜",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: '',
ai: '',
fun: '',
other: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `*◦ :* ${commands[i].pattern}\n`;
 }
}

let menumsg = `
👋 Hello ${pushname},

⦁ ɪ ᴀᴍ ᴀɴ ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴅᴇʀ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴛʜᴀᴛ ᴄᴀɴ ʜᴇʟᴘ ᴛᴏ ᴅᴏ ꜱᴏᴍᴇᴛʜɪɴɢ, ꜱᴇᴀʀᴄʜ ᴀɴᴅ ɢᴇᴛ ᴅᴀᴛᴀ / ɪɴꜰᴏʀᴍᴀᴛᴜᴏɴ ᴏɴʟʏ ᴛʜʀᴏᴜɢʜ *ᴡʜᴀᴛꜱᴀᴘᴘ.*

*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
> ◈ *𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
> ◈ *𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
> ◈ *𝙿𝙻𝙰𝚃𝙵𝙾𝚁𝙼 -* ${os.hostname()}
*╰───────────◉◉►*
╭───────────◉◉►
│👾 *LIST MENU*
│   ───────
│ _1_  *Zoon*
╰───────────◉◉►

*🌟 Reply the Number you want to select*
`
let downloadmenu = `
📥 *DOWNLOAD COMMANDS* 📥\n\n${menu.download}
`
// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, {
document: { url: pdfUrl }, // Path to your PDF file
    fileName: '🎥ᴀᴘᴇx ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴅᴇʀ🎬', // Filename for the document
    mimetype: "application/pdf",
    fileLength: 99999999999999,
    caption: menumsg,
    contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterName: '乡ᴀᴘᴇx ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴅᴇʀ🎥࿐',
            newsletterJid: "120363369279851263@newsletter",
        },
        externalAdReply: {
            title: '🎥ᴀᴘᴇx ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴅᴇʀ📽',
            body: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ • ᴋᴀᴡᴅʜɪᴛʜᴀ ɴɪʀᴍᴀʟ🧑‍💻',
            thumbnailUrl: config.ALIVE_IMG, // Use the URL directly here
            sourceUrl: 'https://kawwa.pages.dev/',
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
});
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '👾', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, {
            document: { url: pdfUrl }, // Path to your PDF file
            fileName: '🎥ᴀᴘᴇx ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴅᴇʀ🎬', // Filename for the document
            mimetype: "application/pdf",
                fileLength: 99999999999999,
                caption: downloadmenu,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterName: '乡ᴀᴘᴇx ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴅᴇʀ🎥࿐',
                        newsletterJid: "120363369279851263@newsletter",
                    },
                    externalAdReply: {
                        title: '🎥ᴀᴘᴇx ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴅᴇʀ📽',
                        body: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ • ᴋᴀᴡᴅʜɪᴛʜᴀ ɴɪʀᴍᴀʟ🧑‍💻',
                        thumbnailUrl: config.ALIVE_IMG, // Use the URL directly here
                        sourceUrl: 'https://kawwa.pages.dev/',
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        // React to the successful completion of the task
        }
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});


