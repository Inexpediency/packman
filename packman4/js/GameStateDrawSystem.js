var GameStateDrawSystem = function(canvasContext)
{
    this.canvasContext = canvasContext;

    this.draw = function(state)
    {
        this.canvasContext.clearRect(0, 0, GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT);
        this.drawWalls(state.walls);
        this.drawPackmen(state.packman.person);
        this.drawGhosts(state.ghosts);
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

    this.drawGhosts = function(ghosts)
    {
        for (var i = 0; i < ghosts.length; ++i)
        {
            this.drawGhost(ghosts[i]);
        }
    };

    this.drawGhost = function(ghost)
    {
        this.canvasContext.fillStyle = GHOST_CONST.color;
        this.canvasContext.beginPath();
        this.canvasContext.arc(
            ghost.person.getX() + FIELD_ELEMENT_SIZE / 2,
            ghost.person.getY() + FIELD_ELEMENT_SIZE / 2,
            FIELD_ELEMENT_SIZE / 2,
            0, Math.PI, true
        );
        this.canvasContext.lineTo(ghost.person.getX(), ghost.person.getY() + FIELD_ELEMENT_SIZE * 3 / 4);
        for (var i = 1; i <= GHOST_CONST.ghostPetals; ++i)
        {
            this.canvasContext.bezierCurveTo(
                ghost.person.getX() + FIELD_ELEMENT_SIZE * (i * 2 - 1) / (GHOST_CONST.ghostPetals * 2), ghost.person.getY() + FIELD_ELEMENT_SIZE,
                ghost.person.getX() + FIELD_ELEMENT_SIZE * (i * 2 - 1) / (GHOST_CONST.ghostPetals * 2), ghost.person.getY() + FIELD_ELEMENT_SIZE,
                ghost.person.getX() + FIELD_ELEMENT_SIZE * i / GHOST_CONST.ghostPetals, ghost.person.getY() + FIELD_ELEMENT_SIZE * 3 / 4
            );
        }
        this.canvasContext.lineTo(ghost.person.getX() + FIELD_ELEMENT_SIZE, ghost.person.getY() + FIELD_ELEMENT_SIZE / 2);
        this.canvasContext.closePath();
        this.canvasContext.stroke();
        this.canvasContext.fill();
    };

    this.drawPackmen = function(packman)
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
};