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

    const calendarContainer = $(".container-fluid");
    let hourDisplay = "";
    const dateTime = new Date();
    let hours = dateTime.getHours();

    generateCalendarTimeSlots();
    startTimer();

    $(calendarContainer).on("click", "button", saveEvent);
    initializeLocalStorage();
    updateCalendar();

    // ----------------------------------------------------
    function startTimer() {
        setInterval(function () {
            var dayOfTheWeek = dateTime.getDay();
            var year = dateTime.getFullYear();
            var month = dateTime.getMonth();
            var date = dateTime.getDate();

            var days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];

            var months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];

            var output =
                days[dayOfTheWeek] +
                ", " +
                months[month] +
                ", " +
                date +
                ", " +
                year;

            $("#currentDay").text(output);
        }, 1000);
    }

    // ----------------------------------------------------
    function saveEvent(eventObj) {
        var clickedButton = eventObj.target;
        var container = $(clickedButton).parent();
        var inputValue = $(clickedButton).prev().val();

        localStorage.setItem(container.attr("id"), inputValue);
    }
    // ----------------------------------------------------
    // JQUERY MODIFICATION

    // ----------------------------------------------------

    function updateCalendar() {
        var array = calendarContainer.children().toArray();
        for (var i = 0; i < localStorage.length; i++) {
            var storedText = localStorage.getItem("hour-" + (i + 9));
            $(array[i]).children("textarea").val(storedText);
        }
    }

    // ----------------------------------------------------
    // JQUERY MODIFICATION

    // ----------------------------------------------------

    function initializeLocalStorage() {
        for (var i = 0; i < calendarContainer.children().length; i++) {
            if (localStorage.length < 9) {
                localStorage.setItem("hour-" + (i + 9), "");
            }
        }
    }

    // ----------------------------------------------------
    // JQUERY MODIFICATION

    // ----------------------------------------------------

    function generateCalendarTimeSlots() {
        for (var i = 9; i < 18; i++) {
            if (i > 12) {
                hourDisplay = i - 12 + "PM";
            } else if (i <= 12) {
                hourDisplay = i + "AM";
            }

            var timeSlot = $("<div>")
                .attr("id", "hour-" + i)
                .addClass("row time-block past")
                .append(
                    $("<div>")
                        .addClass("col-2 col-md-1 hour text-center py-3")
                        .text(hourDisplay)
                )
                .append(
                    $("<textarea>")
                        .addClass("col-8 col-md-10 description")
                        .attr("rows", "3")
                )
                .append(
                    $("<button>")
                        .addClass("btn saveBtn col-2 col-md-1")
                        .attr("aria-label", "save")
                        .append(
                            $("<i>")
                                .addClass("fas fa-save")
                                .attr("aria-hidden", "true")
                        )
                );

            if (i > hours) {
                $(timeSlot).addClass("future");
            } else if (i < hours) {
                $(timeSlot).addClass("past");
            } else {
                $(timeSlot).addClass("present");
            }

            calendarContainer.append(timeSlot);
        }
    }

    // ----------------------------------------------------

    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
});
