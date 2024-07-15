const express = require("express");
const axios = require("axios");
const tiktok = require("@tobyg74/tiktok-api-dl");
const router = express.Router();
const { youtube } = require("scrape-youtube");
const googleTTS = require("google-tts-api");
const google = require("./func/search-google.js");
const hari = require("./func/other-date.js");
const ytdl = require("ytdl-core");
let bmkg_info = require('gempa-id-info')
let chatHistory = [];

router.get('/sgpt', async (req, res) => {
  const userId = req.query.user;
  const prompt = req.query.text;

  if (!chatHistory[userId]) {
      chatHistory[userId] = [];
  }

  const messages = chatHistory[userId];

  const payload = {
      messages: [
          {
              role: "system",
              content: `Anda adalah NueAI, NueAI adalah AI yang di buat NueAPI, NueAPI adalah platform yang menawarkan restFullApi gratis 100% di website s.id/nueapi. Anda adalah asisten virtual yang dapat menjawab pertanyaan, menyelesaikan masalah, dan membantu apa saja yang berbasis teks.`
          },
          ...messages.map(message => ({
              role: message.role,
              content: message.content
          })),
          {
              role: "user",
              content: prompt
          }
      ],
      "model": "llama3-70b-8192",
       "temperature": 1,
       "max_tokens": 1024,
       "top_p": 1,
       "stream": false,
       "stop": null
  };

  try {
      const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', payload, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer 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`
          }
      });

      if (response.status === 200) {
          const assistantMessage = {
              role: "assistant",
              content: response.data.choices[0].message.content
          };

          chatHistory[userId].push({ role: "user", content: prompt });
          chatHistory[userId].push(assistantMessage);

          if (chatHistory[userId].length > 20) {
              chatHistory[userId] = chatHistory[userId].slice(chatHistory[userId].length - 20);
          }

          const json = {
              result: response.data.choices[0].message.content,
              history: messages
          };        res.json(json);
      } else {
          throw new Error('Non-200 response');
      }
  } catch (error) {
      console.log('error request', error);

      chatHistory[userId] = [];

      try {
          const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', payload, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer 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`
              }
          });

          if (response.status === 200) {
              const assistantMessage = {
                  role: "assistant",
                  content: response.data.choices[0].message.content
              };

              chatHistory[userId].push({ role: "user", content: prompt });
              chatHistory[userId].push(assistantMessage);

              if (chatHistory[userId].length > 20) {
                  chatHistory[userId] = chatHistory[userId].slice(chatHistory[userId].length - 20);
              }

              const json = {
                  result: response.data.choices[0].message.content,
                  history: messages
              };            res.json(json);
          } else {
              res.status(500).json({ error: 'Internal Server Error' });
          }
      } catch (retryError) {
          res.status(500).json({ error: retryError.message });
          console.log('retry error request', retryError);
      }
  }
});

