

        var zomatoKey = '988f4fabbfedfc82956b91c89b6ab1ea';
        var input = 'new york'
        var lat;
        var lng;
        var getLocationURL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCWRhElirrFtf5xMrnvVJUmgIIP2NIwXM4';
        var counter = 0;





        // retrieve the current coordinates and calls the GetGEOData function
        function GetGeoLocation(){
            $.ajax({
                url: getLocationURL,
                method: 'POST',
                }).then(function(response){              
                        lat = response.location.lat
                        lng = response.location.lng
                        var queryURLinput = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + lat + '&lon=' + lng;
                        
                        GetGEOData(queryURLinput)
                })
        }

        // Find the city-id based on the coordinates found. Then  calls the GetResauranttData function
        function GetGEOData(url){
            $.ajax({
                'url': url,
                'method': 'GET',
                 "headers": {
                     "user-key": zomatoKey
                    },
                }).then(function(response){              
                       var ID = response.location.city_id
                       
                       
                        QueryURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + ID + '&entity_type=city&count=100&radius=8000'
                        GetRestaurantData(QueryURL)
                      //  console.log(lng)            
                })
        }

        // This function must be used if and when user input the name of the city
        function getCityID(url){
            $.ajax({
                'url': url,
                'method': 'GET',
                 "headers": {
                     "user-key": zomatoKey
                    },
                }).then(function(response){              
                        cityID = parseInt((response.location_suggestions[0].id))
                        console.log(cityID)
                        QueryURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + cityID + '&entity_type=city&count=100&radius=8000'

                        GetRestaurantData(QueryURL)
                })
        }

        // This function retrieve the data of the first 20 restaurant within a radius of 8km
        function GetRestaurantData(url){
            $.ajax({
                'url': url,
                'method': 'GET',
                 "headers": {
                     "user-key": zomatoKey
                    },
                }).then(function(response){
                    $("#pictureDisplay").show();

                    var i = Math.floor(Math.random() * response.restaurants.length);
                    var x = Math.floor(Math.random() * 9);

                    var restPic = response.restaurants[i].restaurant.photos[x].photo.url;

                    $("#pictureNext").attr("src", restPic);
                    console.log(response);
                    
            
                    
                    
                    

                    $("#pictureDisplay").fadeOut("slow");
                    $("#pictureNext").fadeIn("slow");
                    $("#pictureDisplay").attr("src", restPic);
                    

            // if the No button is clicked
                    $(document).ready(function(){
                            $("#nope").unbind().click(function(event){
                                
                                event.preventDefault();
                                
                                
                                counter = counter +20;
                                var limit = response.results_found -20;
                                if(counter > 80 || counter > limit )
                                {
                                    counter = 0;
                                    
                                }
                                
                                url = url + "&start=" + counter;

                                GetRestaurantData(url);
                                
                                
                            
                            });//END of function No Button


                            // if the YES button is clicked
                        $("#yeah").click(function(){
                            //Display detail
                            $("#consequenceSection").removeClass("hide");
                            $("#consequenceMapSection").removeClass("hide");

                            var restName = response.restaurants[i].restaurant.name;
                            var restAddress = response.restaurants[i].restaurant.location.address;
                            var restRating = response.restaurants[i].restaurant.user_rating.aggregate_rating;
                            var cost = response.restaurants[i].restaurant.average_cost_for_two;


                            $("#nameResult").text(restName);
                            $("#AddressResult").text(restAddress);
                            $("#RatingResult").text(restRating);
                            $("#pricesResult").text(cost);


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

GetGeoLocation(getLocationURL);
    








