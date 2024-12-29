require('dotenv').config();  // Load environment variables from .env file

const config = require('../config');
let fs = require('fs');
const { exec } = require('child_process');
const { cmd } = require('../command');

cmd({
    pattern: "update",
    react: "🔄",
    desc: "Update folder from GitHub",
    category: "system",
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const repoUrl = 'https://github.com/KAWDHITHA-NIRMAL/test1000.git'; // Private repo URL
        const targetFolder = 'plugins'; // Folder to be updated
        const gitUsername = process.env.GITHUB_USERNAME; // GitHub username from environment
        const gitToken = process.env.GITHUB_TOKEN; // GitHub token from environment

        // Create the repo URL with authentication
        const authenticatedRepoUrl = `https://${gitUsername}:${gitToken}@github.com/KAWDHITHA-NIRMAL/test1000.git`;

        // Check if the target folder exists
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder); // Create the folder if it doesn't exist
        }

        // Determine the appropriate git command
        const gitCommand = fs.existsSync(`${targetFolder}/.git`)
            ? `git -C ${targetFolder} pull`
            : `git clone ${authenticatedRepoUrl} ${targetFolder}`;

        // Execute the git command
        await new Promise((resolve, reject) => {
            exec(gitCommand, (err, stdout, stderr) => {
                if (err) {
                    reject(`Git command failed: ${stderr}`);
                } else {
                    resolve(stdout);
                }
            });
        });

        // Send success message
        await conn.sendMessage(from, { text: '*✅ Update completed successfully!*' }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply(`*Error during update:* ${error.message}`);
    }
});
