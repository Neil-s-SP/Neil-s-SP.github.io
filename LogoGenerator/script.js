//String.fromCharCode(1+64) gives you 'A', String.fromCharCode(2+64) gives you 'B'


//Get the window's width and hight
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var svgWidth = windowWidth * 0.8,
        svgHeight_list = windowHeight * 0.8,
        svgHeight_logos = windowHeight * 0.3,
        svgHeight_result = windowHeight * 0.5;

    console.log(svgHeight_result);



// Get the data of the recording JSON file

    d3.json("./storage/record.json").then(function(data){
        events = data.events;
        console.log(events);
        // CREATE the list of events at #eventsSVG
            const eventsSVG = d3.select("#eventsSVG")
                                .attr("width", svgWidth)
                                .attr("height", svgHeight_list);
            var eventItems = eventsSVG.selectAll(".eventList")
                                        .data(events)
                                        .enter()
                                        .append("g")
                                        .attr("class", "eventList")
                                        .attr("id", (d) => `event_${d.name}`)
                                        // .on("click", function)

            eventItems.append("rect")
                        .attr("x", svgWidth * 0.1)
                        .attr("y", (d) => 10 + svgHeight_list * 0.125 * d.id)
                        .attr("width", svgWidth * 0.8)
                        .attr("height", svgHeight_list * 0.1)
                        .style("fill", "white")
                        .style("stroke", "black")
                        .style("stroke-width", 1)

            eventItems.append("text")
                        .attr("x", svgWidth * 0.2)
                        .attr("y", (d) => 10 + svgHeight_list * 0.125 * d.id + svgHeight_list * 0.06)
                        .text((d) => d.name)
                        .style("fill", "black")


    });


// CREATE the list of events at #eventsSVG

    // When one item is selected: #eventList will be hided, and #logoGenerator will be unhided



//INITIATE #logoGenerator

    // Initiate the #logoGenerator according to the logos and presets



    // Initiate the #logosSVG according to the logos based on the recording JSON file



    // Initiate the value of #typefield_sequence based on the recording JSON file



    // Initiate the value of #typefield_rowNum based on the recording JSON file



    // Initiate the values of .typefield_Nums based on the recording JSON file



    // Generate the #quickReviewSVG based on the values of #typefield_sequence, #typefield_rowNum, and .typefield_Nums




//UPDATE #logoGenerator

    // When new logo is added, rename it, update the #logosSVG, and update the values of #typefield_sequence, update #typefield_Num_last, and regenerate #quickReviewSVG accordingly


    // When #logosSVG is updated, the recording JSON file should be updated



    // When #typefield_sequence is updated, the recording JSON file should be updated


    // When the value of #confirm_sequence is clicked, #typefield_sequence is updated, regenerate the #quickReviewSVG accordingly


    // When the value of #typefield_rowNum is changed, update the recording JSON file, re-initiate values of .typefield_Nums and generate them, regenerate the #quickReviewSVG accordingly


    // When a value of .typefield_Nums is changed, update the #typefield_Num_last, update the recording JSON file, regenerate the #quickReviewSVG accordingly
