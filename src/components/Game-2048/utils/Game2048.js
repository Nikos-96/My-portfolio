import produce from "immer";


const findNextPosition = (initialCells, cells, pos, dir, canStack) => {
    const { r, c } = pos;
    let nextR = r;
    let nextC = c;
    let remove = false;
    const result = [];
    if (canStack) {
        if (dir === 'up') {
            while (
                nextR + 1 < 4 &&
                nextR + 1 >= 0
            ) {
                if (cells[nextR + 1][c].number === '') {
                    nextR += 1;
                } else if (cells[nextR + 1][c].number === cells[r][c].number && initialCells[r][c].number === cells[nextR + 1][c].number) {
                    nextR += 1;
                    remove = true;
                    break;
                } else {
                    break;
                }
            }
        } else if (dir === 'left') {
            while (
                nextC + 1 < 4 &&
                nextC + 1 >= 0
            ) {
                if (cells[r][nextC + 1].number === '') {
                    nextC += 1;
                } else if (cells[r][nextC + 1].number === cells[r][c].number && initialCells[r][c].number === cells[r][nextC + 1].number) {
                    nextC += 1;
                    remove = true;
                    break;
                } else {
                    break;
                }
            }
        } else if (dir === 'right') {
            while (
                nextC - 1 < 4 &&
                nextC - 1 >= 0
            ) {
                if (cells[r][nextC - 1].number === '') {
                    nextC -= 1;
                } else if (cells[r][nextC - 1].number === cells[r][c].number && initialCells[r][c].number === cells[r][nextC - 1].number) {
                    nextC -= 1;
                    remove = true;
                    break;
                } else {
                    break;
                }
            }
        } else if (dir === 'down') {
            while (
                nextR - 1 < 4 &&
                nextR - 1 >= 0
            ) {
                if (cells[nextR - 1][c].number === '') {
                    nextR -= 1;
                } else if (cells[nextR - 1][c].number === cells[r][c].number && initialCells[r][c].number === cells[nextR - 1][c].number) {
                    nextR -= 1;
                    remove = true;
                    break;
                } else {
                    break;
                }
            }
        }
    } else if (!canStack) {
        if (dir === 'up') {
            while (
                nextR - 1 < 4 &&
                nextR - 1 >= 0
            ) {
                if (cells[nextR - 1][c].number === '') {
                    nextR -= 1;
                } else {
                    break;
                }
            }
        } else if (dir === 'right') {
            while (
                nextC + 1 < 4 &&
                nextC + 1 >= 0
            ) {
                if (cells[r][nextC + 1].number === '') {
                    nextC += 1;
                } else {
                    break;
                }
            }
        } else if (dir === 'down') {
            while (
                nextR + 1 < 4 &&
                nextR + 1 >= 0
            ) {
                if (cells[nextR + 1][c].number === '') {
                    nextR += 1;
                } else {
                    break;
                }
            }
        } else if (dir === 'left') {
            while (
                nextC - 1 < 4 &&
                nextC - 1 >= 0
            ) {
                if (cells[r][nextC - 1].number === '') {
                    nextC -= 1;
                } else {
                    break;
                }
            }
        }
    }
    result.push({ r: nextR, c: nextC, remove })
    return result;
}

const findActiveCells = (cells) => {
    const activeCells = [];
    for (let i in cells) {
        for (let j in cells[i]) {
            if (cells[i][j].number) {
                activeCells.push({ r: +i, c: +j })
            }
        }
    }
    return activeCells;
}

export const isLost = (cells) => {
    const directions = ['up', 'right', 'down', 'left'];
    const activeCells = findActiveCells(cells);
    let result = directions.map(dir => activeCells.map(el => {
        return findNextPosition(cells, cells, { r: el.r, c: el.c }, dir, true)[0]
    }))
    const lost = result.every(el => {
        const items = el.every(item => item.remove === false);
        return el.length === 16 && items;
    })
    return lost;
}

const splitArr = (arr, size) => {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
        const piece = arr.slice(i, i + size);
        res.push(piece);
    }
    return res;
}

export const getDirection = (keyCode) => {
    let direction;
    switch (keyCode) {
        case 'ArrowUp':
        case 'KeyW':
        case 'Up':
            direction = 'up';
            break;
        case 'ArrowRight':
        case 'KeyD':
        case 'Right':
            direction = 'right';
            break;
        case 'ArrowDown':
        case 'KeyS':
        case 'Down':
            direction = 'down';
            break;
        case 'ArrowLeft':
        case 'KeyA':
        case 'Left':
            direction = 'left';
            break;
        default:
            direction = '';
    }
    return direction;
}

