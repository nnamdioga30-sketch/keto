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
        // Backend will be connected here later
        const response = await fetch("/api/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Download failed.");
        }

        message.textContent = "Video ready!";

        if (data.downloadUrl) {
            window.location.href = data.downloadUrl;
        }

    } catch (error) {
        console.error(error);
        message.textContent = "Something went wrong. Try again.";
    }
});
