/** FIXME move to symmetrical.js */
getWeekdayShort = function(num) {
    var letters = '_MTWHFAS';
    return letters[num];
}

$(document).ready(function() {
    var getThings = function() {
        var things = [];
        // Weekday diagram
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var symDate = symmetrical.convert(today, 'object');
        var html = '<div class="wrap-year">';
        for (var i = 0; i < 4; i++) {
            var classes = 'inactive';
            if (i == (symDate.quarter - 1)) {
                classes = 'active';
            }
            html += '<div class="wrap-quarter ' + classes + '">';
            for (var j = 0; j < 14; j++) {
                var classes = 'inactive';
                var date = '';
                if (j == (symDate.quarter - 1) && i == (symDate.monthOfQuarter - 1)) {
                    classes = 'active';
                    date = symDate.monthShort;
                }
                html += '<div class="shrouded week-wrap ' + classes + '">' + date + '</div>';
            }
            html += '</div>';
        }
        html += '</div>';
        // Build small 12-month grid
        /*
        var yearmonths = '<table class="yearmonths">';
        for (var i = 0; i < 3; i++) {
            yearmonths += '<tr>';
            for (var j = 0; j < 4; j++) {
                var classes = name = '';
                if (j == (symDate.quarter - 1) && i == (symDate.monthOfQuarter - 1)) {
                    classes = 'active';
                    name = symDate.monthShort;
                }
                yearmonths += '<td class="shrouded ' + classes + '">' + name + '</td>';
            }
            yearmonths += '</tr>';
        }
        yearmonths += '</table>';
        */
        
        // Build full month grid
        /*
        var html = yearmonths + '<table class="calendar"><tr>';
        for (var h = 0; h < (symDate.daysInMonth / 7); h++) {
            for (var i = 1; i <= 7; i++) {
                if (i == symDate.dayOfWeek && ((h + 1) == symDate.weekOfMonth)) {
                    var weekdayShort = getWeekdayShort(symDate.dayOfWeek);
                    var dayname = symDate.weekOfMonth + symDate.weekOfMonthSuffix + ' ' + symDate.dayOfWeekShort;
                    var text = '<h3>' + symDate.weekOfMonth + weekdayShort + '</h3><p>' + dayname + '</p>';
                    html += '<td class="day day-' + i + ' shrouded active">' + text + '</td>';
                } else {
                    html += '<td class="day day-' + i + '"><h3>&nbsp</h3><p>&nbsp</p></td>';
                }
                if (i == 7) {
                    html += '</tr><tr>'
                }
            }
        }
        html += '</td></tr></table>'
        */
        things.push(html);
        // Day of the week
        html = html.replace(/shrouded/g, 'exposed');
        things.push(html);
        // DOW + Date
        var month = today.getMonth();
        var year = today.getFullYear();

        function nth(d) {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        }
        var date = today.getDate();
        var months = ["January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December"
        ];
        things.push(html + '<br/>' + symDate.dayOfWeekLong + ", " + months[month] + " " + date + nth(date) + ", " + year);
        // TODO Season diagram
        // Short weekdate notation
        // Long weekdate notation
        // Char
        var sixtyEpoch = new Date("December 27, 2014 00:00:00");

        function getSixtyWeekday(date) {
            return Math.floor(parseInt(today.getTime() - sixtyEpoch.getTime()) / (1000 * 60 * 60 * 24)) % 60;
        }
        var sixtyWeekday = getSixtyWeekday(date);
        /* test -- should be 1
        var today = new Date('December 28, 2014 00:00:00');
        console.log(today);
        console.log(sixtyWeekday(today));
        // test -- should be 0
        var today = new Date('February 25, 2015 00:00:00');
        console.log(today);
        console.log(sixtyWeekday(today));
        // test -- should be 59
        var today = new Date('April 25, 2015 00:00:00');
        console.log(today);
        console.log(sixtyWeekday(today)); */
        document.title = sixtyWeekday;
        var rows = Sixty.get(sixtyWeekday)
        things.push(rows);
        var table = getTableForOffset(sixtyWeekday, rows);
        rows += table;
        things.push(rows);
        rows += "<br/>" + Sixty.get(sixtyWeekday, 'syllable');
        things.push(rows);
        // @TODO chinese full number name
        rows += "<br/>" + sixtyWeekday;
        things.push(rows);
        rows += "<br/>" + Sixty.get(sixtyWeekday, 'binary');
        things.push(rows);
        rows += "<br/>" + Sixty.get(sixtyWeekday, 'hex');
        things.push(rows);
        var ord = '';
        if (sixtyWeekday > 0) {
            ord = (sixtyWeekday + 1) + nth(sixtyWeekday + 1);
        }
        things.push('toki pona: ' + Sixty.get(sixtyWeekday, 'tokipona'));
        things.push(ord + " largest country?");
        var country = Sixty.get(sixtyWeekday, 'country');
        things.push(ord + " largest country:<br/>" + country);
        $('#message').data('country', country);

        return things;
    }
    var proceed = function(e) {
        if (e.keyCode == 32) {
            var things = getThings();
            var $m = $('#message');
            var offset = parseInt($m.data('offset')) + 1;
            if ((offset < things.length) && (things[offset].length > 0)) {
                $m.html(things[offset]);
                $m.data('offset', offset);
            } else {
                var c = $m.data('country');
                var url = 'https://www.google.com/webhp#q=' + c + '&hl=en&gl=us&qscrl=1&tbm=nws&tbs=qdr:d';
                window.location.replace(url);
                $m.text('all set!');
            }
        }
    };
    var proceed2 = function() {
        var things = getThings();
        var $m = $('#message');
        var offset = parseInt($m.data('offset')) + 1;
        if ((offset < things.length) && (things[offset].length > 0)) {
            $m.html(things[offset]);
            $m.data('offset', offset);
        } else {
            var c = $m.data('country');
            var url = 'https://www.google.com/webhp#q=' + c + '&hl=en&gl=us&qscrl=1&tbm=nws&tbs=qdr:d';
            window.location.replace(url);
            $m.text('all set!');
        }
    };
    var getTableForOffset = function(offset, char) {
        var output = '<table class="grid-60">';
        var rowLength = 12;
        for (var i = 0; i < 60; i++) {
            var thisChar = '';
            if (i == offset) {
                thisChar = char;
            }
            if (i % rowLength == 0) {
                output += '<tr>';
            }
            output += '<td>' + thisChar + '</td>';
            if (i % rowLength == 11) {
                output += '</tr>'
            }
        }
        output += '</table>';
        return output;
    };

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var sixtyEpoch = new Date("December 27, 2014 00:00:00");

    function getSixtyWeekday(date) {
        return Math.floor(parseInt(date.getTime() - sixtyEpoch.getTime()) / (1000 * 60 * 60 * 24)) % 60;
    }
    var sixtyWeekday = getSixtyWeekday(today);
    document.title = sixtyWeekday;
    $("#message").html("ready");
    $('body').keyup(proceed);
    $('body').on('tap', proceed2);
});
