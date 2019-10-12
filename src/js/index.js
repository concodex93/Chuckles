import Search from './Search';
import Joke from './Joke';
import * as ResultView from './resultView';


const state = {};
const jokes = [];

const controlSearch = async () => {
    // Get Query
    const query = document.querySelector('.search-field').value;
    console.log(query);

    // Create Search Obj 
    state.search = new Search(query);

    // Make API call
    if (query) {
        try {
            await state.search.getData();

            if (state.search.response.data.result.length > 0){
                    state.search.response.data.result.forEach(joke => {
                    // Create Joke Obj
                    state.joke = new Joke(joke.id, joke.icon_url, joke.url, joke.value);
                    // Add to Array
                    jokes.push(state.joke);
                });

                // Remove from UI
                ResultView.clearResultData();
                ResultView.clearInputField();

                // Render to UI
                ResultView.renderPagedResults(jokes);

                // Render Paging
                document.querySelector('.flex-buttons').addEventListener('click', e => {
                    const button = e.target.closest('.btn-default');
                    if (button) {
                        const pageToGoTo = parseInt(button.dataset.goto, 10);
                        ResultView.clearResultData();
                        ResultView.renderPagedResults(jokes, pageToGoTo);
                        ResultView.clearInputField();
                    }
                });

            } else {
                alert('Ops, Chucks can make anything funny but you gotta give him something to work with!');
                ResultView.clearResultData();
                ResultView.clearInputField();
            }

        } catch(error){
            console.log(error);
        }
    
    }
};

document.querySelector('.search-btn').addEventListener('click', e => {
    // INIT
    e.preventDefault();
    controlSearch();
});



