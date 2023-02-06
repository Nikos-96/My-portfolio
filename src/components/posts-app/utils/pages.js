export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
}

export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i += 1) {
        result.push(i + 1)
    }
    return result;
}

export const splitData = (data, limit, totalPages) => {
    let result = {};
    let start = 0;
    let end = limit;
    for (let i = 1; i <= totalPages; i += 1) {
        let temp = [];
        for (let j = start; j < end; j += 1) {
            if (data[j]) {
                temp.push(data[j]);
            } else {
                break;
            }
        }
        start += limit;
        end += limit;
        result[i] = temp;
    }
    return result;
}