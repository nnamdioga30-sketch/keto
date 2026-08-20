export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { url } = req.body || {};

    if (!url) {
        return res.status(400).json({
            error: "Please provide a TikTok URL."
        });
    }

    try {
        const apiUrl =
            "https://tdownv4.sl-bjs.workers.dev/?down=" +
            encodeURIComponent(url);

        const response = await fetch(apiUrl);

        if (!response.ok) {
            return res.status(502).json({
                error: "Video processing service failed."
            });
        }

        const data = await response.json();

        if (!data.download_url) {
            return res.status(404).json({
                error: "Download link could not be found."
            });
        }

        return res.status(200).json({
            success: true,
            download_url: data.download_url,
            title: data.title || "TikTok Video"
        });

    } catch (error) {
        return res.status(500).json({
            error: "Unable to process this video."
        });
    }
}
