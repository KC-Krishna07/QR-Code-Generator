let qrBox = document.getElementById("qrBox");
let downloadBtn = document.getElementById("downloadBtn");

// Fetch stored QR data
let qrDatabase = JSON.parse(localStorage.getItem("qrDatabase")) || {};

function generateQR() {
    let text = document.getElementById("qrText").value.trim();

    if (text === "") {
        alert("Please enter text or URL");
        return;
    }

    // Clear previous QR
    qrBox.innerHTML = "";

    // Check if QR already exists
    if (qrDatabase[text]) {
        // Load existing QR
        let img = document.createElement("img");
        img.src = qrDatabase[text];
        qrBox.appendChild(img);
    } else {
        // Generate new QR
        let qr = new QRCode(qrBox, {
            text: text,
            width: 200,
            height: 200,
        });

        // Save QR after rendering
        setTimeout(() => {
            let img = qrBox.querySelector("img");
            let imgSrc = img.src;

            qrDatabase[text] = imgSrc;
            localStorage.setItem("qrDatabase", JSON.stringify(qrDatabase));
        }, 300);
    }

    // Enable download
    setTimeout(() => {
        let img = qrBox.querySelector("img");
        downloadBtn.href = img.src;
        downloadBtn.style.display = "block";
    }, 300);
}
