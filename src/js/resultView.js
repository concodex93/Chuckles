export const clearResultData = () => {
    document.querySelector('.flexbox-result-items').innerHTML = '';
};


export const renderJoke = (joke) => {
    const markup =
    `
    <div class="flexbox-result-item-1">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${joke.photo}" alt="${joke.url}" style="width:48px;height:48px;">
            <div class="card-body">
                <p class="card-text">${renderResultTextLength(joke)}</p>
            </div>
        </div>
    </div>
    `;

    document.querySelector('.flexbox-result-items').insertAdjacentHTML('beforeend', markup);
};

export const renderBtn = (page, type) => {
    const markUp= 
    `
        <button type="button" class="btn btn-default" id="btn-${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            Page ${type === 'prev' ? page - 1 : page + 1}
        </button>
    `;

    return markUp;
};

const renderPagingBtns = (page, numResults, ResultsPerPage) => {
    const totalPages = Math.ceil(numResults / ResultsPerPage);
    let button;

    if(page == 1 && totalPages > 1) {
        button = renderBtn(page, 'next');
    } else if (page < totalPages) {
        button = renderBtn(page, 'next');
        button = renderBtn(page, 'prev');
    } else if (page === totalPages && totalPages > 1) {
        button = renderBtn(page, 'prev');
    }

    document.querySelector('.flex-buttons').insertAdjacentHTML('beforeend', button);

};


export const renderPagedResults = (jokes, page = 1, resultsPerPage = 9) => {
    const start = (page -1) * resultsPerPage;
    const end = page * resultsPerPage;

    // Get subset Array of results to Render
    jokes.slice(start, end).forEach(renderJoke);
    renderPagingBtns(page, jokes.length, resultsPerPage);
};

const renderResultTextLength = (joke) => {
    let smallJoke;

    // Reduce length of joke if it exceeds 200 chars
    if(joke.joke.length >= 167) {
        smallJoke = joke.joke.slice(0, 166) + '...';
    } else {
        smallJoke = joke.joke;
    }

    return smallJoke;
};