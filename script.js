let createCardInfo = (number, info) => {
    /**Esta función recibe un numero correspondiente al numero de la carta del html (del 1 al 9) y la información correspondiente.
     * Con el array info asigna la información de el poquemon relacionado a cada elemento designado.(ej name: bulbasaur u así para las otras propiedades.)
     */
    let card = document.getElementById("card_"+number);
    let cardInfo = document.getElementById("card_info_"+number);
    let cardImage = document.createElement("img");
    cardInfo.className ="card_info";
    cardImage.id = "card_image"+number;
    cardImage.className = "card_image";
    cardImage.src = info[5];
    card.insertBefore(cardImage,cardInfo);
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

let callPagePokemons = () => {
    fetch("/pokemons.json")
        .then((response) => response.json())
        .then((data) => {
        for(let i = 1;i < 10; i++){
            const pokemon = data[i];
            const information = [pokemon.name,pokemon.abilities,pokemon.weight,pokemon.height,pokemon.weakness[0],pokemon.ThumbnailImage];
            createCardInfo(i,information);
          }
          
           
        })
        .catch((error) => {
            console.error(error);
        });
};
callPagePokemons();
