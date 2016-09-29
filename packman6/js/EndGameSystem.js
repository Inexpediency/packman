var EndGameSystem = function(canvas, canvasContext)
{
    var startGameEvent = new Event("startGame");

    this.canvasContext = canvasContext;
    this.active = false;
    var that = this;

    this._openResultWindow = function(event)
    {
        that.active = true;
        that._drawResultWindow(event.packman, event.isWin);
        that._setResultWindowHandlers();
    };

    this._setResultWindowHandlers = function()
    {
        canvas.addEventListener("click", this._restartButtonClickEventHandler);
        canvas.addEventListener("mousemove", this._restartButtonHoverEventHandler);
    };

    this._restartButtonClickEventHandler = function(event)
    {
        event.x = event.clientX;
        event.y = event.clientY;
        if (that.active && that._isIncludeInButton(that._restartButton, event))
        {
            that.active = false;
            canvas.dispatchEvent(startGameEvent);
            canvas.removeEventListener("click", this._restartButtonClickEventHandler);
            canvas.removeEventListener("mousemove", this._restartButtonHoverEventHandler);
        }
    };

    this._restartButtonHoverEventHandler = function(event)
    {
        event.x = event.clientX;
        event.y = event.clientY;
        if (that.active)
        {
            if (that._isIncludeInButton(that._restartButton, event))
            {
                that._restartButton.setIsHover(true);
                that._restartButton.draw();
            }
            else
            {
                that._restartButton.setIsHover(false);
                that._restartButton.draw()
            }
        }
    };
    
    this._isIncludeInButton = function(button, point)
    {
        return (button.getX() < point.x) && (point.x < button.getX() + button.getWidth()) &&
               (button.getY() < point.y) && (point.y < button.getY() + button.getHeight());
    };

    this._drawResultWindow = function(packman, isWin)
    {
        var topPos = RESULT_WINDOW.y;
        topPos = this._drawBackground(topPos);
        topPos = this._drawResultText(topPos, isWin);
        topPos = this._drawScore(topPos, packman.score);
        this._drawRestartButton(topPos);
    };

    this._drawBackground = function(topPosition)
    {
        var currentEl = RESULT_WINDOW.background;
        this.canvasContext.fillStyle = currentEl.fillColor;
        this.canvasContext.strokeStyle = currentEl.strokeColor;
        this.canvasContext.lineHeight = currentEl.borderHeight;
        this.canvasContext.fillRect(RESULT_WINDOW.x, topPosition, RESULT_WINDOW.width, RESULT_WINDOW.height);
        this.canvasContext.strokeRect(RESULT_WINDOW.x, RESULT_WINDOW.y, RESULT_WINDOW.width, RESULT_WINDOW.height);
        return topPosition + currentEl.borderHeight;
    };

    this._drawResultText = function(topPosition, isWin)
    {
        var currentEl = RESULT_WINDOW.resultText;
        var message = isWin ? currentEl.winMassage : currentEl.loseMassage;
        this.canvasContext.fillStyle = currentEl.color;
        this.canvasContext.textAlign = currentEl.textAlign;
        this.canvasContext.textBaseline = "top";
        this.canvasContext.font = currentEl.font;
        this.canvasContext.fillText(
            message,
            RESULT_WINDOW.x + RESULT_WINDOW.width / 2,
            topPosition + currentEl.top);
        return topPosition + currentEl.height + currentEl.top;
    };

    this._drawScore = function(topPosition, score)
    {
        var currentEl = RESULT_WINDOW.score;
        this.canvasContext.fillStyle = currentEl.color;
        this.canvasContext.textBaseline = "top";
        this.canvasContext.textAlign = "center";
        this.canvasContext.font = currentEl.font;
        this.canvasContext.fillText(
            currentEl.message + score,
            RESULT_WINDOW.x + RESULT_WINDOW.width / 2, /* параметр right задан в процентах */
            topPosition + currentEl.top
        );
        return topPosition + currentEl.height + currentEl.top;
    };

    this._drawRestartButton = function(topPosition)
    {
        if (this._restartButton == undefined)
        {
            this._initResultButton(topPosition);
        }
        return this._restartButton.draw();
    };

    this._initResultButton = function(topPosition)
    {
        this._restartButton = new Button(
            topPosition,
            RESULT_WINDOW,
            RESULT_WINDOW.restartButton,
            RESULT_WINDOW.restartButtonHover,
            this.canvasContext
        );
    };

    canvas.addEventListener("endGame", this._openResultWindow);
};