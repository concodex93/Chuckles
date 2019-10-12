import Search from './Search';
import Joke from './Joke';
import * as ResultView from './resultView';
import * as ButtonView from './buttonView';


const state = {};
const jokes = [];

const controlSearch = async () => {
    // Get Query
    const query = 'Obama';

    // Create Search Obj 
    state.search = new Search(query);

    // Make API call
    try {
        await state.search.getData();

        const totalJokes = state.search.response.data.total;
        state.search.response.data.result.forEach(joke => {
            // Create Joke Obj
            state.joke = new Joke(joke.id, joke.icon_url, joke.url, joke.value);
            // Add to Array
            jokes.push(state.joke);
        });

        // Render to UI

        ResultView.renderPagedResults(jokes);

        // Render Paging
        document.querySelector('.flex-buttons').addEventListener('click', e => {
            const button = e.target.closest('.btn-default');
            if (button) {
                const pageToGoTo = parseInt(button.dataset.goto, 10);
                ResultView.clearResultData();
                ResultView.renderPagedResults(jokes, pageToGoTo);
            }
        });

        
 
    } catch(error){
        console.log(error);
    }
};


   

// INIT
controlSearch();
