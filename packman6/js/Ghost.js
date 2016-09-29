var Ghost = function(x, y)
{
    this.person = new Persona(x, y, GHOST_CONST);

    this.changeDirection = function()
    {
        if (this._isTurn())
        {
            if (this.person.getDirectionY())
            {
                if (mathUtils.randInt(0, 1))
                {
                    this.person.setDirectionX(LEFT_DIRECT);
                }
                else
                {
                    this.person.setDirectionX(RIGHT_DIRECT);
                }
                this.person.setDirectionY(NONE_DIRECT);
            }
            else
            {
                this.person.setDirectionX(NONE_DIRECT);
                if (mathUtils.randInt(0, 1))
                {
                    this.person.setDirectionY(TOP_DIRECT);
                }
                else
                {
                    this.person.setDirectionY(DOWN_DIRECT);
                }
            }
        }
    };

    this._isTurn = function()
    {
        var x = this.person.getX() / FIELD_ELEMENT_SIZE;
        var y = this.person.getY() / FIELD_ELEMENT_SIZE;
        return ((this.person.getX() % FIELD_ELEMENT_SIZE == 0) && (this.person.getY() % FIELD_ELEMENT_SIZE == 0)) &&
            ((this.person.getDirectionX() && ((FIELD[y + 1][x] != 1) || (FIELD[y - 1][x] != 1))) ||
             (this.person.getDirectionY() && ((FIELD[y][x + 1] != 1) || (FIELD[y][x - 1] != 1))))
    }
};