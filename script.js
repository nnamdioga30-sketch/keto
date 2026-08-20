const generateBtn = document.getElementById("generateBtn");
const videoUrl = document.getElementById("videoUrl");
const message = document.getElementById("message");

generateBtn.addEventListener("click", async () => {
    const url = videoUrl.value.trim();

    if (!url) {
        message.textContent = "Please paste a TikTok link.";
        return;
    }

    if (!url.includes("tiktok.com")) {
        message.textContent = "Please enter a valid TikTok link.";
        return;
    }

    message.textContent = "Processing...";

    try {
        const response = await fetch("/api/index", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        message.textContent = "TikTok link received successfully.";

        window.open(data.url, "_blank");

    } catch (error) {
        message.textContent = error.message;
    }
});
