//String.fromCharCode(1+64) gives you 'A', String.fromCharCode(2+64) gives you 'B'


//Get the window's width and hight
    const windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;
    const svgWidth = windowWidth * 0.8,
            svgHeight_list = windowHeight * 0.8,
            svgHeight_logos = windowHeight * 0.3,
            svgHeight_result = windowHeight * 0.5;
    const uploadedLogoHeight = svgHeight_logos * 0.3;




// Get the data of the recording JSON file

    d3.json("./storage/record.json").then(function(data){
        var events = data.events;

        generateEventList(events)


    });



// F1: CREATE the list of events at #eventsSVG
    const generateEventList = (eventsData) => {
        var eventsSVG = d3.select("#eventsSVG")
                            .attr("width", svgWidth)
                            .attr("height", svgHeight_list);
        var eventItems = eventsSVG.selectAll(".eventList")
                                    .data(eventsData)
                                    .enter()
                                    .append("g")
                                    .attr("class", "eventList")
                                    .attr("id", (d) => `event_${d.name}`)
                                    .on("mouseover", function(){eventItemColorChange(this, "grey");})
                                    .on("mouseout", function(){ eventItemColorChange(this, "white");})
                                    .on("click", (d) => {
                                        changePage("eventList", "logoGenerator");
                                        // F4
                                        initiateLogoGenerator(d);
                                    })

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
    }

    // F2: When one item is hovered or hovernoted, the color of its rec will change
        const eventItemColorChange = (thisEvent, targetColor) => {
            d3.select(thisEvent)
                .select("rect")
                .style("fill", targetColor)
        }

    // F3: When one item is selected: #eventList will be hided, and #logoGenerator will be unhided
        const changePage = (earlierPageId, nextPageId) => {
            var earlierPageSection = document.querySelector(`#${earlierPageId}`),
                nextPageSection = document.querySelector(`#${nextPageId}`);

            earlierPageSection.classList.add("hide");
            nextPageSection.classList.remove("hide");
        }


// F4: INITIATE #logoGenerator
    const initiateLogoGenerator = (eventData) => {
        // F5
        showUploadedLogos(eventData);

        var presetData = eventData.presets;
        // F6
        initiateSequence(presetData);
        // F7
        initiateRowNum(presetData);
        // F8
        initiateEachRow(presetData);
        // F9
    }

    // F5: Initiate the #logosSVG according to the logos based on the recording JSON file
        const showUploadedLogos = (eventData) => {
            var logoNames = eventData.logos,  // logoNames: ["1", "2", ...]
                eventName = eventData.name;

            var uploadedLogosDiv = d3.select("#uploadedLogos");

            var logoDivs = uploadedLogosDiv.selectAll(".uploadedLogoDiv")
                                            .data(logoNames)
                                            .enter()
                                            .append("div")
                                            .attr("class", "uploadedLogoDiv")
                                            .attr("id", (d) => `logo_${d}`);

            logoDivs.append("img")
                    .attr("src", (d) => `./storage/${eventName}/${d}.png`);

            logoDivs.append("p")
                    .text((d) => convertNumToLetter(Number(d)));


            //Create a button for adding img
                uploadedLogosDiv.append("div")
                                .attr("class", "uploadedLogoDiv")
                                .attr("id", "uploadButton")
                                .style("margin-left", "2em")
                                .append("img")
                                .attr("src", "./assets/uploadLogo.png")
                                .style("height", "4em")
                                .on("mouseover", function() {d3.select(this).attr("src", "./assets/uploadLogo_hover.png")})
                                .on("mouseout", function() {d3.select(this).attr("src", "./assets/uploadLogo.png")})
                                .on("click", function(){
                                    //F10
                                });


        }


    // F6: Initiate the value of #typefield_sequence based on the recording JSON file
        const initiateSequence = (presetData) => {
            var type_sequence = d3.select("#typefield_sequence")
                                    .attr("value", presetData.typefield_sequence)
                                    .style("color","grey")
                                    .on("input", function(){
                                        this.style.color = "black";
                                    });

            const confirm_sequence = d3.select("#confirm_sequence")
                                        .on("click", function(){
                                            console.log("sequence updated")
                                            // F12
                                        });
        }


    // F7: Initiate the value of #typefield_rowNum based on the recording JSON file
        const initiateRowNum = (presetData) => {
            var type_row = d3.select("#typefield_rowNum")
                                .attr("value", presetData.typefield_rowNum)
                                .style("color","grey")
                                .on("input", function(){
                                    this.style.color = "black";
                                    console.log("row updated")
                                    // F14
                                });
    }


    // F8: Initiate the values of .typefield_Nums based on the recording JSON file
        const initiateEachRow = (presetData) => {
            var rowNum = presetData.typefield_rowNum;

            var type_eachRows = d3.select("#multiTypefieldSpan")
                                    .selectAll(".typefield_Nums")
                                    .data(presetData.typefield_Nums)
                                    .enter()
                                    .append((d, i) => {
                                        let thisType =  (i < rowNum-1) ? "input" : "p";
                                        return document.createElement(thisType);
                                    })
                                    .attr("class", "typefield_Nums")
                                    .attr("id", (d, i) => (i < rowNum-1) ? `typefield_Num_${i}` : "typefield_Num_last")
                                    .attr("value", (d, i) => (i < rowNum-1) ? `typefield_Num_${i}` : "")
                                    .attr("type", (d, i) => (i < rowNum-1) ? "text" : "")
                                    .text((d, i) => (i < rowNum-1) ? "" : d);
        }


    // F9: Generate the #quickReviewSVG based on the values of #typefield_sequence, #typefield_rowNum, and .typefield_Nums




//UPDATE #logoGenerator

    // F10: When new logo is added, rename it, update the #logosSVG, and update the values of #typefield_sequence, update #typefield_Num_last, and regenerate #quickReviewSVG accordingly


    // F11: When #logosSVG is updated, the recording JSON file should be updated


    // F12: When the value of #confirm_sequence is clicked, #typefield_sequence is updated, regenerate the #quickReviewSVG accordingly


    // F13: When #typefield_sequence is updated, the recording JSON file should be updated


    // F14: When the value of #typefield_rowNum is changed, update the recording JSON file, re-initiate values of .typefield_Nums and generate them, regenerate the #quickReviewSVG accordingly


    // F15: When a value of .typefield_Nums is changed, update the #typefield_Num_last, update the recording JSON file, regenerate the #quickReviewSVG accordingly






// F16: AUXILIARY FUNCTIONS
    const convertNumToLetter = (num) => {
        return String.fromCharCode(num+64);
    }
