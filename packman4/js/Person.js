var Persona = function(x, y, constants)
{
    this._x = x;
    this._y = y;
    this._directionX = constants.directionX;
    this._directionY = constants.directionY;
    this._speed = constants.speed;

    this.move = function (state)
    {
        this._x += this._speed * this._directionX;
        if (collisions.isIntersectedObj(this, state.walls))
        {
            this._x -= this._speed * this._directionX;
        }
        this._y += this._speed * this._directionY;
        if (collisions.isIntersectedObj(this, state.walls))
        {
            this._y -= this._speed * this._directionY;
        }
    };

    this.getX = function ()
    {
        return this._x;
    };

    this.getY = function ()
    {
        return this._y;
    };

    this.setDirectionX = function (direction)
    {
        this._directionX = direction;
    };

    this.setDirectionY = function (direction)
    {
        this._directionY = direction;
    };

    this.getDirectionX = function ()
    {
        return this._directionX;
    };

    this.getDirectionY = function ()
    {
        return this._directionY;
    };
};