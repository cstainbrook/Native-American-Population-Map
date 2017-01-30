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

    function plot_education(d, line_data, label) {
        d3.select('h2').remove()
        d3.selectAll('.population_point').remove()
        d3.select('#line_svg').remove()
        d3.select('#county_instruction').remove()

        x_domain = [1000000, 0]

        for (i=0; i<line_data.length; i++) {
            var current_line = line_data[i].values
            for (i=0; i<current_line.length; i++) {
                if (current_line[i]['x'] < x_domain[0]) {
                    x_domain[0] = current_line[i]['x']
                }
                if (current_line[i]['x'] > x_domain[1]) {
                    x_domain[1] = current_line[i]['x']
                }
            }
        };

        x_domain = [x_domain[0]-1, x_domain[1]+1]

        var x_scale = d3.scale.linear().range([0,400]).domain(x_domain)

        y_domain = [0, 0]

        for (i=0; i<line_data.length; i++) {
            var current_line = line_data[i].values
            y_domain[1] += d3.max(current_line, function(d) {return d['y']})
        };

        y_domain = [y_domain[0]*1.1, y_domain[1]*1.1]
        debugger;
        var y_scale = d3.scale.linear().range([300,0]).domain(y_domain)

        var color = d3.scale.ordinal()
            .range([.2, .4, .6, .8]).domain(['No Highschool', 'Highschool', 'Some College', 'College or Higher'])

        d3.select('.population_line')
          .append('h2')
          .html(label + ' Over Time:' + '<br/>' + d.properties.NAME + ' County')

        var line_holder = d3.select('.population_line')
                            .append('svg')
                            .attr('width', 350)
                            .attr('height', 350)
                            .attr('id', 'line_svg')

        var stack = d3.layout.stack()
                      .values(function(d) {return d.values;})
                      .x(function(d) {return d['x'];})
                      .y(function(d) {return d['y'];});

        var area = d3.svg.area()
                         .interpolate("cardinal")
                         .x(function(d) { return x_scale(d.x); })
                         .y0(function(d) { return y_scale(d.y0); })
                         .y1(function(d) { return y_scale(d.y0 + d.y); });

        stack(line_data);

        line_holder.selectAll('path')
                   .data(line_data)
                   .enter()
                   .append('path')
                   .attr('d', function(d) { return area(d.values); })
                   .attr('fill', 'maroon')
                   .attr('opacity', function(d) {return color(d.level)})
                   .append('title')
                   .text(function(d) { return d.level; });

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
    };

    function plot_poverty(d, line_data, label) {
        d3.select('h2').remove()
        d3.selectAll('.population_point').remove()
        d3.select('#line_svg').remove()
        d3.select('#county_instruction').remove()

        x_domain = [1000000, 0]

        for (i=0; i<line_data.length; i++) {
            var current_line = line_data[i].values
            for (i=0; i<current_line.length; i++) {
                if (current_line[i]['x'] < x_domain[0]) {
                    x_domain[0] = current_line[i]['x']
                }
                if (current_line[i]['x'] > x_domain[1]) {
                    x_domain[1] = current_line[i]['x']
                }
            }
        };

        x_domain = [x_domain[0]-1, x_domain[1]+1]

        var x_scale = d3.scale.linear().range([0,400]).domain(x_domain)

        y_domain = [0, 0]

        for (i=0; i<line_data.length; i++) {
            var current_line = line_data[i].values
            y_domain[1] += d3.max(current_line, function(d) {return d['y']})
        };

        y_domain = [y_domain[0]*1.1, y_domain[1]*1.1]
        debugger;
        var y_scale = d3.scale.linear().range([300,0]).domain(y_domain)

        var color = d3.scale.ordinal()
            .range([.8, .2]).domain(['Population in Poverty', 'Population Above Poverty'])

        d3.select('.population_line')
          .append('h2')
          .html(label + ' Over Time:' + '<br/>' + d.properties.NAME + ' County')

        var line_holder = d3.select('.population_line')
                            .append('svg')
                            .attr('width', 350)
                            .attr('height', 350)
                            .attr('id', 'line_svg')

        var stack = d3.layout.stack()
                      .values(function(d) {return d.values;})
                      .x(function(d) {return d['x'];})
                      .y(function(d) {return d['y'];});

        var area = d3.svg.area()
                         .interpolate("cardinal")
                         .x(function(d) { return x_scale(d.x); })
                         .y0(function(d) { return y_scale(d.y0); })
                         .y1(function(d) { return y_scale(d.y0 + d.y); });

        stack(line_data);

        line_holder.selectAll('path')
                   .data(line_data)
                   .enter()
                   .append('path')
                   .attr('d', function(d) { return area(d.values); })
                   .attr('fill', 'maroon')
                   .attr('opacity', function(d) {return color(d.level)})
                   .append('title')
                   .text(function(d) { return d.level; });

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
    };

    function update_line_plot(d, line_data, label) {
        d3.select('h2').remove()
        d3.selectAll('.population_point').remove()
        d3.select('#line_svg').remove()
        d3.select('#county_instruction').remove()

        var x_scale = d3.scale.linear().range([0,400]).domain([d3.min(line_data, function(d){ return (d['x'] - 5) }), d3.max(line_data, function(d){ return (d['x'] + 5) })])

        var y_scale = d3.scale.linear().range([300,0]).domain([d3.min(line_data, function(d){ return (d['y'] - .1*d['y']) }), d3.max(line_data, function(d){ return (d['y'] + .1*d['y']) })])

        d3.select('.population_line')
          .append('h2')
          .html(label + ' Over Time:' + '<br/>' + d.properties.NAME + ' County')

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
                       return y_scale(d['y'])
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
    };

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

            var population_line_data = []
            var male_age = []
            var female_age = []
            var female_education = [
                {
                    'level': 'No Highschool',
                    'values': []
                },
                {
                    'level': 'Highschool',
                    'values': []
                },
                {
                    'level': 'Some College',
                    'values': []
                },
                {
                    'level': 'College or Higher',
                    'values': []
                },
            ]

            var male_education = [
                {
                    'level': 'No Highschool',
                    'values': []
                },
                {
                    'level': 'Highschool',
                    'values': []
                },
                {
                    'level': 'Some College',
                    'values': []
                },
                {
                    'level': 'College or Higher',
                    'values': []
                },
            ]
            var poverty_level = [
                {
                    'level': 'Population in Poverty',
                    'values': []
                },
                {
                    'level': 'Population Above Poverty',
                    'values': []
                }
            ]

            var line_years = [1990, 2000, 2009, 2010, 2011, 2012, 2013, 2014, 2015]

            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i]] !== 'undefined') {
                    population_line_data.push({x: line_years[i], y: +d.properties[line_years[i]]})
                  }
            }

            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Male Median Age'] !== 'undefined') {
                    male_age.push({x: line_years[i], y: +d.properties[line_years[i] + ': Male Median Age']})
                  }
            }

            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Female Median Age'] !== 'undefined') {
                    female_age.push({x: line_years[i], y: +d.properties[line_years[i] + ': Female Median Age']})
                  }
            }

            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Female Less than High School'] !== 'undefined') {
                    female_education[0].values.push({x: line_years[i], y: +d.properties[line_years[i] + ': Female Less than High School']})
                }
            }

            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Female High School'] !== 'undefined') {
                    female_education[1].values.push({x: line_years[i], y: +d.properties[line_years[i] + ': Female High School']})
                }
            }
            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Female Some College'] !== 'undefined') {
                    female_education[2].values.push({x: line_years[i], y: +d.properties[line_years[i] + ': Female Some College']})
                }
            }
            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Female College or Higher'] !== 'undefined') {
                    female_education[3].values.push({x: line_years[i], y: +d.properties[line_years[i] + ': Female College or Higher']})
                }
            }

            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Male Less than High School'] !== 'undefined') {
                    male_education[0].values.push({x: line_years[i], y: +d.properties[line_years[i] + ': Male Less than High School']})
                }
            }

            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Male High School'] !== 'undefined') {
                    male_education[1].values.push({x: line_years[i], y: +d.properties[line_years[i] + ': Male High School']})
                }
            }
            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Male Some College'] !== 'undefined') {
                    male_education[2].values.push({x: line_years[i], y: +d.properties[line_years[i] + ': Male Some College']})
                }
            }
            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Male College or Higher'] !== 'undefined') {
                    male_education[3].values.push({x: line_years[i], y: +d.properties[line_years[i] + ': Male College or Higher']})
                }
            }
            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Population in Poverty'] !== 'undefined') {
                    poverty_level[0].values.push({x: line_years[i], y: +d.properties[line_years[i] + ': Population in Poverty']})
                }
            }
            for (i=0; i<line_years.length; i++) {
                if(typeof d.properties[line_years[i] + ': Population Above Poverty'] !== 'undefined') {
                    poverty_level[1].values.push({x: line_years[i], y: +d.properties[line_years[i] + ': Population Above Poverty']})
                }
            }

            update_line_plot(d, population_line_data, 'Population')

            var county_options = ['Population', 'Male Age', 'Female Age']
            var county_options2 = ['Male Education', 'Female Education', 'Poverty Rate']

            var county_info_buttons = d3.select('.population_line')
                .append('div')
                .attr('class', 'county_info_buttons')
                .selectAll('div')
                .data(county_options)
                .enter()
                .append('div')
                .text(function(d) {
                    return d;
                });

            county_info_buttons.on('click', function(j) {
                d3.selectAll('.county_info_buttons')
                  .selectAll('div')
                  .style('background-color', 'BurlyWood')
                  .style('color', 'black')
                d3.selectAll('.county_info_buttons2')
                  .selectAll('div')
                  .style('background-color', 'BurlyWood')
                  .style('color', 'black')
                d3.select(this)
                  .transition()
                  .duration(500)
                  .style('background-color', 'Maroon')
                  .style('color', 'white');
                if (this.textContent === 'Population') {
                    update_line_plot(d, population_line_data, 'Population')
                } else if (this.textContent === 'Female Age') {
                  update_line_plot(d, female_age, 'Female Age')
                } else if (this.textContent === 'Male Age') {
                  update_line_plot(d, male_age, 'Male Age')
                }
            });

            var county_info_buttons2 = d3.select('.population_line')
                .append('div')
                .attr('class', 'county_info_buttons2')
                .selectAll('div')
                .data(county_options2)
                .enter()
                .append('div')
                .text(function(d) {
                    return d;
                });

            county_info_buttons2.on('click', function(j) {
                d3.selectAll('.county_info_buttons')
                  .selectAll('div')
                  .style('background-color', 'BurlyWood')
                  .style('color', 'black')
                d3.selectAll('.county_info_buttons2')
                  .selectAll('div')
                  .style('background-color', 'BurlyWood')
                  .style('color', 'black')
                d3.select(this)
                  .transition()
                  .duration(500)
                  .style('background-color', 'Maroon')
                  .style('color', 'white');
                if (this.textContent === 'Female Education') {
                  plot_education(d, female_education, 'Female Education')
              } else if (this.textContent === 'Poverty Rate') {
                plot_poverty(d, poverty_level, 'Poverty Rate')
              } else if (this.textContent === 'Male Education') {
                plot_education(d, male_education, 'Male Education')
              }
            });
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
            d3.json('http://api.census.gov/data/' + year + '/sf1?get=ANPSADPI,P0070003&for=county:*&key=YOUR_KEY_HERE', function(json){
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
            d3.json('http://api.census.gov/data/' + year + '/sf1?get=NAME,H011C001&for=county:*&key=YOUR_KEY_HERE', function(json){
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
            d3.json('http://api.census.gov/data/' + year + '/acs5?get=NAME,B01001C_001E&for=county:*&key=YOUR_KEY_HERE', function(json){
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

    function get_attribute(year, api_code, label) {
        function merge_attribute(attributeArr, year, label) {
            for (var i=0; i<geo_data.features.length; i++) {
                var merge_id = geo_data.features[i].properties.GEOID
                for (var j=0; j<attributeArr.length; j++) {
                    if (attributeArr[j].GEOID === merge_id) {
                        geo_data.features[i].properties[year + ': ' + label] = attributeArr[j].attribute
                    }
                }
            }
        };

        if (year === 1990) {
            d3.json('http://api.census.gov/data/' + year + '/sf1?get=NAME,' + api_code + '&for=county:*&key=YOUR_KEY_HERE', function(json){
                var attributeArr = [];
                json.forEach(function(d,i) {
                    attributeArr.push({
                        GEOID: d[2] + d[3],
                        attribute: d[1]
                    })
                });
                attributeArr.splice(0,1)
                merge_attribute(attributeArr, year, label)
            });
        } else if (year === 2000){
            d3.json('http://api.census.gov/data/' + year + '/sf1?get=NAME,' + api_code + '&for=county:*&key=YOUR_KEY_HERE', function(json){
                var attributeArr = [];
                json.forEach(function(d,i) {
                    attributeArr.push({
                        GEOID: d[2] + d[3],
                        attribute: d[1]
                    })
                });
                attributeArr.splice(0,1)
                merge_attribute(attributeArr, year, label)
            });
        } else{
            d3.json('http://api.census.gov/data/' + year + '/acs5?get=NAME,' + api_code + '&for=county:*&key=YOUR_KEY_HERE', function(json){
                var attributeArr = [];
                json.forEach(function(d,i) {
                    attributeArr.push({
                        GEOID: d[2] + d[3],
                        attribute: d[1]
                    })
                });
                attributeArr.splice(0,1)
                merge_attribute(attributeArr, year, label);
            })
        };
    }

    var years = [1990, 2000, 2009, 2010, 2011, 2012, 2013, 2014, 2015];

    var year_index = 0

    var year_interval = setInterval(function() {
        if (years[year_index] === 2000) {
            get_attribute(years[year_index], 'P012C026', 'Female Population')
            get_attribute(years[year_index], 'P012C002', 'Male Population')
            get_attribute(years[year_index], 'P013C001', 'Median Age')
            get_attribute(years[year_index], 'P013C003', 'Female Median Age')
            get_attribute(years[year_index], 'P013C002', 'Male Median Age')
        } else {
            get_attribute(years[year_index], 'B01001C_017E', 'Female Population')
            get_attribute(years[year_index], 'B01001C_002E', 'Male Population')
            get_attribute(years[year_index], 'B01002C_001E', 'Median Age')
            get_attribute(years[year_index], 'B01002C_003E', 'Female Median Age')
            get_attribute(years[year_index], 'B01002C_002E', 'Male Median Age')
            get_attribute(years[year_index], 'B17001C_002E', 'Population in Poverty')
            get_attribute(years[year_index], 'B17001C_032E', 'Population Above Poverty')
            get_attribute(years[year_index], 'C15002C_003E', 'Male Less than High School')
            get_attribute(years[year_index], 'C15002C_004E', 'Male High School')
            get_attribute(years[year_index], 'C15002C_005E', 'Male Some College')
            get_attribute(years[year_index], 'C15002C_006E', 'Male College or Higher')
            get_attribute(years[year_index], 'C15002C_008E', 'Female Less than High School')
            get_attribute(years[year_index], 'C15002C_009E', 'Female High School')
            get_attribute(years[year_index], 'C15002C_010E', 'Female Some College')
            get_attribute(years[year_index], 'C15002C_011E', 'Female College or Higher')
        };

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
