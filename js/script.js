$(function() {


    var client_id = "d606a55b90324a3f98a3b4e5df56387d";
    var access_token = "2294d782278d4d468e7b6cc9f03447e2";

    var submittedphotos_ajax_url = "https://api.instagram.com/v1/tags/guesswherelondon/media/recent?client_id=" + client_id + "&access_token=" + access_token;
    var guessedphotos_ajax_url = "https://api.instagram.com/v1/tags/guessedinlondon/media/recent?client_id=" + client_id + "&access_token=" + access_token;

    var submitted_count_ajax_url = "https://api.instagram.com/v1/tags/guessedinlondon?client_id=" + client_id + "&access_token=" + access_token;
    var guessed_count_ajax_url = "https://api.instagram.com/v1/tags/guesswherelondon?client_id=" + client_id + "&access_token=" + access_token;



 // LOCATION SCORE
 $.ajax({
      type: "GET",
        dataType: "jsonp",
        cache: false,
        url: submitted_count_ajax_url,
        success: function(data) {
            var guessed = data.data.media_count;
            $("#guessed-total").append(guessed);
            // Number of submitted
            $.ajax({
              type: "GET",
                dataType: "jsonp",
                cache: false,
                url: guessed_count_ajax_url,
                success: function(data) {
                    var submitted = guessed + data.data.media_count;
                    $("#submitted-total").append(submitted);
                }
            }); 


             // RECENTLY GUESSED PHOTOS
             $.ajax({
                  type: "GET",
                    dataType: "jsonp",
                    cache: false,
                    url: guessedphotos_ajax_url,
                    success: function(data) {
                        var leaderboard = new Array();

                        for (var i = 0; i < guessed; i++) {
                            // Cycle through images
                            //var commentCount = data.data[i].comments.count;
                            var comments = data.data[i].comments.data;
                            var image = data.data[i].images.thumbnail.url;
                            var imageurl = data.data[i].images.standard_resolution.url;
                            
                            // Output image
                            $("#guessed .photos").append("<figure id='guessed" + i + "' class='photo'><a href='" + imageurl +"'><img src='" + image +"' /></a><figcaption></figcaption></figure>");                         

                            // Add '1st' guesser to image
                            for (var j = 0; j < 2; j++){
                                //Cycle through comments for image
                                var comment = comments[j].text;
                                if (/#guessedinlondon/i.test(comment)){
                                    //Find 'winning' comment and extract guessers
                                    var guessers = comment.match(/@\w+/g);
                                    leaderboard.push(guessers[0]);
                                    $("#guessed" + i + " figcaption").append("Guessed by <a href='#'>" + guessers[0] + "</a>");           
                                }
                            }
                        }

                        // WRITE LEADERBOARD
                        var leaderboard = compressArray(leaderboard);
                        $.each(leaderboard, function(rank,j){
                           var name = j.value;
                           var score = j.count;
                           //$(".rankings").append("<tr><th>" + rank + "</th><td>" + name + "</td><td>" + score + "</td></tr>");
                           $(".rankings").append("<tr><td>" + name + "</td><td>" + score + "</td></tr>");
                        });

                        $('body').removeClass('hidden');                    
                    }
                });

        }
    }); 


 // RECENTLY SUBMITTED PHOTOS
 $.ajax({
      type: "GET",
        dataType: "jsonp",
        cache: false,
        url: submittedphotos_ajax_url,
        success: function(data) {
            for (var i = 0; i < 10; i++) {
                // Cycle through images
                var image = data.data[i].images.thumbnail.url;
                var imageurl = data.data[i].images.standard_resolution.url;
                var submitter = data.data[i].user.username;
                
                // Output image
                $("#unguessed .photos").append("<figure id='unguessed" + i + "' class='photo'><a href='" + imageurl +"'><img src='" + image +"' /></a><figcaption></figcaption></figure>");                         
                
                // Add submitter to image
                $("#unguessed" + i + " figcaption").append("Submitted by <a href='#'>" + submitter + "</a>");
            }                                
        }
    }); 

function compressArray(original) {
 
    var compressed = [];
    // make a copy of the input array
    var copy = original.slice(0);
 
    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {
 
        var myCount = 0;    
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
            if (original[i] == copy[w]) {
                // increase amount of times duplicate is found
                myCount++;
                // sets item to undefined
                delete copy[w];
            }
        }
 
        if (myCount > 0) {
            var a = new Object();
            a.value = original[i];
            a.count = myCount;
            compressed.push(a);
        }
    }
 
    return compressed;
};


});