export const addNumber = (cells) => {
    const emptyCells = [];
    for (let i in cells) {
        for (let j in cells[i]) {
            if (cells[i][j].number === '') {
                emptyCells.push({ r: i, c: j })
            }
        }
    }
    if (emptyCells.length > 0) {
        const randomCell = Math.floor(Math.random() * ((emptyCells.length - 1) + 1));
        const randomNum = (Math.random() > 0.8) ? 4 : 2
        const newState = produce(cells, cellsCopy => {
            const cell = emptyCells[randomCell];
            cellsCopy[cell.r][cell.c].number = randomNum;
            cellsCopy[cell.r][cell.c].new = true;
        })
        return newState;
    } else {
        return cells;
    }
}

export const getEmptyCellsCount = (AllCells, direction) => {
    let result = [];
    AllCells.forEach((r, rI) => r.forEach((c, cI) => {
        let nextR = rI;
        let nextC = cI;
        let cellsToMove = 0;
        let canStack = true;
        if (direction === 'up') {
            while (
                nextR - 1 < 4 &&
                nextR - 1 >= 0
            ) {
                if (
                    AllCells[0][nextC].number === AllCells[1][nextC].number &&
                    AllCells[0][nextC].number !== '' &&
                    AllCells[2][nextC].number === AllCells[3][nextC].number &&
                    AllCells[2][nextC].number !== ''
                ) {
                    if (rI === 0) {
                        cellsToMove = 0;
                        break;
                    } else if (rI === 1 || rI === 2) {
                        cellsToMove = 1;
                        break;
                    } else if (rI === 3) {
                        cellsToMove = 2;
                        break;
                    }
                } else {
                    if (AllCells[nextR - 1][nextC].number === '' && AllCells[rI][cI].number !== '') {
                        nextR -= 1;
                        cellsToMove += 1;
                    } else if (AllCells[nextR - 1][nextC].number === AllCells[rI][cI].number && AllCells[rI][cI].number !== '') {
                        if (!canStack) {
                            break;
                        }
                        nextR -= 1;
                        cellsToMove += 1;
                        canStack = false;
                    } else {
                        nextR -= 1;
                    }
                }
            }
        } else if (direction === 'right') {
            while (
                nextC + 1 < 4 &&
                nextC + 1 >= 0
            ) {
                if (AllCells[nextR][nextC + 1].number === '' && AllCells[rI][cI].number !== '') {
                    nextC += 1;
                    cellsToMove += 1;
                } else {
                    nextC += 1;
                }
            }
        } else if (direction === 'down') {
            while (
                nextR + 1 < 4 &&
                nextR + 1 >= 0
            ) {
                if (AllCells[nextR + 1][nextC].number === '' && AllCells[rI][cI].number !== '') {
                    nextR += 1;
                    cellsToMove += 1;
                } else {
                    nextR += 1;
                }
            }
        } else if (direction === 'left') {
            while (
                nextC - 1 < 4 &&
                nextC - 1 >= 0
            ) {
                if (AllCells[nextR][nextC - 1].number === '' && AllCells[rI][cI].number !== '') {
                    nextC -= 1;
                    cellsToMove += 1;
                } else {
                    nextC -= 1;
                }
            }
        }
        result.push(cellsToMove);
    }))
    return splitArr(result, 4);
}

