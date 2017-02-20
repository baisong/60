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
            var monthNum = 0;
            for (var j = 0; j < 13; j++) {
                if (j == 0) monthNum = 1;
                if (j == 4) monthNum = 2;
                if (j == 9) monthNum = 3;
                if (monthNum > 0) {
                    html += '<div class="wrap-month wrap-month-' + monthNum + '">'; 
                }
                console.log(symDate);
                var classes = 'inactive';
                var date = '';
                if (j == (symDate.quarter - 1) && i == (symDate.monthOfQuarter - 1)) {
                    classes = 'active';
                    date = symDate.monthShort;
                }
                html += '<div class="shrouded week-wrap ' + classes + '">' + date + '</div>';
                if (j == 3 || j == 8 || j == 12) {
                    html += '</div>';
                }
                monthNum = 0;
            }
            html += '</div>';
        }
        html += '</div>';
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
