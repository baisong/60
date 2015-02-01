$(document).ready(function() {
  
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
  function insertThingIntoUrl(thing, url) {
    return url.replace('[thing]', thing);
  }
  
  function goto(url) {
    window.location.replace(url); 
  }
  
  function pianoChordCom(chordname) {
    return 'http://www.pianochord.com/C-minor/variation/C-minor-6th'
  }
  
  function getUrlFromType(type) {
    var urls = {
      country: 'https://maps.google.com/?q=[thing]',
      person: 'http://en.wikipedia.org/wiki/[thing]',
      chord: 'http://www.google.com/#q=site:pianochord.com+[thing]&btnI=I'
    };
    if (urls.hasOwnProperty(type)) {
      return urls[type];
    }
    return false;
  }
  
  var o = getParameterByName('o');
  var type = getParameterByName('t');
  var url = getParameterByUrl('u');
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
