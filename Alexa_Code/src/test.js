/**
 * Created by mananhora on 2/18/17.
 */


var yelpTest = require('./yelpTest.js');
var cities;
var returnedData = yelpTest.yelpSearchByCity("Food", "New York").then(function(data){
    console.log(data.businesses);
});



//     .then(function (data) {
//     console.log(data.businesses[0].name);
//     return data;
//
// })
// .catch(function (err) {
//     console.error(err);
// });
