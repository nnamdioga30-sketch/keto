export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let { videoUrl } = req.body;

  if (!videoUrl || !videoUrl.includes('tiktok.com')) {
    return res.status(400).json({ error: 'Please paste a valid TikTok link' });
  }

  try {
    const host = 'tiktok-downloader-no-watermark-scraper.p.rapidapi.com';
    const apiUrl = `https://${host}/?url=${encodeURIComponent(videoUrl.trim())}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': host
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API rejected the URL. Try a full desktop TikTok link.');
    }

    const downloadLink = data.url || data.video || data.play || data.download_url;

    if (!downloadLink) {
      throw new Error('Could not extract direct video URL from this link.');
    }

    return res.status(200).json({
      success: true,
      title: data.title || 'KETO Video',
      downloads: [
        { label: 'Download Video', url: downloadLink }
      ]
    });

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Error processing TikTok link' });
  }
}
