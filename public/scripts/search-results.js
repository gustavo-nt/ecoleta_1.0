// Message of search is null
const noResults = document.querySelector('.no-results');

if(noResults) {
    document.querySelector('main').style.margin = 0;
    document.querySelector('body').classList.add('error');
}

