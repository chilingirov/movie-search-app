$(document).ready(function() {
    $("#search").focus(function() {
        var full = $("#poster").has("img").length ? true : false;
        if (full == false) {
            $("#poster").empty();
        }
    });

    var getPoster = function() {
        var film = $("#search").val();
        if (film == "") {
            $("#poster").html('<h2 class="loading">Please enter something in the form</h2>');
        } else {
            $("#poster").html("<h2 class='loading'>Your poster is loading</h2>");
            $.getJSON("http://api.themoviedb.org/3/Movie.search/en/json/somekey/" + film + "?callback=?", function(json) {
                if (json != "Nothing found.") {
                    //Display the poster and a message announcing the result
                    $("#poster").html('<h2 class="loading" >We found you a poster</h2><img id="thePoster" src=' + json[0].posters[0].image.url + '/>');
                } else {
                    $.getJSON("http://api.themoviedb.org/3/Movie.search/en/json/somekey/goonies?callback=?", function(json) {
                        $("#poster").html('<h2 class="loading">Nothing found</h2>')
                    });
                }
            });
        }
        return false;
    }

    $("#button").click(getPoster);
    $("#search").keyup(function(e) {
        if (e.keyCode == 13) {
            getPoster();
        }
    });


});