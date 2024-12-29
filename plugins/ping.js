const { cmd } = require('../command');

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "✅",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '*Apex ᴍᴅ...*' });
        const endTime = Date.now();
        const ping = endTime - startTime;
        await conn.sendMessage(from, { text: `*📍 Ping: ${ping}ms*` }, { quoted: message });
    } catch (error) {
        console.error("Ping command error:", error);
        reply("An error occurred while checking the ping.");
    }
});