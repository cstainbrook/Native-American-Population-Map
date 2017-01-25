var population_max = 0
var population_min = 10000000000

function update_min_max(year) {
    d3.json('http://api.census.gov/data/' + year + '/acs5?get=NAME,B01001C_001E&for=county:*&key=YOUR_KEY_HERE', function(json){
        json.splice(0,1)
        var min_max_extent = d3.extent(json, function(d) {
            return +d[1];
        });
        if (min_max_extent[0] < population_min) { population_min = min_max_extent[0] };
        if (min_max_extent[1] > population_max) { population_max = min_max_extent[1] };
    })
};

function update_for_year() {
    for (i=2009; i<2016; i++) {
        update_min_max(i);
        console.log(i);
    };
};

update_for_year()

d3.json('us_counties.json', draw);
