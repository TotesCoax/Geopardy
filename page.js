// Setting Up Element variables
const fileInput = document.querySelector('#fileInput')
const admin = document.querySelector('#admin')
const board = document.querySelector('#board')
const fileSetup = document.querySelector('#fileSetup')

const playerNameSetup = document.querySelector('#playerNameSetup')
const playerNameChange = document.querySelector('#playerNameChange')
const numberOfPlayersInput = playerNameSetup.querySelector('input')
const playersDisplay = document.querySelector('#playersDisplay')

//Clone template
function cloneTemplate(templateID){
    let template = document.getElementById(templateID),
        clone = template.content.cloneNode(true)
    return clone
}

//Remove Children
function clearChildNodes(element){
    while (element.firstChild) {
        element.removeChild(element.lastChild)
    }
}

//Admin section toggle
document.querySelector('#titleBanner').addEventListener('click', (e) => {
    admin.querySelector('#setup').classList.toggle('hidden')
})

//Score Controller
//Add Controller Listeners
document.addEventListener('keypress', scoreKeypressListener)



//The Control Listener
function scoreKeypressListener(e){
    switch (e.code) {
        case "Digit1":
                changeScore(1, e.shiftKey)
            break;
        case "Digit2":
                changeScore(2, e.shiftKey)
            break;
        case "Digit3":
                changeScore(3, e.shiftKey)
            break;
        case "Digit4":
                changeScore(4, e.shiftKey)
            break;
        case "Digit5":
                changeScore(5, e.shiftKey)
            break;
        case "Digit6":
                changeScore(6, e.shiftKey)
            break;
        case "Digit7":
                changeScore(7, e.shiftKey)
            break;
        case "Digit8":
                changeScore(8, e.shiftKey)
            break;   
        default:
            console.log(e.code, e.shiftKey)
            break;
    }
}

//Change Score
function changeScore(seat, shiftPressed){
    try {
        let seatDiv = document.querySelector(`div[data-seat="${seat}"]`),
            currentInputValue = Number(seatDiv.querySelector('input').value)
        console.log(seat, shiftPressed, seatDiv, currentInputValue)
        if(shiftPressed){
            seatDiv.querySelector('input').value = currentInputValue - 100
        } else {
            seatDiv.querySelector('input').value = currentInputValue + 100
        }
    } catch (error) {
        console.log('Seat not found')
    }
}

//Player Updates
//Listener assignment
numberOfPlayersInput.addEventListener('change', (e)=>{
    let numPlayers = numberOfPlayersInput.value
    clearChildNodes(playerNameChange)
    clearChildNodes(playersDisplay)
    renderNumberofPlayers(numPlayers)
    addListentersToPlayerUpdateInput()
})

//Adjust number of players
function renderNumberofPlayers(numberOfPlayers){
    for (let seat = 0; seat < numberOfPlayers; seat++) {
        let playerNumber = seat+1
            playerTile = cloneTemplate('playerTileTemplate'),
            playerNameUpdate = cloneTemplate('playerNameUpdateTemplate')

        playerTile.querySelector('.playerBoard').dataset.seat = playerNumber
        playerNameUpdate.querySelector('input').id = playerNumber
        playerNameUpdate.querySelector('label').setAttribute("for", playerNumber)
        playerNameUpdate.querySelector('label').innerText = `Player ${playerNumber}`

        playerNameChange.appendChild(playerNameUpdate)
        playersDisplay.appendChild(playerTile)
    }
}

//Update Player Names
function addListentersToPlayerUpdateInput(){
    let playerInputs = document.querySelectorAll('input[data-playerNameInput="yes"]')

    playerInputs.forEach(input => input.addEventListener('input', updateDisplayName))
}

//Update Name on Change
function updateDisplayName(event){
    let seatNumber = event.target.id,
        displayName = document.querySelector(`div[data-seat="${seatNumber}"]`)


    displayName.querySelector('.player-name').innerText = event.target.value.toUpperCase()
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
            // Split on commas outside of quotes
            return line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
        })
        console.table(arrayFromCSV)
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

function cleanUpQuotes(string){
    return string.replaceAll("\"\"", ";").replaceAll("\"", "").replaceAll(";", "\"")
}

function renderBoard(data){
    let categories = document.querySelectorAll('.category')
    for (let categoryIndex = 0; categoryIndex < data.length; categoryIndex++) {
        categories[categoryIndex].querySelector('.title p').innerText = cleanUpQuotes(data[categoryIndex][0].get('Column Title'))
        let tiles = categories[categoryIndex].querySelectorAll('.tile')
        for (let promptIndex = 0; promptIndex < data[categoryIndex].length; promptIndex++) {
            tiles[promptIndex].querySelector('.question').innerText = cleanUpQuotes(data[categoryIndex][promptIndex].get('Question'))
            tiles[promptIndex].querySelector('.value').innerText = data[categoryIndex][promptIndex].get('Value')
            tiles[promptIndex].dataset.value = data[categoryIndex][promptIndex].get('Value')
        }
    }
}
