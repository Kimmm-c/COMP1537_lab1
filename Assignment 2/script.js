function ajax_call() {
    query = $("#key_word").val();
    page_index = $(this).attr("index");
    $.ajax({
        'url': `https://api.themoviedb.org/3/search/movie?api_key=0cd1945e33eeda85e8bb22f5b925a825&language=en-US&query=${query}&page=1&include_adult=false`,
        'type': "GET",
        'success': process_,
        'data': { 'page_index': page_index }
    })
}
// data.results.length
function process_(data) {
    $("#movie_display").empty();
    $("#page_num").empty();

    button_display = document.getElementById("monitor_buttons");
    if(button_display.style.display === "none"){
        button_display.style.display = "block";
    }

    key_word = $("#key_word").val();
    result_options = document.getElementById("result_per_page");
    result_per_page = parseInt(result_options.options[result_options.selectedIndex].value);
    total_result = 0;
    list_of_results = []

    for (i = 0; i < data.results.length; i++) {
        title = data.results[i].title;
        // des = data.results[i].overview;
        // poster = "http://image.tmdb.org/t/p/w500/" + data.results[i].poster_path;
        // backdrop = "http://image.tmdb.org/t/p/original//" + data.results[i].backdrop_path;


        if (title.toLowerCase().includes(key_word.toLowerCase())) {
            list_of_results.push({
                "title": data.results[i].title,
                "des": data.results[i].overview,
                "poster": "http://image.tmdb.org/t/p/w500/" + data.results[i].poster_path,
                "backdrop": "http://image.tmdb.org/t/p/original//" + data.results[i].backdrop_path
            })
            // $("#movie_display").append(`<div class="movie_section">${i + 1}. <br>
            // Title: ${title} <br>
            // Description: ${des} <br>
            // <img src="${poster}" style="width:15%; height:relative;">
            // <button class="display_backdrop" id="${backdrop}">Display Backdrop</button> <hr></div>`)
            total_result++;
        }
    }
    for (i = 0; i < result_per_page; i++) {
        if (i < total_result) {
            $("#movie_display").append(`<div class="movie_section">
        ${i + 1}. <br>
        Title: ${list_of_results[i].title} <br>
        Description: ${list_of_results[i].des} <br>
        <img src="${list_of_results[i].poster}" style="width:15%; height:relative;">
        <button class="display_backdrop" id="${list_of_results[i].backdrop}">Display Backdrop</button> <hr></div>`)
        } else {
            break;
        }
    }
    number_of_page = Math.ceil(total_result / result_per_page);
    count = 0
    for (i = 1; i <= number_of_page; i++) {
        x = list_of_results.slice(count, count + result_per_page)
        $("#page_num").append(`<button class="page" id="${x}">${i}</button>`);
        count += result_per_page;
        console.log(x);
    }
    console.log(total_result);
    console.log(typeof result_per_page);
    // count = 0
    // for (i=0; i < 5; i++){
    //     x = list_of_results.slice(count, count + 2);
    //     console.log(x);
    //     count += 2;
    // }

    //console.log(x);
    // id="${list_of_results.slice(count, count+result_per_page)}"
}

function display_backdrop() {
    backdrop = $(this).attr("id");
    $("#backdrop_section").html(`<img src="${backdrop}" width="100%">`);
}

// function change_display() {
//     $("#page_num").empty();
//     result_options = document.getElementById("result_per_page");
//     result_per_page = result_options.options[result_options.selectedIndex].value;
//     total_result = document.getElementsByClassName("movie_section").length;
//     number_of_page = Math.ceil(total_result / result_per_page);
//     for (i = 1; i <= number_of_page; i++) {
//         $("#page_num").append(`<button class="page">${i}</button>`);
//     }
// }

function page_view() {
    $("#movie_display").empty();
    list_of_results = $(this).attr("id");
    console.log(list_of_results);
    console.log(list_of_results[0]);
}

function setup() {
    $("#get_movies").click(ajax_call);
    $("body").on("click", ".display_backdrop", display_backdrop);
    $("body").on("click", ".page", page_view);
    $("#result_per_page").change(ajax_call);
}

$(document).ready(setup);
