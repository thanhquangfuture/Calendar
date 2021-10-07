$(document).ready(function() {
    const new_day = new Date();
    const today = new Date(new_day.getFullYear(), new_day.getMonth(), new_day.getDate());
    const today_month = today.getMonth();
    const today_year = today.getFullYear();

    const month_name = ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai']
    const month_day = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

    $('#div_date').on("focus", ".input_date", function(e) {
        let click_id = e.target.id;
        let mm = today_month;
        let yyyy = today_year;
        $('#calendar').attr("value", click_id);
        $('#calendar').css("display", "flex");
        my_calendar(mm, yyyy);
        let click_count = 0;
        let start_date_id;
        $("#calendar").on("mouseover", ".each_day", function(e) {
            let hover_id = e.target.id;
            if (click_id == 'dep-1') {
                if (!$('.each_day').hasClass('selected_day') && click_count == 0) {
                    $('#dep-1').val(hover_id);
                }
                if ($('.each_day').hasClass('selected_day') && click_count == 1) {
                    hover_date = formatIdToDate(hover_id, 0)
                    start_date = formatIdToDate(start_date_id, 0);
                    if (hover_date < start_date) {
                        $('#dep-1').val(hover_id);
                    }
                    if (hover_date > start_date || hover_date.getTime() == start_date.getTime()) {
                        $('#dep-2').val(hover_id);
                        hover_range = getDatesRange(start_date, hover_date);
                        hover_range = formatDates(hover_range);
                        let range_id = hoverOverMonth(hover_range);
                        range_id = unique(range_id);
                        $('.each_day').removeClass('range_hover');
                        range_id.forEach(function(h) {
                            $('#' + h).addClass('range_hover');
                        });
                    }
                }
            }
            if (click_id == 'dep-2') {
                $('#dep-2').val(hover_id);
            }

        });

        $('.calendar_days').on("click", ".each_day", function(e) {
            if (!$('.each_day').hasClass('selected_day') && click_count == 0) {
                let click_day_id = e.target.id;
                $('#dep-1').val(click_day_id);
                $('#' + click_day_id).addClass('selected_day');
                dep_2 = formatIdToDate(click_day_id, 2);
                dep_2 = formatDateToID(dep_2);
                $('#dep-2').val(dep_2);
                click_count = 1;
                start_date_id = click_day_id;
            }
            if ($('.each_day').hasClass('selected_day') && click_count == 1) {
                let click_day_id = e.target.id;
                click_date = formatIdToDate(click_day_id, 0)
                start_date = formatIdToDate(start_date_id, 0);
                if (click_date < start_date) {
                    $('#dep-1').val(click_day_id);
                    $('.each_day').removeClass('selected_day');
                    $('#' + click_day_id).addClass('selected_day');
                    start_date_id = click_day_id;
                }
                // console.log(start_date);
                // console.log(click_date);
                // console.log(click_count);
                if (click_date > start_date || click_date.getTime() == start_date.getTime() && click_count == 1) {
                    $('#dep-2').val(click_day_id);
                    $('#' + click_day_id).addClass('selected_day');
                    // $('#calendar').css("display", "none");
                }
            }

        })

        // if (click_id == 'dep-1') {
        //     if ($('#dep-1').val() == '') {
        //         click_count = 0;
        //         $("#calendar").on("mouseover", ".each_day", function(e) {
        //             let hover_id = e.target.id;
        //             $('#dep-1').val(hover_id);
        //         });
        //         $('.calendar_days').on("click", ".each_day", function(e) {
        //             let click_day_id = e.target.id;
        //             $('#dep-1').val(click_day_id);
        //             $('#' + click_day_id).addClass('selected_day');
        //             dep_2 = formatIdToDate(click_day_id, 2);
        //             dep_2 = formatDateToID(dep_2);
        //             $('#dep-2').val(dep_2);
        //             click_count = 1;
        //         })
        //     }
        //     if ($('#dep-1').val() !== '' && click_count == 1) {
        //         let dep_1 = $('#dep-1').val();
        //         console.log(dep_1);
        //         if (hover_date < dep_1) {
        //             $("#calendar").on("mouseover", ".each_day", function(e) {
        //                 let hover_id = e.target.id;
        //                 hover_date = formatIdToDate(hover_id)
        //                 if (hover_date < dep_1)
        //                     $('#dep-1').val(hover_id);
        //                 console.log('abcd')
        //             });
        //             $('.calendar_days').on("click", ".each_day", function(e) {
        //                 let click_day_id = e.target.id;
        //                 $('#dep-1').val(click_day_id);
        //                 $('.each_day').removeClass('selected_day')
        //                 $('#' + click_day_id).addClass('selected_day');
        //             })
        //         }



        //     }

        // }

    })
    $('.calendar_header').on("click", ".change_month", function(e) {
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

    function getDatesRange(startDate, endDate) {
        var dates = [],
            currentDate = startDate,
            addDays = function(days) {

                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    }

    function formatDates(dates) {
        let newDateArray = [];
        for (let i = 0; i < dates.length; i++) {
            let date = "";
            if ((dates[i].getDate()) < 10) {
                date += '0' + dates[i].getDate() + "-";
            } else {
                date += dates[i].getDate() + "-";
            }
            if (((dates[i].getMonth()) + 1) < 10) {
                date += '0' + (dates[i].getMonth() + 1) + "-";
            } else {
                date += (dates[i].getMonth() + 1) + "-";
            }
            date += dates[i].getFullYear();
            newDateArray.push(date);
        }
        return newDateArray;
    }

    function hoverOverMonth(array) {
        let hover_array = array
        let check_id = document.getElementsByClassName('each_day');
        let range_id = [];
        for (let i = 0; i < check_id.length; i++) {
            range_id.push($('.each_day')[i].id);
        }
        for (let j = 0; j < hover_array.length; j++) {
            range_id.push(hover_array[j]);
        }
        return range_id;
    }

    function unique(arr) {
        var formArr = arr.sort()
        var newArr = [];
        for (let i = 0; i < formArr.length; i++) {
            if (formArr[i] == formArr[i - 1]) {
                newArr.push(formArr[i])
            }
        }
        return newArr
    }

});