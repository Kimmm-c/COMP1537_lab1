unicorn_list = null;

function process_res(data) {
    console.log(data)
    unicorn_list = data;
    $("#result").html(JSON.stringify(data));
    $("#filters").attr("style", "");
}

function findUnicornByName() {
    $("#filters").attr("style", "");
    $.ajax({
        url: "https://desolate-meadow-69624.herokuapp.com/findUnicornByName",
        type: "POST",
        data: {
            "unicornName": $("#unicornName").val()
        },
        success: process_res
    })
    uncheck_filter();
}

function findUnicornByFood() {
    apple_status = "unchecked"
    carrot_status = "unchecked"
    if ($("#apple").is(":checked")) {
        apple_status = "checked";
    }
    if ($("#carrot").is(":checked")) {
        carrot_status = "checked";
    }
    $.ajax({
        url: "https://desolate-meadow-69624.herokuapp.com/findUnicornByFood",
        type: "POST",
        data: {
            "apple_status": apple_status,
            "carrot_status": carrot_status
        },
        success: process_res
    })
    uncheck_filter();
}

function findUnicornByWeight() {
    //console.log($("#lowerWeight").val());
    //console.log($("#higherWeight").val());
    $.ajax({
        url: "https://desolate-meadow-69624.herokuapp.com/findUnicornByWeight",
        type: "POST",
        data: {
            "lower_bound": $("#lowerWeight").val(),
            "upper_bound": $("#higherWeight").val()
        },
        success: process_res
    })
    uncheck_filter();
}

function uncheck_filter(){
    $("#unicornNameFilter").prop('checked', false);
    $("#unicornWeightFilter").prop('checked', false);
}

function unicorn_filter() {
    //console.log(unicorn_list);
    //console.log(String([1, 2, 3, 'a', 'b']));
    filter_list = [];
    unicorn_list.map((a_unicorn) => {
        if ($("#unicornNameFilter").is(":checked")) {
            console.log(a_unicorn.name);
            filter_list.push(a_unicorn.name)
        }
        if ($("#unicornWeightFilter").is(":checked")) {
            filter_list.push(a_unicorn.weight)
        }
    })
    $("#result").html(String(filter_list));
}


function setup() {
    $("#findUnicornByName").click(findUnicornByName);
    $("#findUnicornByFood").click(findUnicornByFood);
    $("#findUnicornByWeight").click(findUnicornByWeight);
    $("#filter").click(unicorn_filter);
}

$(document).ready(setup);