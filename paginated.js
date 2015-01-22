document.addEventListener('DOMContentLoaded', function () {
    // wait for the DOM to be loaded

    // listen for a change event on the input element with id="query"
    document.querySelector('#query').addEventListener('change', function () {
        searchForRepository(this.value);
    });
});

function searchForRepository (searchTerm) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/search/repositories?q=' + searchTerm);
    xhr.setRequestHeader('accept', 'application/json');
    xhr.addEventListener('readystatechange', function () {
        if( xhr.readyState === 4 && xhr.status === 200 ) {
            createLinks(xhr)
        }
    });
    xhr.send();
}

function createLinks(xhr) {
    // create the previous next and other links
    var link = extractLinkObject(xhr.getAllResponseHeaders());
    var div = document.querySelector('.navigation');
    div.innerHTML = '';
    for (var prop in link) {
        console.log(prop);
        var anchor = document.createElement('a');
        anchor.href = link[prop];
        anchor.innerHTML = prop;
        div.appendChild(anchor);
    }
}

function showData() {

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