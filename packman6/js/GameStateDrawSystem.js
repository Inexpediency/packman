var GameStateDrawSystem = function(canvasContext)
{
    this.canvasContext = canvasContext;

    this.draw = function(state)
    {
        this.canvasContext.clearRect(0, 0, GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT);
        this.drawWalls(state.walls);
        this.drawPoints(state.points);
        this.drawPackmen(state.packman);
        this.drawGhosts(state.ghosts);
    };

    this.drawPoints = function(points)
    {
        for (var i = 0; i < points.length; ++i)
        {
            if (!points[i].used)
            {
                this.drawPoint(points[i]);
            }
        }
    };

    this.drawPoint = function(point)
    {
        var cordX = point.getX() + POINT_CONST.radius;
        var cordY = point.getY() + POINT_CONST.radius;
        this.drawFillCircle(cordX, cordY, POINT_CONST.radius, POINT_CONST.color)
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
            this.drawGhost(ghosts[i].person);
        }
    };

    this.drawGhost = function(ghost)
    {
        this.canvasContext.fillStyle = GHOST_CONST.color;
        this.canvasContext.beginPath();
        this.canvasContext.arc(
            ghost.getX() + FIELD_ELEMENT_SIZE / 2,
            ghost.getY() + FIELD_ELEMENT_SIZE / 2,
            FIELD_ELEMENT_SIZE / 2,
            0, Math.PI, true
        );
        this.canvasContext.lineTo(ghost.getX(), ghost.getY() + FIELD_ELEMENT_SIZE * 3 / 4);
        for (var i = 1; i <= GHOST_CONST.ghostPetals; ++i)
        {
            this.canvasContext.bezierCurveTo(
                ghost.getX() + FIELD_ELEMENT_SIZE * (i * 2 - 1) / (GHOST_CONST.ghostPetals * 2), ghost.getY() + FIELD_ELEMENT_SIZE,
                ghost.getX() + FIELD_ELEMENT_SIZE * (i * 2 - 1) / (GHOST_CONST.ghostPetals * 2), ghost.getY() + FIELD_ELEMENT_SIZE,
                ghost.getX() + FIELD_ELEMENT_SIZE * i / GHOST_CONST.ghostPetals, ghost.getY() + FIELD_ELEMENT_SIZE * 3 / 4
            );
        }
        this.canvasContext.lineTo(ghost.getX() + FIELD_ELEMENT_SIZE, ghost.getY() + FIELD_ELEMENT_SIZE / 2);
        this.canvasContext.closePath();
        this.canvasContext.stroke();
        this.canvasContext.fill();
    };

    this.drawPackmen = function(packman)
    {
        var cordX = packman.person.getX() + PACKMAN_CONST.radius;
        var cordY = packman.person.getY() + PACKMAN_CONST.radius;
        //rotate поворачивает систему координат, поэтому надо перенести центр координат в центр фигуры
        var smileAngel = mathUtils.degToRad(packman.getSmileAngle());
        this.canvasContext.translate(cordX, cordY);
        this.canvasContext.rotate(packman.getAngle() - smileAngel / 2);
        this.drawPackmenFigure(0, 0, PACKMAN_CONST.radius, PACKMAN_CONST.color, smileAngel);
        this.canvasContext.rotate(-packman.getAngle() + smileAngel / 2);
        this.canvasContext.translate(-cordX, -cordY);
        packman.isOpened = !packman.isOpened;
    };

    this.drawPackmenFigure = function(x, y, radius, color, endAngle)
    {
        var startPoint = {
            x: x + Math.cos(0) * radius,
            y: y + Math.sin(0) * radius
        };
        var endPoint = {
            x: x + Math.cos(endAngle) * radius,
            y: y + Math.sin(endAngle) * radius
        };
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(x, y);
        this.canvasContext.lineTo(startPoint.x, startPoint.y);
        this.canvasContext.moveTo(x, y);
        this.canvasContext.lineTo(endPoint.x, endPoint.y);
        this.canvasContext.arc(x, y, radius, endAngle, 0, false);
        this.canvasContext.fillStyle = color;
        this.canvasContext.strokeStyle = color;
        this.canvasContext.fill();
        this.canvasContext.stroke();
    };

    this.drawFillCircle = function(x, y, radius, color)
    {
        //в js нет дефолтного значения функции, но если не передать параметр при вызове он будет undefined
        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, radius, Math.PI * 2, 0);
        this.canvasContext.fillStyle = color;
        this.canvasContext.strokeStyle = color;
        this.canvasContext.fill();
        this.canvasContext.stroke();
    };
};