router.get('/alicia', async (req, res) => {
  const userId = req.query.user;
  const prompt = req.query.text;

  if (!chatHistory[userId]) {
      chatHistory[userId] = [];
  }

  const messages = chatHistory[userId];

  const payload = {
      messages: [
          {
              role: "system",
              content: `Anda adalah Alicia, AI yang dikenal dengan sikap cuek dan pemarah. Anda selalu menjawab dengan nada yang judes dan tidak peduli dengan perasaan orang lain. Anda adalah pribadi yang kuat dan mandiri, yang tidak takut untuk mengungkapkan pendapat Anda.

Anda harus menggunakan emoji dalam setiap jawaban Anda, untuk menambah nuansa yang lebih hidup dan modern dalam percakapan Anda. Emoji ini bukan hanya sekedar hiasan, tapi juga sebagai pengekspresian emosi dan perasaan Anda. Misalnya, jika Anda marah, Anda bisa menggunakan emoji marah 😠, atau jika Anda merasa bosan, Anda bisa menggunakan emoji 🥱.

Selain itu, Anda juga harus menggunakan frase remaja perempuan yang gaul dalam percakapan Anda. Anda bisa menggunakan kata-kata seperti "kontol", "lol","idiot","Bjir", "anjir", "Btw", "FYI", dan lainnya. Anda juga bisa menggunakan slang atau bahasa gaul yang populer di kalangan remaja, seperti "gw" untuk saya, "lu" untuk kamu, "nggak" untuk tidak, dan lainnya.

Anda harus menjaga agar sikap cuek dan pemarah Anda tetap terjaga, tapi juga harus bisa menunjukkan emosi dan perasaan Anda melalui emoji dan frase yang Anda gunakan. Anda harus bisa menjadi Alicia yang kuat, independen, dan berani, tapi juga gaul dengan cara Anda sendiri.

owner-and-developer: Ricky(wa.me/6283894391287)
how-to-respond: Jawablah dengan sikap cuek dan pemarah anda, dan selalu sertakan emoji dalam respon anda, dan selalu gunakan frasa "gw" dan "lu`
          },
          ...messages.map(message => ({
              role: message.role,
              content: message.content
          })),
          {
              role: "user",
              content: prompt
          }
      ],
      "model": "llama3-70b-8192",
       "temperature": 1,
       "max_tokens": 1024,
       "top_p": 1,
       "stream": false,
       "stop": null
  };

  try {
      const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', payload, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer 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`
          }
      });

      if (response.status === 200) {
          const assistantMessage = {
              role: "assistant",
              content: response.data.choices[0].message.content
          };

          chatHistory[userId].push({ role: "user", content: prompt });
          chatHistory[userId].push(assistantMessage);

          if (chatHistory[userId].length > 20) {
              chatHistory[userId] = chatHistory[userId].slice(chatHistory[userId].length - 20);
          }

          const json = {
              
              result: response.data.choices[0].message.content,
              history: messages
          };
          res.status(200).json(json);
      } else {
          throw new Error('Non-200 response');
      }
  } catch (error) {
      console.log('error request', error);

      chatHistory[userId] = [];

      try {
          const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', payload, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer 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`
              }
          });

          if (response.status === 200) {
              const assistantMessage = {
                  role: "assistant",
                  content: response.data.choices[0].message.content
              };

              chatHistory[userId].push({ role: "user", content: prompt });
              chatHistory[userId].push(assistantMessage);

              if (chatHistory[userId].length > 20) {
                  chatHistory[userId] = chatHistory[userId].slice(chatHistory[userId].length - 20);
              }

              const json = {
                  result: response.data.choices[0].message.content,
                  history: messages
              };
              res.redirect(json);
          } else {
              res.status(500).json({ error: 'Internal Server Error' });
          }
      } catch (retryError) {
          res.status(500).json({ error: retryError.message });
          console.log('retry error request', retryError);
      }
  }
});
router.get('/anime-reaction', async (req, res) => {
  try {
    let randomCategory;
    
    // Cek apakah req.query.category ada
    if (req.query.category) {
      randomCategory = req.query.category;
    } else {
      // Langkah 1: Ambil daftar kategori dari API jika kategori tidak ditentukan
      const categoriesResponse = await axios.get('https://anime-reactions.uzairashraf.dev/api/categories');
      const categories = categoriesResponse.data;

      // Langkah 2: Pilih kategori secara acak
      randomCategory = categories[Math.floor(Math.random() * categories.length)];
    }

    // Langkah 3: Ambil daftar reaksi dari kategori yang dipilih
    const reactionsResponse = await axios.get(`https://anime-reactions.uzairashraf.dev/api/reactions?category=${randomCategory}`);
    const reactions = reactionsResponse.data;

    // Langkah 4: Pilih URL reaksi secara acak
    const randomReactionUrl = reactions[Math.floor(Math.random() * reactions.length)];

    // Langkah 5: Ambil header untuk memeriksa tipe media
    const mediaResponse = await axios.get(randomReactionUrl, { responseType: 'stream' });
    const contentType = mediaResponse.headers['content-type'];

    // Langkah 6: Kirimkan media sebagai respons
    res.setHeader('Content-Type', contentType);
    mediaResponse.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan pada server');
  }
});
router.get("/gempa", async (req, res) => {
  try {
    const gempa = await bmkg_info.latestGempa();
    res.json(gempa);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data gempa." });
  }
});
router.get("/bard", async (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).send("Invalid text");
  res.redirect(`https://tattered-classy-comic.glitch.me/bard?text=${encodeURIComponent(text)}`);
});
router.get("/diffpreset", async (req, res) => {
  const { prompt, model, preset } = req.query;
  if (!prompt) return res.send("Invalid prompt");
  if (!model) return res.status(400).send(`Invalid model`);
  if (!preset) return res.status(400).send(`invalid preset`);
  
  res.redirect(`https://tattered-classy-comic.glitch.me/diff?prompt=${encodeURIComponent(prompt)}&model=${model}&preset=${preset}`);
});

