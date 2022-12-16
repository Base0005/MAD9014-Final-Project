const app = {
    // location_url:location.href,
    mediaType:document.getElementById('mediaType'),
    searchInput:document.getElementById('searchInput'),
    mediaButton:document.getElementById('mediaButton'),
    inputText:document.getElementById('inputText'),
    form: document.getElementById('form'),
    url: 'https://api.themoviedb.org/3/movie/550?api_key=7898e8032dc69796f452632e95b11ae1',
    baseurl: 'https://api.themoviedb.org/3/',
    apiurl: "https://api.themoviedb.org/3/tv/550?api_key=7898e8032dc69796f452632e95b11ae1",
    api_key: "?api_key=7898e8032dc69796f452632e95b11ae1&query=", 
    api:"?api_key=7898e8032dc69796f452632e95b11ae1", 
    img_api:"https://image.tmdb.org/t/p/w200/",
    movieCreditsURL:`/movie/{movie_id}/credits`,
    tvCreditsURL:`/tv/{tv_id}/credits`,
    index: function(){
        console.log(location)
        if(app.mediaType.value ==="movie"){
            app.movieload()
        }if (app.mediaType.value === "tv"){
            app.tvload()
        }
        mediaType.addEventListener('change', app.dropdowmMedia)
    form.addEventListener('submit', app.submitHandler);
    },
    movieload: function(){
        if (app.mediaType.value === "movie"){
            console.log("this is movie")
            let media_id = location.hash.replace('#','');
            console.log(media_id)
            let credit_url = "".concat(app.baseurl,"/",app.mediaType.value ,"/",media_id,"/credits",app.api);
            console.log(credit_url)
            fetch(credit_url)
            .then ((Response) => {
                if (!Response.ok) throw new Error(Response.statusText);
                return Response.json();
            })
            .then((credit) =>{
                console.log("Movie it is")
                let main = document.getElementById('credit_main')
                main.innerHTML = credit.cast.map((post)=>{
                    console.log(post);
                    if (mediaType.value ==='movie'){
                        return `
                        <ul>
                            <li class="media_list">
                                <h1 class="media_title">
                                    ${post.name}
                                </h1>
                                <h3 class="media_details">
                                ${post.character}
                                </h3>
                            </li>
                        </ul>
                        `
                    }
                }).join(``);
            })
        } 
    },
    tvload: function(){
        if (app.mediaType.value === "tv"){
            console.log("this is tv")
            let media_id = location.hash.replace('#','');
            console.log(media_id)
            let credit_url = "".concat(app.baseurl,"/tv/",media_id,"/credits",app.api);
            console.log(credit_url)
            fetch(credit_url)
            .then ((Response) => {
                if (!Response.ok) throw new Error(Response.statusText);
                return Response.json();
            })
            .then((credit) =>{
                let main = document.getElementById('credit_main')
                main.innerHTML = credit.cast.map((post)=>{
                    console.log(post);
                        return `
                        <ul>
                            <li class="media_list">
                                <h1 class="media_title">
                                    ${post.name}
                                </h1>
                                <h3 class="media_details">
                                ${post.character}
                                </h3>
                            </li>
                        </ul>
                        `
                }).join(``);
            })
        } 
    },
    dropdowmMedia: function(){
        if(this.value === 'movie'){
            console.log(this.value);
        }if(this.value === 'tv'){
            console.log(this.value);
        }
    },
    submitHandler: function(ev){
        ev.preventDefault();
        console.log("I'm looking for", mediaType.value,'show called', inputText.value)
        let submitURL = "".concat(app.baseurl, "search/",mediaType.value, app.api_key, inputText.value);
        console.log(submitURL);
        fetch(submitURL)
        .then ((Response) => {
            if (!Response.ok) throw new Error(Response.statusText);
            return Response.json();
        })
        .then((contents) =>{
            console.log(contents)
            let main = document.getElementById('main')
            main.innerHTML = contents.results.map((post)=>{
                console.log(post);
                if (mediaType.value ==='movie'){
                    return `
                    <div class="media" style="background-color: #EA5455;">
                        <ul>
                            <a href="/credit.html#${post.id}">
                                <li class="media_list">
                                    <img src="${app.img_api}${post.poster_path}" alt="">
                                    <div>
                                        <h2 class="media_title">
                                            ${post.original_title}
                                        </h2>
                                        <p class="media_details">
                                            ${post.overview}
                                        </p>
                                    <div>
                                </li>
                            </a>
                        </ul>
                    </div>`
                }if (mediaType.value ==='tv'){
                    return`
                    <div class="media" style="background-color: #C3F1FF;">
                        <ul>
                            <li class="media_list">
                                <a href="/credit.html#${post.id}">
                                    <img src="${app.img_api}${post.poster_path}" alt="">
                                    <div>
                                        <h2 class="media_title">
                                            ${post.name}
                                        </h2>
                                        <p class="media_details">
                                            ${post.overview}
                                        </p>
                                    <div>
                                </li>
                            </a>
                        </ul>
                    </div>`
                }
            }).join(``);
        })
    }
};

document.addEventListener('DOMContentLoaded', app.index)