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

        const angle = i * arc + rotation - Math.PI / 2;

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
let spinCount = 0;

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
function spinWheel(){

    if (spinning) return;

    spinning = true;

    const prizeIndex = getPrize();

const stopAngle = -(prizeIndex * arc) - (arc / 2);
 
 const finalRotation = startRotation + (Math.PI * 12) + stopAngle;
 

 
    

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
rotation = finalRotation % (Math.PI * 2);
         
            spinning = false;

            setTimeout(()=>{

               const coupon = generateCoupon();
             const realPrize = prizeIndex;

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
