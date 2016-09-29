function initGameField(canvas)
{
    canvas.width = GAME_FIELD_WIDTH;
    canvas.height = GAME_FIELD_HEIGHT;
}

function setHandlers(packmen)
{
    document.onkeydown = function(event)
    {
        downButtonsHandler(event.keyCode, packmen);
    };
    document.onkeyup = function(event)
    {
        upButtonsHandler(event.keyCode, packmen);
    };
}

function downButtonsHandler(directionCode, packmen)
{
    switch (directionCode)
    {
        case TOP_DIRECT_CODE:
            packmen.setDirectionY(TOP_DIRECT);
            break;
        case DOWN_DIRECT_CODE:
            packmen.setDirectionY(DOWN_DIRECT);
            break;
        case RIGHT_DIRECT_CODE:
            packmen.setDirectionX(RIGHT_DIRECT);
            break;
        case LEFT_DIRECT_CODE:
            packmen.setDirectionX(LEFT_DIRECT);
            break;
    }
}

function upButtonsHandler(directionCode, packman)
{
    switch (directionCode)
    {
        case TOP_DIRECT_CODE:
            if (packman.getDirectionY(TOP_DIRECT) == TOP_DIRECT)
            {
                packman.setDirectionY(NONE_DIRECT);
            }
            break;
        case DOWN_DIRECT_CODE:
            if (packman.getDirectionY(DOWN_DIRECT) == DOWN_DIRECT)
            {
                packman.setDirectionY(NONE_DIRECT);
            }
            break;
        case RIGHT_DIRECT_CODE:
            if (packman.getDirectionX(RIGHT_DIRECT) == RIGHT_DIRECT)
            {
                packman.setDirectionX(NONE_DIRECT);
            }
            break;
        case LEFT_DIRECT_CODE:
            if (packman.getDirectionX(LEFT_DIRECT) == LEFT_DIRECT)
            {
                packman.setDirectionX(NONE_DIRECT);
            }
            break;
    }
}

function startGame(gameStateDrawer)
{
    var packman = new Packman(0, 0, PACKMAN_CONST);
    setHandlers(packman);
    /* Кроссбраузерный старый способ
    var NEW_FRAME_DELAY = 16;
    var gameInterval = setInterval(function()
    {
        packman.move();
        gameStateDrawer.drawState({ packman: packman });

    }, NEW_FRAME_DELAY);
    */
    gameTick();
    function gameTick()
    {
        packman.move();
        gameStateDrawer.drawState({ packman: packman });
        window.requestAnimationFrame(gameTick);
    }
}

document.addEventListener("DOMContentLoaded", function()
{
    var canvas = document.getElementById(GAME_FIELD_ID);
    initGameField(canvas);
    var canvasContext = canvas.getContext("2d");
    var gameStateDrawer = new GameStateDrawSystem(canvasContext);
    startGame(gameStateDrawer);
});

