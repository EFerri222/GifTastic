window.onload = function() {
    // Initial array of buttons
    var pokemonArray = ["Bulbasaur", "Charmander", "Squirtle", "Pikachu"];

    // displayPokemonInfo function re-renders the HTML to display the appropriate content
    function displayPokemonInfo() {

        var pokemon = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=8P7xEJT5ZPqB6hINoOaB8lZ9vf4PgSxu&limit=10";

        // Creating an AJAX call for the specific pokemon button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

            //Loops over 10 different GIFs
            for (i=0; i<10; i++) {

            // Creates a div to hold the pokemon
            var pokemonDiv = $("<div class='pokemon'>");

            // Stores the rating data
            var rating = response.data[i].rating;

            // Creates an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displays the rating
            pokemonDiv.append(pOne);

            // Retrieves the URL for the image
            var imgURL = response.data[i].images.fixed_height_still.url;

            // Creates an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Appends the image
            pokemonDiv.append(image);

            // Puts the entire pokemon above the previous pokemon
            $("#gif-dump").prepend(pokemonDiv);
          }
        });
      }

    // Function for displaying pokemon data
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        $("#buttons-dump").empty();

        // Looping through the array of movies
        for (var i = 0; i < pokemonArray.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // Create a new button
          var a = $("<button>");
          // Styles the buttons 
          a.addClass("btn btn-primary");
          // Add a class of pokemon-btn to our button
          a.addClass("pokemon-btn");
          // Add a data-attribute
          a.attr("data-name", pokemonArray[i]);
          // Provide the initial button text
          a.text(pokemonArray[i]);
          // Add the button to the buttons-dump div
          $("#buttons-dump").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#submit-button").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var pokemon = $("#input-text").val().trim();

        // Adding movie from the textbox to our array
        pokemonArray.push(pokemon);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "pokemon-btn"
      $(document).on("click", ".pokemon-btn", displayPokemonInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
}