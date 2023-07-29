class pokemones {
  constructor(tname, tabilities, tweight, theight, tweakness, timage, tid,ttype) {
    this.name = tname;
    this.abilities = tabilities;
    this.weight = tweight;
    this.height = theight;
    this.weakness = tweakness;
    this.image = timage;
    this.type = ttype;
    this.id = tid;
  }
  get rname() {
    return this.name;
  }
  get ttype() {
    return this.type;
  }
  get rid() {
    return this.id;
  }
  get rabilities() {
    return this.abilities;
  }
  get rweight() {
    return this.weight;
  }

  get rheight() {
    return this.height;
  }
  get rweakness() {
    return this.weakness;
  }
  get rimage() {
    return this.image;
  }
  set rname(n) {
    this.name = n;
  }
  set ttype(tt){
    this.ttype = tt;
  }
  set rabilities(ab) {
    this.abilities = ab;
  }
  set rweight(w) {
    this.weight = w;
  }
  set rheight(h) {
    this.height = h;
  }
  set rweakness(wk) {
    this.weakness = wk;
  }
  set rimage(im) {
    this.image = im;
  }
}
let createCardInfo = (number, info) => {
  /**The function create card info, includes some information of each pokemon showed on the 9x9 grid, ready to be fully displayed when any of the 9 cards are clicked.
   */
  
  let carta = document.getElementById("card_" + number);
  try{
    const cardim = document.getElementById("cardim"+number);
    const cartaText2 = document.getElementById("card_text_"+number);
    const cartaId = document.getElementById("id_"+number);
    carta.removeChild( cartaId);
    carta.removeChild(cardim);
    carta.removeChild(cartaText2);
} catch{console.log("no te preocupes aun no existen los elementos")};
  let cartaText = document.createElement("div");
  cartaText.id ="card_text_"+ number;
  cartaText.className = "card_text";
  let cardImage2 = document.createElement("img");
  cardImage2.className = "card_image";
  cardImage2.id = "cardim"+number;
  cardImage2.src = info[0];
  const pNameIdentifier = document.createElement("p");
  const pIdIdentifier = document.createElement("p");
  const nodeId1 = document.createTextNode("Name:");
  pNameIdentifier.appendChild(nodeId1);
  let pName = document.createElement("p");
  let pId = document.createElement("p");
  pId.id = "id_" + number;
  pName.innerHTML = info[1];
  pId.innerHTML = "#"+info[2];
  pName.id = "name_"+number;
  pId.classList.add('title','pId');
  cardImage2.className = "card_image";
  carta.append(pId,cardImage2, cartaText);
  cartaText.append(pNameIdentifier, pName);
};

let getPokemonInfo = (init, limit) => {
  /**This function retrieves parts of the pokemon information to show in the 3x3 grid, using the name,image and id to show on the caption. */
  fetch("/pokemons.json")
    .then((response) => response.json())
    .then((data) => {
      let counter = 0;
      let pokemonContainer = Array(9);
      for (let i = init; i < limit; i++) {
        const pokemon = data[i];
        pokemonContainer[counter] = [
          pokemon.ThumbnailImage,
          pokemon.name,
          pokemon.id,
          pokemon.type
        ];
        counter += 1;
      }
      createCardPack(pokemonContainer);
    })
    .catch((error) => {
      console.error(error);
    });
};
createCardPack = (pokemonPack) => {
  //llama la info de los pokemones actuales, luego manda la info para crear una carta.
  let i = 1;
  for (count in pokemonPack) {
    const p = pokemonPack[count];
    let info = p;
    createCardInfo(i, info);
    i += 1;
  }
};
let createModalInfo = (number, info) => {
  /**Esta función recibe un numero correspondiente al numero de la carta del html (del 1 al 9) y la información correspondiente.
   * Con el array info asigna la información de el poquemon relacionado a cada elemento designado.(ej name: bulbasaur u así para las otras propiedades.)
   */
  let cardi = document.querySelector("body");
  let modal = document.createElement("div");
  let modalDiv = document.createElement("div");
  let cardInfo = document.createElement("div");
  //let closeModal = document.createElement("button");
  let cardImage = document.createElement("img");
  //se añaden las clases
  modal.classList.add("modal");
  modal.id = "modal_";
  cardInfo.id = "card_info_" + number;
  cardInfo.classList.add("card_info");
  modalDiv.classList.add("modal_conainer");
  cardImage.classList.add("card_modal_image");
  //closeModal.id = "close_modals";
  cardImage.src = info.image;

  //TEXTO DE LA CARTA
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
  //const buttonText = document.createTextNode("x");
  //closeModal.appendChild(buttonText);
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
  pName.innerHTML = info.name;
  pAbility.innerHTML = info.abilities;
  pWeight.innerHTML = info.weight;
  pHeight.innerHTML = info.height;
  pType.innerHTML = info.type;
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
  modalDiv.append(cardImage, cardInfo);
  modal.append(modalDiv);
  cardi.appendChild(modal);
  modal.style.display = "flex";
};
let getModalInfo = (namer, position) => {
  /**creates a new instance of the pokemon class when a card is clicked, displaying all the information of the selected pokemon. */
  fetch("/pokemons.json")
    .then((response) => response.json())
    .then((data) => {

      counter = 0;
      while (data[counter].name.toLowerCase() != namer) {
        counter += 1;
      }
      const pokemon = data[counter];
      modalContainer = new pokemones(
        pokemon.name,
        pokemon.abilities,
        pokemon.weight,
        pokemon.height,
        pokemon.weakness[0],
        pokemon.ThumbnailImage,
        pokemon.id,
        pokemon.type
      );
      console.log(modalContainer);
      createModalInfo(position, modalContainer);
    })
    .catch((error) => {
      console.error(error);
      console.log("no se encontro la info del modal");
    });
};

