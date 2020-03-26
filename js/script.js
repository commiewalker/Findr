$(document).ready(function(){


$("#pickyYDBtn").click(function(){
    $(".searchDropdown").toggle("slow");
});

$("#criteriaBtn").click(function(){
    $(".secondDropdown").toggle("slow");
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


$("#yeah").click(function(){
    //Display detail
    $("#consequenceSection").removeClass("hide");
    $("#consequenceMapSection").removeClass("hide");
       
    
})




}); // END of documentReady