const ffmpeg = require('fluent-ffmpeg');
const googleTTS = require('google-tts-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'tiktok_renders');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

async function generateTikTok() {
  console.log('🎬 Starting TikTok Generator...');
  
  // 1. Pick a game (In the future, we can fetch this from Supabase or games.js)
  const game = {
    title: "Cyberpunk Sniper 3D",
    description: "You won't believe this browser game. It is completely free and you don't even need to download it. Just click the link in my bio and start playing Cyberpunk Sniper 3D instantly on Hell Yeah Games!",
    // Use a cool gaming vertical thumbnail placeholder
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1080&h=1920&q=80"
  };

  const audioPath = path.join(OUTPUT_DIR, 'tts.mp3');
  const imagePath = path.join(OUTPUT_DIR, 'bg.jpg');
  const outPath = path.join(OUTPUT_DIR, `tiktok_${Date.now()}.mp4`);

  try {
    // 2. Generate TTS Audio
    console.log('🗣️ Generating AI Voiceover...');
    const audioBase64 = await googleTTS.getAudioBase64(game.description, {
      lang: 'en',
      slow: false,
      host: 'https://translate.google.com',
    });
    fs.writeFileSync(audioPath, Buffer.from(audioBase64, 'base64'));

    // 3. Download Background Image
    console.log('🖼️ Downloading Visuals...');
    const response = await axios.get(game.thumbnailUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(imagePath, response.data);

    // 4. Render Video with FFmpeg
    console.log('🎞️ Rendering Video (this may take a minute)...');
    
    // Create a 9:16 vertical video using the image, looping it for the duration of the audio
    ffmpeg()
      .input(imagePath)
      .loop()
      .input(audioPath)
      .outputOptions([
        '-c:v libx264',
        '-tune stillimage',
        '-c:a aac',
        '-b:a 192k',
        '-pix_fmt yuv420p',
        '-shortest', // End video when the shortest input (audio) ends
        '-vf scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920'
      ])
      .save(outPath)
      .on('end', () => {
        console.log(`✅ SUCCESS! TikTok video saved to: ${outPath}`);
        console.log('📱 Ready to upload to TikTok/Shorts!');
        
        // Clean up temp files
        if(fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
        if(fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      })
      .on('error', (err) => {
        console.error('❌ FFmpeg Error:', err.message);
      });
  } catch (error) {
    console.error('❌ Generator Failed:', error);
  }
}

generateTikTok();
