// git init -> git add. -> git commit -> heroku login -> heroku create -> git push heroku master 
function display_unicorns(){
    $.ajax({
        url: `https://serene-badlands-79339.herokuapp.com/getAllUnicorns`,
        type: "GET",
        success: display_all
    })
}


function display_all(data){
    //console.log(data);
    $("#unicorns_display").empty();
    for(i=0; i<data.length; i++){
        $("#unicorns_display").append(`${i+1}. <button id="${data[i].name}" class="each_unicorn">${data[i].name}</button><br>`)
    }
}

function display_unicorn_by_name(data){
    console.log(data);
    result="<ul>"
    for (attribute in data[0]){
        console.log(data[0][attribute]);
        result += `<li>${data[0][attribute]}</li>`
        
    }
    result += "</ul>"
    $("#each_unicorn_section").html(result);
}

function display_each(){
    attribute = $(this).attr("id");
    //console.log(attribute);
    $.ajax({
        url: `https://serene-badlands-79339.herokuapp.com/getUnicornByName?name=${attribute}`,
        type: "GET",
        success: display_unicorn_by_name
    })
}

function setup(){
    $("#get_all").click(display_unicorns);
    $('body').on('click', '.each_unicorn', display_each);
}

$(document).ready(setup);