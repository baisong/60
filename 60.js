var Sixty = Sixty || { 'delay': 1000, 'offset': 0, 'speed': 0 };
Sixty.items = [
  {
    char: '0',
    syllable: 'py',
    decimal: '0'
  },
  {
    char: '1',
    syllable: 'pe',
    decimal: '1'
  },
  {
    char: '2',
    syllable: 'pi',
    decimal: '2'
  },
  {
    char: '3',
    syllable: 'pa',
    decimal: '3'
  },
];

(function($){
  function goSixty() {
    console.log('go!');
    var item = Sixty.items[Sixty.offset];
    $('#character').text(item.char);
    $('#syllable').text(item.syllable);
    $('#decimal').text(item.decimal);
    Sixty.offset = (Sixty.offset + 1) % Sixty.items.length;
  }
  
  $(document).ready(function(){
    
    // Starts play mode.
    $('#jumbotron-btn').removeClass('btn-disabled').addClass('play');
    $('.action-name').text('Play');
    
    // Handles pausing and playing.
    $('.action-play').click(function(){
      console.log('Play!');
      setInterval(goSixty, Sixty.delay);
    });
    
  });	
})(jQuery);
