const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName-search");
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("../assets/img/pokeball.png");
            hideAll();
        } else {
            return res.json()
        }
    }).then((data)=>{
        console.log(data);
        let pokeImg = data.sprites.front_default;
        pokeImg = data.sprites.other['official-artwork'].front_default;
        let name = data.name;
        let types = getPokeTypes(data.types);
        pokeImage(pokeImg);
        pokeId(name);
        pokeTypes(types);
        pokeMoves(data.moves);
        pokeStats(data.stats)
    });
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

const pokeId = (name) => {
    showElement("pokeName", "block");
    const pokeName = document.getElementById("pokeName");
    pokeName.innerHTML = `${name}`;
}

const pokeTypes = (types) => {
    const pokeTypes = document.getElementById("pokeTypes");
    pokeTypes.innerHTML = ''
    types.forEach(type => {
        pokeTypes.innerHTML += `<li class="type ${type}">${type}</li>
        `;
    });
    
}

const getPokeTypes = (types) => {
    let typesArray = [];
    types.forEach(type => {
        typesArray.push(type.type.name);
    });
    return typesArray;
}

const pokeStats = (stats) => {
    showElement("pokeStats", "grid");
    const pokeStats = document.getElementById("pokeStats");
    pokeStats.innerHTML = ''
    stats.forEach(stat => {
        pokeStats.innerHTML += `<li class="stat">${stat.stat.name}: ${stat.base_stat}</li>
        `;
    });
    
}
const pokeMoves = (moves) => {
    showElement("right-side", "block");
    const pokeMoves = document.getElementById("pokeMoves");
    pokeMoves.innerHTML = ''
    moves.forEach(move => {
        pokeMoves.innerHTML += `<li class="move">${move.move.name}</li>
        `;
    });
    
}
const hideElement = (elementName) => {
    var element = document.getElementById(elementName);
    if (element.style.display !== "none") {
        element.style.display = "none";
    }
}
const hideAll = () => {
    hideElement("pokeName");
    hideElement("pokeStats");
    hideElement("right-side");
    document.getElementById("pokeTypes").innerHTML = '';
}
const showElement = (elementName, display) => {
    var element = document.getElementById(elementName);
    if (element.style.display === "" || element.style.display === "none") {
        element.style.display = display;
    }
}