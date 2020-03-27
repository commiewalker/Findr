

var zomatoKey = '988f4fabbfedfc82956b91c89b6ab1ea';
var input = 'new york'
var lat;
var lng;
var getLocationURL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCWRhElirrFtf5xMrnvVJUmgIIP2NIwXM4';
var counter = 0;
var map;


    // retrieve the current coordinates and calls the GetGEOData function
    function GetGeoLocation() {
        $.ajax({
            url: getLocationURL,
            method: 'POST',
        }).then(function (response) {
            lat = response.location.lat
            lng = response.location.lng
            var queryURLinput = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + lat + '&lon=' + lng;

            GetGEOData(queryURLinput)
        })
    }

    // Find the city-id based on the coordinates found. Then  calls the GetResauranttData function
    function GetGEOData(url) {
        $.ajax({
            'url': url,
            'method': 'GET',
            "headers": {
                "user-key": zomatoKey
            },
        }).then(function (response) {
            var ID = response.location.city_id


            QueryURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + ID + '&entity_type=city&count=100&radius=8000'
            GetRestaurantData(QueryURL)
            //  console.log(lng)            
        })
    }

    // This function must be used if and when user input the name of the city
    function getCityID(url, radius) {
        console.log("url before ajax = " + url);
        $.ajax({
            'url': url,
            'method': 'GET',
            "headers": {
                "user-key": zomatoKey
            },
        }).then(function (response) {
            cityID = parseInt((response.location_suggestions[0].id))
            console.log(cityID)
            QueryURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + cityID + '&entity_type=city&count=100&radius=' + radius;
            console.log("url = " +QueryURL);
            GetRestaurantData(QueryURL)
        })
    }

    // This function retrieve the data of the first 20 restaurant within a radius of 8km
    function GetRestaurantData(url) {
        console.log(url);
        $.ajax({
            'url': url,
            'method': 'GET',
            "headers": {
                "user-key": zomatoKey
            },
        }).then(function (response) {
            $("#pictureDisplay").show();

            var i = Math.floor(Math.random() * response.restaurants.length);
            var x = Math.floor(Math.random() * 9);

            var rest = response.restaurants[i].restaurant;

            var restPic = rest.photos[x].photo.url;

            $("#pictureNext").attr("src", restPic);
            console.log(response);


            $("#pictureDisplay").fadeOut("slow");
            $("#pictureNext").fadeIn("slow");
            $("#pictureDisplay").attr("src", restPic);


            // if the No button is clicked
            $(document).ready(function () {
                $("#nope").unbind().click(function (event) {

                    event.preventDefault();


                    counter = counter + 20;
                    var limit = response.results_found - 20;
                    if (counter > 80 || counter > limit) {
                        counter = 0;

                    }

                    url = url + "&start=" + counter;

                    GetRestaurantData(url);



                });//END of function No Button


                // if the YES button is clicked
                $("#yeah").click(function () {
                    //Display detail
                    $("#patch").remove();
                    $("#consequenceSection").removeClass("hide");
                    $("#consequenceMapSection").removeClass("hide");



                    var restName = rest.name;
                    var restAddress = rest.location.address;
                    var restRating = rest.user_rating.aggregate_rating;
                    var cost = rest.average_cost_for_two;
                    var latRest = parseFloat(rest.location.latitude)
                    var lngRest = parseFloat(rest.location.longitude)
                    var hourRest = rest.timings;

                    console.log(hourRest);

                    
                    console.log(latRest)
                    console.log(lngRest)


                    $("#nameResult").text(restName);
                    $("#AddressResult").text(restAddress);
                    $("#RatingResult").text(restRating);
                    $("#pricesResult").text(cost + "$");
                    $("#hourRest").text(hourRest);


                    var x1 = latRest;
                    var x2 = lat;
                    var y1 = lngRest;
                    var y2 = lng;

                    console.log(x1);
                    console.log(y2);

                    var distance =100 * Math.sqrt( ((x2 - x1) * (x2-x1))  +  ((y2-y1) * (y2- y1)) );
                    distance = distance.toFixed(2);
                    console.log("distance = " +distance);
                    $("#distance").text(distance + " Miles")

                    initMap(latRest, lngRest, restName);




                });//END of function yes Button

            });// END of documentReady



            // RENDER
            // $(document).ready(function(){

            // if button criteria is pressed the settings disappear
            // $("#sideBarBtn").click(function(){
            //     $(".sideNav").toggle("slow");
            // });



        }) //END of THEN


    }  //End of GetRestaurantData function

    function initMap(latV, lngV,name) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latV, lng: lngV },
            zoom: 15
        });
        var marker = new google.maps.Marker({
            position: { lat: latV, lng: lngV },
            map: map,
            title: "FINDR says:"+ name
          });
  
    }

    GetGeoLocation(getLocationURL);


    $("#introBtn").click(function (event) {
        event.preventDefault();
        $(".banner").height("90px");
        $(".middleContainer").removeClass("hide");
        $(".intro").addClass("hide");
        $(".slider").removeClass("hide");
        $(".selection").removeClass("hide");
        $(".criteriaBtn").removeClass("hide");
    });

    $("#sideBarBtn").click(function () {
        $(".searchDropdown").fadeToggle();
    });

    

    $("#submitBtn").click(function(event){
        event.preventDefault();
       var city =  $("#cityName").val();
       var radius = $("#distanceMax").val() * 1000;
       

       if (!city)
       {
        $("#cityName").val("You must pick a city!"); 
       }
       if (!radius)
       {
        $("#distanceMax").val("You must pick a distance!")
       }
       if (radius && city)
       {
        var url = "https://developers.zomato.com/api/v2.1/cities?q=" + city;
        getCityID(url,radius);
       }

       console.log(city +" & "+ radius)

    })

    $("#clearBtn").click(function(){
        $("#cityName").val("");
        $("#distanceMax").val("");
    })

