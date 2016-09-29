var Point = function(x, y)
{
    this._x = x;
    this._y = y;
    this.used = false;

    this.getX = function()
    {
        return this._x;
    };

    this.getY = function()
    {
        return this._y;
    };
};