export const postComment = async (name, text) => {
    const url = '/postComment.php';
    let fData = new FormData();
    fData.append('name', name);
    fData.append('text', text);
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

export const getComments = async () => {
    const url = 'getComments.php';
    const res = await fetch(url, { method: 'GET' });

    if (!res.ok) {
        throw new Error(`error, status: ${res.status}`)
    }

    return await res.json();
}