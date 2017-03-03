var gifButtons = {
	topics: ["World of Warcraft", "Heroes of the Storm", "Overwatch", "Hearthstone", "Starcraft II", "Diablo III"],
}

function createButtons() {
		$("#buttons-here").empty();
		for (i = 0; i < gifButtons.topics.length; i++) {
			var newButton = $('<button class="gif-buttons" data-game="' + gifButtons.topics[i] + '">' + gifButtons.topics[i] + '</button>');
			$("#buttons-here").append(newButton);
	}
}
createButtons();


function showGifs() {
	var game = $(this).attr("data-game");
	$('#gifs-here').empty();
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
		url: queryURL,
		method: "GET"
	})
    .done (function(response) {
    	var results = response.data;
    	for (var i = 0; i < results.length; i++) {
    		var gifDiv = $('<div class="gif-container">');
    		var rating = results[i].rating;
    		var gifRating = $('<p>').text("Rated: " + rating);
    		var gifThumb = $('<img data-still="' + results[i].images.fixed_height_still.url + '" data-animate="' + results[i].images.fixed_height.url + '" class="gif-result">');
    		gifThumb.attr('src', results[i].images.fixed_height_still.url);
    		gifDiv.append(gifThumb.attr('data-state', "still"));
    		gifDiv.append(gifRating);
    		$('#gifs-here').prepend(gifDiv);		
    	}
    	$(".gif-result").on("click", function() {
			var state = $(this).attr("data-state");
			if (state === "still") {
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate");
		} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
      }
})
   })
};
$(document).on("click", '.gif-buttons', showGifs);

$("#add-game").on("click", function(event) {
		event.preventDefault();
		var newGame = $("#search-more-games").val().trim();
		if (gifButtons.topics.indexOf(newGame) < 0 && newGame !== "") {
        gifButtons.topics.push(newGame);
        createButtons();

    }
      });








