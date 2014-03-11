var Sixty = Sixty || { 'delay': 1000, 'offset': 0, 'speed': 0 };
Sixty.items = [
  {},{},{},{},{},{},{},{},{},{},{},{},
  {},{},{},{},{},{},{},{},{},{},{},{},
  {},{},{},{},{},{},{},{},{},{},{},{},
  {},{},{},{},{},{},{},{},{},{},{},{},
  {},{},{},{},{},{},{},{},{},{},{},{}
];

(function($){
  /**
   *
   */
  function getCharacter(offset) {
    var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX';
    character = '-';
    if (offset < characters.length) {
      character = characters[offset];
    }
    
    return character;
  }
  
  /**
   *
   */
  function getSyllable(offset) {
    syllable = 'CVN?';
    c = 'pmtlk';
    v = ['y','e','i','a','u','o','yn','on','un','an','in','en'];
    cOffset = Math.floor(offset / 12);
    vOffset = offset % 12;
    if (cOffset < c.length && vOffset < v.length) {
      syllable = c[cOffset] + v[vOffset];
    }
    
    return syllable;
  }
  
  /**
   *
   */
  function goSixtyColorGrid() {
		var numColors = 60;
		var numRows = 5;
		var numCells = Math.floor(numColors / numRows);
		var output = '<table>';
		for (var i = 0; i < numRows; i++) {
		  output += '<tr>';
			for (var j = 0; j < numCells; j++) {
				output += '<td>' + i + j + '</td>';
			}
			output += '</tr>';
	  }
		output += '</table>';
		
		return output;
  }
  
  /**
   *
   */
  function goSixty() {
    console.log('go!');
    var offset = Sixty.offset;
    //var items = Sixty.items[Sixty.offset];
    $('#character').text(getCharacter(offset));
    $('#syllable').text(getSyllable(offset));
    $('#decimal').text(offset);
    Sixty.offset = (Sixty.offset + 1) % Sixty.items.length;
  }
  
  $(document).ready(function(){
    
    // Starts play mode.
    $('#jumbotron-btn').removeClass('btn-disabled').addClass('play');
    $('.action-name').text('Play');
    $('#message-1').html(goSixtyColorGrid());
    // Handles playing.
    $('.action-play').click(function(){
      console.log('Play!');
      Sixty.cycle = setInterval(goSixty, Sixty.delay);
    });
    
    // Handles pausing.
    $('.action-pause').click(function(){
      console.log('Stop!');
      clearInterval(Sixty.cycle);
    });
  });	
})(jQuery);

