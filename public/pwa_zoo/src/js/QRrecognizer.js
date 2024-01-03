const video = document.createElement("video");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const qrButton = document.querySelector(".qrImage");

// Function to start video capture
function startVideoCapture() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            document.body.appendChild(video);
            return video.play();
        })
        .then(() => {
            // Set up a loop to continuously capture frames
            requestAnimationFrame(processVideo);
        })
        .catch((error) => {
            console.error("Error accessing the camera: ", error);
        });
}

// Function to process video frames
function processVideo() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Decode QR code using jsQR library
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
        // Code found, match it with your pool of QR codes
        const matchedCode = matchQRCode(code.data);

        if (matchedCode && matchedCode.url) {
            // Redirect to the corresponding web page
            window.location.href = matchedCode.url;
        } else {
            console.log("QR code not found in the pool or missing URL.");
        }
    }

    // Continue the loop
    requestAnimationFrame(processVideo);
}

// Function to match QR codes with predefined data
function matchQRCode(data) {
    const qrCodePool = {
        "https://omerakgull.github.io/pwa_zoo/harita/harita.html": { url: "https://omerakgull.github.io/pwa_zoo/harita/harita.html", imageSrc: "img/qrcodes/map.png" },
        // Add more QR codes and image sources as needed
    };

    console.log(qrCodePool);
    return qrCodePool[data];
}

// Cleanup on page exit
window.addEventListener("beforeunload", () => {
    if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
    }
});

// open camera on click
qrButton.addEventListener("click", startVideoCapture);