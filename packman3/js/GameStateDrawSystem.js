function GameStateDrawSystem(canvasContext)
{
    this.canvasContext = canvasContext;

    this.draw = function(state)
    {
        this.canvasContext.clearRect(0, 0, GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT);
        this.drawWalls(state.walls);
        this.drawPackman(state.packman);
    };

    this.drawWalls = function(walls)
    {
        for (var i = 0; i < walls.length; ++i)
        {
            this.drawWall(walls[i]);
        }
    };

    this.drawWall = function(wall)
    {
        this.canvasContext.fillStyle = WALL_CONST.color;
        this.canvasContext.fillRect(wall.getX(), wall.getY(), wall.getSize(), wall.getSize());
    };

    this.drawPackman = function(packman)
    {
        this.canvasContext.beginPath();
        var cordX = packman.getX() + PACKMAN_CONST.radius;
        var cordY = packman.getY() + PACKMAN_CONST.radius;
        this.canvasContext.arc(cordX, cordY, PACKMAN_CONST.radius, 2 * Math.PI, 0);
        this.canvasContext.fillStyle = PACKMAN_CONST.color;
        this.canvasContext.strokeStyle = PACKMAN_CONST.color;
        this.canvasContext.fill();
        this.canvasContext.stroke();
    };
}