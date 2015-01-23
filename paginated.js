document.addEventListener('DOMContentLoaded', function () {
    // wait for the DOM to be loaded

    // listen for a change event on the input element with id="query"
    document.querySelector('#query').addEventListener('change', function () {
        searchForRepository(this.value);
    });

    addLinkHandlers();
});

// add event handlers for the first previous next and last links
function addLinkHandlers() {
    // get all the links
    // attach handlers
    ['first', 'prev', 'next', 'last'].forEach(function (elem) {
        var selector = '#link_' + elem;
        var element = document.querySelector(selector);
        // element = <a href='#link_first'> element for the first loop
        element.addEventListener('click', function (event) {
            event.preventDefault(); // stop the user from navigating to the url
            if (this.href) {
                getRepositoryResults(this.href);
            }
        });
    });
}

function searchForRepository (searchTerm) {
    var url = 'https://api.github.com/search/repositories?q=' + searchTerm;
    getRepositoryResults(url);
}

function getRepositoryResults (url) {
    var xhr = new XMLHttpRequest();
    // xhr.open('GET', 'https://api.github.com/search/repositories?q=' + searchTerm);
    xhr.open('GET', url);
    xhr.setRequestHeader('accept', 'application/json');
    xhr.addEventListener('readystatechange', function () {
        if( xhr.readyState === 4 && xhr.status === 200 ) {
            updateLinks(xhr);
        }
    });
    xhr.send();
}

function updateLinks(xhr) {
    // create the previous next and other links
    var link = extractLinkObject(xhr.getAllResponseHeaders());

    var links = ['first', 'prev', 'next', 'last'];
    var elements = links.map(fn);

    function fn(elem) {
        // This function is run once for every element in the links array
        // It searches for the relevant link element and returns it
        var selector = '#link_' + elem;
        return document.querySelector(selector);
    }

    console.log(elements);

    // reset all links
    elements.forEach(function (element) {
        element.removeAttribute('href');
    });

    for (var prop in link) { // loop over the link object
        var index = links.indexOf(prop); // check if the property name exists in the links array
        if (index !== -1) {
            elements[index].href = link[prop];
        }
    }

}


function showData(xhr) {
    var results_div = document.querySelector('#results');
}

function extractLinkObject(str) {
    var linkObject = {};
    var headers = str.trim().split('\n');
    var linkHeader = headers[headers.length - 1];
    linkHeader = linkHeader.slice(5);
    var links = linkHeader.split(',');
    for (var i = 0, len = links.length; i < len; i++) {
        var data = links[i].split('"');
        linkObject[data[1]] = data[0].trim().slice(1, -7);
    }
    return linkObject;
}