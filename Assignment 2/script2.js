function ajax_call() {
    query = $("#key_word").val();
    page_index = $(this).attr("index");
    //console.log(page_id);
    $.ajax({
        'url': `https://api.themoviedb.org/3/search/movie?api_key=0cd1945e33eeda85e8bb22f5b925a825&language=en-US&query=${query}&page=1&include_adult=false`,
        'type': "GET",
        'success': process_,
        'data': { 'page_index': page_index }
    })
}

function process_(data) {
    result_options = document.getElementById("result_per_page");
    result_per_page = parseInt(result_options.options[result_options.selectedIndex].value);
    //console.log(page_id);
    //console.log($.isNumeric(page_id));
    display(data, result_per_page, page_index);
    pagination(data, result_per_page, page_index);
}

function display(data, result_per_page) {
    $("#movie_display").empty();
    //console.log($.isNumeric(page_index));
    //console.log(typeof page_index);
    if ($.isNumeric(page_index)) {
        page_view(data, result_per_page, page_index);
    } else {
        first_call_display(data, result_per_page, page_index);
    }
}

function pagination(data, result_per_page, page_index) {
    $("#page_num").empty();
    button_display = document.getElementById("monitor_buttons");
    if (button_display.style.display === "none") {
        button_display.style.display = "block";
    }
    total_results = data.results.length;
    number_of_page = Math.ceil(total_results / result_per_page);
    //count = 0
    result_index = 0
    for (i = 1; i <= number_of_page; i++) {
        //x = data.results.slice(count, count + result_per_page);
        $("#page_num").append(`<button class="page" index="${result_index}">${i}</button>`);
        result_index += result_per_page;
        //count += result_per_page;
        //console.log(x);
    }
    first_last_prev_next_setup(result_per_page, page_index, number_of_page)


}

function first_last_prev_next_setup(result_per_page, page_index, number_of_page) {
    first = "0";
    last = String(result_per_page * number_of_page - result_per_page);
    if (!($.isNumeric(page_index)) && (number_of_page != 1)) {
        $("#first").attr("index", first);
        $("#last").attr("index", last);
        $("#prev").attr("index", first);
        $("#next").attr("index", String(result_per_page));
    } else if (number_of_page == 1) {
        $("#first").attr("index", first);
        $("#last").attr("index", first);
        $("#prev").attr("index", first);
        $("#next").attr("index", first);
    } else {
        page_index = parseInt(page_index);
        if (page_index === 0) {
            $("#first").attr("index", first);
            $("#last").attr("index", last);
            $("#prev").attr("index", first);
            $("#next").attr("index", String(page_index + result_per_page));
        } else if (page_index == result_per_page * number_of_page - result_per_page) {
            $("#first").attr("index", first);
            $("#last").attr("index", last);
            $("#prev").attr("index", String(page_index - result_per_page));
            $("#next").attr("index", last);
        } else {
            $("#first").attr("index", first);
            $("#last").attr("index", last);
            $("#prev").attr("index", String(page_index - result_per_page));
            $("#next").attr("index", String(page_index + result_per_page));
            //console.log(page_index + result_per_page)
        }
    }
}

function display_backdrop() {
    backdrop = $(this).attr("id");
    $("#backdrop_section").html(`<img src="${backdrop}" width="100%">`);
}

function page_view(data, result_per_page, page_index) {
    $("#movie_display").empty();
    result_index = parseInt(page_index);
    for (i = result_index; (i < result_index + result_per_page) && (i < data.results.length); i++) {
        title = data.results[i].title;
        des = data.results[i].overview;
        poster = "http://image.tmdb.org/t/p/w500/" + data.results[i].poster_path;
        backdrop = "http://image.tmdb.org/t/p/original//" + data.results[i].backdrop_path;
        $("#movie_display").append(`<div class="movie_section">
            ${i + 1}. <br>
            Title: ${title} <br>
            Description: ${des} <br>
            <img src="${poster}" style="width:15%; height:relative;">
            <button class="display_backdrop" id="${backdrop}">Display Backdrop</button> <hr></div>`)
    }

}

function first_call_display(data, result_per_page) {
    for (i = 0; i < result_per_page; i++) {
        title = data.results[i].title;
        des = data.results[i].overview;
        poster = "http://image.tmdb.org/t/p/w500/" + data.results[i].poster_path;
        backdrop = "http://image.tmdb.org/t/p/original//" + data.results[i].backdrop_path;
        $("#movie_display").append(`<div class="movie_section">
    ${i + 1}. <br>
    Title: ${title} <br>
    Description: ${des} <br>
    <img src="${poster}" style="width:15%; height:relative;">
    <button class="display_backdrop" id="${backdrop}">Display Backdrop</button> <hr></div>`)
    }
}

function setup() {
    $("#get_movies").click(ajax_call);
    $("body").on("click", ".display_backdrop", display_backdrop);
    $("body").on("click", ".page", ajax_call);
    $("#result_per_page").change(ajax_call);
    $("#first").click(ajax_call);
    $("#last").click(ajax_call);
    $("#prev").click(ajax_call);
    $("#next").click(ajax_call);

}

$(document).ready(setup);