$(function () {
    // VARIABLES
    // ----------------------------------------------------
    const calendarContainer = $(".container-fluid");
    const dateTime = new Date();
    const hours = dateTime.getHours();

    let hourDisplay = "";

    // INITIALIZATION
    // ----------------------------------------------------
    generateCalendarTimeSlots();
    startTimer();

    // EVENT HANDLERS
    // ----------------------------------------------------
    $(calendarContainer).on("click", "button", saveEvent);

    // LOCAL STORAGE
    // ----------------------------------------------------
    initializeLocalStorage();
    updateCalendar();

    // FUNCTIONS
    // ----------------------------------------------------

    // Starts a timer that will update the current date and calendar display.
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

            const output =
                days[dayOfTheWeek] +
                ", " +
                months[month] +
                ", " +
                addNumberSuffix(date) +
                ", " +
                year;

            $("#currentDay").text(output);
        }, 1000);
    }

    // Saves user input from the textarea element to the local storage.
    function saveEvent(eventObj) {
        var clickedButton = $(eventObj.target);
        var container = clickedButton.parent();
        var inputValue = clickedButton.prev().val();

        localStorage.setItem(container.attr("id"), inputValue);
    }

    // Updates calendar with the information stored in local storage.
    function updateCalendar() {
        calendarContainer.children().each(function (index) {
            var storedText = localStorage.getItem("hour-" + (index + 9));
            $(this).children("textarea").val(storedText);
        });
    }

    function initializeLocalStorage() {
        for (var i = 0; i < calendarContainer.children().length; i++) {
            if (localStorage.length < 9) {
                localStorage.setItem("hour-" + (i + 9), "");
            }
        }
    }

    // Generates the individual calendar time slots and appends them to the container.
    function generateCalendarTimeSlots() {
        for (var i = 9; i < 18; i++) {
            var hourDisplay = i > 12 ? i - 12 + "PM" : i + "AM";

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

    // Adds appropriate suffix to the date.
    function addNumberSuffix(num) {
        if (num >= 10 && num <= 20) {
            return num + "th";
        } else {
            var lastDigit = num % 10;
            if (lastDigit === 1) {
                return num + "st";
            } else if (lastDigit === 2) {
                return num + "nd";
            } else if (lastDigit === 3) {
                return num + "rd";
            } else {
                return num + "th";
            }
        }
    }
});
