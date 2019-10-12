import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getData() {

        try {
            const data = await axios(`https://api.chucknorris.io/jokes/search?query=${this.query}`);
            this.response = data;
            console.log(data);

        } catch(error) {
            console.log(error);
        }
    }
};