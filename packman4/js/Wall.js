var Wall = function(x, y)
{
    this._x = x;
    this._y = y;

    this.getSize = function()
    {
        return FIELD_ELEMENT_SIZE;
    };

    this.getX = function()
    {
        return this._x;
    };

    this.getY = function()
    {
        return this._y;
    };
};