const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "sub",
    alias: ["subtitle", "subdl"],
    desc: "Download subtitles",
    category: "download",
    react: "🎥",
    filename: __filename,
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const apilink = "https://www.dark-yasiya-api.site";

        if (!q) return reply("*_Please provide a movie name to download the subtitle._*");

        const searchResult = await fetchJson(`${apilink}/search/zoom?text=${encodeURIComponent(q)}`);
        const subtitleData = searchResult?.result?.data;

        if (!subtitleData || subtitleData.length === 0) {
            return reply("*_Can't find subtitles for the given movie._*");
        }

        // Show top 10 subtitles
        const topSubtitles = subtitleData.slice(0, 10);
        const subtitleList = topSubtitles.map((sub, index) => `${index + 1}. *🎬${sub.title}*`).join("\n");

        const message = `*_APEXSUBTITLE DOWNLOADER_* 🎦

> 🔍 *Search Results for:* *${q}*

${subtitleList}

*┃ 📥 Reply with the number of the subtitle you want to download.*`;

        const menuMessage = await conn.sendMessage(from, { 
            image: { url: 'https://i.ibb.co/K5JRNTJ/none-credit22.png' }, 
            caption: message 
        }, { quoted: mek });

        // Create a listener for the subtitle selection
        const listener = async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userReply = msg.message.extendedTextMessage.text.trim();
            const isReplyToMenu = msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id;

            if (isReplyToMenu) {
                const selectedIndex = parseInt(userReply, 10) - 1;

                if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= topSubtitles.length) {
                    return reply("*_Invalid option. Please reply with a valid number._*");
                }

                const selectedSubtitle = topSubtitles[selectedIndex];
                const downloadResult = await fetchJson(`${apilink}/download/zoom?url=${selectedSubtitle.url}`);
                const { dl_link: downloadLink, title, desc } = downloadResult?.result?.data || {};

                if (!downloadLink) return reply("*_Can't download the subtitle. Please try again later._*");

                const fileFormatMessage = `> *🎥Apex Subtitle Downloader🎥*

*✨Movie Name:*  🎬 *${title}*

*🗒Description:* ${desc}

> *⬇️Reply with the number below to choose the file format:⚡️*

*1. ZIP File📔*

*2. RAR File📔*

*3. 7z File📔*`;

                const formatMessage = await conn.sendMessage(from, { text: fileFormatMessage }, { quoted: mek });

                // Handle file format selection
                const formatListener = async (formatUpdate) => {
                    const formatMsg = formatUpdate.messages[0];
                    if (!formatMsg.message || !formatMsg.message.extendedTextMessage) return;

                    const formatReply = formatMsg.message.extendedTextMessage.text.trim();
                    const isReplyToFormatMenu = formatMsg.message.extendedTextMessage.contextInfo?.stanzaId === formatMessage.key.id;

                    if (isReplyToFormatMenu) {
                        let selectedFile;
                        switch (formatReply) {
                            case "1":
                                selectedFile = { mimetype: "application/zip-compressed", fileExtension: "zip" };
                                break;
                            case "2":
                                selectedFile = { mimetype: "application/x-rar-compressed", fileExtension: "rar" };
                                break;
                            case "3":
                                selectedFile = { mimetype: "application/x-7z-compressed", fileExtension: "7z" };
                                break;
                            default:
                                return reply("*_Invalid option. Please reply with a valid number._*");
                        }

                        await conn.sendMessage(from, {
                            document: { url: downloadLink },
                            mimetype: selectedFile.mimetype,
                            fileName: `${title}.${selectedFile.fileExtension}`,
                            caption: `\n*🎬 Name:* *${title}*\n\n\n*┃ 🎥ᴀᴘᴇx ᴍᴠᴅʟ🎬*`,
                        }, { quoted: mek });

                        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
                    }
                };

                // Add the listener for format choice
                conn.ev.on('messages.upsert', formatListener);
            }
        };

        // Add the listener for subtitle choice
        conn.ev.on('messages.upsert', listener);

    } catch (error) {
        console.error("Subtitle command error:", error);
        reply("*_An error occurred while processing your request. Please try again later._*");
    }
});



cmd({
    pattern: "bice",
    alias: ["subtitle", "subdl"],
    desc: "Download subtitles",
    category: "download",
    react: "🎥",
    filename: __filename,
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const searchApi = "https://www.dark-yasiya-api.site/search/baiscope";
        const downloadApi = "https://www.dark-yasiya-api.site/download/baiscope";

        if (!q) {
            return reply("*_Please provide a movie name to download the subtitle._*");
        }

        // Search API Call
        const searchResult = await fetchJson(`${searchApi}?text=${encodeURIComponent(q)}`).catch((err) => {
            console.error("Search API error:", err);
            return null;
        });

        if (!searchResult || !searchResult.result || !searchResult.result.data) {
            return reply("*_No subtitles found for the given movie._*");
        }

        const subtitleData = searchResult.result.data;

        if (!subtitleData.length) {
            return reply("*_No subtitles found for the given movie._*");
        }

        // Display top 10 subtitles
        const topSubtitles = subtitleData.slice(0, 10);
        const subtitleList = topSubtitles.map((sub, index) => `${index + 1}. *🎬 ${sub.title}*\n   🔗 [View](${sub.url})`).join("\n");

        const message = `*_APEXSUBTITLE DOWNLOADER_* 🎦

> 🔍 *Search Results for:* *${q}*

${subtitleList}

*┃ 📥 Reply with the number of the subtitle you want to download.*`;

        const menuMessage = await conn.sendMessage(from, { text: message }, { quoted: mek });

        const listener = async (msgUpdate) => {
            try {
                const msg = msgUpdate.messages[0];
                if (!msg.message || !msg.message.extendedTextMessage) return;

                const userReply = msg.message.extendedTextMessage.text.trim();
                const isReplyToMenu = msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id;

                if (isReplyToMenu) {
                    const selectedIndex = parseInt(userReply, 10) - 1;

                    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= topSubtitles.length) {
                        return reply("*_Invalid option. Please reply with a valid number._*");
                    }

                    const selectedSubtitle = topSubtitles[selectedIndex];

                    // Download API Call
                    const downloadResult = await fetchJson(`${downloadApi}?url=${encodeURIComponent(selectedSubtitle.url)}`).catch((err) => {
                        console.error("Download API error:", err);
                        return null;
                    });

                    if (!downloadResult || !downloadResult.result || !downloadResult.result.dl_link) {
                        return reply("*_Unable to download the subtitle. Please try again later._*");
                    }

                    const { dl_link: downloadLink, title, desc } = downloadResult.result;

                    await conn.sendMessage(from, {
                        document: { url: downloadLink },
                        mimetype: "application/zip", // Assuming subtitles are packaged as zip files
                        fileName: `${title}.zip`,
                        caption: `\n*🎬 Name:* *${title}*\n\n${desc ? `*📝 Description:* ${desc}` : ''}\n\n*┃ 🎥 Apex Subtitle Downloader 🎥*`,
                    }, { quoted: mek });

                    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

                    // Notify after download
                    reply(`✅ *The subtitle for "${title}" has been downloaded successfully!*`);

                    // Remove the listener after processing
                    conn.ev.off('messages.upsert', listener);
                }
            } catch (error) {
                console.error("Listener error:", error);
                reply("*_An error occurred while processing your request. Please try again later._*");
            }
        };

        conn.ev.on('messages.upsert', listener);

    } catch (error) {
        console.error("Subtitle command error:", error);
        reply("*_An error occurred while processing your request. Please try again later._*");
    }
});
