window.onload = function() {
    // Initial array of buttons
    var pokemonArray = ["Bulbasaur", "Charmander", "Squirtle", "Pikachu", "Eevee"];

    // displayPokemonInfo function re-renders the HTML to display the appropriate content
    function displayPokemonInfo() {

        var pokemon = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=8P7xEJT5ZPqB6hINoOaB8lZ9vf4PgSxu&limit=10";
        $("#gif-dump").empty();

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
            var imgURLanimated = response.data[i].images.fixed_height.url

            // Creates an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            image.attr("data-still", imgURL);
            image.attr("data-animate", imgURLanimated);
            image.attr("data-state", "still");
            image.addClass("pokemonGIF");

            // Appends the image
            pokemonDiv.append(image);

            // Puts the entire pokemon above the previous pokemon
            $("#gif-dump").prepend(pokemonDiv);
          }
        });
      }

    // Function for displaying pokemon data
    function renderButtons() {

        // Deleting the pokemon prior to adding new pokemon
        $("#buttons-dump").empty();

        // Looping through the array of pokemon
        for (var i = 0; i < pokemonArray.length; i++) {

          // Then dynamicaly generating buttons for each pokemon in the array
          // Creates a new button
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

      // This function handles events where a pokemon button is clicked
      $("#submit-button").on("click", function(event) {

        event.preventDefault();
        
        // This line grabs the input from the textbox
        var pokemon = $("#input-text").val().trim();

        // Doesn't add a button if the input text is blank
        if (pokemon != "") {

          // Adding pokemon from the textbox to our array
          pokemonArray.push(pokemon);

          // Calling renderButtons which handles the processing of our pokemon array
          renderButtons();

        }

      });

      // Adding a click event listener to all elements with a class of "pokemon-btn"
      $(document).on("click", ".pokemon-btn", displayPokemonInfo);

      // Adding a click event listener to animate the GIF if it's still or stop the GIF if it's animated
      $(document).on("click", ".pokemonGIF", function() {
        // Gets the value of data-state
        var state = $(this).attr("data-state");
        console.log(state);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
}