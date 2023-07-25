class pokemones {
    constructor(tname,tabilities,tweight,theight,tweakness,timage){
        this.name = tname;
        this.abilities = tabilities;
        this.weight = tweight;
        this.height = theight;
        this.weakness = tweakness;
        this.image = timage
    }
    get rname(){
        return this.name;
    }
    get rabilities(){
        return this.abilities;
    }
    get rweight(){
        return this.weight;
    }

    get rheight(){
        return this.height;
    }
    get rweakness(){
        return this.weakness;
    };
    get rimage(){
        return this.image;
    }
    set rname(n){
        this.name = n;
    };
    
    set rabilities(ab){
        this.abilities = ab;
    };
    set rweight(w){
        this.weight = w;
    };
    set rheight(h){
        this.height = h;
    };
     set rweakness(wk){
        this.weakness = wk;
    };
    set rimage(im){
        this.image = im;
    }
};
let createCardInfo = (number, info) => {
    /**Esta función recibe un numero correspondiente al numero de la carta del html (del 1 al 9) y la información correspondiente.
     * Con el array info asigna la información de el poquemon relacionado a cada elemento designado.(ej name: bulbasaur u así para las otras propiedades.)
     */
    let carta = document.getElementById("card_"+number);
    let modal = document.getElementById("modal_"+number);
    let cardInfo = document.getElementById("card_info_"+number);
    let cardImage = document.createElement("img");
    cardInfo.className ="card_info";
    cardImage.id = "card_image"+number;
    cardImage.className = "card_image";
    cardImage.src = info[5];
    carta.insertBefore(cardImage,modal);
    modal.appendChild(cardInfo);
    //Elementos de la izquierda
    const pNameIdentifier = document.createElement("p");
    const pAbilityIdentifier = document.createElement("p");
    const pWeightIdentifier = document.createElement("p");
    const pHeightIdentifier = document.createElement("p");
    const pTypeIdentifier = document.createElement("p");
    const nodeId1 = document.createTextNode("Name:");
    const nodeId2 = document.createTextNode("Abilities:");
    const nodeId3 = document.createTextNode("Weight:");
    const nodeId4 = document.createTextNode("Height:");
    const nodeId5 = document.createTextNode("Type:");
    pNameIdentifier.appendChild(nodeId1);
    pAbilityIdentifier.appendChild(nodeId2);
    pWeightIdentifier.appendChild(nodeId3);
    pHeightIdentifier.appendChild(nodeId4);
    pTypeIdentifier.appendChild(nodeId5);
    //elementos de la derecha
    let pName = document.createElement("p");
    let pAbility = document.createElement("p");
    let pWeight = document.createElement("p");
    let pHeight = document.createElement("p");
    let pType = document.createElement("p");
    //info de las cartas
    pName.innerHTML = info[0];
    pAbility.innerHTML = info[1];
    pWeight.innerHTML = info[2];
    pHeight.innerHTML = info[3];
    pType.innerHTML = info[4];
    //añadimos la info de las cartas a el contenedor que las contiene.
    cardInfo.append(
        pNameIdentifier,
        pName,
        pAbilityIdentifier,
        pAbility,
        pWeightIdentifier,
        pWeight,
        pHeightIdentifier,
        pHeight,
        pTypeIdentifier,
        pType
    );
};

let getPokemonInfo = (init,limit) => {
    fetch("/pokemons.json")
        .then((response) => response.json())
        .then((data) => {
        let counter = 1;
        let pokemonContainer = Array(9);
        for(let i = init;i < limit; i++){
            console.log(i);
            const pokemon = data[i];
            pokemonContainer[counter] =  new pokemones(pokemon.name,pokemon.abilities,pokemon.weight,pokemon.height,pokemon.weakness[0],pokemon.ThumbnailImage);
            counter+=1;
          } 
        console.log(pokemonContainer);
        createCardPack(pokemonContainer);

        })
        .catch((error) => {
            console.error(error);
        });
};
createCardPack = (pokemonPack) => {
    //llama la info de los pokemones actuales, luego manda la info para crear una carta.
    for(i in pokemonPack){
        const p = pokemonPack[i]
        let info = [p.name,p.abilities,p.weight,p.height,p.weakness,p.image];
        createCardInfo(i,info);
    }
};

getPokemonInfo(20,29);
