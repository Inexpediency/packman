var CollisionsLib = function()
{
    this.getIntersection = function(obj1, obj2)
    {
        var xIntersection = ((obj1.getX() + FIELD_ELEMENT_SIZE) > obj2.getX()) && ((obj2.getX() + FIELD_ELEMENT_SIZE) > obj1.getX());
        var yIntersection = ((obj1.getY() + FIELD_ELEMENT_SIZE) > obj2.getY()) && ((obj2.getY() + FIELD_ELEMENT_SIZE) > obj1.getY());
        return xIntersection && yIntersection;
    };

    this.isIntersectedObj = function(obj, arr)
    {
        for (var i = 0; i < arr.length; ++i)
        {
            if (this.getIntersection(obj, arr[i]))
            {
                return 1;
            }
        }
        return 0;
    };
};
var collisions = new CollisionsLib();