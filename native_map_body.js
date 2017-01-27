var population_max = 0
var population_min = 10000000000

function update_min_max(year) {
    if (year === 1990) {
        d3.json('http://api.census.gov/data/' + year + '/sf1?get=ANPSADPI,P0070003&for=county:*&key=', function(json){
            json.splice(0,1)
            var min_max_extent = d3.extent(json, function(d) {
                return +d[1];
            });
            if (min_max_extent[0] < population_min) { population_min = min_max_extent[0] };
            if (min_max_extent[1] > population_max) { population_max = min_max_extent[1] };
        })
    } else if (year === 2000) {
        d3.json('http://api.census.gov/data/' + year + '/sf1?get=NAME,H011C001&for=county:*&key=', function(json){
            json.splice(0,1)
            var min_max_extent = d3.extent(json, function(d) {
                return +d[1];
            });
            if (min_max_extent[0] < population_min) { population_min = min_max_extent[0] };
            if (min_max_extent[1] > population_max) { population_max = min_max_extent[1] };
        })
    } else {
        d3.json('http://api.census.gov/data/' + year + '/acs5?get=NAME,B01001C_001E&for=county:*&key=', function(json){
            json.splice(0,1)
            var min_max_extent = d3.extent(json, function(d) {
                return +d[1];
            });
            if (min_max_extent[0] < population_min) { population_min = min_max_extent[0] };
            if (min_max_extent[1] > population_max) { population_max = min_max_extent[1] };
        })
    }
};

function update_for_year() {
    var year_list = [1990, 2000, 2009, 2010, 2011, 2012, 2013, 2014, 2015]
    for (i=0; i<year_list.length; i++) {
        update_min_max(year_list[i]);
        console.log(year_list[i]);
    };
};

update_for_year()

d3.json('us_counties.json', draw);
