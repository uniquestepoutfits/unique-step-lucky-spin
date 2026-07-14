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
  "Free Premium Shirt"
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

let rotation = 0;
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