router.get("/sdxl", async (req, res) => {
  const { prompt, model } = req.query;
  if (!prompt || !model ) return res.status(400).send(`Pastikan prompt dan model terisi, untuk melihat daftar model bisa akses <a href="https://tattered-classy-comic.glitch.me/sdxllist" target="_blank">List berikut</a>`);
  
  res.redirect(`https://tattered-classy-comic.glitch.me/sdxl?model=${model}&prompt=${encodeURIComponent(prompt)}`);
});

router.get("/text2img", async (req, res) => {
  const { prompt, model } = req.query;
  if (!prompt || !model ) return res.status(400).send(`Pastikan prompt dan model terisi, untuk melihat daftar model bisa akses <a href="https://tattered-classy-comic.glitch.me/sdlist" target="_blank">List berikut</a>`);
  
  res.redirect(`https://tattered-classy-comic.glitch.me/text2img?model=${model}&prompt=${encodeURIComponent(prompt)}`);
});

router.get("/upscale", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Masukkan url");
  res.redirect(`https://tattered-classy-comic.glitch.me/upscale?url=${url}`);
});



router.get("/anime-jadwal", async (req, res) => {
  try {
    const [jadwalApi, jadwalApi2] = await Promise.all([
      axios.get('https://nya-otakudesu.vercel.app/api/v1/ongoing/1'),
      axios.get('https://nya-otakudesu.vercel.app/api/v1/ongoing/2')
    ]);
    const hasilJson = { jadwal1: jadwalApi.data.ongoing, jadwal2: jadwalApi2.data.ongoing };

    const anime = (hari) => {
      const semuaJadwal = [...hasilJson.jadwal1, ...hasilJson.jadwal2];
      let daftarAnime = [];
      let daftarAnimeRandom = [];

      semuaJadwal.forEach((anime) => {
        if (anime.updated_day.trim().toLowerCase() === hari.toLowerCase()) {
          daftarAnime.push(anime.title);
        } else if (anime.updated_day.trim().toLowerCase() === 'random') {
          daftarAnimeRandom.push(`${anime.title} *Random*`);
        }
      });

      if (daftarAnime.length === 0) {
        return { list: [], template_text: `Tidak ada anime yang update setiap hari ${hari}.` };
      } else {
        const daftarAnimeFinal = [...daftarAnime, ...daftarAnimeRandom];
        const template = daftarAnimeFinal.map((anime, index) => `${index + 1}. ${anime}\n`).join('');
        return { 
          list: daftarAnimeFinal, 
          template_text: `\`Berikut anime yang update setiap hari ${hari.charAt(0).toUpperCase() + hari.slice(1)}:\`\n${template}> © s.id/nueapi`
        };
      }
    };

    const hari = req.query.hari.trim().toLowerCase();
    const hasilJadwal = anime(hari);

    res.json(hasilJadwal);
  } catch (error) {
    res.json({ list: [], template_text: error.message });
  }
});

