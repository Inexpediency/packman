var MathUtils = function()
{
    this.randInt = function(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
};

var mathUtils = new MathUtils();