var Sixty = Sixty || {};
Sixty._def = function(param, default_value) {
    return (typeof param !== 'undefined') ? param : default_value;
}
Sixty._sixty = function() {
    var i = 0;
    var result = [];
    while (i < 60) {
        result.push(i);
        i++;
    }
    return result;
}
Sixty._each = function(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}
Sixty._map = function(func) {
    var xs = Sixty._sixty();
    var result = [];
    Sixty._each(xs, function(element) {
        result.push(func(element));
    });
    return result;
}
Sixty.character = function() {
    return '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX';
}
Sixty._hex = function(offset) {
    var ret = '';
    var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 1; i > -1; i--) {
        var d = Math.pow(16, i);
        if (offset >= d) {
            var times = Math.floor(offset / d);
            console.log('times: ' + times);
            var multiple = (times * d);
            console.log('mult: ' + multiple)
            offset = offset - multiple;
            ret = ret + digits[times];
        } else {
            ret = ret + '0';
        }
    }

    return ret;
}
Sixty.hex = function() {
    return Sixty._map(Sixty._hex);
}
Sixty.decimal = function() {
    return Sixty._sixty();
}
Sixty._binary = function(offset) {
    var ret = '';
    for (var i = 7; i > -1; i--) {
        var d = Math.pow(2, i);
        if (offset >= d) {
            offset = offset - d;
            ret = ret + '1';
        } else {
            ret = ret + '0';
        }
        if (i == 4) {
            ret = ret + ' ';
        }
    }

    return ret;
}
Sixty.binary = function() {
    return Sixty._map(Sixty._binary);
}
Sixty._syllable = function(offset) {
    syllable = 'CVN?';
    c = 'pmtlk';
    v = ['y', 'e', 'i', 'a', 'u', 'o', 'yn', 'on', 'un', 'an', 'in', 'en'];
    cOffset = Math.floor(offset / 12);
    vOffset = offset % 12;
    if (cOffset < c.length && vOffset < v.length) {
        syllable = c[cOffset] + v[vOffset];
    }

    return syllable;
}
Sixty.syllable = function() {
    return Sixty._map(Sixty._syllable);
}
Sixty._hue = function(offset) {
    var step = 1.0000 / 60;
    var hue = offset * step;
    var rgb = hsvToRgb(hue, 1, 1);
    var color = 'rgb(' + rgb.join(',') + ')';

    return color;
}
Sixty.hue = function() {
    return Sixty._map(Sixty._hue);
}
Sixty.country = function() {
    return [
        'China',
        'India',
        'United States',
        'Indonesia',
        'Brazil',
        'Pakistan',
        'Nigeria',
        'Bangladesh',
        'Russia',
        'Japan',
        'Mexico',
        'Philippines',
        'Vietnam',
        'Ethiopia',
        'Egypt',
        'Germany',
        'Iran',
        'Turkey',
        'Democratic Republic of the Congo',
        'Thailand',
        'France',
        'United Kingdom',
        'Italy',
        'Burma',
        'South Africa',
        'South Korea',
        'Colombia',
        'Spain',
        'Ukraine',
        'Tanzania',
        'Kenya',
        'Argentina',
        'Algeria',
        'Poland',
        'Sudan',
        'Uganda',
        'Canada',
        'Iraq',
        'Morocco',
        'Peru',
        'Uzbekistan',
        'Saudi Arabia',
        'Malaysia',
        'Venezuela',
        'Nepal',
        'Afghanistan',
        'Yemen',
        'North Korea',
        'Ghana',
        'Mozambique',
        'Taiwan',
        'Australia',
        'Ivory Coast',
        'Syria',
        'Madagascar',
        'Angola',
        'Cameroon',
        'Sri Lanka',
        'Romania',
        'Burkina Faso'
    ];
}
Sixty.tokipona = function() {
  return ["e,li","a,o","sona,toki","ike,pona","mi,sina","la,pi","ni,ona","jan,soweli",
    "kama,tawa","ala,ali","ken,wile","ma,tenpo","anu,en","mute,nanpa","lon,sin",
    "lili,suli","tu,wan","lawa,pilin","ijo,kulupu","seme,tan","nasin,tomo",
    "lape,pali","moku,pan","kalama,kute","jo,noka","lukin,uta","ante,sama",
    "luka,poka","kon,telo","meli,mije","ilo,kepeken","mama,pana","kiwen,ko",
    "mu,nimi","nasa,wawa","kili,unpa","lipu,sitelen","olin,utala","open,pini",
    "moli,pakala","lupa,nena","pu,taso","mun,suno","awen,weka","kasi,laso",
    "pimeja,walo","anpa,sewi","alasa,musi","jelo,loje","kule,sijelo","insa,selo",
    "linja,sike","len,poki","kala,waso","monsi,sinpin","palisa,supa","lete,seli",
    "jaki,suwi","akesi,pipi","esun,mani"];
}
Sixty.chord = function() {
    var keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    var names = [' major', ' major 7th', '7', ' minor 7th', 'm6'];
    var ret = [];
    for (var i = 0; i < 60; i++) {
        var n = Math.floor(i / 12);
        var k = i % 12;
        ret.push(keys[k] + names[n]);
    }
    return ret;
}
Sixty.name = function() {
    return [];
}

Sixty.get = function(i, type) {
    var i = (parseInt(Sixty._def(i, 0))) % 60;
    var type = Sixty._def(type, 'character');
    if (typeof Sixty[type] === 'function') {
        var items = Sixty[type]();
        if (typeof items[i] !== 'undefined') {
            return items[i];
        }
    }

    return false;
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 *
 * @see https://gist.github.com/mjijackson/5311256
 */
function hsvToRgb(h, s, v) {
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
