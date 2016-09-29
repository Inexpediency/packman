function initGameField(canvas)
{
    canvas.width = GAME_FIELD_WIDTH;
    canvas.height = GAME_FIELD_HEIGHT;
}

function setHandlers(packman)
{
    document.onkeydown = function(event)
    {
        downButtonsHandler(event.keyCode, packman.person);
    };
    document.onkeyup = function(event)
    {
        upButtonsHandler(event.keyCode, packman.person);
    };
}

function downButtonsHandler(directionCode, packman)
{
    switch (directionCode)
    {
        case TOP_DIRECT_CODE:
            packman.setDirectionY(TOP_DIRECT);
            break;
        case DOWN_DIRECT_CODE:
            packman.setDirectionY(DOWN_DIRECT);
            break;
        case RIGHT_DIRECT_CODE:
            packman.setDirectionX(RIGHT_DIRECT);
            break;
        case LEFT_DIRECT_CODE:
            packman.setDirectionX(LEFT_DIRECT);
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

function initGameState()
{
    var gameState = {};
    gameState.ghosts = [];
    gameState.walls = [];
    for (var y = 0; y < FIELD.length; ++y)
    {
        for (var x = 0; x < FIELD[y].length; ++x)
        {
            if (FIELD[y][x] == PACKMAN_CHAR)
            {
                gameState.packman = new Packman(x * FIELD_ELEMENT_SIZE, y * FIELD_ELEMENT_SIZE);
            }
            else if (FIELD[y][x] == GHOST_CHAR)
            {
                gameState.ghosts[gameState.ghosts.length] = new Ghost(x * FIELD_ELEMENT_SIZE, y * FIELD_ELEMENT_SIZE);
            }
            else if (FIELD[y][x])
            {
                gameState.walls[gameState.walls.length] = new Wall(x * FIELD_ELEMENT_SIZE, y * FIELD_ELEMENT_SIZE)
            }
        }
    }
    return gameState;
}

function startGame(gameStateDrawer, gameStateUpdater)
{
    var gameState = initGameState();
    setHandlers(gameState.packman);
    initTick(gameStateDrawer, gameStateUpdater, gameState);
}

function initTick(gameStateDrawer, gameStateUpdater, gameState)
{
    gameTick();
    function gameTick()
    {
        gameStateUpdater.update(gameState);
        gameStateDrawer.draw(gameState);
        window.requestAnimationFrame(gameTick);
    }
}



document.addEventListener("DOMContentLoaded", function()
{
    var canvas = document.getElementById(GAME_FIELD_ID);
    initGameField(canvas);
    var canvasContext = canvas.getContext("2d");
    var gameStateDrawer = new GameStateDrawSystem(canvasContext);
    var gameStateUpdater = new GameStateUpdateSystem();
    startGame(gameStateDrawer, gameStateUpdater);
});

