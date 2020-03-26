var zomatoKey = '988f4fabbfedfc82956b91c89b6ab1ea';
        var input = 'new york'
        var lat;
        var lng;
        var getLocationURL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCWRhElirrFtf5xMrnvVJUmgIIP2NIwXM4'   
        
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
                        console.log(queryURLinput)
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
                       console.log(ID)
                       console.log(response);
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
                      
                    var i = Math.floor(Math.random() * response.restaurants.length) 
                    console.log(i);
                    // console.log(response.restaurants.length)
                    var numberOfRestaurant = response.results_found;
                    console.log("number of restaurants: " + numberOfRestaurant)
                    var restPic = response.restaurants[i].restaurant.photos[3].photo.url
                    
                    var restName = response.restaurants[0].restaurant.name
                    var restAddress = response.restaurants[0].restaurant.location.address
                    
                    // RENDER
                    $(document).ready(function(){
                        // if button criteria is pressed the settings disappear
                        $("#sideBarBtn").click(function(){
                            $(".sideNav").toggle("slow");
                        });



                        console.log("before: " +counter);
                        counter = counter +20;
                        var limit = response.results_found -20;
                        console.log("limit: " + limit);
                        if(counter > 79 || counter > limit )
                        {
                            counter = 0;
                            console.log("during: " +counter);
                        }
                        console.log("after: " +counter);

                        // if the No button is clicked
                        $("#nope").click(function(){
                            // $("#pictureDisplay").fadeOut("slow");
                            $("#pictureDisplay").attr("src", restPic);
                            
                            
                            
                            url = url + "&start=" + counter;
                            console.log(url)
                            GetRestaurantData(url)
                            
                            
                            // $("pictureDisplay").attr("src","");  SET NEXT PICTURE
                        
                            // $("#pictureNext").fadeIn("slow");
                        
                        })
                        // if the YES button is clicked
                        $("#yeah").click(function(){
                            //Display detail
                            $("#consequenceSection").removeClass("hide");
                            $("#consequenceMapSection").removeClass("hide");
                            
                            
                            
                        })
                        
                        }); 
                        // END of documentReady
                        
                })
                
        }
            GetGeoLocation(getLocationURL)  
           //getCityID(QueryURLinput)