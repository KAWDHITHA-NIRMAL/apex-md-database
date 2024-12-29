const { cmd } = require('../command');
const config = require('../config');
const { fetchJson, sleep } = require('../lib/functions');

cmd({
    pattern: "mdc",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure that the URL is valid
        if (!q || (!q.includes("https://cinesubz.co/tvshows") && !q.includes("https://cinesubz.co/movies"))) {
            return reply("Please provide a valid Cinesubz TV show or movie URL.");
        }

        const configs = await readEnv();

        // If the URL contains the TV show link
        if (q.includes("https://cinesubz.co/tvshows")) {
            const tvdata2 = await fetchJson(`https://api-vishwa.vercel.app/cinesub-movie?url=${q}&apikey=alex`);
            if (!tvdata2 || !tvdata2.data || !tvdata2.data.episodesDetails) {
                return reply("Sorry, couldn't retrieve TV show data.");
            }

            let episodes = tvdata2.data.episodesDetails.flatMap(season =>
                season.episodes.map(episode => ({
                    title: `${episode.number} - ${episode.title}`,
                    link: episode.url
                }))
            );

            let episodeList = `*Select Your Episode:*\n`;
            episodes.forEach((episode, index) => {
                episodeList += `\n${index + 1}. *${episode.title}* - [Link](${episode.link})`;
            });

            let ccd = `*📽️CINESUBZ.CO TV-SHOWS®📽️*
            ☘️ *Tɪᴛʟᴇ :* ${tvdata2?.data?.mainDetails?.maintitle ?? 'Null'}
            ▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${tvdata2?.data?.mainDetails?.dateCreated ?? 'Null'}
            ▫️🎭 *Gᴇɴʀᴇꜱ :* ${tvdata2?.data?.mainDetails?.genres?.length > 0 ? tvdata2.data.mainDetails.genres.join(', ') : 'Null'}
            ▫️🕵️‍♂️ *Cᴀsᴛ :* ${tvdata2?.data?.castDetails?.cast?.length > 0 ? tvdata2.data.castDetails.cast.map(cast => cast.name).join(', ') : 'Null'}
            
            *➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
            ▫️🔗 *Join :* https://whatsapp.com/channel/0029VaeyMWv3QxRu4hA6c33Z
            *➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
            
            > *POWERED by VISHWA-MD*`;

            await conn.sendMessage(from, { image: { url: tvdata2?.data?.mainDetails?.imageUrl ?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: ccd }, { quoted: mek });
            return reply(episodeList);
        }

        // If the URL contains the movie link
        if (q.includes("https://cinesubz.co/movies")) {
            const data2 = await fetchJson(`https://api-vishwa.vercel.app/cinesub-movie?url=${q}&apikey=alex`);
            if (!data2 || !data2.data || !data2.data.moviedata) {
                return reply("Sorry, couldn't retrieve movie data.");
            }

            let cc = `*📽️CINESUBZ.CO MOVIE®📽️*
            ☘️ *Tɪᴛʟᴇ :* ${data2?.data?.moviedata?.title ?? 'Null'}
            ▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${data2?.data?.mainDetails?.dateCreated ?? 'Null'}
            ▫️🌎 *Cᴏᴜɴᴛʀʏ :* ${data2?.data?.mainDetails?.country ?? 'Null'}
            ▫️⏱️ *Dᴜʀᴀᴛɪᴏɴ :* ${data2?.data?.mainDetails?.runtime ?? 'Null'}
            ▫️🎭 *Gᴇɴʀᴇꜱ :* ${data2?.data?.moviedata?.genres?.length > 0 ? data2.data.moviedata.genres.join(', ') : 'Null'}
            ▫️👨🏻‍💼 *Dɪʀᴇᴄᴛᴏʀ :* ${data2?.data?.moviedata?.director ?? 'Null'}
            ▫️🕵️‍♂️ *Cᴀsᴛ :* ${data2?.data?.moviedata?.cast?.length > 0 ? data2.data.moviedata.cast.map(cast => cast.name).join(', ') : 'Null'}

            *➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
            ▫️🔗 *Join :* https://whatsapp.com/channel/0029VaeyMWv3QxRu4hA6c33Z
            *➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
            
            > *POWERED by VISHWA-MD*`;

            const link = data2?.data?.dllinks?.directDownloadLinks?.map(directDownloadLink => directDownloadLink.link);
            if (!link || link.length === 0) {
                return reply("No download links found for this movie.");
            }

            // Download links for various quality resolutions
            const _1080 = await fetchJson(`https://api-vishwa.vercel.app/cinesub-download?url=${link[2]}&apikey=alex`);
            const _720 = await fetchJson(`https://api-vishwa.vercel.app/cinesub-download?url=${link[1]}&apikey=alex`);
            const _480 = await fetchJson(`https://api-vishwa.vercel.app/cinesub-download?url=${link[0]}&apikey=alex`);

            const links = _480?.data?.data[0]?.href;
            const size = _480?.data?.data[0]?.fileSize;
            const linkss = _720?.data?.data[0]?.href;
            const sizee = _720?.data?.data[0]?.fileSize;
            const linksss = _1080?.data?.data[0]?.href;
            const sizeee = _1080?.data?.data[0]?.fileSize;

            let movieList = `*Select Your Movie Size:*\n`;
            movieList += `\n1. *480p* - [${size}](${links})`;
            movieList += `\n2. *720p* - [${sizee}](${linkss})`;
            movieList += `\n3. *1080p* - [${sizeee}](${linksss})`;

            await conn.sendMessage(from, { image: { url: data2?.data?.mainDetails?.imageUrl ?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: cc }, { quoted: mek });
            return reply(movieList);
        }
    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});
