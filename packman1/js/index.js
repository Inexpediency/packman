function initGameField(canvas)
{
    canvas.width = GAME_FIELD_WIDTH;
    canvas.height = GAME_FIELD_HEIGHT;
}

function drawCircle(canvasContext, circle)
{
    canvasContext.beginPath();
    canvasContext.fillStyle = circle.color;
    canvasContext.strokeStyle = circle.color;
    canvasContext.arc(circle.x + circle.radius, circle.y + circle.radius, circle.radius, 2 * Math.PI, 0);
    canvasContext.fillSyle = circle.color;
    canvasContext.fill();
    canvasContext.stroke();
}

document.addEventListener("DOMContentLoaded", function()
{
    var canvas = document.getElementById(GAME_FIELD_ID);
    initGameField(canvas);
    var canvasContext = canvas.getContext("2d");
    canvasContext.fillStyle = "#aaaaaa";
    canvasContext.fillRect(0, 0, GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT);
    drawCircle(canvasContext, {
        x: GAME_FIELD_HEIGHT / 2 - 100,
        y: GAME_FIELD_WIDTH / 2 - 100,
        radius: 100,
        color: "#ffaaaa"
    });
});