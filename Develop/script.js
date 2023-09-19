// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?

    var calendarContainer = $(".container-fluid");
    var hourDisplay = "";
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth();
    var days = currentTime.getDate();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    startTimer();

    for (var i = 9; i < 18; i++) {
        if (i > 12) {
            hourDisplay = i - 12 + "PM";
        } else if (i <= 12) {
            hourDisplay = i + "AM";
        }

        var timeSlot = $(
            '<div id="hour-' +
                i +
                '" class="row time-block past">' +
                '<div class="col-2 col-md-1 hour text-center py-3">' +
                hourDisplay +
                "</div>" +
                '<textarea class="col-8 col-md-10 description" rows="3"></textarea>' +
                '<button class="btn saveBtn col-2 col-md-1" aria-label="save">' +
                '<i class="fas fa-save" aria-hidden="true"></i>' +
                "</button>" +
                "</div>"
        );

        if (i > hours) {
            $(timeSlot).addClass("future");
        } else if (i < hours) {
            $(timeSlot).addClass("past");
        } else {
            $(timeSlot).addClass("present");
        }

        calendarContainer.append(timeSlot);
        console.log(timeSlot.hour);
    }

    // ----------------------------------------------------
    function startTimer() {
        setInterval(function () {
            var dateTime = new Date();

            var dayOfTheWeek = dateTime.getDay();
            var year = dateTime.getFullYear();
            var month = dateTime.getMonth();
            var date = dateTime.getDate();
            var hour = dateTime.getHours();
            var minute = dateTime.getMinutes();
            var second = dateTime.getSeconds();

            if (hour > 12) {
                hour -= 12;
            }

            if (second < 10) {
                second = "0" + second;
            }

            if (minute < 10) {
                minute = "0" + minute;
            }

            var output =
                month +
                "/" +
                date +
                "/" +
                year +
                " " +
                hour +
                ":" +
                minute +
                ":" +
                second;

            $("#currentDay").text(output);
        }, 1000);
    }

    // ----------------------------------------------------
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
});
