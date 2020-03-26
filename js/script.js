$(document).ready(function(){


$("#sideBarBtn").click(function(){
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
    $(".results").fadeIn();
    $(".locatePic").fadeIn();
    // $("#consequenceMapSection").removeClass("hide");
    
    
    
})




}); // END of documentReady