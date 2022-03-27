total_results = null;
result_per_page = null;
current_page = null;

function ajax_call() {
    query = $("#key_word").val();
    $.ajax({
        'url': `https://api.themoviedb.org/3/search/movie?api_key=0cd1945e33eeda85e8bb22f5b925a825&language=en-US&query=${query}&page=1&include_adult=false`,
        'type': "GET",
        'success': process_,
    })
}

function process_(data) {
    total_results = data;
    pagination();
    $("#monitor_buttons").css("display", "block")
    render_first_page();
}

function pagination() {
    //console.log(total_results.results.length);
    $("#page_num").empty();
    result_options = document.getElementById("result_per_page");
    result_per_page = parseInt(result_options.options[result_options.selectedIndex].value);
    number_of_page = Math.ceil(total_results.results.length / result_per_page);
    for (i = 1; i <= number_of_page; i++) {
        $("#page_num").append(`<button class="page" id="${i}">${i}</button>`);
    }
}

function render_first_page() {
    //console.log(result_per_page);
    $("#movie_display").empty();
    $("#backdrop_section").empty();
    for (i = 0; i < result_per_page; i++) {
        title = total_results.results[i].title;
        des = total_results.results[i].overview;
        poster = "http://image.tmdb.org/t/p/w500/" + total_results.results[i].poster_path;
        backdrop = "http://image.tmdb.org/t/p/original//" + total_results.results[i].backdrop_path;
        $("#movie_display").append(`<div class="movie_section">
        ${i + 1}.
        <h3>Title: ${title} </h3>
        Description: ${des} <br>
        <img src="${poster}" style="width:15%; height:relative;">
        <button class="display_backdrop" id="${backdrop}">Display Backdrop</button> <hr></div>`)
    }
    current_page = 1;
}

function display_target_page() {
    current_page = $(this).attr("id");
    display(current_page);
}

function display_backdrop() {
    backdrop = $(this).attr("id");
    $("#backdrop_section").html(`<img src="${backdrop}" width="100%">`);
}

function first_page() {
    current_page = 1;
    display(current_page);
    
}

function last_page() {
    current_page = Math.ceil(total_results.results.length / result_per_page);
    display(current_page);
}

function next_page(){
    if(current_page<Math.ceil(total_results.results.length / result_per_page)){
        current_page++;
    }
    //console.log(current_page);
    display(current_page);
}

function previous_page(){
    if(current_page>1){
        current_page--;
    }
    display(current_page);
}

function display(current_page) {
    $("#movie_display").empty();
    starting_index = result_per_page * (current_page - 1)
    //console.log(starting_index);
    for (i = starting_index; i < result_per_page * current_page && i < total_results.results.length; i++) {
        title = total_results.results[i].title;
        //console.log(title);
        des = total_results.results[i].overview;
        poster = "http://image.tmdb.org/t/p/w500/" + total_results.results[i].poster_path;
        backdrop = "http://image.tmdb.org/t/p/original//" + total_results.results[i].backdrop_path;
        $("#movie_display").append(`<div class="movie_section">
            ${i + 1}.
            <h3>Title: ${title} </h3>
            Description: ${des} <br>
            <img src="${poster}" style="width:15%; height:relative;">
            <button class="display_backdrop" id="${backdrop}">Display Backdrop</button> <hr></div>`)
    }
}

function page_size_change(){
    result_options = document.getElementById("result_per_page");
    result_per_page = parseInt(result_options.options[result_options.selectedIndex].value);
    //console.log(result_per_page);
    pagination();
    render_first_page();
}

function setup() {
    $("#get_movies").click(ajax_call);
    $("body").on("click", ".display_backdrop", display_backdrop);
    $("body").on("click", ".page", display_target_page);
    $("#first").click(first_page);
    $("#last").click(last_page);
    $("#next").click(next_page);
    $("#prev").click(previous_page);
    $("#result_per_page").on("change", page_size_change);
}

$(document).ready(setup);