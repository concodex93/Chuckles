export const clearResultData = () => {
    console.log('buttons removed');
    document.querySelector('.flexbox-result-items').innerHTML = '';
    document.querySelector('.flex-buttons').innerHTML = '';
};

export const clearInputField = () => {
    console.log('text removed');
    document.querySelector('.search-field').value = '';
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

    // Dispay Next btn
    if (page === 1 && totalPages > 1) {
        button = renderBtn(page, 'next');
    // Dispay Next and Prev btn
    } else if (page < totalPages) {
        // Displays both btns
        button = 
        `
        ${renderBtn(page, 'prev')}
        ${renderBtn(page, 'next')}
        `;
    // Dispay Prev btn
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
    if (joke.joke.length >= 160) {
        smallJoke = joke.joke.slice(0, 166) + '...';
    } else {
        smallJoke = joke.joke;
    }
    return smallJoke;
};