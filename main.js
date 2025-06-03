const socket = io("https://slither-server-0ikh.onrender.com");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = canvas.width / 2;
let y = canvas.height / 2;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") y -= 10;
    if (e.key === "ArrowDown") y += 10;
    if (e.key === "ArrowLeft") x -= 10;
    if (e.key === "ArrowRight") x += 10;

    socket.emit("playerMove", { x, y });
});

socket.on("state", (players) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let id in players) {
        let p = players[id];
        ctx.fillStyle = "lime";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
});
