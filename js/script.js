$(document).ready(function(){


$("#sideBarBtn").click(function(){
    $(".sideNav").toggle("slow");
});

$("#nope").click(function(){
 
    $("#pictureDisplay").fadeOut("slow");

    // $("pictureDisplay").attr("src","");  SET NEXT PICTURE

    $("#pictureNext").fadeIn("slow");

})

$("#yeah").click(function(){
    //Display detail
    $("#consequenceSection").removeClass("hide");
    $("#consequenceMapSection").removeClass("hide");
    
    
    
})




}); // END of documentReady