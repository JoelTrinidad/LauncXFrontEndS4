const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("../assets/img/pokeball.png");
        } else {
            return res.json()
        }
    }).then((data)=>{
        console.log(data);
        let pokeImg = data.sprites.front_default;
        let id = data.id
        let name = data.name;
        let types = getPokeTypes(data.types);
        pokeImage(pokeImg);
        pokeId(id, name);
        pokeTypes(types);
        pokeMoves(data.moves);
        pokeStats(data.stats)
    });
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}
    
const pokeId = (id, name) => {
    const pokeName = document.getElementById("pokeId");
    pokeName.innerHTML = `${id} - ${name}`;
}

const pokeTypes = (types) => {
    const pokeTypes = document.getElementById("pokeTypes");
    pokeTypes.innerHTML = ''
    types.forEach(type => {
        pokeTypes.innerHTML += `<li>${type}</li>
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
    const pokeStats = document.getElementById("pokeStats");
    pokeStats.innerHTML = ''
    stats.forEach(stat => {
        pokeStats.innerHTML += `<li class="stat">${stat.stat.name}: ${stat.base_stat}</li>
        `;
    });

}
const pokeMoves = (moves) => {
    const pokeMoves = document.getElementById("pokeMoves");
    pokeMoves.innerHTML = ''
    moves.forEach(move => {
        pokeMoves.innerHTML += `<li class="move">${move.move.name}</li>
        `;
    });

}