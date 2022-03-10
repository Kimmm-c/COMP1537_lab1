

function ajax_get() {
    y = $("#movie_keyword").val();
    $.ajax(

        {

            "url": 'https://api.themoviedb.org/3/search/movie?api_key=ed4ef9b0f9bcb9c237ab83a2c2ffb909&language=en-US&query=300&page=1&include_adult=false',
            "type": "GET",
            "success": procces_
        }


    )
}
function procces_(data) {
    console.log(data.results[0])
    for (i = 0; i < data.results.length; i++) {
        $("#p2").append("<span>" + (i + 1) + ". Title: " + data.results[i].original_title + "<br>" + "</span>")
        $("#p2").append("<span>" + "Overview: " + data.results[i].overview + "<br>" + "</span>")
        x = data.results[i].poster_path
        image = `<img src="https://image.tmdb.org/t/p/w500/${x}" style="height:100px; width:100px;"> `
        $("#p2").append("<span>" + image + "</span>")
        $("#p2").append(`<button class='backdrop_img' id='${data.results[i].backdrop_path}'>Backdrop</button><hr>`)

    }
}
function display_backdrop() {
    placeHolder = $(this).attr("id")
    if (placeHolder == 'null') {
        $("#backdrop").text("No backdrop image")
    } else {
        backdrop_image = `<img src="https://image.tmdb.org/t/p/original${placeHolder}" width="50%">`
        $("#backdrop").html(backdrop_image)
    }

}

function setup() {
    $('#get_keyword_button').click(ajax_get);
    $("body").on("click", ".backdrop_img", display_backdrop)
}
$(document).ready(setup);