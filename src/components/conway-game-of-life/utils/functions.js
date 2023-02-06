export const createCells = (c, r) => {
    const columns = [...Array(c).keys()];
    const rows = [...Array(r).keys()];
    const cells = columns.map(column => {
        return rows.map(row => {
            return { active: false }
        });
    })
    return cells;
}

export const findNextState = (currCells) => {
    const c = currCells.length;
    const r = currCells[0].length;
    const newState = currCells.map((el, cId) => {
        return (
            el.map((item, rId) => {
                let neighbors = [
                    {
                        c: cId,
                        r: rId - 1,
                    },
                    {
                        c: cId + 1,
                        r: rId - 1,
                    },
                    {
                        c: cId + 1,
                        r: rId
                    },
                    {
                        c: cId + 1,
                        r: rId + 1,
                    },
                    {
                        c: cId,
                        r: rId + 1,
                    },
                    {
                        c: cId - 1,
                        r: rId + 1,
                    },
                    {
                        c: cId - 1,
                        r: rId,
                    },
                    {
                        c: cId - 1,
                        r: rId - 1,
                    },
                ]
                neighbors = neighbors
                    .filter(el => el.c >= 0 && el.c < c && el.r >= 0 && el.r < r)
                    .filter(item => currCells[item.c][item.r].active).length;

                if (!item.active && neighbors === 3) {
                    return { active: true };
                }
                if (item.active && neighbors < 2) {
                    return { active: false };
                }
                if (item.active && (neighbors === 2 || neighbors === 3)) {
                    return item;
                }
                if (item.active && neighbors > 3) {
                    return { active: false };
                }
                return item;
            })
        )
    })
    return newState;
}

