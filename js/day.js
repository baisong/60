$(document).ready(function() {
    var getThings = function() {
        var things = [];
        // Weekday diagram
        var today = new Date();
        var s454 = today.toSymmetry454();
        var yearnum = s454[0];
        var monthnum = s454[1]
        var weeks_in_month = ((s454 % 3) == 2) ? 5 : 4;
        var weeknum = s454[2];
        var daynum = s454[3];
        var weekday = (today.getDay() + 6) % 7;
        var html = '<table class="week"><tr>';
        for (var h = 0; h < weeks_in_month; h++) {
        for (var i = 0; i < 7; i++) {
            if (i == weekday && ((h + 1) == weeknum)) {
                html += '<td class="day active"></td>';
            }
            else {
                html += '<td class="day"></td>';
            }
            if (i == 6) {
            	html += '</tr><tr>'
            }
        }
        }
        html += '</td></tr></table>'
        things.push(html);
        // Day of the week
        var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        things.push(html + '<br/>' + weekdays[weekday]);
        things.push(html + '<br/>' + weekdays[weekday] + "<br/>" + today.toSymmetry454String());
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
        things.push(html + '<br/>' + weekdays[weekday] + "<br/>" + months[month] + " " + date + nth(date) + ", " + year);
        // TODO Season diagram
        // Short weekdate notation
        // Long weekdate notation
        // Char
        var sixtyEpoch = new Date("December 27, 2014 00:00:00");
        function getSixtyWeekday(date) {
            return Math.floor(parseInt(today.getTime() - sixtyEpoch.getTime()) / (1000* 60 * 60 * 24)) % 60;
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

        var rows = Sixty._get(sixtyWeekday)
        things.push(rows);
        rows += "<br/>" + Sixty._get(sixtyWeekday, 'syllable');
        things.push(rows);
        // @TODO chinese full number name
        rows += "<br/>" + sixtyWeekday;
        things.push(rows);
        rows += Sixty.get(sixtyWeekday, 'binary');
        things.push(rows);
        rows += "<br/>" + Sixty.get(sixtyWeekday, 'hex');
        things.push(rows);
        var ord = '';
        if (sixtyWeekday > 0) {
        	ord = (sixtyWeekday + 1) + nth(sixtyWeekday + 1);
        }
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
    }
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
    }
    
    $("#message").html("ready");
    $('body').keyup(proceed);
    $('body').on('tap', proceed2) {
    }
});
