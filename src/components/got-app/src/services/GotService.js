class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
        this.charIds = [];
        this.houseIds = [];
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        // const res = await this.getResource('/characters/');
        return res.map(char => this._transformCharacter(char));
        // return res.map(this._transformCharacter); // this works somehow too (probably magic)
    }

    allCharacters = async (page) => {
        const apiBase = 'https://www.anapioficeandfire.com/api/characters';
        let res = await fetch(`${apiBase}?page=${page}&pageSize=${page === 43 ? 38 : 50}`)
            .then(res => res.json());
        res = res.map(el => this._transformCharacter(el))
            .filter(item => !this.charIds.includes(item.id) && item.name !== 'no data');
        const itemIds = res.map(el => el.id);
        this.charIds = [...this.charIds, ...itemIds];
        return res;
    }

    allHouses = async (page) => {
        const apiBase = 'https://www.anapioficeandfire.com/api/houses';
        let res = await fetch(`${apiBase}?page=${page}&pageSize=50`)
            .then(res => res.json());
        res = res.map(el => this._transformCharacter(el))
            .filter(item => !this.houseIds.includes(item.id) && item.name !== 'no data');
        const itemIds = res.map(el => el.id);
        this.houseIds = [...this.houseIds, ...itemIds];
        return res;
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    getAllHouses = async () => {
        const res = await this.getResource('/houses/');
        return res.map(house => this._transformHouse(house));
    }

    getHouse = async (id) => {
        const res = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books?page=1&pageSize=15');
        return res.map(book => this._transformBook(book));
    }

    getBook = async (id) => {
        const res = await this.getResource(`/books/${id}/`);
        return this._transformBook(res)
    }

    _extractId = (item) => {
        const regex = /\/([0-9]*)$/;
        return item.url.match(regex)[1];
    }

    isSet = (data) => {
        return data ? data : 'no data';
    }

    _transformBook = (book) => {
        const id = this._extractId(book);

        return {
            ...book,
            id: id || null
        }
    }

    _transformHouse = (house) => {
        const id = this._extractId(house);

        return {
            ...house,
            words: this.isSet(house.words),
            region: this.isSet(house.region),
            id: id || null
        }
    }

    _transformCharacter = (char) => {
        // const id = char.url.slice(char.url.search(/\/\d/) + 1);
        const id = this._extractId(char);

        return {
            name: char.name || 'no data',
            gender: char.gender || 'no data',
            born: this.isSet(char.born), // same thing
            died: char.died || 'no data',
            culture: char.culture || 'no data',
            id: id || null
        }
    }
}

export default GotService;