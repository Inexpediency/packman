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

    this.isIntersectedPerson = function(obj, arr)
    {
        for (var i = 0; i < arr.length; ++i)
        {
            if (this.getIntersection(obj.person, arr[i].person))
            {
                return 1;
            }
        }
        return 0;
    };


    this.getPointIntersection = function(obj, point)
    {
        var xIntersection = ((obj.getX() + PACKMAN_CONST.radius * 2) > point.getX() + POINT_CONST.radius) && (point.getX() + POINT_CONST.radius > obj.getX());
        var yIntersection = ((obj.getY() + PACKMAN_CONST.radius * 2) > point.getY() + POINT_CONST.radius) && (point.getY() + POINT_CONST.radius > obj.getY());
        return xIntersection && yIntersection;
    };

    this.getIntersectedPointIndex = function(obj, pointArr)
    {
        for (var i = 0; i < pointArr.length; ++i)
        {
            if (!pointArr[i].used && this.getPointIntersection(obj, pointArr[i]))
            {
                return i;
            }
        }
        return -1;
    };
};
var collisions = new CollisionsLib();