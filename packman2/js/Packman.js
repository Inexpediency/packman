function Packman(x, y, constants)
{
    this._x = x;
    this._y = y;
    this._directionX = NONE_DIRECT;
    this._directionY = NONE_DIRECT;
    this._speed = constants.speed;

    this.move = function()
    {
        this._x += this._speed * this._directionX;
        this._y += this._speed * this._directionY;
    };

    this.getX = function()
    {
        return this._x;
    };

    this.getY = function()
    {
        return this._y;
    };

    this.setDirectionX = function(direction)
    {
        this._directionX = direction;
    };

    this.setDirectionY = function(direction)
    {
        this._directionY = direction;
    };

    this.getDirectionX = function()
    {
        return this._directionX;
    };

    this.getDirectionY = function()
    {
        return this._directionY;
    };
}