/**
 * Created by mananhora on 2/18/17.
 */

const Yelp = require('yelp');

var yelp = new Yelp({
    consumer_key: '834QJTTdnDY1uYtzMpBrmw',
    consumer_secret: 'Pn6OEdnN8vDWwhyKdLQZ2xbEDOA',
    token: 'p7pX7Fm_DU-05kHxfcQlufLatN6zVLB1',
    token_secret: '-MEEgbv3CDxWJZvUOQUKZnnYT2E',
});

function yelpSearchByMyLocation(categories, lattitude, longitude){
    var sortMode = 0;
    var cll = lattitude, longitude;

    yelp.search({ term: 'food', location:"New York", limit:5, sort: sortMode, cll:cll})
        .then(function (data) {
            var businesses = data.businesses;

            for(var i = 0; i<businesses.length; i++){

                console.log(data.businesses[i].location.coordinate);
            }

        })
        .catch(function (err) {
            console.error(err);
        });
}

exports.yelpSearchByCity = function (categories, city){
    var sortMode = 0;

    return yelp.search({ term: 'food', location: city, limit:5, sort: sortMode});
};


//yelpSearchByCity("Food", "New York");


// yelpSearchByMyLocation("Food", 51.5074, 0.1278);
