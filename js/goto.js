$(document).ready(function() {
  
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
  function insertThingIntoUrl(thing, url) {
    return url.replace('[thing]', encodeURIComponent(thing));
  }
  
  function goto(url) {
    window.location.replace(url); 
  }
  
  function getUrlFromType(type) {
    var urls = {
      country: 'https://maps.google.com/?q=[thing]',
      // country news: https://www.google.com/#q=[thing]&tbm=nws&tbs=qdr:w
      // encoded: https%3A%2F%2Fwww.google.com%2F%23q%3D%5Bthing%5D%26tbm%3Dnws%26tbs%3Dqdr%3Aw
      person: 'http://en.wikipedia.org/wiki/[thing]',
      chord: 'http://www.google.com/#q=site:pianochord.com+[thing]&btnI=I'
    };
    if (urls.hasOwnProperty(type)) {
      return urls[type];
    }
    return 'http://baisong.github.io/bigtext?title=[thing]&subtitle=(' + type + ')';
  }
  
  var o = getParameterByName('o');
  if (!o.length) {
    var today = new Date();
    var date = today.getDate();
    var sixtyEpoch = new Date("December 27, 2014 00:00:00 GMT-08:00");
    function getSixtyWeekday(date) {
        return Math.floor(parseInt(today.getTime() - sixtyEpoch.getTime()) / (1000* 60 * 60 * 24)) % 60;
    }
    o = (getSixtyWeekday(date)).toString();
  }
  var type = getParameterByName('t');
  var url = getParameterByName('u');
  if (o.length && type.length) {
    if (!url.length) {
      url = getUrlFromType(type);
    }
    if (url.length) {
      if (typeof url === "function") {
        goto(url(o, type));
      }
      else {
        goto(insertThingIntoUrl(Sixty.get(o, type), url));
      }
    }
    else {
      console.log('Could not find URL for type');
    }
  }
  else {
    console.log('empty params.');
  }
});
