require('dotenv').config();
const axios = require('axios');

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

const messages = [
  "🚨 **NEW GAME DROP** 🚨\nCyberpunk Sniper 3D is officially live on Hell Yeah Games! Grab your Empire Passport and start sniping before the servers melt. 🎮🔥\nhttps://hellyeah-games.com",
  "📈 **KRYPTOTRAC UPDATE** 📈\nBitcoin is pumping again. Are you tracking your portfolio like a pro? Check the live charts on Kryptotrac. 💎🙌\nhttps://kryptotrac.com",
  "📰 **HACKER MEDIA EXCLUSIVE** 📰\nDid you see the latest article? An AI just demanded PTO. Read the full story on Hacker Media.\nhttps://hackermedia.com",
  "💅 **GAMER GURLS IN THE CHAT** 💅\nNew cozy farming simulators just dropped on Gamer Gurls. Come chill with us.\nhttps://gamergurls.com"
];

async function shillToDiscord() {
  if (!WEBHOOK_URL) {
    console.log('⚠️ DISCORD_WEBHOOK_URL not found in .env. Skipping shill.');
    return;
  }

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  console.log('🤖 Firing up the Community Shill Bot...');
  
  try {
    await axios.post(WEBHOOK_URL, {
      content: randomMessage,
      username: "Empire Shill Bot",
      avatar_url: "https://i.imgur.com/Aff4U3D.png" // Placeholder cool robot icon
    });
    console.log('✅ Successfully dropped the shill in Discord!');
  } catch (err) {
    console.error('❌ Failed to post to Discord:', err.message);
  }
}

shillToDiscord();
