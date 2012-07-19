$(function() {

    var client_id = "d606a55b90324a3f98a3b4e5df56387d";
    var access_token = "2294d782278d4d468e7b6cc9f03447e2";

    var submittedphotos_ajax_url = "https://api.instagram.com/v1/tags/guesswherelondon/media/recent?client_id=" + client_id + "&access_token=" + access_token + "?jsoncallback=?";
    var guessedphotos_ajax_url = "https://api.instagram.com/v1/tags/guessedinlondon/media/recent?client_id=" + client_id + "&access_token=" + access_token;

    var submitted_count_ajax_url = "https://api.instagram.com/v1/tags/guessedinlondon?client_id=" + client_id + "&access_token=" + access_token;
    var guessed_count_ajax_url = "https://api.instagram.com/v1/tags/guesswherelondon?client_id=" + client_id + "&access_token=" + access_token;

    function get_submitted_photos(){
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: submittedphotos_ajax_url//,
            //success: function(submitted_photos_data) {
//
  //          }
        }); 
    };
    function get_guessed_photos(){
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: guessedphotos_ajax_url,
            success: function(guessed_photos_data) {

            }
        }); 
    };

$.getJSON(submittedphotos_ajax_url, function(data){
    alert(data.data[1].photo.images.thumbnail.url);

});


    $.when(get_submitted_photos(), get_guessed_photos()).done(function(submitted_photos_data, guessed_photos_data) {
        

        // Cycle through submitted images
        for (var i = 0; i < 10; i++) {
            var photo = submitted_photos_data.data[i];

            var image = photo.images.thumbnail.url;
            var imageurl = photo.images.standard_resolution.url;
            var submitter = photo.user.username;
            
            // Output image
            $("#unguessed .photos").append("<figure id='unguessed" + i + "' class='photo'><a href='" + imageurl +"'><img src='" + image +"' /></a><figcaption></figcaption></figure>");                         
            
            // Add submitter to image
            $("#unguessed" + i + " figcaption").append("Submitted by <a href='#'>" + submitter + "</a>");
        }    
    });


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
                success: function(data2) {
                    var submitted = guessed + data2.data.media_count;
                    $("#submitted-total").append(submitted);                           
                }
            });                            
        }
    }); 



 // RECENTLY GUESSED PHOTOS
 $.ajax({
      type: "GET",
        dataType: "jsonp",
        cache: false,
        url: guessedphotos_ajax_url,
        success: function(data) {
            for (var i = 0; i < 10; i++) {
                // Cycle through images
                var commentCount = data.data[i].comments.count;
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
                        $("#guessed" + i + " figcaption").append("Guessed by <a href='#'>" + guessers[0] + "</a>");           
                    }
                    

                }


            }                                
        }
    });

});
