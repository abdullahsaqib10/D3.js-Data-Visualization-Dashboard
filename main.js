
// Will be used to the save the loaded JSON data

const allDates = [];
const allYears = [];
const allDays = [];
const timeOfDay = [];
const birdCountEachYear = [];
const costEachYear = [];
const nightCount = [];
const dayCount = [];
const duskCount = [];
const dawnCount = [];
const allCosts = [];
const allStates = [];
const state = [];
const timeLineDates = [];



// Date parser to convert strings to date objects
var parseDate = d3.timeParse("%Y-%m-%d");

// Set ordinal color scale
var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

// Variables for the visualization instances
var areachart, timeline;


// Start application by loading the data
loadData();

function loadData() {
    d3.csv("birdstrikes.csv", function (error, csvData) {
        if (!error) {
            allData = csvData;

            console.log(allData);

            var count = 0;
            allData.forEach(function (d) {
                const [day, month, year] = d["Flight Date"].split("-").slice();
                const dte = new Date(year, month, 0);
                timeLineDates[count] = dte;

                allDates[count] = d["Flight Date"];
                allYears[count] = new Date(allDates[count]);
                allYears[count] = allYears[count].getFullYear();
                count++;
            });
            console.log(timeLineDates);



            allData.forEach(function (d) {
                allDays.push(d["Time of day"]);
            });

            allData.forEach(function (d) {
                allCosts.push(d["Cost Total $"]);
            });

            allData.forEach(function (d) {
                allStates.push(d["Origin State"]);
            });



            var count2 = 0;
            var start = false;

            for (i = 0; i < allDays.length; i++) {
                for (j = 0; j < timeOfDay.length; j++) {
                    if (allDays[i] == timeOfDay[j]) {
                        start = true;
                    }
                }
                count++;
                if (count == 1 && start == false) {
                    timeOfDay.push(allDays[i]);
                }
                start = false;
                count = 0;
            }

            start = false;
            for (i = 0; i < allStates.length; i++) {
                for (j = 0; j < state.length; j++) {
                    if (allStates[i] == state[j]) {
                        start = true;
                    }
                }
                count++;
                if (count == 1 && start == false) {
                    state.push(allStates[i]);
                }
                start = false;
                count = 0;
            }




            var k = 0;
            for (i = 0; i < 13; i++) {
                var count = 1;
                var costCount = 0;
                var countDay = 0;
                var countNight = 0;
                var countDusk = 0;
                var countDawn = 0;
                for (j = k; j < allYears.length; j++) {
                    if (allYears[j] == allYears[j + 1]) {
                        count++;
                        costCount = costCount + parseInt(allCosts[j]);
                        if (allDays[j] == "Day")
                            countDay++;
                        else if (allDays[j] == "Night")
                            countNight++;
                        else if (allDays[j] == "Dusk")
                            countDusk++;
                        else if (allDays[j] == "Dawn")
                            countDawn++;
                    }
                    else {
                        if (allDays[j] == "Day")
                            countDay++;
                        else if (allDays[j] == "Night")
                            countNight++;
                        else if (allDays[j] == "Dusk")
                            countDusk++;
                        else if (allDays[j] == "Dawn")
                            countDawn++;
                        k = j + 1;
                        break;
                    }

                }
                birdCountEachYear[i] = count;
                costEachYear[i] = costCount;
                nightCount[i] = countNight;
                dayCount[i] = countDay;
                duskCount[i] = countDusk;
                dawnCount[i] = countDawn;
            }

            const barArray = [{ "years": allYears[0], "strikes": birdCountEachYear[0], "night": nightCount[0], "day": dayCount[0], "dusk": duskCount[0], "dawn": dawnCount[0], "allCost": costEachYear[0] },
            { "years": allYears[1], "strikes": birdCountEachYear[1], "night": nightCount[1], "day": dayCount[1], "dusk": duskCount[1], "dawn": dawnCount[1], "allCost": costEachYear[1] },
            { "years": allYears[2], "strikes": birdCountEachYear[2], "night": nightCount[2], "day": dayCount[2], "dusk": duskCount[2], "dawn": dawnCount[2], "allCost": costEachYear[2] },
            { "years": allYears[3], "strikes": birdCountEachYear[3], "night": nightCount[3], "day": dayCount[3], "dusk": duskCount[3], "dawn": dawnCount[3], "allCost": costEachYear[3] },
            { "years": allYears[4], "strikes": birdCountEachYear[4], "night": nightCount[4], "day": dayCount[4], "dusk": duskCount[4], "dawn": dawnCount[4], "allCost": costEachYear[4] },
            { "years": allYears[5], "strikes": birdCountEachYear[5], "night": nightCount[5], "day": dayCount[5], "dusk": duskCount[5], "dawn": dawnCount[5], "allCost": costEachYear[5] },
            { "years": allYears[6], "strikes": birdCountEachYear[6], "night": nightCount[6], "day": dayCount[6], "dusk": duskCount[6], "dawn": dawnCount[6], "allCost": costEachYear[6] },
            { "years": allYears[7], "strikes": birdCountEachYear[7], "night": nightCount[7], "day": dayCount[7], "dusk": duskCount[7], "dawn": dawnCount[7], "allCost": costEachYear[7] },
            { "years": allYears[8], "strikes": birdCountEachYear[8], "night": nightCount[8], "day": dayCount[8], "dusk": duskCount[8], "dawn": dawnCount[8], "allCost": costEachYear[8] },
            { "years": allYears[9], "strikes": birdCountEachYear[9], "night": nightCount[9], "day": dayCount[9], "dusk": duskCount[9], "dawn": dawnCount[9], "allCost": costEachYear[9] },
            { "years": allYears[10], "strikes": birdCountEachYear[10], "night": nightCount[10], "day": dayCount[10], "dusk": duskCount[10], "dawn": dawnCount[10], "allCost": costEachYear[10] },
            { "years": allYears[11], "strikes": birdCountEachYear[11], "night": nightCount[11], "day": dayCount[11], "dusk": duskCount[11], "dawn": dawnCount[11], "allCost": costEachYear[11] },
            { "years": allYears[12], "strikes": birdCountEachYear[12], "night": nightCount[12], "day": dayCount[12], "dusk": duskCount[12], "dawn": dawnCount[12], "allCost": costEachYear[12] }

            ];



            const lineArray = barArray;
            const costEachState = [];
            for (i = 0; i < 29; i++)
                costEachState[i] = 0;

            const lineData = [];

            allData.forEach(function (d) {

                for (i = 0; i < state.length; i++) {
                    if (d["Origin State"] == state[i]) {
                        costEachState[i] = costEachState[i] + parseInt(d["Cost Total $"]);
                        break;
                    }
                }
            });

            for (i = 0; i < 29; i++) {
                const obj = { "state": state[i], "cost": costEachState[i] };
                lineData.push(obj);
            }



            console.log(costEachState);

            const hData = [];

            allData.forEach(function (d) {
                const obj = { "state": d["Origin State"], "airport": d["Airport Name"], "model": d["Aircraft Make Model"] };
                hData.push(obj);
            });

            console.log(hData);
            console.log(allDates);
            console.log(allYears);
            console.log(allDays);
            console.log(timeOfDay);
            console.log(birdCountEachYear);
            console.log(nightCount);
            console.log(dayCount);
            console.log(duskCount);
            console.log(dawnCount);
            console.log(costEachYear);
            console.log(allStates);
            console.log(state);
            console.log(lineData);





            var BarGraphmargin = { top: 10, right: 30, bottom: 20, left: 50 },
                barGraphwidth = 450 - BarGraphmargin.left - BarGraphmargin.right,
                barGraphheight = 200 - BarGraphmargin.top - BarGraphmargin.bottom;

            var svg = d3.select("#barPlot")
                .append("svg")
                .attr("width", barGraphwidth + BarGraphmargin.left + BarGraphmargin.right)
                .attr("height", barGraphheight + BarGraphmargin.top + BarGraphmargin.bottom)
                .append("g")
                .attr("class", "newClass")
                .attr("transform",
                    "translate(" + BarGraphmargin.left + "," + BarGraphmargin.top + ")");


            let hoverText = svg.append("text").attr("x", 200).attr("y", 5);

            //let extent = d3.extent(allYears);
            let barChartScaleX = d3.scaleBand()
                .domain(allYears)
                .range([0, 400])
                .padding([0.2])
            svg.append("g")
                .attr("transform", "translate(0," + barGraphheight + ")")
                .call(d3.axisBottom(barChartScaleX).tickSize(0));


            let barChartScaleY = d3.scaleLinear()
                .domain([0, Math.max.apply(Math, nightCount) + 5])
                .range([barGraphheight, 0]);
            svg.append("g")
                .call(d3.axisLeft(barChartScaleY));


            nightBar();



            function nightBar() {
                var svg = d3.select(".newClass")
                svg.selectAll("g").remove()

                let barChartScaleX = d3.scaleBand()
                    .domain(allYears)
                    .range([0, 400])
                    .padding([0.2])
                svg.append("g")
                    .attr("transform", "translate(0," + barGraphheight + ")")
                    .call(d3.axisBottom(barChartScaleX).tickSize(0));

                barChartScaleY = d3.scaleLinear()
                    .domain([0, Math.max.apply(Math, nightCount) + 5])
                    .range([barGraphheight, 0]);
                svg.append("g")
                    .call(d3.axisLeft(barChartScaleY));



                var svg = d3.select(".newClass")
                svg.selectAll("rect").remove()
                var svg = d3.select(".newClass")
                svg.selectAll("mybar")
                    .data(barArray)
                    .enter()
                    .append("rect")
                    .attr("x", function (d) { return barChartScaleX(d.years) + 3; })
                    //.attr("y", function(d) { return barChartScaleY(d.night); })
                    .attr("height", function (d) { return barGraphheight - barChartScaleY(0); }) // always equal to 0
                    .attr("y", function (d) { return barChartScaleY(0); })
                    .attr("width", 20)
                    .on("mouseover", mouseOverNight)
                    .on("mouseout", mouseOutNight)
                    //.attr("height", function(d) { return barGraphheight - barChartScaleY(d.night); })
                    .attr("transform", function (d, i) {
                        var translate = [30 * i, 0];
                        return "translate(" + translate + ")"
                    })
                    .attr("fill", "#003f5c")


                svg.selectAll("rect")
                    .transition()
                    .duration(1000)
                    .attr("y", function (d) { return barChartScaleY(d.night); })
                    .attr("height", function (d) { return barGraphheight - barChartScaleY(d.night); })
                    .delay(function (d, i) { console.log(i); return (i * 100) })

            }

            function dayBar() {
                var svg = d3.select(".newClass")
                svg.selectAll("g").remove()

                let barChartScaleX = d3.scaleBand()
                    .domain(allYears)
                    .range([0, 400])
                    .padding([0.2])
                svg.append("g")
                    .attr("transform", "translate(0," + barGraphheight + ")")
                    .call(d3.axisBottom(barChartScaleX).tickSize(0));

                barChartScaleY = d3.scaleLinear()
                    .domain([0, Math.max.apply(Math, dayCount) + 5])
                    .range([barGraphheight, 0]);
                svg.append("g")
                    .call(d3.axisLeft(barChartScaleY));

                var svg = d3.select(".newClass")
                svg.selectAll("rect").remove()
                var svg = d3.select(".newClass")
                svg.selectAll("mybar")
                    .data(barArray)
                    .enter()
                    .append("rect")
                    .attr("x", function (d) { return barChartScaleX(d.years) + 3; })
                    //.attr("y", function(d) { return barChartScaleY(d.day); })
                    .attr("height", function (d) { return barGraphheight - barChartScaleY(0); }) // always equal to 0
                    .attr("y", function (d) { return barChartScaleY(0); })
                    .attr("width", 20)
                    .on("mouseover", mouseOverDay)
                    .on("mouseout", mouseOutDay)
                    //.attr("height", function(d) { return barGraphheight - barChartScaleY(d.day); })
                    .attr("transform", function (d, i) {
                        var translate = [30 * i, 0];
                        return "translate(" + translate + ")"
                    })
                    .attr("fill", "#58508d")


                svg.selectAll("rect")
                    .transition()
                    .duration(1000)
                    .attr("y", function (d) { return barChartScaleY(d.day); })
                    .attr("height", function (d) { return barGraphheight - barChartScaleY(d.day); })
                    .delay(function (d, i) { console.log(i); return (i * 100) })


            }


            function duskBar() {
                var svg = d3.select(".newClass")
                svg.selectAll("g").remove()

                let barChartScaleX = d3.scaleBand()
                    .domain(allYears)
                    .range([0, 400])
                    .padding([0.2])
                svg.append("g")
                    .attr("transform", "translate(0," + barGraphheight + ")")
                    .call(d3.axisBottom(barChartScaleX).tickSize(0));

                barChartScaleY = d3.scaleLinear()
                    .domain([0, Math.max.apply(Math, duskCount) + 5])
                    .range([barGraphheight, 0]);
                svg.append("g")
                    .call(d3.axisLeft(barChartScaleY));


                var svg = d3.select(".newClass")
                svg.selectAll("rect").remove()
                var svg = d3.select(".newClass")
                svg.selectAll("mybar")
                    .data(barArray)
                    .enter()
                    .append("rect")
                    .attr("x", function (d) { return barChartScaleX(d.years) + 3; })
                    //.attr("y", function(d) { return barChartScaleY(d.dusk); })
                    .attr("height", function (d) { return barGraphheight - barChartScaleY(0); }) // always equal to 0
                    .attr("y", function (d) { return barChartScaleY(0); })
                    .attr("width", 20)
                    .on("mouseover", mouseOverDusk)
                    .on("mouseout", mouseOutDusk)
                    //.attr("height", function(d) { return barGraphheight - barChartScaleY(d.dusk); })
                    .attr("transform", function (d, i) {
                        var translate = [30 * i, 0];
                        return "translate(" + translate + ")"
                    })
                    .attr("fill", "#bc5090")

                svg.selectAll("rect")
                    .transition()
                    .duration(1000)
                    .attr("y", function (d) { return barChartScaleY(d.dusk); })
                    .attr("height", function (d) { return barGraphheight - barChartScaleY(d.dusk); })
                    .delay(function (d, i) { console.log(i); return (i * 100) })


            }

            function dawnBar() {
                var svg = d3.select(".newClass")
                svg.selectAll("g").remove()

                let barChartScaleX = d3.scaleBand()
                    .domain(allYears)
                    .range([0, 400])
                    .padding([0.2])
                svg.append("g")
                    .attr("transform", "translate(0," + barGraphheight + ")")
                    .call(d3.axisBottom(barChartScaleX).tickSize(0));

                barChartScaleY = d3.scaleLinear()
                    .domain([0, Math.max.apply(Math, dawnCount) + 5])
                    .range([barGraphheight, 0]);
                svg.append("g")
                    .call(d3.axisLeft(barChartScaleY));

                var svg = d3.select(".newClass")
                svg.selectAll("rect").remove()
                var svg = d3.select(".newClass")
                svg.selectAll("mybar")
                    .data(barArray)
                    .enter()
                    .append("rect")
                    .attr("x", function (d) { return barChartScaleX(d.years) + 3; })
                    //.attr("y", function(d) { return barChartScaleY(d.dawn); })
                    .attr("height", function (d) { return barGraphheight - barChartScaleY(0); }) // always equal to 0
                    .attr("y", function (d) { return barChartScaleY(0); })
                    .attr("width", 20)
                    .on("mouseover", mouseOverDawn)
                    .on("mouseout", mouseOutDawn)
                    //.attr("height", function(d) { return barGraphheight - barChartScaleY(d.dawn); })
                    .attr("transform", function (d, i) {
                        var translate = [30 * i, 0];
                        return "translate(" + translate + ")"
                    })
                    .attr("fill", "#ff6361")

                svg.selectAll("rect")
                    .transition()
                    .duration(1000)
                    .attr("y", function (d) { return barChartScaleY(d.dawn); })
                    .attr("height", function (d) { return barGraphheight - barChartScaleY(d.dawn); })
                    .delay(function (d, i) { console.log(i); return (i * 100) })


            }




            svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", 200)
                .attr("y", 190)
                .attr("font-size", "10px")
                .attr("font-weight", 800)
                .text("YEARS");

            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", -40)
                .attr("x", -30)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .attr("font-size", "10px")
                .attr("font-weight", 800)
                .text("Number of Bird Strikes");



            svg.append("circle")
                .attr("cx", 100)
                .attr("cy", 0)
                .attr("r", 4)
                .style("fill", "#003f5c")
                .on('click', nightBar);

            svg.append("circle")
                .attr("cx", 100)
                .attr("cy", 10)
                .attr("r", 4)
                .style("fill", "#58508d")
                .on('click', dayBar);

            svg.append("circle")
                .attr("cx", 100)
                .attr("cy", 20)
                .attr("r", 4)
                .style("fill", "#bc5090")
                .on('click', duskBar);

            svg.append("circle")
                .attr("cx", 100)
                .attr("cy", 30)
                .attr("r", 4)
                .style("fill", "#ff6361")
                .on('click', dawnBar);



            svg.append("text").attr("x", 110).attr("y", 0).text("Night").style("font-size", "10px").attr("alignment-baseline", "middle")
            svg.append("text").attr("x", 110).attr("y", 10).text("Day").style("font-size", "10px").attr("alignment-baseline", "middle")
            svg.append("text").attr("x", 110).attr("y", 20).text("Dusk").style("font-size", "10px").attr("alignment-baseline", "middle")
            svg.append("text").attr("x", 110).attr("y", 30).text("Dawn").style("font-size", "10px").attr("alignment-baseline", "middle")





            function mouseOverNight(d, i) {
                hoverText.text("Strike: " + d.night);
                d3.select(this).attr("class", "onMouseHover")
            }

            function mouseOutNight(d, i) {
                hoverText.text("");
                d3.select(this).attr("class", "highlightback")
            }

            function mouseOverDay(d, i) {
                hoverText.text("Strike: " + d.day);
                d3.select(this).attr("class", "onMouseHover")
            }

            function mouseOutDay(d, i) {
                hoverText.text("");
                d3.select(this).attr("class", "highlightback")
            }

            function mouseOverDusk(d, i) {
                hoverText.text("Strike: " + d.dusk);
                d3.select(this).attr("class", "onMouseHover")
            }

            function mouseOutDusk(d, i) {
                hoverText.text("");
                d3.select(this).attr("class", "highlightback")
            }

            function mouseOverDawn(d, i) {
                hoverText.text("Strike: " + d.dawn);
                d3.select(this).attr("class", "onMouseHover")
            }

            function mouseOutDawn(d, i) {
                hoverText.text("");
                d3.select(this).attr("class", "highlightback")
            }



















            var linemargin = { top: 10, right: 30, bottom: 30, left: 60 },
                lineWidth = 500 - linemargin.left - linemargin.right,
                lineHeight = 310 - linemargin.top - linemargin.bottom;




            var svg = d3.select("#linePlot")
                .append("svg")
                .attr("width", lineWidth + linemargin.left + linemargin.right)
                .attr("height", lineHeight + linemargin.top + linemargin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + linemargin.left + "," + linemargin.top + ")");

            let hoverText2 = svg.append("text").attr("x", 200).attr("y", 5);



            var xScale = d3.scaleBand()
                .range([0, 400])
                .domain(lineData.map(function (d) { return d.state; }))
                .padding(0.2);
            svg.append("g")
                .attr("transform", "translate(0," + barGraphheight + ")")
                .call(d3.axisBottom(xScale).tickSize(0))
                .selectAll("text")
                .attr("transform", "translate(-10,5)rotate(-90)")
                .style("text-anchor", "end")




            var y = d3.scaleLinear('svg')
                .domain([0, Math.max.apply(Math, costEachYear) + 50])
                .range([lineHeight - 100, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // var xAxis = d3.axisBottom(xScale)

            // svg.append("g")
            //     .attr("transform", "translate(0, 460)")
            //     .call(xAxis);

            var c = -6;

            svg.append("path")
                .datum(lineData)
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("d", d3.line()
                    .x(function (d) {
                        c = c + 13.55;
                        return c
                    })
                    .y(function (d) { return y(d.cost) })
                )

            //Add the points
            svg
                .append("g")
                .selectAll("dot")
                .data(lineData)
                .enter()
                .append("circle")
                .attr("cx", function (d) { return xScale(d.state) + 3 })
                .attr("cy", function (d) { return y(d.cost) })
                .attr("transform", function (d, i) {
                    var translate = [0 * i, 0];
                    return "translate(" + translate + ")"
                })
                .on("mouseover", mouseOverCost)
                .on("mouseout", mouseOutCost)
                .attr("r", 3)
                .attr("fill", "purple")


            svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", 200)
                .attr("y", 240)
                .attr("font-size", "10px")
                .attr("font-weight", 800)
                .text("STATES");

            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", -60)
                .attr("x", -40)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .attr("font-size", "10px")
                .attr("font-weight", 800)
                .text("Total Cost each year in $");



            function mouseOverCost(d, i) {
                hoverText2.text("Cost of " + d.state + ": $" + d.cost);
                d3.select(this).attr("class", "onMouseHover")
            }

            function mouseOutCost(d, i) {
                hoverText2.text("");
                d3.select(this).attr("class", "highlightback")
            }

            function linkCost(d, i) {
                console.log(d);
                var cst = 0;
                for (i = 0; i < lineData.length; i++) {
                    if (d == lineData[i].state) {
                        cst = lineData[i].cost;
                    }
                }
                hoverText2.text("Cost of " + d + ": $" + cst);
                //d3.select(this).attr("class", "onMouseHover")

            }

            function mouseOutCost2(d, i) {
                hoverText2.text("");
                labelText.text("");
                labelText2.text("");
                d3.select(this).attr("class", "highlightback")
            }










            var tLinemargin = { top: 10, right: 30, bottom: 20, left: 50 },
                tLinewidth = 450 - tLinemargin.left - tLinemargin.right,
                tLineheight = 200 - tLinemargin.top - tLinemargin.bottom;


            var svg = d3.select("#timeLine")
                .append("svg")
                .attr("width", tLinewidth + tLinemargin.left + tLinemargin.right)
                .attr("height", tLineheight + tLinemargin.top + tLinemargin.bottom+20)
                .append("g")
                .attr("transform",
                    "translate(" + tLinemargin.left + "," + tLinemargin.top + ")");

            // let extent = d3.extent(allYears);
            // let timeScaleX = d3.scaleBand()
            //     .domain(allYears)
            //     .range([0, 400])
            //     .padding([0.2])
            // svg.append("g")
            //     .attr("transform", "translate(0," + tLineheight + ")")
            //     .call(d3.axisBottom(timeScaleX).tickSize(0));

            var timeScaleX = d3.scaleBand()
                .domain(allYears)
                .range([0, 400]);
            var xAxis = svg.append("g")
                .attr("transform", "translate(0," + tLineheight + ")")
                .call(d3.axisBottom(timeScaleX));

            y = d3.scaleLinear('svg')
                .domain([0, Math.max.apply(Math, birdCountEachYear) + 50])
                .range([tLineheight, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));


           
            var clip = svg.append("defs").append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("width", tLinewidth)
                .attr("height", tLineheight)
                .attr("x", 0)
                .attr("y", 0);


            var brush = d3.brushX()                 
                .extent([[0, 0], [tLinewidth, tLineheight]])
                .on("end", updateChart)

            var scatter = svg.append('g')
                .attr("clip-path", "url(#clip)")


            svg.selectAll("mybar")
                .data(barArray)
                .enter()
                .append("rect")
                .attr("x", function (d) { return barChartScaleX(d.years) + 4; })
                .attr("y", function (d) { return y(d.strikes); })
                .attr("width", 20)
                .attr("height", function (d) { return tLineheight - y(d.strikes); })
                .attr("transform", function (d, i) {
                    var translate = [30 * i, 0];
                    return "translate(" + translate + ")"
                })
                .attr("fill", "purple")

            scatter
                .append("g")
                .attr("class", "brush")
                .call(brush);


            
            var idleTimeout
            function idled() { idleTimeout = null; }

            function updateChart(e) {

                extent = e.selection;

                if (!extent) {
                    if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
                    barChartScaleX.domain([4, 8])
                } else {
                    barChartScaleX.domain([barChartScaleX.invert(extent[0]), barChartScaleX.invert(extent[1])])
                    scatter.select(".brush").call(brush.move, null)
                }

                xAxis.transition().duration(1000).call(d3.axisBottom(x))
                scatter
                    .selectAll("circle")
                    .transition().duration(1000)
                    .attr("cx", function (d) { return x(d.Sepal_Length); })
                    .attr("cy", function (d) { return y(d.Petal_Length); })

            }



            brushHandler(allData);

            svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", 200)
                .attr("y", 200)
                .attr("font-size", "10px")
                .attr("font-weight", 800)
                .text("YEARS");

            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", -40)
                .attr("x", -30)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .attr("font-size", "10px")
                .attr("font-weight", 800)
                .text("Number of Bird Strikes");








            var entries = d3.nest()
                //.key(function(d) { return d.Order; })
                //   .key(function(d) { return d.state; })
                //   .key(function(d) { return d.airport; })
                //   .key(function(d) { return d.model; })
                //   .entries(hData);
                .key(function (d) { return d["Origin State"]; })
                .key(function (d) { return d["Airport Name"]; })
                .key(function (d) { return d["Aircraft Make Model"]; })
                .entries(allData);

            // var listObj = allData.map((d) => {
            //     return {
            //         state: d["Origin State"],
            //         airport: d["Airport Name"],
            //         effect: d["Effect Amount of damage"],
            //     };
            // });

            // const grouped = d3.rollup(
            //     listObj,
            //     function (d) {
            //         return d.length;
            //     },
            //     function (d) {
            //         return d.state;
            //     },
            //     function (d) {
            //         return d.airport;
            //     },
            //     function (d) {
            //         return d.effect;
            //     }
            // );


            //console.log(grouped);


            //var root = d3.hierarchy(grouped);

            var root = d3.hierarchy(entries[0], function (d) { return d.values; })

            console.log(root);

            chart(root);









            var entries = d3.nest()
                .key(function (d) { return d.Order; })
                .key(function (d) { return d["Time of day"]; })
                .key(function (d) { return d["Origin State"]; })
                .key(function (d) { return d["Airport Name"]; })
                //.key(function(d) { return d.model; })
                .entries(allData);

            //console.log(entries);

            root = d3.hierarchy(entries[0], function (d) { return d.values; })

            //console.log(root);

            let treeLayout = d3.tree()
                .size([400, 280])
            treeLayout(root)

            var treemargin = { top: 0, right: 0, bottom: 0, left: 0 },
                treeWidth = 500 - treemargin.left - treemargin.right,
                treeHeight = 280 - treemargin.top - treemargin.bottom;

            console.log(root);


            var svg = d3.select("#treePlot")
                .append("svg")
                .attr("width", treeWidth + treemargin.left + treemargin.right)
                .attr("height", treeHeight + treemargin.top + treemargin.bottom)

                .attr("transform",
                    "translate(" + 0 + "," + treemargin.top + ")")

                .call(d3.zoom().on("zoom", function (e) {
                    console.log(this)
                    svg.attr("transform", d3.event.transform);
                }))
                .append("g");



            let labelText = svg.append("text").attr("x", 0).attr("y", 20);
            let labelText2 = svg.append("text").attr("x", 0).attr("y", 40);



            // Links
            //console.log(root.links());
            svg.append("g")
                .selectAll('line')
                .data(root.links())
                .enter().append('line')
                .attr('x1', function (d) {
                    if (d.source.depth != 3)
                        return d.source.x;
                })
                .attr('y1', function (d) {
                    if (d.source.depth != 3)
                        return d.source.y;
                })
                .attr('x2', function (d) {
                    if (d.target.depth != 4)
                        return d.target.x;
                })
                .attr('y2', function (d) {
                    if (d.target.depth != 4)
                        return d.target.y;
                });

            // Nodes
            svg.append("g")
                .selectAll('circle')
                .data(root.descendants())
                .enter().append('circle')
                .attr('cx', function (d) {
                    if (d.depth <= 3)
                        return d.x;
                })
                .attr('cy', function (d) {
                    if (d.depth <= 3)
                        return d.y
                            ;
                })
                .attr('r', 4)
                .attr("fill", function (d) {
                    if (d.depth == 0)
                        return "#e60049";
                    else if (d.depth == 1)
                        return "#FF00FF";
                    else if (d.depth == 2)
                        return "#808000";
                    else if (d.depth == 3)
                        return "#008080";
                })
                .on("click", function (d) {
                    if (d.data.key == "Night")
                        nightBar();
                    else if (d.data.key == "Day")
                        dayBar();
                    else if (d.data.key == "Dusk")
                        duskBar();
                    else if (d.data.key == "Dawn")
                        dawnBar();
                })
                .on('mouseover', function (d) {

                    var sendCount = 0;
                    if (d.depth < 0) return '';
                    if (d.depth == 1) {
                        var incCount = 0;
                        for (i = 0; i < d.data.values.length; i++) {

                            for (j = 0; j < d.data.values[i].values.length; j++) {
                                incCount = incCount + d.data.values[i].values[j].values.length;
                            }

                        }
                        sendCount = incCount;

                    }
                    if (d.depth == 2) {
                        var incCount = 0;
                        for (i = 0; i < d.data.values.length; i++) {
                            incCount = incCount + d.data.values[i].values.length;
                        }
                        sendCount = incCount;
                    }
                    if (d.depth == 3)
                        sendCount = d.data.values.length;

                    console.log(d);
                    showLabel(d.data.key, sendCount);

                    d3.select(this).attr("class", "onMouseHover")
                    for (i = 0; i < state.length; i++)
                        if (d.data.key == state[i])
                            linkCost(d.data.key);
                })
                .on("mouseout", mouseOutCost2);

            svg.append("g")
                .selectAll('text.label')
                .data(root.descendants())
                .enter().append('text')
                .classed('label', true)
                .attr('x', function (d) { return d.x; })
                .attr('y', function (d) { return d.y - 10; })
                .attr('font-size', 10)
                .attr('text-anchor', 'middle')
                .attr('size', 70)
                .text(function (d) {
                    if (d.depth == 1)
                        return d.data.key;
                });

            svg.append("g")
                .selectAll('text.count-label')
                .data(root.descendants())
                .enter().append('text')
                .classed('count-label', true)
                .attr('x', function (d) { return d.x; })
                .attr('y', function (d) { return d.y + 20; })
                .attr('font-size', 10)
                .attr('text-anchor', 'middle')
                .text(function (d) {
                    if (d.depth < 0) return '';
                    if (d.depth == 1) {
                        var incCount = 0;
                        for (i = 0; i < d.data.values.length; i++) {

                            for (j = 0; j < d.data.values[i].values.length; j++) {
                                incCount = incCount + d.data.values[i].values[j].values.length;
                            }

                        }
                        return incCount;
                    }
                    // if (d.depth == 2) 
                    // {
                    //     var incCount = 0;
                    //     for (i = 0; i < d.data.values.length; i++)
                    //     {
                    //         incCount = incCount + d.data.values[i].values.length;
                    //     }
                    //     return incCount;
                    // }
                    // if (d.depth == 3)
                    //     return d.data.values.length;
                });







            function showLabel(d, dCnt, i) {
                console.log(d);
                console.log(dCnt);
                labelText.text(d);
                labelText2.text("Bird Strikes for this: " + dCnt);
            }



            svg.append("circle")
                .attr("cx", 400)
                .attr("cy", 5)
                .attr("r", 4)
                .style("fill", "#FF00FF")


            svg.append("circle")
                .attr("cx", 400)
                .attr("cy", 15)
                .attr("r", 4)
                .style("fill", "#808000")


            svg.append("circle")
                .attr("cx", 400)
                .attr("cy", 25)
                .attr("r", 4)
                .style("fill", "#008080")




            svg.append("text").attr("x", 410).attr("y", 5).text("Time of Day").style("font-size", "10px").attr("alignment-baseline", "middle")
            svg.append("text").attr("x", 410).attr("y", 15).text("State").style("font-size", "10px").attr("alignment-baseline", "middle")
            svg.append("text").attr("x", 410).attr("y", 25).text("Airport").style("font-size", "10px").attr("alignment-baseline", "middle")






            //           svg.call(d3.zoom()
            //   .extent([[0, 0], [barGraphwidth, barGraphheight]])
            //   .scaleExtent([1, 8])
            //   .on("zoom", zoomed));

            //   function zoomed({transform}) {
            //     g.attr("transform", transform);
            //   }





        }
    });

}



drag = simulation => {

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}




function chart(root) {
    // const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();

    const sizeScale = d3.scaleLinear().domain([0, 2000]).range([5, 40]);

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(1))
        .force("charge", d3.forceManyBody().strength(-30))
        .force("x", d3.forceX(200))
        .force("y", d3.forceY(-100));


    var margin = { top: 0, right: 0, bottom: 0, left: 0 },
        width = 500 - margin.left - margin.right,
        height = 280 - margin.top - margin.bottom;

    //const svg = d3.select("#treePlot")
    var svg = d3
        .select("#forceDirected")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        //.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.zoom().on("zoom", function (e) {
            console.log(this)
            svg.attr("transform", d3.event.transform);
        }))
        .append("g");

    let labelText3 = svg.append("text").attr("x", 0).attr("y", -200);


    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .enter().append("line");

    const node = svg.append("g")
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .on('mouseover', fMouseOver)
        .on("mouseout", fMouseOut)
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("fill", d => d.children ? null : "#000")
        .attr("stroke", d => d.children ? null : "#fff")
        .attr("r", 3.5)
        .call(drag(simulation))
        .on('mouseover', fMouseOver)
        .on("mouseout", fMouseOut);

    node.append("title")
        .text(d => d.data[0]);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });

    // invalidation.then(() => simulation.stop());

    function fMouseOver(d, i) {
        console.log(d);
        labelText3.text(d.data.key);
        d3.select(this).attr("class", "onMouseHover")
    }

    function fMouseOut(d, i) {
        console.log(d);
        labelText3.text("");
        d3.select(this).attr("class", "highlightback")
    }

    return svg.node();


}




function brushHandler(dta) {

}











