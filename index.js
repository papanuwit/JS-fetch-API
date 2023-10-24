
let pokemons = {};
fetch("https://pokeapi.co/api/v2/pokemon/").then(respones => {
    console.log(respones);
    if (respones.ok)
        return respones.json();
}).then(pokemons => {
    console.log(pokemons['results']);
    var pokemonList = pokemons['results'];
    pokemonList.forEach(item => {

        Add2List(item['name'], item['url']);
    });

}).catch(error => {
    console.log("can't fetch data from API."+error)
});


var Add2List = (name, url) => {
    var urlsplited = url.split("/");
    var imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
        urlsplited[6] + ".png"

    var pokemonDiv = document.getElementById("pokemonlist");
    var card = document.createElement("div")
    card.setAttribute("class", "card col-md-3 mb-4");


    var imag = document.createElement("img");
    imag.setAttribute("class", "card-img-top w-50");
    imag.setAttribute("src", imageUrl);


    var nameDiv = document.createElement("div")
    nameDiv.setAttribute("class", "card-body");

    var title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerText = name;

    var button = document.createElement("a");
    button.setAttribute("class", "btn btn-primary w-100", "center");
    button.setAttribute("href", "#");
    button.innerText = "detail";
    button.addEventListener("click", () => {

        showDetails(name);
    });

    nameDiv.appendChild(title);
    nameDiv.appendChild(button);

    card.appendChild(imag);
    card.appendChild(nameDiv);

    pokemonDiv.appendChild(card);

}

var showDetails = (name) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(response => {
            if (response.ok)
                return response.json();
        })
        .then(pokemonDetails => {

            var modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
            var modalTitle = document.getElementById("modalTitle");
            var modalImage = document.getElementById("modalImage");
            var modalDetails = document.getElementById("modalDetails");

            modalTitle.innerText = name;
            modalImage.setAttribute("src", pokemonDetails.sprites.front_default);

            modalDetails.innerHTML = `
          <p>Height: ${pokemonDetails.height} </p>
          <p>Weight: ${pokemonDetails.weight} </p>
          <p>Base Experience: ${pokemonDetails.base_experience}</p>
          <!-- Add more details if needed -->
        `;

            modal.show();
        })
        .catch(error => {
            console.log("Can't fetch Pokémon details from the API.");
        });
};