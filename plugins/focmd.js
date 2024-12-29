const { cmd } = require('../command');

cmd({
    pattern: "forward",
    alias: ["fo"],
    desc: "Forward messages to a specific JID.",
    use: ".forward <JID>",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, q, isOwner, reply }) => {
    if (!isOwner) return reply("This command is restricted to the owner.");
    if (!q) return reply("Please provide a target JID.");
    if (!quoted) return reply("Please reply to the message you want to forward.");

    const forwardMessage = quoted.fakeObj || quoted;

    try {
        await conn.sendMessage(q, { forward: forwardMessage });
        reply(`Message successfully forwarded to:\n\n${q}`);
    } catch (error) {
        console.error("Forward command error:", error);
        reply("Failed to forward the message.");
    }
});