$(document).ready(function() {
    $("#infoBtn").on("click", function(){
         $("#info").fadeToggle();
    });
    $("#infoWindowCloseBtn").on("click", function(){
         $("#info").fadeToggle();
    });

    $(document).mouseup(function(e){
    	// if the information div is open, toggle it close
	    var container = $("#info");
	    // if the target of the click isn't the container nor a descendant of the container
	    if (!container.is(e.target) && container.has(e.target).length === 0) 
	    {
	        container.hide();
	    }
		});

		
});		