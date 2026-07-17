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
function spinWheel(){

    if(spinning) return;

    spinning = true;

    const prizeIndex = Math.floor(Math.random()*prizes.length);

    const stopAngle = (Math.PI * 2) - (prizeIndex * arc) - (arc / 2);

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

               document.getElementById("prizeText").innerHTML =
"You Won <br><br><b>" + prizes[prizeIndex] + "</b>";

document.getElementById("popup").style.display = "flex";;

            },200);

        }

    }

    requestAnimationFrame(animate);

}function closePopup(){

    document.getElementById("popup").style.display = "none";

}
