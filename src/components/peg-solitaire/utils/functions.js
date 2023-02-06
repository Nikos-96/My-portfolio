const isValidPosition = ({ x, y }) => {
    const removedCells = [1, 2, 6, 7];
    return !(removedCells.includes(x) && removedCells.includes(y));
}

const makeMove = (cellsNew, move) => {
    const { from, to, toRemove } = move;
    cellsNew[from].isFree = true;
    cellsNew[to].isFree = false;
    cellsNew[toRemove].isFree = true;
}

const findIndex = (cellsObj, cell) => {
    const index = cellsObj.findIndex(el => el.y === cell.y && el.x === cell.x);
    return index;
}

const findAllPossibleMoves = (cells) => {
    let allPossibleMoves = [];
    for (let i of cells) {
        const currentPiece = findIndex(cells, { x: i.x, y: i.y });
        const currentMoves = checkJumps(cells, currentPiece);
        allPossibleMoves = [...allPossibleMoves, ...currentMoves];
    }
    return allPossibleMoves.filter(el => !cells[el.from].isFree);
}

export const initCells = () => {
    const x = [1, 2, 3, 4, 5, 6, 7];
    const y = [1, 2, 3, 4, 5, 6, 7];
    let cells = [];
    for (let i of x) {
        for (let j of y) {
            cells.push({
                x: i,
                y: j,
                isFree: false,
                isSelected: false
            })
        }
    }
    cells = cells
        .map((el, i) => {
            if (!isValidPosition(el)) {
                return {
                    id: i,
                    invalidPosition: true
                }
            } else {
                return { ...el, id: i }
            }
        });
    // console.log(splitArr(cells, 7))
    // return splitArr(cells, 7);
    return cells;
}

export const checkJumps = (cells, id) => {
    const { x, y } = cells[id];

    const checkJumpDirection = (piece, nextCell) => {
        const nextPieceIndex = findIndex(cells, piece);
        const nextCellIndex = findIndex(cells, nextCell);
        if (cells[nextPieceIndex] && cells[nextCellIndex]) {
            if (!cells[nextPieceIndex].isFree && cells[nextCellIndex].isFree) {
                return {
                    from: id,
                    to: nextCellIndex,
                    toRemove: nextPieceIndex
                }
            }
        }
        return false;
    }

    let possibleMoves = [];

    let u = checkJumpDirection({ x, y: y + 1 }, { x, y: y + 2 });
    let r = checkJumpDirection({ x: x + 1, y }, { x: x + 2, y });
    let d = checkJumpDirection({ x, y: y - 1 }, { x, y: y - 2 });
    let l = checkJumpDirection({ x: x - 1, y }, { x: x - 2, y });

    if (u.to) { possibleMoves.push(u) };
    if (r.to) { possibleMoves.push(r) };
    if (d.to) { possibleMoves.push(d) };
    if (l.to) { possibleMoves.push(l) };

    possibleMoves = possibleMoves.filter(el => isValidPosition(cells[el.to]) && !cells[el.from].isFree);
    return possibleMoves;
}

export const createLog = (cells, move) => {
    const toReplace = {
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'd',
        5: 'e',
        6: 'f',
        7: 'g',
    }
    return `${toReplace[cells[move.from].x]}${cells[move.from].y} --> ${toReplace[cells[move.to].x]}${cells[move.to].y}, removed: ${toReplace[cells[move.toRemove].x]}${cells[move.toRemove].y}`
}

export const findSolution = (cells) => {
    return new Promise(resolve => {
        const checkConditions = (cells, moves) => {
            const piecesLeft = cells.filter(el => el.isFree === false);
            if (piecesLeft.length === 1 && piecesLeft[0].id === 24) {
                return true;
            }
            return false;
        }

        const convertState = (cells) => {
            let result = '';
            cells
                .filter(el => el.hasOwnProperty('isFree'))
                .forEach(el => {
                    result += el.isFree ? 't' : 'f';
                })
            return result;
        }

        const createNextState = (cells, move) => {
            const newCells = cells.map(el => {
                return { ...el };
            });
            newCells[move.from].isFree = true;
            newCells[move.to].isFree = false;
            newCells[move.toRemove].isFree = true;
            return convertState(newCells);
        }

        const cellsCopy = cells.map(el => {
            return { ...el };
        })
        let win = false;
        let sequencesList = [];
        let stateList = [];
        let logList = [];

        const playGame = (cells) => {
            let gameCells = cells.map(el => {
                return { ...el };
            })
            let centerIndex = findIndex(gameCells, { x: 4, y: 4 });
            gameCells[centerIndex].isFree = true;
            let allPossibleMoves = findAllPossibleMoves(gameCells);
            let sequence = '';
            logList = [];
            while (allPossibleMoves.length !== 0) {
                let n;
                const nextIndex = allPossibleMoves.findIndex(el => {
                    const nextState = createNextState(gameCells, el);
                    return !stateList.includes(nextState);
                })
                if (nextIndex === -1) {
                    stateList.push(convertState(gameCells));
                    return;
                } else {
                    n = nextIndex;
                    makeMove(gameCells, allPossibleMoves[n]);
                    logList.push(createLog(gameCells, allPossibleMoves[n]));
                    allPossibleMoves = findAllPossibleMoves(gameCells);
                }
            }
            sequencesList.push(sequence);
            stateList.push(convertState(gameCells));
            let result = checkConditions(gameCells, allPossibleMoves);
            return result;
        }

        let interval = setInterval(() => {
            win = playGame(cellsCopy);
            if (win) {
                clearInterval(interval);
                resolve(logList);
            }
        }, 10);
    })
}
