var Button = function(posY, parent, buttonConst, buttonHoverConst, canvasContext)
{
    this._x = parent.x + parent.width * parseInt(buttonConst.right) / 100;
    this._y = posY + buttonConst.top;
    this._width = parent.width * parseInt(buttonConst.width) / 100;
    this._height = buttonConst.height;
    this._content = buttonConst.message;
    this._border =  buttonConst.border;
    this._font = buttonConst.font;
    this._isHover = false;

    this.setIsHover = function(isHover)
    {
        this._isHover = isHover;
    };

    this.getX = function()
    {
        return this._x;
    };

    this.getY = function()
    {
        return this._y;
    };

    this.getWidth = function()
    {
        return this._width;
    };

    this.getHeight = function()
    {
        return this._height;
    };

    this.draw = function()
    {
        var buttonSettings = this._isHover ? buttonHoverConst : buttonConst;
        var arcRadius = this._height / 2;
        canvasContext.fillStyle = buttonSettings.background;
        canvasContext.strockStyle = buttonSettings.borderColor;
        canvasContext.beginPath();
        canvasContext.lineHeight = this._border;
        canvasContext.moveTo(this._x + arcRadius, this._y);
        canvasContext.lineTo(this._x + this._width - arcRadius, this._y);
        canvasContext.arc(this._x + this._width - arcRadius, this._y + arcRadius, arcRadius, -Math.PI / 2, Math.PI / 2, false);
        canvasContext.lineTo(this._x + arcRadius, this._y + this._height);
        canvasContext.arc(this._x + arcRadius, this._y + arcRadius, arcRadius, Math.PI / 2, 3 * Math.PI / 2, false);
        canvasContext.closePath();
        canvasContext.fill();
        canvasContext.stroke();
        canvasContext.fillStyle = buttonSettings.color;
        canvasContext.font = this._font;
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "middle";
        canvasContext.fillText(this._content, this._x + this._width / 2, this._y + this._height / 2);
        return this._y + this._height;
    }
};
