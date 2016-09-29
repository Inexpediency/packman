var Packman = function(x, y)
{
    this.person = new Persona(x, y, PACKMAN_CONST);
    this.score = 0;
    this._angle = 0;
    this._smileAngle = 1;
    this._smileAngleStep = PACKMAN_CONST.smileStep;

    this.getSmileAngle = function()
    {
        return this._smileAngle;
    };

    this.bumpSmileAngle = function()
    {
        this._smileAngle += this._smileAngleStep;
        if ((this._smileAngle >= 90) || (this._smileAngle <= 1))
        {
            this._smileAngleStep = - this._smileAngleStep;
        }
    };

    this.calcAngle = function(directon)
    {
        if (directon.x || directon.y)
        {
            if (!directon.y)
            {
                if (directon.x < 0)
                {
                    this._angle = Math.PI;
                }
                else
                {
                    this._angle = 0;
                }
            }
            else if (!directon.x)
            {
                if (directon.y > 0)
                {
                    this._angle = Math.PI / 2;
                }
                else
                {
                    this._angle = Math.PI * 3 / 2;
                }
            }
        }
    };

    this.getAngle = function()
    {
        return this._angle;
    };
};