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

    generateBtn.disabled = true;
    generateBtn.textContent = "Processing...";
    message.textContent = "Processing...";

    try {
        const response = await fetch("https://keto-gold.vercel.app/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Download failed.");
        }

        message.textContent = "Video ready!";

        if (data.url) {
            const downloadBtn = document.createElement("a");
            downloadBtn.textContent = "Download Video";
            downloadBtn.href = data.url;
            downloadBtn.target = "_blank";
            downloadBtn.download = "KETO-video.mp4";
            downloadBtn.style.display = "inline-block";
            downloadBtn.style.marginTop = "15px";

            message.appendChild(downloadBtn);
        }

    } catch (error) {
        message.textContent = error.message;
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate";
    }
});
