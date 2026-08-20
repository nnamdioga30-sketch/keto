export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { url } = req.body || {};

    if (!url || !url.includes("tiktok.com")) {
        return res.status(400).json({
            error: "Please provide a valid TikTok URL."
        });
    }

    return res.status(200).json({
        success: true,
        url: url,
        message: "TikTok link received successfully."
    });
}
