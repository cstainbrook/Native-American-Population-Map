function draw(geo_data) {
    d3.select('h1')
        .text('Native American Population');

    var width = 850,
        height = 450;

    var svg = d3.select('.map_holder')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('class', 'map');

    var projection = d3.geo.mercator()
                           .scale(750)
                           .translate([width * 2.02, height * 1.7]);

    var path = d3.geo.path().projection(projection);

    var map = svg.selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('class', 'us_counties')
        .attr('d', path)
        .attr('fill', 'maroon')
        .style('stroke-width', 0.5)
        .on('click', function(d){
            d3.select('h2').remove()
            d3.selectAll('.population_point').remove()
            d3.select('#line_svg').remove()
            d3.select('#county_instruction').remove()

            var line_data = []

            var line_years = [1990, 2000, 2009, 2010, 2011, 2012, 2013, 2014, 2015]

            for (i=0; i<line_years.length; i++) {
                line_data.push({x: line_years[i], y: +d.properties[line_years[i]]})
            }
            debugger;
            var x_scale = d3.scale.linear().range([0,400]).domain([d3.min(line_data, function(d){ return (d['x'] - 5) }), d3.max(line_data, function(d){ return (d['x'] + 5) })])

            var y_scale = d3.scale.linear().range([300,0]).domain([d3.min(line_data, function(d){ return (d['y'] - .1*d['y']) }), d3.max(line_data, function(d){ return (d['y'] + .1*d['y']) })])

            d3.select('.population_line')
              .append('h2')
              .html('Population Over Time:' + '<br/>' + d.properties.NAME + ' County')

            var line_holder = d3.select('.population_line')
                                .append('svg')
                                .attr('width', 350)
                                .attr('height', 350)
                                .attr('id', 'line_svg')

            line_holder.selectAll('circle')
                       .data(line_data)
                       .enter()
                       .append('circle')
                       .attr('class', 'population_point')
                       .attr('cx', function(d) {
                           return x_scale(d['x'])
                       })
                       .attr('cy', function(d) {
                           if (isNaN(y_scale(d['y']))) { return 0; } else{
                           return y_scale(d['y'])
                           }
                       })
                       .attr('r', 3)

            var linefunc = d3.svg.line()
                                 .x(function(d) {
                                     return x_scale(d['x'])
                                 })
                                 .y(function(d) {
                                     return y_scale(d['y'])
                                 })
                                 .interpolate('linear')

            line_holder.append('path')
                       .attr('d', linefunc(line_data))
                       .attr('stroke-width', 2)
                       .attr('stroke', 'black')
                       .attr('fill', 'none')

            var x_axis = d3.svg.axis()
                                .scale(x_scale)
                                .tickSize(5)
                                .tickSubdivide(true)
                                .tickFormat(d3.format("d"))

            var y_axis = d3.svg.axis()
                                .scale(y_scale)
                                .tickSize(5)
                                .orient('left')
                                .tickSubdivide(true)

            line_holder.append('g')
                        .attr('class', 'x_axis')
                        .attr('transform', 'translate(0, 300)')
                        .attr('stroke-width', 2)
                        .call(x_axis)
                        .selectAll("text")
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", "rotate(-65)");

            line_holder.append('g')
                        .attr('class', 'y_axis')
                        .attr('transform', 'translate(50, 0)')
                        .attr('stroke-width', 2)
                        .call(y_axis)
        });

    var population_scale = d3.scale.threshold().domain([1000, 5000, 10000, 50000]).range([.2, .4, .6, .8])

    var legend_data = [0, 1000, 5000, 10000, 50000]
    var legend_labels = ['<1,000', '1,000-5,000', '5,000-10,000', '10,000-50,000', '50,000+']

    var legend = svg.selectAll('g.legend')
                    .data(legend_data)
                    .enter()
                    .append('g')
                    .attr('class', 'legend')

    var ls_w = 20, ls_h = 20;

    legend.append("rect")
            .attr("x", 710)
            .attr("y", function(d, i){ return height - 30 - (i*ls_h) - 2*ls_h;})
            .attr("width", ls_w)
            .attr("height", ls_h)
            .style("fill", 'maroon')
            .style("opacity", function(d, i) {
                return population_scale(d);
            });

    legend.append("text")
            .attr("x", 740)
            .attr("y", function(d, i){ return height - 30 - (i*ls_h) - ls_h - 4;})
            .text(function(d, i){ return legend_labels[i]; });

    function update_colors(pop_data, year) {
        d3.select('h1')
            .text('Native American Population ' + year)

        function merge_json(year) {
            for (var i=0; i<geo_data.features.length; i++) {
                var merge_id = geo_data.features[i].properties.GEOID
                for (var j=0; j<pop_data.length; j++) {
                    if (pop_data[j].GEOID === merge_id) {
                        geo_data.features[i].properties[year] = pop_data[j].population
                    }
                }
            }
        };

        merge_json(year)

        svg.selectAll('path')
            .transition()
            .duration(1500)
            .style('opacity', function(d){
                return population_scale(d.properties[year])
            })
    };

    function get_population(year) {
        if (year === 1990) {
            d3.json('http://api.census.gov/data/' + year + '/sf1?get=ANPSADPI,P0070003&for=county:*&key=', function(json){
                var jsonArr = [];
                json.forEach(function(d,i) {
                    jsonArr.push({
                        GEOID: d[2] + d[3],
                        population: d[1]
                    })
                });
                jsonArr.splice(0,1)
                update_colors(jsonArr, year);
            });
        } else if (year === 2000) {
            d3.json('http://api.census.gov/data/' + year + '/sf1?get=NAME,H011C001&for=county:*&key=', function(json){
                var jsonArr = [];
                json.forEach(function(d,i) {
                    jsonArr.push({
                        GEOID: d[2] + d[3],
                        population: d[1]
                    })
                });
                jsonArr.splice(0,1)
                update_colors(jsonArr, year);
            });
        } else {
            d3.json('http://api.census.gov/data/' + year + '/acs5?get=NAME,B01001C_001E&for=county:*&key=', function(json){
                var jsonArr = [];
                json.forEach(function(d,i) {
                    jsonArr.push({
                        GEOID: d[2] + d[3],
                        population: d[1]
                    })
                });
                jsonArr.splice(0,1)
                update_colors(jsonArr, year);
            });
        }
    };

    var years = [1990, 2000, 2009, 2010, 2011, 2012, 2013, 2014, 2015];

    var year_index = 0

    var year_interval = setInterval(function() {
        get_population(years[year_index]);
        year_index++;
        if(year_index >= years.length) {
            clearInterval(year_interval);

            d3.select('.population_line')
              .append('h2')
              .attr('id', 'county_instruction')
              .html('Click on a County to' + '</br>' + 'View County Specific' + '</br>' + 'Population Over Time' + '</br></br>' + 'or Click on a Year to' + '</br>' + 'View the Map for' + '</br>' + 'that Given Year')

            var buttons = d3.select('body')
                .append('div')
                .attr('class', 'years_buttons')
                .selectAll('div')
                .data(years)
                .enter()
                .append('div')
                .text(function(d) {
                    return d;
                });

            buttons.on('click', function(d) {
                d3.selectAll('.years_buttons')
                  .selectAll('div')
                  .style('background-color', 'BurlyWood')
                  .style('color', 'black');

                d3.select(this)
                  .transition()
                  .duration(500)
                  .style('background-color', 'Maroon')
                  .style('color', 'white');

                get_population(d)
            });
        }
    }, 2000)
};
