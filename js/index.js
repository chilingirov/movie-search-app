$(document).ready(function() {

    var mykey = config.KEY;
    $("#search").focus(function() {
        var full = $("#poster").has("img").length ? true : false;
        if (full == false) {
            $("#poster").empty();
        }
    });

    var getMovie = function() {
        var film = $("#search").val();
        if (film == "") {
            $("#poster").html('<h2 class="loading">Please enter something in the form</h2>');
        } else {
            $("#poster").html("<h2 class='loading'>Your poster is loading</h2>");
            $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=" + mykey + "&query=" + film + "&callback=?", function(json) {
                if (json.total_results != 0) {
                    //Display the poster and a message announcing the result
                    $("#poster").html('<div class="column-left"><img src=http://image.tmdb.org/t/p/w342/' + json.results[0].poster_path + ' /></div><div class="column-right"><h2>' + json.results[0].title + '</h2><p>' + json.results[0].overview + '</p><div class="rating"><h2> Rating:   ' + json.results[0].vote_average + '</h2><h2> Votes:   ' + json.results[0].vote_count + '</h2><h2><a target="_blank" href=https://www.themoviedb.org/movie/' + json.results[0].id + ' >Link</a></h2></div>');
                } else {
                    $("#poster").html('<h2 class="loading">Nothing found</h2>');
                }
            });
        }
        return false;
    }

    $("#button").click(getMovie);
    $("#search").keyup(function(e) {
        if (e.keyCode == 13) {
            getMovie();
        }
    });


});