const $game = document.getElementById('gameContainer')
const $cells = $game.getElementsByClassName('col')
const $rows = $game.getElementsByClassName('row')
let allRows = []
const $mines = $game.getElementsByClassName('mine')


const game = {
    level: 1,
    numOfRows: 10,
    numOfMines: 0,
    maxNumOfMines: 15
}

function newGame() {
    //reset game board
    $game.innerHTML = ''
    //reset number of mines and cell counts
    game.numOfMines = 0
    for (const cell of $cells) {
        cell.textContent = ''
        cell.classList.remove('exploded')
    }

    //make the game board
    for (let i = 0; i < game.numOfRows; i++) {
        const thisRow = document.createElement('div')
        thisRow.classList.add('row')
        for (let j = 0; j < game.numOfRows; j++) {
            const thisCol = document.createElement('div')
            thisCol.classList.add('col')
            thisRow.appendChild(thisCol)
        }
        $game.appendChild(thisRow)

    }
    allRows = Array.from($rows)

    //place the mines in random cells
    while (game.numOfMines < game.maxNumOfMines) {
        let randomCell = Math.floor(Math.random() * $cells.length)
        if (!$cells[randomCell].classList.contains('mine')) {
            $cells[randomCell].classList.add('mine')
            game.numOfMines++
        }
    }

    //Check row by row to see how many mines a cell is touching
    for (let i = 0; i < $rows.length; i++) {
        const $cols = $rows[i].querySelectorAll('.col')
        for (let j = 0; j < $cols.length; j++) {
            if ($cols[j].classList.contains('mine')) {
                //check left and right
                if (j < $cols.length - 1) {
                    $cols[j + 1].textContent++
                }
                if (j > 0) {
                    $cols[j - 1].textContent++
                }
                //check row below
                if (i > 0) {
                    const rowAbove = $rows[i - 1].querySelectorAll('.col')
                    rowAbove[j].textContent++
                    if (j < $cols.length - 1) {
                        rowAbove[j + 1].textContent++
                    }
                    if (j > 0) {
                        rowAbove[j - 1].textContent++
                    }
                }
                //check row above
                if (i < $rows.length - 1) {
                    const rowBelow = $rows[i + 1].querySelectorAll('.col')
                    rowBelow[j].textContent++
                    if (j < $cols.length - 1) {
                        rowBelow[j + 1].textContent++
                    }
                    if (j > 0) {
                        rowBelow[j - 1].textContent++
                    }
                }
            }
        }
    }

    const colours = ['zero', 'one', 'two', 'three', 'four', 'five', 'six']
    //add the colours for the numbers
    for (const cell of $cells) {
        let number = cell.textContent
        if (number) {
            if (number > 6) {
                number = 6
            }
            cell.classList.add(colours[number])
        }

    }

    //remove text from mine cells and cover all of the cells
    for (const cell of $cells) {
        if (cell.classList.contains('mine')) {
            cell.textContent = ''
        }
        cell.classList.add('covered')
    }

}


newGame()

$game.addEventListener('click', function (e) {
    if (e.target.classList.contains('col')) {
        e.target.classList.remove('covered')
        // if an empty tile is clicked, show all connected empty tiles
        if (!e.target.textContent && !e.target.classList.contains('mine')) {
            e.target.classList.remove('covered')
            //set the starting row to the current row
            let startingRow = e.target.closest('.row')
            let rowArray = Array.from(startingRow.querySelectorAll('.col'))
            let startingCell = rowArray.indexOf(e.target)

            for (let row = allRows.indexOf(startingRow); row < allRows.length; row++) {
                let currentCells = Array.from(allRows[row].querySelectorAll('.col'))
                //check all cells in current row
                for (let i = startingCell; i < currentCells.length; i++) {
                    if (currentCells[i].textContent) {
                        break
                    } else {
                        currentCells[i].classList.remove('covered')
                        if (i < currentCells.length - 1) {
                            currentCells[i + 1].classList.remove('covered')
                        }
                    }
                }
                for (let i = startingCell; i > 0; i--) {
                    if (currentCells[i].textContent) {
                        break
                    } else {
                        currentCells[i].classList.remove('covered')
                        if (i > 0) {
                            currentCells[i - 1].classList.remove('covered')
                        }
                    }
                }

            }

        }

    }
    if (e.target.classList.contains('mine')) {
        for (const mine of $mines) {
            mine.classList.add('exploded')
        }
    }
})

//buttons
const $menu = document.getElementById('menu')
const $reset = document.getElementById('reset')
const $menuBtn = document.getElementById('menuBtn')
const $easy = document.getElementById('easy')
const $medium = document.getElementById('medium')
const $hard = document.getElementById('hard')

$reset.addEventListener('click', function () {
    $menu.classList.add('hidden')
    newGame()
})
$menuBtn.addEventListener('click', function () {
    $menu.classList.toggle('hidden')
})
$easy.addEventListener('click', function () {
    game.maxNumOfMines = 10
    $menu.classList.toggle('hidden')
    newGame()
})
$medium.addEventListener('click', function () {
    game.maxNumOfMines = 15
    $menu.classList.toggle('hidden')
    newGame()
})
$hard.addEventListener('click', function () {
    game.maxNumOfMines = 20
    $menu.classList.toggle('hidden')
    newGame()
})