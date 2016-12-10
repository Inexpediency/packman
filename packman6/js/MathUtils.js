var MathUtils = function()
{
    //TODO:: лучше randomIntInRange
    this.randInt = function(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.degToRad = function(angle)
    {
        return angle * Math.PI / 180;
    };
};

var mathUtils = new MathUtils();