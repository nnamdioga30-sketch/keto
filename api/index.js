export default async function handler(req, res) {
  // Handle CORS and preflight requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: 'Please enter a valid video link.' });
  }

  try {
    const host = 'tiktok-downloader-no-watermark-scraper.p.rapidapi.com';
    const apiUrl = `https://${host}/?url=${encodeURIComponent(videoUrl)}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': host
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to retrieve video details from API.');
    }

    // Extract the download URL returned by RapidAPI
    const downloadLink = data.url || data.video || data.play || data.download_url;

    if (!downloadLink) {
      throw new Error('No downloadable video link found for this URL.');
    }

    return res.status(200).json({
      success: true,
      title: data.title || 'KETO Video',
      downloads: [
        { label: 'Download HD', url: downloadLink, quality: 'HD' },
        { label: 'Download Original', url: downloadLink, quality: 'Original' }
      ]
    });

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Error processing video request.' });
  }
}
