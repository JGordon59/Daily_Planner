$(() => {
    if (typeof(Storage) == "undefined") {
        alert("Please upgrade your browser to one that supports local storage.");
    }

    function save(e) {
        localStorage.setItem(e.data.hour, e.currentTarget.value);
        console.log(`Hour ${e.data.hour} saved - ${e.currentTarget.value}`);
    }

    var hours = 24;
    var calendar = $("#calendar tbody");

    var today = moment().format("dddd, MMMM Do");
    $("#day").text(today);

    var current_hour = moment().hour();

    for (var i = 7; i < hours; i++) {
        var hour = i + 1;
        var hour_formatted = moment(i + 1, "h").format('LT') ;
        var event_id = hour + "_event";
        var timeframe = null;

        console.log(typeof(hour));
        console.log(typeof(current_hour));

        if (current_hour == hour) {
            timeframe = "present";
        } 

        if (current_hour > hour) {
            timeframe = "past";
        }

        if (current_hour < hour) {
            timeframe = "future";
        }

        calendar.append(`<tr class="${timeframe}"><td class="hour">${hour_formatted}</td><td><textarea id="${event_id}"></textarea></td>`);

        var event = $("#" + event_id);
        event.text(localStorage.getItem(hour));

        event.on("keyup", {
            hour: hour
        }, save);
    }
});