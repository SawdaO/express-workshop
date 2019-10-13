if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready () {
    getBlogposts('/get-posts');

    // send posts to server
    let form = document.querySelector('form');
    form.addEventListener('submit', (event)=> {

        event.preventDefault(); // prevents the form from contacting our server automatically (we want to do it ourselves)
        let formActionUrl = form.action; // 'form.action' is the url '/create-post'
        let formData = new FormData(form);

        postBlogposts(formActionUrl, formData);
    });
}

/****
 * Function definitions
 ***/

const postBlogposts = (url, data) => {
    fetch(url, {
        method: 'POST',
        body: data
    })
    .then( (res) => {
        res.json()
            .then( (json)=> {
                console.log(json);
                addBlogpostsToPage(json);
                document.querySelector('form').reset();
        })
    })
    .catch(function (err) {
        console.error(err)
    });
}

const getBlogposts = (url) => {
    fetch(url, {
        method: 'GET'
    })
    .then(function (res) {
        res.json()
        .then(function (json) {
            console.log(json);
            addBlogpostsToPage(json);
        });
    })
    .catch( (err)=> {
        console.error(err)
    });
}

const addBlogpostsToPage = (data) => {
    for (var blogpost in data) {
        if (data.hasOwnProperty(blogpost)) {

            var postDiv      = document.createElement('div');
            var postText        = document.createElement('p');
            var thumbnail       = document.createElement('img');
            var postContainer   = document.querySelector('.post-container');

            thumbnail.src = "./img/logo2.png";
            thumbnail.className = "thumbnail";
            postText.innerHTML = data[blogpost];
            postDiv.className = "post";

            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postText);
            postContainer.appendChild(postDiv);
        }
    }
}
