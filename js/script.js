$(document).ready(function(){


$("#pickyYDBtn").click(function(){
    $(".searchDropdown").toggle("slow");
});

$("#criteriaBtn").click(function(){
    $(".searchDropdown").toggle("slow");
})

$("#introBtn").click(function(){
    $(".intro").addClass("hide");
    $(".middleContainer").removeClass("hide");
});


$("#nope").click(function(){
 
    $("#pictureDisplay").fadeOut("slow");

    // $("pictureDisplay").attr("src","");  SET NEXT PICTURE

    $("#pictureNext").fadeIn("slow");

});

$("#introBtn").click(function(){
        $(".intro").addClass("hide");
        $(".slider").removeClass("hide");
        $(".selection").removeClass("hide");
        $(".criteriaBtn").removeClass("hide");
});

$("#yeah").click(function(){
    //Display detail
    $(".results").removeClass("hide");
    $(".locatePic").removeClass("hide");
    // $("#consequenceMapSection").removeClass("hide");
    
    
    
})




}); // END of documentReady