 const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

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

let rotation = 0;let lastPrize = "";
let lastCoupon = "";
let spinning = false;

function drawWheel() {

    ctx.clearRect(0,0,320,320);

    for(let i=0;i<total;i++){

        const angle = i * arc + rotation;

        ctx.beginPath();
        ctx.moveTo(160,160);
        ctx.arc(160,160,150,angle,angle+arc);
        ctx.closePath();

        ctx.fillStyle = colors[i];
        ctx.fill();

        ctx.save();

        ctx.translate(160,160);
        ctx.rotate(angle + arc/2);

        ctx.fillStyle = colors[i]=="#FFD700" ? "#000" : "#FFD700";

        ctx.font="bold 13px Arial";
        ctx.textAlign="right";

        ctx.fillText(prizes[i],135,5);

        ctx.restore();
    }
}

drawWheel();
function getPrize() {

    const r = Math.random() * 100;

    if (r < 45) return 0;      // ৳20 Cashback
    if (r < 70) return 1;      // ৳30 Cashback
    if (r < 85) return 2;      // ৳40 Cashback
    if (r < 93) return 3;      // ৳50 Cashback
    if (r < 97) return 4;      // ৳100 Cashback
    if (r < 99) return 5;      // ৳150 Voucher
    if (r < 99.8) return 6;    // Free Delivery

    return 7;                  // 1 Piece Shirt Free
}

function spinWheel(){

    if (spinning) return;

    spinning = true;

    const prizeIndex = getPrize();

    const stopAngle = -(prizeIndex * arc) + (arc / 2);

    const finalRotation = (Math.PI * 12) + stopAngle;

    const duration = 5000;

    const start = performance.now();

    const startRotation = rotation;




    function animate(now){

        const progress = Math.min((now-start)/duration,1);

        const ease = 1-Math.pow(1-progress,3);

        rotation = startRotation + (finalRotation * ease);

        drawWheel();

        if(progress < 1){

            requestAnimationFrame(animate);

        }else{

            spinning=false;

            setTimeout(()=>{

               const coupon = generateCoupon();
             const realPrize = (prizeIndex + 2) % prizes.length;

lastPrize = prizes[realPrize];
lastCoupon = coupon;

document.getElementById("prizeText").innerHTML =
`
🎉 <b>Congratulations!</b><br><br>

Prize:<br>
<b>${prizes[realPrize]}</b>

<br><br>

Coupon:<br>
<b style="color:#FFD700;font-size:22px">
${coupon}
</b>
`;

document.getElementById("popup").style.display = "flex";

            },200);

        }

    }

    requestAnimationFrame(animate);

}function generateCoupon() {

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "USO-";

    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
 
}function closePopup() {

    document.getElementById("popup").style.display = "none";

    const message =
`Hello Unique Step Outfits,

I won: ${lastPrize}

Coupon Code: ${lastCoupon}`;

    window.open(
        "https://wa.me/8801338688859?text=" + encodeURIComponent(message),
        "_blank"
    );

}
