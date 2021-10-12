$(document).ready(function() {
    const new_day = new Date();
    const today = new Date(new_day.getFullYear(), new_day.getMonth(), new_day.getDate());
    const today_month = today.getMonth();
    const today_year = today.getFullYear();
    const month_name = ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai']
    const month_day = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let click_id;
    let click_count;
    let start_date;
    let end_date;
    const div = $('#flights');
    const startId = 'dep-1';
    const endId = 'dep-2';
    const startInput = $('#dep-1');
    const endInput = $('#dep-2');
    div.on("focus", ".input_date", function(e) {
        renderRangeCalendar(div);
        showCalendar(e, startInput, endInput);
    });

    div.on("mouseover", ".each_day", function(e) {
        start_date = startInput.val();
        end_date = endInput.val();
        if (click_id == startId) {
            let hover_id = e.target.id;
            hover_date = formatIdToDate(hover_id, 0)
            if (start_date !== '' && end_date !== '') {
                start_date = formatIdToDate(start_date, 0);
                end_date = formatIdToDate(end_date, 0);
                if (click_count == 0) {
                    if (hover_date < end_date || hover_date.getTime() == end_date.getTime()) {
                        showRange(hover_date, end_date);
                    }
                }
                if (click_count == 1) {
                    if (hover_date > start_date || hover_date.getTime() == start_date.getTime()) {
                        showRange(start_date, hover_date);
                    }
                }
            }
        }
        if (click_id == endId) {
            let hover_id = e.target.id;
            hover_date = formatIdToDate(hover_id, 0);
            if (start_date !== '' && end_date !== '') {
                start_date = formatIdToDate(start_date, 0);
                end_date = formatIdToDate(end_date, 0);
                if (click_count == 1) {
                    if (hover_date < start_date) {
                        showRange(hover_date, end_date);
                    }
                    if (hover_date > start_date || hover_date.getTime() == start_date.getTime()) {
                        showRange(start_date, hover_date);
                    }
                }
                if (click_count == 0) {
                    if (hover_date < start_date) {
                        showRange(hover_date, end_date);
                    }
                    if (hover_date > start_date || hover_date.getTime() == start_date.getTime()) {
                        showRange(start_date, hover_date);
                    }
                }
            }
        }
    });
    div.on("click", ".each_day", function(e) {
        let click_day_id = e.target.id;
        click_date = formatIdToDate(click_day_id, 0)
        start_date = startInput.val();
        end_date = endInput.val();
        if (click_id == startId) {
            if (start_date == '' && end_date == '') {
                if (click_count == 0) {
                    startInput.val(click_day_id);
                    $('#' + click_day_id).addClass('selected_day');
                    dep_2 = formatIdToDate(click_day_id, 1);
                    dep_2 = formatDateToID(dep_2);
                    endInput.val(dep_2);
                    click_count = 1;
                };
            }
            if (start_date !== '' && end_date !== '') {
                start_date = formatIdToDate(start_date, 0);
                end_date = formatIdToDate(end_date, 0);
                if (click_count == 1) {
                    if (click_date < start_date) {
                        startInput.val(click_day_id);
                        $('.each_day').removeClass('selected_day');
                        $('#' + click_day_id).addClass('selected_day');
                    }
                    if (click_date > start_date || click_date.getTime() == start_date.getTime()) {
                        endInput.val(click_day_id);
                        $('#' + click_day_id).addClass('selected_day');
                        $('#calendar').css("display", "none");
                    }
                }
                if (click_count == 0) {
                    if (click_date < end_date || click_date.getTime() == end_date.getTime()) {
                        startInput.val(click_day_id);
                        $('.selected_day:first').removeClass('selected_day');
                        $('#' + click_day_id).addClass('selected_day');
                        click_count = 1;
                    }
                    if (click_date > end_date) {
                        startInput.val(click_day_id);
                        $('.each_day').removeClass('range_hover');
                        $('.selected_day').removeClass('selected_day');
                        $('#' + click_day_id).addClass('selected_day');
                        click_count = 1;
                    }
                }
            }
        }
        if (click_id == endId) {
            if (start_date == '' && end_date == '' && click_count == 0) {
                startInput.val(click_day_id);
                $('#' + click_day_id).addClass('selected_day');
                dep_2 = formatIdToDate(click_day_id, 1);
                dep_2 = formatDateToID(dep_2);
                endInput.val(dep_2);
                $('#' + dep_2).addClass('selected_day');
                click_count = 1;
            }
            if (start_date !== '' && end_date !== '') {
                start_date = formatIdToDate(startInput.val(), 0);
                if (click_count == 1) {
                    if (click_date < start_date) {
                        startInput.val(click_day_id);
                        $('.selected_day:first').removeClass('selected_day');
                        $('#' + click_day_id).addClass('selected_day');
                        // click_count = 0;
                    }
                    if (click_date > start_date || click_date.getTime() == start_date.getTime()) {
                        endInput.val(click_day_id);
                        $('#' + click_day_id).addClass('selected_day');
                        $('#calendar').css("display", "none");
                    }
                }
                if (click_count == 0) {
                    if (click_date < start_date || click_date.getTime() == start_date.getTime()) {
                        startInput.val(click_day_id);
                        $('.selected_day:first').removeClass('selected_day');
                        $('#' + click_day_id).addClass('selected_day');
                        click_count = 1;
                    }
                    if (click_date > start_date) {
                        endInput.val(click_day_id);
                        $('#' + click_day_id).addClass('selected_day');
                        $('#calendar').css("display", "none");
                    }
                }
            }
        }
    });
    div.on("click", ".change_month", function(e) {
        let click_id = e.target.id;
        let current_month = $('#header_month').text();
        let current_year = $('#header_year').text();
        let next_month = $('#next_month_header').text();
        let next_year = $('#next_year_header').text();
        let mm_index = month_name.findIndex(function(month) {
            return month == current_month;
        })
        let mm = 0
        if (mm_index == -1) {
            mm = today_month;
        } else {
            mm = mm_index
        }
        let next_mm = mm + 1;
        let yyyy = parseInt(current_year);
        let next_yyyy = parseInt(next_year);
        if (click_id == 'next') {
            if (mm == 11) {
                mm = 0;
                yyyy += 1;
            } else {
                mm += 1
            }
            if (next_mm == 11) {
                next_mm = 0
                next_yyyy += 1;
            } else {
                next_mm += 1;
            }
        }
        if (click_id == 'prev') {
            if (mm == 0) {
                mm = 11;
                yyyy -= 1;
            } else {
                mm -= 1;
            }
            if (next_mm == 0) {
                next_mm = 11;
                next_yyyy -= 1;
            } else {
                next_mm -= 1;
            }
        }
        $('#header_month').text(month_name[mm]);
        $('#header_year').text(yyyy);
        $('#next_month_header').text(month_name[next_mm]);
        $('#next_year_header').text(next_yyyy);
        my_calendar(mm, yyyy);
    });
    $(document).click(function(e) {
        if (!$(e.target).closest(".calendar, .input_date").length) {
            $('#calendar').css("display", "none");
        }
    })

    function day_of_feb(year) {
        if ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
            return 29;
        } else {
            return 28;
        }
    }

    function my_calendar(mm, yyyy) {
        $('#calendar_day').html('');
        $('#header_month').text(month_name[mm]);
        $('#header_year').text(yyyy);
        $('#next_month_calendar_day').html('');
        $('#next_month_header').text(month_name[mm + 1]);
        let days_of_month = month_day[mm];
        if (mm == 1) {
            days_of_month = day_of_feb(yyyy);
        }
        let first_day_of_month = new Date(yyyy, mm, 1);
        let no_of_days = days_of_month + first_day_of_month.getDay() - 1;
        for (let i = 0; i <= no_of_days; i++) {
            let day = document.createElement('div');
            if (i >= first_day_of_month.getDay()) {
                let my_day = i - (first_day_of_month.getDay() - 1);
                let my_day_text = '';
                if (my_day < 10) {
                    my_day_text = '0' + my_day;
                } else {
                    my_day_text = my_day;
                }
                let mm_text = '';
                if ((mm + 1) < 10) {
                    mm_text = '0' + (mm + 1);
                } else {
                    mm_text = (mm + 1);
                }
                day.innerHTML = my_day;

                let my_date = new Date(yyyy, mm, my_day);
                if (my_date < today) {
                    day.classList.add('old_day');
                } else {
                    day.classList.add('each_day')
                }
                let picked_date = my_day_text + '-' + mm_text + '-' + yyyy;
                day.setAttribute('id', picked_date);
                if (today_year == yyyy && today_month == mm && today.getDate() == my_day) {
                    day.classList.add('today');
                }
            }
            $('#calendar_day').append(day);
        }
        let next_month = mm + 1;
        let next_yyyy = yyyy
        if (mm == 11) {
            next_month = 0;
            next_yyyy += 1;
        }
        let first_day_of_next_month = new Date(next_yyyy, next_month, 1);
        let no_of_days_next_calendar = month_day[next_month] + first_day_of_next_month.getDay() - 1;
        for (let i = 0; i <= no_of_days_next_calendar; i++) {
            let next_month_day = document.createElement('div');
            if (i >= first_day_of_next_month.getDay()) {
                let my_day = i - first_day_of_next_month.getDay() + 1;
                let my_day_text = '';
                if (my_day < 10) {
                    my_day_text = '0' + my_day;
                } else {
                    my_day_text = my_day;
                }
                let mm_text = '';
                if ((next_month + 1) < 10) {
                    mm_text = '0' + (next_month + 1);
                } else {
                    mm_text = (next_month + 1);
                }
                next_month_day.innerHTML = my_day;
                let my_date = new Date(next_yyyy, (next_month + 1), my_day);
                if (my_date < today) {
                    next_month_day.classList.add('old_day');
                } else {
                    next_month_day.classList.add('each_day');
                }
                let picked_date = my_day_text + '-' + mm_text + '-' + next_yyyy;
                next_month_day.setAttribute('id', picked_date);
            }
            $('#next_year_header').text(next_yyyy);
            $('#next_month_calendar_day').append(next_month_day);
        }
    }

    function formatIdToDate(date, n) {
        let dd = parseInt(date.split('-')[0]);
        let mm = parseInt(date.split('-')[1]);
        let yyyy = parseInt(date.split('-')[2]);
        return new Date(yyyy, (mm - 1), dd + n);
    };

    function formatDateToID(date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + date.getDate();
        } else {
            dd = date.getDate();
        }
        if (mm < 10) {
            mm = '0' + (date.getMonth() + 1);
        } else {
            mm = date.getMonth() + 1;
        }
        return dd + '-' + mm + '-' + yyyy;
    };

    function showRange(startDate, endDate) {
        let a = document.getElementsByClassName("each_day")
        for (i in a) {
            if (a[i].id != undefined) {
                let moveDay = parseInt(a[i].id.split("-")[0])
                let moveMonth = parseInt(a[i].id.split("-")[1] - 1)
                let moveYear = parseInt(a[i].id.split("-")[2])
                let moveDate = new Date(moveYear, moveMonth, moveDay)
                if (moveDate > startDate && moveDate < endDate) {
                    $("#" + a[i].id).addClass("range_hover");
                } else {
                    $("#" + a[i].id).removeClass("range_hover");

                }
            }

        }

    };

    function renderRangeCalendar(div) {
        const calendar = `<div id="calendar" class="calendar" value="">
            <div id="curr_month">
                <div class="calendar_header">
                    <span id="prev" class="change_month">&lt;</span>
                    <span id="header_month">mm</span>
                    <span id="header_year">yyyy</span>
    
                </div>
                <div class="calendar_body">
                    <div class="calendar_week_day">
                        <div>CN</div>
                        <div>T2</div>
                        <div>T3</div>
                        <div>T4</div>
                        <div>T5</div>
                        <div>T6</div>
                        <div>T7</div>
                    </div>
                    <div id="calendar_day" class="calendar_days"></div>
                </div>
            </div>
            <div id="cont_month">
                <div class="calendar_header">
                    <!-- <span id="cont_prev" class="change_month">&lt;</span> -->
                    <span id="next_month_header">mm</span>
                    <span id="next_year_header">yyyy</span>
                    <span id="next" class="change_month">&gt;</span>
                    <!-- <span id="cont_next" class="change_month">&gt;</span> -->
                </div>
                <div class="calendar_body">
                    <div class="calendar_week_day">
                        <div>CN</div>
                        <div>T2</div>
                        <div>T3</div>
                        <div>T4</div>
                        <div>T5</div>
                        <div>T6</div>
                        <div>T7</div>
                    </div>
                    <div id="next_month_calendar_day" class="calendar_days"></div>
                </div>
            </div>
        </div>`
        $('#calendar').remove();
        div.append(calendar);
    }

    function showCalendar(e, startInput, endInput) {
        click_id = e.target.id;
        click_count = 0;
        $('#calendar').attr("value", click_id);
        $('#calendar').css("display", "flex");
        if (startInput.val() !== '' && endInput.val() !== '') {
            let start_date = startInput.val();
            let end_date = endInput.val()
            let mm = parseInt(start_date.split("-")[1] - 1)
            let yyyy = parseInt(start_date.split("-")[2])
            my_calendar(mm, yyyy);
            start_date = formatIdToDate(start_date, 0);
            end_date = formatIdToDate(end_date, 0);
            showRange(start_date, end_date);
            $('#' + startInput.val()).addClass('selected_day');
            $('#' + endInput.val()).addClass('selected_day');
        } else {
            let mm = today_month;
            let yyyy = today_year;
            my_calendar(mm, yyyy);
        }
    }
});