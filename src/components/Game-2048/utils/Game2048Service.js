export const postData = async (name, score) => {
    const url = '/post.php';
    let fData = new FormData();
    fData.append('name', name);
    fData.append('score', score);
    const requestOptions = {
        method: 'POST',
        body: fData,
    };
    const res = await fetch(url, requestOptions);

    if (!res.ok) {
        throw new Error(`error, status: ${res.status}`)
    }

    return await res.text();
}

export const getData = async () => {
    const url = 'get.php';
    const res = await fetch(url, { method: 'GET' });

    if (!res.ok) {
        throw new Error(`error, status: ${res.status}`)
    }

    return await res.json();
}