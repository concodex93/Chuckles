export const renderBtn = (page, type) => {
    const markUp= 
    `
        <button type="button" class="btn btn-default" id="btn-${type}">Page ${type === 'prev' ? page - 1 : page + 1}</button>
    `;
    document.querySelector('.flex-buttons').insertAdjacentHTML('beforeend', markUp);
};

export const renderPagingBtns = (page, numResults, ResultsPerPage) => {
    const totalPages = Math.ceil(numResults / ResultsPerPage);
    let button;

    if(page == 1 && totalPages > 1) {
        button = renderBtn('next');
    } else if (page < totalPages) {
        button = renderBtn('next');
        button = renderBtn('prev');
    } else if (page === totalPages && totalPages > 1) {
        button = renderBtn('prev');
    }
};