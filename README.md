# FINDR App

# Description

FINDR is an application that simply and randomly displays an image from a restaurant in a card that can be cycled through until an appealing option is picked. Once the top choice is chosen, the restaurant information will be shown to get a user to their food as fast as possible.

User Story: 
* As a hungry person who can’t decide where to get food
*I want to be able to use an application that can quickly show me an restaurant option in a given area, either by my current location or a city/radius that I choose
* So that I can choose the option that looks the best and get the information I need to place go dine-in or takeout 

In order to build this app, we used CSS, HTML on the front end and Javascript, jQuery, and two APIs to load restaurant data and mapping information:

* Zomato API:  Restaurant information such as location, rating, average price
* Google Maps API: Allows for mapping so that user can easily get directions to the POI chosen

# Testing:

When you first open the website you will be prompted with instructions on howto use the app. Hit the Let's Eat button, and the main website should load. Next, You will be presented with a slider with your first random restaurant image. Depending on your choice, you can either press the red thumbs-down button or the green thumbs-up button. The respective expected behavior is that a new option will load, or the restaurant information including map location will appear below the slider.

The user can also add criteria for the city they'd like to search from and the radius of their search area. To do this, click the Filter Your Options button to present the drop-down menu. Next, add your two sets of criteria and the slider will update after confirmation.

