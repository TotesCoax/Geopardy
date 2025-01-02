// Setting Up Element variables
const fileInput = document.querySelector('#fileInput')
const admin = document.querySelector('#admin')
const board = document.querySelector('#board')
const fileSetup = document.querySelector('#fileSetup')
const playerNameSetup = document.querySelector('#playerNameSetup')
const playersDisplay = document.querySelector('#playersDisplay')

//Admin section toggle
document.querySelector('#titleBanner').addEventListener('click', (e) => {
    admin.querySelector('#setup').classList.toggle('hidden')
})

//Player Updates
playerNameSetup.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', playerNameUpdate)
})

function playerNameUpdate(playerInputEvent){
    let playersInputArray = Array.from(playerNameSetup.querySelectorAll('input')),
        playersDisplayArray = Array.from(playersDisplay.querySelectorAll('p[data-pType="player-name"]')),
        inputPosition = playersInputArray.indexOf(playerInputEvent.target)

    playersDisplayArray[inputPosition].innerText = playerInputEvent.target.value
}

//Tile growing/shrinking
board.querySelectorAll(".tile").forEach(tile => {
    tile.addEventListener('dblclick', () => {
        tile.querySelector('.question').classList.toggle('displaying')
        tile.querySelector('.question').classList.toggle('hidden')
        tile.querySelector('.question').classList.toggle('flex-center')
        tile.addEventListener('dblclick', () =>{
            tile.classList.add('answered')
        })
    })
})


//File Handling
fileInput.addEventListener('change', () => {
    const Reader = new FileReader()

    Reader.readAsText(fileInput.files[0])

    Reader.addEventListener('load', () => {
        const csv = Reader.result

       const arrayFromCSV =  csv.split('\r\n').map((line) => {
            return line.split(',')
        })
        boardState = transformCSVArrayIntoCategorizedArrayWithMaps(arrayFromCSV)
        renderBoard(boardState)
    })
})

function transformCSVArrayIntoCategorizedArrayWithMaps(data){
    //Cycles through the CSV and maps the column titles to the items values.
    let mapsArray = []
    for (let i = 1; i < data.length; i++) {
        let cell = new Map()
        for (let col = 0; col < data[i].length; col++){
            cell.set(data[0][col], data[i][col])
        }
        mapsArray.push(cell)
    }

    //Groups the categories into arrays andput those inside an array as well. Mimics the setup of the html.
    let categorizedArray = []
    for (let category = 0; category < 6; category++) {
        let newCategory = []
        for (let index = 0; index < 5; index++) {
            newCategory.push(mapsArray[5 * category + index])
        }
        categorizedArray.push(newCategory)           
    }
    return categorizedArray
}

function renderBoard(data){
    let categories = document.querySelectorAll('.category')
    for (let categoryIndex = 0; categoryIndex < data.length; categoryIndex++) {
        categories[categoryIndex].querySelector('.title p').innerText = data[categoryIndex][0].get('Column Title')
        let tiles = categories[categoryIndex].querySelectorAll('.tile')
        for (let promptIndex = 0; promptIndex < data[categoryIndex].length; promptIndex++) {
            tiles[promptIndex].querySelector('.question').innerText = data[categoryIndex][promptIndex].get('Question')
            tiles[promptIndex].querySelector('.value').innerText = data[categoryIndex][promptIndex].get('Value')
            tiles[promptIndex].dataset.value = data[categoryIndex][promptIndex].get('Value')
        }
    }
}

//Game stuff
function getTileCoordinates(element){
    let categories = Array.from(document.querySelectorAll('.category')),
        tile = element.parentNode,
        category = tile.parentNode,
        tiles = Array.from(category.querySelectorAll('.tile')),
        categoryIndex = categories.indexOf(category),
        tileIndex = tiles.indexOf(tile)
    
    console.log([categoryIndex, tileIndex])
    return [categoryIndex, tileIndex]
}

function getCurrentTileCoords(){
    let currentTile = document.querySelector('.displaying')

    return getTileCoordinates(currentTile)
}
function getCurrentTile(){
    let coords = getCurrentTileCoords(),
        boardTile = boardState[coords[0]][coords[1]]

    console.log(boardTile)
    return boardTile
}

function getCurrentValue(){
    console.log(getCurrentTile().get('Value'))
    return getCurrentTile().get('Value')
}