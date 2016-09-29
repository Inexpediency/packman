var GameStateUpdateSystem = function()
{
    this.update = function(state)
    {
        state.packman.move(state);
    };
};