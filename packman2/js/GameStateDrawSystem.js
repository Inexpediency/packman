function GameStateDrawSystem(canvasContext)
{
    this.canvasContext = canvasContext;

    this.drawState = function(state)
    {
        this.canvasContext.fillStyle = BACKGROUND_COLOR;
        this.canvasContext.fillRect(0, 0, GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT);
        this.drawPackmen(state.packman);
    };

    this.drawPackmen = function(packmen)
    {
        var cordX = packmen.getX() + PACKMAN_CONST.radius;
        var cordY = packmen.getY() + PACKMAN_CONST.radius;
        this.canvasContext.beginPath();
        this.canvasContext.arc(cordX, cordY, PACKMAN_CONST.radius, 2 * Math.PI, 0);
        this.canvasContext.closePath();
        this.canvasContext.fillStyle = PACKMAN_CONST.color;
        this.canvasContext.fill();
        this.canvasContext.stroke();
    };
}