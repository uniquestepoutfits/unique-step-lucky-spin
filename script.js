
const wheel = document.getElementById("wheel");

const prizes = [
    "💸 ৳20 Cashback",
    "💸 ৳30 Cashback",
    "💸 ৳40 Cashback",
    "💸 ৳50 Cashback",
    "💸 ৳100 Cashback",
    "🎟️ ৳150 Voucher",
    "🚚 Free Delivery",
    "👕 Free Premium Shirt"
];

let spinning = false;

function spinWheel(){

    if(spinning) return;

    spinning = true;

    const randomIndex = Math.floor(Math.random()*prizes.length);

    const degree = 3600 + (randomIndex * 45);

    wheel.style.transform = `rotate(-${degree}deg)`;

    setTimeout(()=>{

        alert("🎉 Congratulations!\n\nYou won:\n\n"+prizes[randomIndex]);

        spinning = false;

    },5000);

}