export const getCellsMove = (oldCells, direction) => {
    const result = [];
    produce(oldCells, cellsCopy => {
        if (direction === 'right') {
            cellsCopy.forEach(el => el.reverse());
        } else if (direction === 'down') {
            cellsCopy.reverse();
        }
        cellsCopy.forEach((r, rI) => r.forEach((c, cI) => {
            let nextR = rI;
            let nextC = cI;
            let oldNum = c.number;
            let cellsToMove = 0;
            if (cellsCopy[rI][cI].number === '') {
                result.push(0);
            } else {
                if (direction === 'up') {
                    while (
                        nextR - 1 < 4 &&
                        nextR - 1 >= 0
                    ) {
                        if (cellsCopy[nextR - 1][cI].number === '') {
                            cellsCopy[nextR][nextC].number = '';
                            cellsCopy[nextR - 1][cI].number = oldNum;
                            nextR -= 1;
                            cellsToMove += 1;
                        } else if (!cellsCopy[nextR - 1][cI].stackDisabled && cellsCopy[nextR - 1][cI].number === oldCells[rI][cI].number) {
                            cellsCopy[nextR][nextC].number = '';
                            cellsCopy[nextR - 1][cI].stackDisabled = true;
                            nextR -= 1;
                            cellsToMove += 1;
                        } else {
                            break;
                        }
                    }
                } else if (direction === 'right') {
                    while (
                        nextC - 1 < 4 &&
                        nextC - 1 >= 0
                    ) {
                        if (cellsCopy[rI][nextC - 1].number === '') {
                            cellsCopy[nextR][nextC].number = '';
                            cellsCopy[rI][nextC - 1].number = oldNum;
                            nextC -= 1;
                            cellsToMove += 1;
                        } else if (!cellsCopy[rI][nextC - 1].stackDisabled && cellsCopy[rI][nextC - 1].number === cellsCopy[nextR][nextC].number) {
                            cellsCopy[nextR][nextC].number = '';
                            cellsCopy[rI][nextC - 1].stackDisabled = true;
                            nextC -= 1;
                            cellsToMove += 1;
                        } else {
                            break;
                        }
                    }
                } else if (direction === 'down') {
                    while (
                        nextR - 1 < 4 &&
                        nextR - 1 >= 0
                    ) {
                        if (cellsCopy[nextR - 1][cI].number === '') {
                            cellsCopy[nextR][nextC].number = '';
                            cellsCopy[nextR - 1][cI].number = oldNum;
                            nextR -= 1;
                            cellsToMove += 1;
                        } else if (!cellsCopy[nextR - 1][cI].stackDisabled && cellsCopy[nextR - 1][cI].number === cellsCopy[nextR][nextC].number) {
                            cellsCopy[nextR][nextC].number = '';
                            cellsCopy[nextR - 1][cI].stackDisabled = true;
                            nextR -= 1;
                            cellsToMove += 1;
                        } else {
                            break;
                        }
                    }
                } else if (direction === 'left') {
                    while (
                        nextC - 1 < 4 &&
                        nextC - 1 >= 0
                    ) {
                        if (cellsCopy[rI][nextC - 1].number === '') {
                            cellsCopy[nextR][nextC].number = '';
                            cellsCopy[rI][nextC - 1].number = oldNum;
                            nextC -= 1;
                            cellsToMove += 1;
                        } else if (!cellsCopy[rI][nextC - 1].stackDisabled && cellsCopy[rI][nextC - 1].number === oldCells[rI][cI].number) {
                            cellsCopy[nextR][nextC].number = '';
                            cellsCopy[rI][nextC - 1].stackDisabled = true;
                            nextC -= 1;
                            cellsToMove += 1;
                        } else {
                            break;
                        }
                    }
                }
                result.push(cellsToMove);
            }
        }))
    })
    if (direction === 'right') {
        const reversedResult = splitArr(result, 4).map(el => el.reverse());
        return reversedResult;
    } if (direction === 'down') {
        const reversedResult = splitArr(result, 4).reverse();
        return reversedResult;
    } else {
        return splitArr(result, 4);
    }

}

export const getNewCells = (direction, cells, currScore) => {
    let score = currScore;

    const moveCells = (cells, canStack = true) => {
        const initialCells = cells;
        let activeCells = findActiveCells(cells);
        if ((direction === 'down' || direction === 'right') && canStack) {
            activeCells = activeCells.reverse();
        }
        const newState = produce(cells, cellsCopy => {
            if (canStack) {
                cellsCopy.forEach(r => r.forEach(c => c.new = false));
            }
            activeCells.forEach((el, i) => {
                const newPos = findNextPosition(initialCells, cellsCopy, { r: el.r, c: el.c }, direction, canStack)[0];
                if (newPos !== undefined && newPos.r !== undefined && newPos.c !== undefined) {
                    const oldNum = cellsCopy[el.r][el.c].number;
                    if (newPos.remove) {
                        cellsCopy[el.r][el.c].number = '';
                        cellsCopy[el.r][el.c].remove = true;
                        cellsCopy[el.r][el.c].new = true;
                        cellsCopy[newPos.r][newPos.c].new = true;
                        cellsCopy[newPos.r][newPos.c].number = oldNum * 2;
                        score += oldNum * 2;
                    } else {
                        cellsCopy[el.r][el.c].number = '';
                        cellsCopy[newPos.r][newPos.c].number = oldNum;
                        if (cellsCopy[el.r][el.c].new) {
                            cellsCopy[newPos.r][newPos.c].new = true
                        }
                    }
                }
            })
        })
        activeCells = findActiveCells(newState);
        const newPositions = activeCells.map(el => {
            return findNextPosition(initialCells, newState, { r: el.r, c: el.c }, direction, false)[0]
        })
        const oldPositions = activeCells.map(el => ({ r: el.r, c: el.c }))
        const samePos = oldPositions.every((el, i) => {
            if (el.r === undefined || newPositions[i] === undefined) {
                return true
            } else {
                return el.r === newPositions[i].r && el.c === newPositions[i].c
            }
        })

        const lost = isLost(newState);
        if (lost) {
            return null;
        }
        return newPositions.length > 0 && !samePos
            ? moveCells(newState, false)
            : newState
    }

    const newCells = moveCells(cells);

    if (newCells === null) {
        return null
    } else {
        const cellsToMove = getCellsMove(cells, direction);
        let sameCells = newCells.every((r, rI) => r.every((c, cI) => c.number === cells[rI][cI].number));
        const newState = sameCells ? newCells : addNumber(newCells);
        return { cells: newState, score, cellsToMove, sameCells };
    }
}