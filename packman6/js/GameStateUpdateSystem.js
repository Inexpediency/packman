var GameStateUpdateSystem = function(canvas)
{
    //создание и инициализация события конца игры
    var endGameEvent = new Event("endGame");

    this.update = function(state)
    {
        this._updatePackman(state);
        this._updatePoints(state);
        this._updateGhosts(state);
        var isPackmanDie = collisions.isIntersectedPerson(state.packman, state.ghosts);
        if (isPackmanDie || this._isPointIsEmpty(state.points))
        {
            endGameEvent.packman = state.packman;
            endGameEvent.isWin = !isPackmanDie;
            //рассылка события конца игры слушателям
            canvas.dispatchEvent(endGameEvent);
            return 0;
        }
        return 1;
    };

    this._isPointIsEmpty = function(points)
    {
        for (var i = 0; i < points.length; ++i)
        {
            if (!points[i].used)
            {
                return false;
            }
        }
        return true;
    };

    this._updatePackman = function(state)
    {
        var direction = state.packman.person.move(state);
        state.packman.bumpSmileAngle();
        state.packman.calcAngle(direction);
    };

    this._updatePoints = function(state)
    {
        var intersectedPointIndex = collisions.getIntersectedPointIndex(state.packman.person, state.points);

        if (intersectedPointIndex != -1)
        {
            state.packman.score++;
            state.points[intersectedPointIndex].used = true;
        }
    };

    this._updateGhosts = function(state)
    {
        for (var i = 0; i < state.ghosts.length; ++i)
        {
            state.ghosts[i].person.move(state);
            state.ghosts[i].changeDirection();
        }
    }
};