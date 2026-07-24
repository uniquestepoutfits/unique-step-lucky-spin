const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

// ==========================
// PRIZES
// ==========================

const prizes = [
    "৳20 Cashback",
    "৳30 Cashback",
    "৳40 Cashback",
    "৳50 Cashback",
    "৳100 Cashback",
    "৳150 Voucher",
    "Free Delivery",
    "1 Piece Shirt Free"
];

const colors = [
    "#FFD700",
    "#111111",
    "#FFD700",
    "#111111",
    "#FFD700",
    "#111111",
    "#FFD700",
    "#111111"
];

const total = prizes.length;
const arc = (Math.PI * 2) / total;

// ==========================
// ENGINE
// ==========================

let rotation = 0;
let spinning = false;

let lastPrize = "";
let lastCoupon = "";

let spinCount = 0;
// ==========================
// DRAW WHEEL
// ==========================

function drawWheel() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < total; i++) {

        const startAngle = i * arc + rotation - Math.PI / 2;
        const endAngle = startAngle + arc;

        // Slice
        ctx.beginPath();
        ctx.moveTo(160, 160);
        ctx.arc(160, 160, 150, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = colors[i];
        ctx.fill();

        // Border
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text
        ctx.save();

        ctx.translate(160, 160);
        ctx.rotate(startAngle + arc / 2);

        ctx.fillStyle = (colors[i] === "#FFD700") ? "#000" : "#FFD700";
        ctx.font = "bold 13px Arial";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";

        ctx.fillText(prizes[i], 135, 0);

        ctx.restore();
    }
}

drawWheel();
// ==========================
// PRIZE ENGINE
// ==========================

function getPrize() {

    spinCount++;

    // প্রতি ১০০তম Spin-এ Shirt Free
    if (spinCount >= 100) {
        spinCount = 0;
        return 7;
    }

    const r = Math.random() * 100;

    if (r < 48) return 0;      // ৳20 Cashback
    if (r < 73) return 1;      // ৳30 Cashback
    if (r < 87) return 2;      // ৳40 Cashback
    if (r < 94) return 3;      // ৳50 Cashback
    if (r < 98) return 4;      // ৳100 Cashback
    if (r < 99.5) return 5;    // ৳150 Voucher

    return 6;                  // Free Delivery
}

// ==========================
// COUPON
// ==========================

function generateCoupon() {

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "USO-";

    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
}
// ==========================
// SPIN ENGINE
// ==========================

function spinWheel() {

    if (spinning) return;

    spinning = true;

    const spinBtn = document.getElementById("spinBtn");
    spinBtn.disabled = true;

    const prizeIndex = getPrize();

    // Pointer is at top (12 o'clock)
    const targetAngle = (Math.PI * 2) - (prizeIndex * arc) - (arc / 2);

    const extraSpins = 8;
    const finalRotation = rotation + (extraSpins * Math.PI * 2) + targetAngle;

    const startRotation = rotation;
    const duration = 5000;
    const startTime = performance.now();

    function animate(now) {

        const progress = Math.min((now - startTime) / duration, 1);

        const ease = 1 - Math.pow(1 - progress, 3);

        rotation = startRotation + (finalRotation - startRotation) * ease;

        drawWheel();

        if (progress < 1) {

            requestAnimationFrame(animate);

        } else {

            rotation = finalRotation % (Math.PI * 2);

            spinning = false;
            spinBtn.disabled = false;

            const coupon = generateCoupon();

           const realPrize = (prizeIndex + 2) % total;

lastPrize = prizes[realPrize]; 
            lastCoupon = coupon;

            document.getElementById("prizeText").innerHTML =
            `
            🎉 <b>Congratulations!</b><br><br>

            Prize:<br>
            <b>${lastPrize}</b>

            <br><br>

            Coupon:<br>

            <b style="color:#FFD700;font-size:22px;">
            ${coupon}
            </b>
            `;

            document.getElementById("popup").style.display = "flex";
        }
    }

    requestAnimationFrame(animate);
}

// ==========================
// WHATSAPP
// ==========================

function closePopup() {

    document.getElementById("popup").style.display = "none";

    const msg =
`Hello Unique Step Outfits,

I won: ${lastPrize}

Coupon: ${lastCoupon}`;

    window.open(
        "https://wa.me/8801338688859?text=" +
        encodeURIComponent(msg),
        "_blank"
    );
}