let showModal = (pos) => {
  /**The function showModal shows the selected card when clicking on it by retreiveing the information
   * using getModalInfo(cardId,pos);
   */
  try {
    let namel = document.getElementById("name_" + pos).innerHTML;
    let closeButton = document.getElementById("close_modals");
    closeButton.style.display = "block";
    document.getElementsByClassName("card_container")[0].disabled = true;
    getModalInfo(namel.toLowerCase(), pos);
  } catch (error) {
    console.error(error);
  }
};
let removeModal = () => {
  /**The function removeModal, deletes the current modal in order to return to the main menu.
   * by also hiding the closing button.
   */
  {
    try {
      console.log("sapo");
      let closeButton = document.getElementById("close_modals");
      let cardi = document.querySelector("body");
      let modal = document.querySelector("#modal_");
      closeButton.style.display = "none";
      cardi.removeChild(modal);
    } catch (error) {
      console.error(error);
      console.log("no se ha escondido el modal");
    }
  }
};
let plusSlides = (m) => {
    showSlides(slideIndex += m);
}
let showSlides = (n) => {
  
  fetch("/pokemons.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.length);
      if (n  > data.length) {
        slideIndex = 0;
        n = 0;
      }
      if (n < 0) {
        slideIndex = data.length;
        n = data.length - 9;
      }
    supLimit = n + 9;
    if(supLimit > data.length){
      n = 0;
      supLimit = n + 9;
      
    }
    console.log("n = "+n + " and the slide index is "+slideIndex+" and the limit is "+supLimit);
    getPokemonInfo(n, supLimit);
    })
    .catch((error) => {
      console.error(error);
    });
    

};
let slideIndex = 0;
showSlides(slideIndex);
let clearNames = () => {
  let buscador = document.getElementById("resultados");
  buscador.innerHTML = "";
  buscador.style.display = "none";

};

let addName = (lName,ident) => {
  let searchDiv = document.getElementById("resultados");
  let psPan = document.createElement("button");
  psPan.classList.add('searchSpan','nest-btn', 'primary');
  psPan.id = "searchSpan"+ident;
  psPan.onclick = () =>{
    let closeButton = document.getElementById("close_modals");
    closeButton.style.display = "block";
    document.getElementsByClassName("card_container")[0].disabled = true;
    console.log("sapo "+lName);
    getModalInfo(lName,1);
    clearNames();
  };
  let searchP = document.createElement("P");
  let textNode = document.createTextNode(lName);
  searchDiv.style.display = "block";
  searchP.appendChild(textNode);
  psPan.appendChild(searchP);
  searchDiv.appendChild(psPan);
};
let searchPokemon = (s) => {
  let inputText = document.querySelector("#search-bar").value.toLowerCase();
  
  fetch("/pokemons.json")
    .then((response) => response.json())
    .then((data) => {
      let names = Array(data.length);
      //add pokemon names on an array
       for(i in data){
         names[i] = data[i].name.toLowerCase();
       }
       const dataArr = new Set(names);
       names = [...dataArr];
      //we test if there´s a match in any of the names on the array
       for(i in names){
          let resultado = false;
          let pokemon = data[i];
          let localName = names[i];
          let info  = new pokemones(
            pokemon.name,
            pokemon.abilities,
            pokemon.weight,
            pokemon.height,
            pokemon.weakness[0],
            pokemon.ThumbnailImage,
            pokemon.id
          );
        for(let j = 0;j < inputText.length;j++){
         if(localName[j] == inputText[j]){
            resultado = true;
            }
         else{
          resultado = false;
          break;
         }
        }
        if(resultado == true){
          //if the current input is the same as part of a name or the totallity of it, the name is added
          addName(localName,i,info);
  
        }      
       }
  
    })
    .catch((error) => {
      console.error(error);
    });
    if(s == 1){
      clearNames();
    }
};