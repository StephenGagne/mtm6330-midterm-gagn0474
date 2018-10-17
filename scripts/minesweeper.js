const $game = document.getElementById('game')
const $cells = $game.getElementsByClassName('col')
const $rows = $game.getElementsByClassName('row')
let allRows = []
const $mines = $game.getElementsByClassName('mine')
const $icons = document.getElementById('icons')
const $counter = document.getElementById('counter')
const $face = document.getElementById('face')
let flag = false
const $toggle = document.getElementById('toggle')


const game = {
    level: 1,
    numOfRows: 10,
    numOfMines: 0,
    maxNumOfMines: 10,
    minesFound: 0
}

function newGame() {
    //toggle flag/curosr
    flag = false
    $toggle.querySelector('.flag').classList.remove('toggled')
    $toggle.querySelector('.cursor').classList.add('toggled')
    //reset game board
    $game.innerHTML = ''
    //Set the face icon back
    $face.src = "./img/neutral-face.svg"
    //reset number of mines and cell counts
    game.numOfMines = 0
    toReveal.length = 0
    game.minesFound = 0
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
        $counter.textContent = game.maxNumOfMines;
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

function reveal(cells) {
    for (const cell of cells) {
        cell.classList.remove('covered')
    }
    toReveal.length = 0
}

function checkLeftRight() {
    if (!checkRow[cellIndex].classList.contains('mine')) {
        toReveal.push(checkRow[cellIndex])
        if (cellIndex < checkRow.length - 1) {
            if (!checkRow[cellIndex + 1].classList.contains('mine')) {
                toReveal.push(checkRow[cellIndex + 1])
            }
        }
        if (cellIndex > 0) {
            if (!checkRow[cellIndex - 1].classList.contains('mine')) {
                toReveal.push(checkRow[cellIndex - 1])
            }
        }
    }
}
const toReveal = []

//set up cell flagging

$toggle.addEventListener('click', function () {
    if (flag === true) {
        flag = false
        $toggle.querySelector('.flag').classList.toggle('toggled')
        $toggle.querySelector('.cursor').classList.toggle('toggled')
    } else {
        flag = true
        $toggle.querySelector('.flag').classList.toggle('toggled')
        $toggle.querySelector('.cursor').classList.toggle('toggled')
    }
})

$game.addEventListener('click', function (e) {
    if (e.target.classList.contains('col')) {
        if (flag === true) {
            e.target.classList.toggle('flagged')
            if (e.target.classList.contains('mine')) {
                e.target.classList.remove('mine')
                $counter.textContent--
                game.minesFound++
                if (game.minesFound === game.maxNumOfMines) {
                    for (const cell of $cells) {
                        cell.classList.remove('covered')
                        document.getElementById('face').src = "./img/happy-face.svg"
                    }
                    setTimeout(function () {
                        $menu.classList.remove('hidden')
                    }, 2000)
                }
            }
        } else {
            if (!e.target.classList.contains('flagged')) {
                e.target.classList.remove('covered')
                // if an empty tile is clicked, show all connected empty tiles
                if (!e.target.textContent && !e.target.classList.contains('mine')) {
                    //set the starting row to the current row
                    let startingRow = e.target.closest('.row')
                    let rowIndex = allRows.indexOf(startingRow)
                    checkRow = Array.from(allRows[rowIndex].querySelectorAll('.col'))
                    cellIndex = checkRow.indexOf(e.target)
                    toReveal.push[e.target]

                    checkLeftRight()
                    if (rowIndex < allRows.length - 1) {
                        checkRow = Array.from(allRows[rowIndex + 1].querySelectorAll('.col'))
                        checkLeftRight()
                    }
                    if (rowIndex > 0) {
                        checkRow = Array.from(allRows[rowIndex - 1].querySelectorAll('.col'))
                        checkLeftRight()
                    }

                    reveal(toReveal)
                }

                if (e.target.classList.contains('mine')) {
                    $face.src = "./img/sad-face.svg"
                    for (const mine of $mines) {
                        mine.classList.add('exploded')
                    }
                    setTimeout(function () {
                        $menu.classList.remove('hidden')
                    }, 2000)
                }
            }
        }
    }
})

//buttons
const $menu = document.getElementById('menu')
const $reset = document.getElementById('reset')
const $sbReset = document.getElementById('sb-reset')
const $menuBtn = document.getElementById('menuBtn')
const $easy = document.getElementById('easy')
const $sbEasy = document.getElementById('sb-easy')
const $medium = document.getElementById('medium')
const $sbMedium = document.getElementById('sb-medium')
const $hard = document.getElementById('hard')
const $sbHard = document.getElementById('sb-hard')
const $sbRandom = document.getElementById('sb-random')
const $smile = document.getElementById('smile')

function reset() {
    $menu.classList.add('hidden')
    newGame()
}

$reset.addEventListener('click', reset)
$sbReset.addEventListener('click', reset)
$smile.addEventListener('click', reset)

$menuBtn.addEventListener('click', function () {
    $menu.classList.toggle('hidden')
})

function makeEasy() {
    game.numOfRows = 10
    game.maxNumOfMines = 10
    $menu.classList.add('hidden')
    newGame()
}

$easy.addEventListener('click', makeEasy)
$sbEasy.addEventListener('click', makeEasy)

function makeMedium() {
    game.numOfRows = 10
    game.maxNumOfMines = 15
    $menu.classList.add('hidden')
    newGame()
}

$medium.addEventListener('click', makeMedium)
$sbMedium.addEventListener('click', makeMedium)

function makeHard() {
    game.numOfRows = 10
    game.maxNumOfMines = 20
    $menu.classList.add('hidden')
    newGame()
}

$hard.addEventListener('click', makeHard)
$sbHard.addEventListener('click', makeHard)

$sbRandom.addEventListener('click', function () {
    $menu.classList.add('hidden')
    game.numOfRows = (Math.floor(Math.random() * 5) + 10)
    game.maxNumOfMines = (Math.floor(Math.random() * (game.numOfRows * 2)) + 10)
    newGame()
})

newGame()