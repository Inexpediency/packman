var GameStateUpdateSystem = function()
{
    this.update = function(state)
    {
        state.packman.person.move(state);
        this._updateGhosts(state);
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