var GameStateUpdateSystem = function()
{
    this.update = function(state)
    {
        this._updatePackmen(state);
        this._updatePoints(state);
        this._updateGhosts(state);
    };

    this._updatePackmen = function(state)
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
            state.points.splice(intersectedPointIndex, 1);
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