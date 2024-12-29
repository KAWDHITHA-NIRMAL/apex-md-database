const { cmd } = require('../command');
const config = require('../config');
const { fetchJson, sleep } = require('../lib/functions');

cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 Shutting down...").then(() => process.exit());
});

// 4. Block User
cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to block.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 User ${user} blocked successfully.`);
    } catch (error) {
        reply(`❌ Error blocking user: ${error.message}`);
    }
});

// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to unblock.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
        reply(`❌ Error unblocking user: ${error.message}`);
    }
});

// 6. Clear All Chats
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});

cmd({
    pattern: "restart",
    desc: "restart the bot",
    category: "owner",
    react: "☣",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner) return reply(`only for owner`);
const {exec} = require("child_process")
reply("*restarting...*")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
});

cmd({
    pattern: "owner",
    desc: "im owner",
    react: "👩‍💻",
    category: "main",
    filename: __filename
  },
  async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      // You don't need readEnv here
      let vcard = 'BEGIN:VCARD\n' 
        + 'VERSION:3.0\n' 
        + `FN: ᴋᴀᴡᴅʜɪᴛʜᴀ ᴅᴇᴠ👨‍💻\n` 
        + `ORG: Meta Developer</>;\n` 
        + `TEL;type=CELL;type=VOICE;waid=94729787750:+94729787750\n` 
        + 'END:VCARD';
  
      // Send the contact details
      await conn.sendMessage(from, { 
        contacts: { 
          displayName: `ᴋᴀᴡᴅʜɪᴛʜᴀ ᴅᴇᴠ👨‍💻`, 
          contacts: [{ vcard }] 
        },  
        quoted: mek
      });
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  });

cmd({
    pattern: "owners",
    desc: "im owner",
    react: "👩‍💻",
    category: "main",
    filename: __filename
  },
  async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
      // First owner's vCard
      let vcard1 = 'BEGIN:VCARD\n' 
        + 'VERSION:3.0\n' 
        + `FN: ᴋᴀᴡᴅʜɪᴛʜᴀ ᴅᴇᴠ👨‍💻\n` 
        + `ORG: Meta Developer </>;\n` 
        + `TEL;type=CELL;type=VOICE;waid=94729787750:+94729787750\n` 
        + 'END:VCARD';

      // Second owner's vCard
      let vcard2 = 'BEGIN:VCARD\n' 
        + 'VERSION:3.0\n' 
        + `FN: ᴋᴀᴡᴅʜɪᴛʜᴀ ɴɪʀᴍᴀʟ\ 🫂\n` 
        + `ORG: C.E.O SOLO DEVELOPER </>;\n` 
        + `TEL;type=CELL;type=VOICE;waid=94740617415:+94740617415\n` 
        + 'END:VCARD';

      // Send both contact details (first and second owners)
      await conn.sendMessage(from, { 
        contacts: { 
          displayName: `ᴋᴀᴡᴅʜɪᴛʜᴀ ᴅᴇᴠ👨‍💻 & ᴋᴀᴡᴅʜɪᴛʜᴀ ɴɪʀᴍᴀʟ\ 🫂`, 
          contacts: [{ vcard: vcard1 }, { vcard: vcard2 }] 
        },  
        quoted: mek
      });
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  });