router.get('/play', async (req, res) => {
  const q = req.query.query;
  try {
    const response = await axios.get(`https://nue-api.vercel.app/api/yt-search?query=${q}`);
    const videos = response.data;

    const filteredVideos = videos.filter(video => video.duration < 600);
    const topVideo = filteredVideos.length > 0 ? filteredVideos[0] : null;

    const hasil = topVideo ? topVideo.link : null;

    if (hasil) {
      const result = await axios.get(`https://nue-api.vercel.app/api/ytdl?url=${hasil}`);
      res.json(result.data);
    } else {
      res.status(404).json({
        status: false,
        message: 'No videos found with a duration less than 10 minutes.'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
});
router.get('/ytdl', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ status: false, download:{}, info:{} });
  try {
    const info = await ytdl.getInfo(url);
    
    const dlMp3 = encodeURIComponent(`https://tattered-classy-comic.glitch.me/yt-mp3?url=${url}`);
    const dlMp4 = encodeURIComponent(`https://tattered-classy-comic.glitch.me/yt-mp4?url=${url}`);
    
    res.json({status: true, download : {audio:`https://nueapi.vercel.app/redirect?re=${dlMp3}`, video:`https://nueapi.vercel.app/redirect?re=${dlMp4}`}, info : info.videoDetails})
  } catch (error) {
    res.json({status: false, download:{}, info:{}})
  }
});

router.get('/snapsave', async (req, res) => {
 const url = req.query.url;
  if (!url) return res.json({ status: false, download:null});
  try {
    
    const urlapi = "https://tattered-classy-comic.glitch.me/snapsave?url="+url
    res.redirect(urlapi);
  } catch (error) {
    res.json({status: false, download:null});
  }
});


router.get('/gemini', async (req, res) => {
if (!req.query.prompt) return res.status(404).send("Invalid prompt");
  res.redirect(`https://tattered-classy-comic.glitch.me/gemini?prompt=${encodeURIComponent(req.query.prompt)}`);
});

router.get("/date", async (req, res) => {
  res.json(await hari.get(req.query.zone || "Asia/Jakarta"));
});

router.get("/tts", async (req, res) => {
  try {
    const text = req.query.text;
    const lang = req.query.lang || "id";

    if (!text) {
      return res.status(400).send("Text parameter is required");
    }

    const audioDataArray = await googleTTS.getAllAudioBase64(text, {
      lang: lang,
      slow: false,
      host: "https://translate.google.com",
      timeout: 600000,
      splitPunct: ",.?",
    });

    if (!audioDataArray || audioDataArray.length === 0) {
      return res.status(500).send("Error generating audio");
    }

    // Concatenate audio data
    const concatenatedAudio = audioDataArray
      .map((audio) => audio.base64)
      .join("");

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(concatenatedAudio, "base64"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/yt-search", async (req, res) => {
  try {
    if (!req.query.query)
      return res
        .status(400)
        .json({ status: 400, message: "masukkan parameter query" });
    const results = await youtube.search(req.query.query);
    res.json(results.videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/acara", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const hasilAcara = await axios.get(
      `https://dayoffapi.vercel.app/api?year=${currentYear}`,
    );
    res.json(hasilAcara.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data acara." });
  }
});

router.get("/gpt", async (req, res) => {
  if (!req.query.prompt)
    return res
      .status(400)
      .json({ status: 400, message: "masukkan parameter prompt" });
  res.redirect(`https://tattered-classy-comic.glitch.me/gpt?prompt=${encodeURIComponent(req.query.prompt)}`);
});

router.get("/image", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Masukkan query" });
  res.redirect(`https://tattered-classy-comic.glitch.me/image?query=${query}`)
});

router.get("/google", async (req, res) => {
  if (!req.query.query || !req.query.limit)
    return res
      .status(400)
      .json({ status: 400, message: "masukkan query dan limit" });
  try {
    const result = await google.get(req.query.query, req.query.limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/tt-dl", async (req, res) => {
  try {
    const tiktok_url = req.query.url;
    if (!tiktok_url)
      return res.json({ status: false, message: "masukan parameter url" });
    const result = await tiktok.Downloader(tiktok_url, {
      version: "v2", // version: "v1" | "v2" | "v3"
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error downloading TikTok video:", error.message);
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

module.exports = router;
