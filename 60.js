(function($){
  $(document).ready(function(){
    
    // Starts play mode.
    $('#jumbotron-btn').removeClass('btn-disabled').addClass('play');
    $('.action-name').text('Play');
    
    // Handles pausing and playing.
    $('.action-play').click(function(){
      console.log('Play!');
    });
    
  });	
})(jQuery);
