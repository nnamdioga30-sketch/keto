export default async function handler(request) {
    if (request.method !== "POST") {
        return new Response(
            JSON.stringify({ error: "Method not allowed" }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    try {
        const body = await request.json();
        const url = body.url?.trim();

        if (!url) {
            return new Response(
                JSON.stringify({ error: "No URL provided" }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        if (!url.includes("tiktok.com")) {
            return new Response(
                JSON.stringify({ error: "Invalid TikTok URL" }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "KETO received the TikTok link.",
                url: url
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Invalid request" }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
              }
