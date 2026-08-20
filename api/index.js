export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { url } = req.body || {};

    if (!url) {
        return res.status(400).json({
            error: "Please provide a video URL."
        });
    }

    return res.status(501).json({
        error: "Video processing service is not connected yet."
    });
}
