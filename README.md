The pokedex project was created using  javascript, css and html. The only framework used was Nes.css used for the styles and the font press start 2p from google fonts.
The page has two purposes, the first one is a display wich shows all the pokemons on a .json file and the information of each pokemon as a modal when clicked. The second one is a search bar that displays the modal of the selected pokemon when clicked.
The first function was acheived by creating a 3x3 grid that displays the names an images of the first pokemons stored in the .json file. Two buttons, a prev and next buttton were created to loop through the .json file and display the info as these buttons are pressed.
The name of each card is selected and then the information for the modal is gathered from the .json file.
The second function was acheived by comparing the string typed with the names of the pokemons in the .json file, when a match between the input string and the name is found, an option is added on the search-bar. When the option is clicked, the modal for the pokemon is displayed.
to navigate the .json, the fetch method was implemented.
a pokemon class was created to store a new pokemon each time a card is clicked or an option in the search bar is selected.
