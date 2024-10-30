function generateTemplateAreas(items) {
    let templateAreas = "";
    let gridTemplateRows = "";
    let gridTemplateColumns = "";

    // Identify items by zones and properties
    const upperLeft = items.find(item => item.zone === "ul");
    const upperRight = items.find(item => item.zone === "ur");
    const lowerLeft = items.find(item => item.zone === "ll");
    const lowerRight = items.find(item => item.zone === "lr");
    
    // Full-width check on bottom row
    if (lowerLeft && lowerLeft.width === "100%") {
        // Bottom item spans full width
        templateAreas = `"${upperLeft ? "ul" : "."} ${upperRight ? "ur" : "."}"
                         "${lowerLeft.zone} ${lowerLeft.zone}"`;

        // Set row and column sizes for top and bottom
        gridTemplateRows = `${upperLeft ? upperLeft.height : upperRight.height} ${lowerLeft.height}`;
        gridTemplateColumns = `${upperLeft ? upperLeft.width : "50%"} ${upperRight ? upperRight.width : "50%"}`;
    } else {
        // Default 2x2 layout if no full-width item in the bottom
        templateAreas = `"ul ur"
                         "ll lr"`;

        // Set row and column sizes based on items in each zone
        if (upperLeft && upperRight && lowerLeft) {
            gridTemplateRows = `${upperLeft.height} ${lowerLeft.height}`;
            gridTemplateColumns = `${upperLeft.width} ${upperRight.width}`;
        }
    }

    return {
        templateAreas,
        gridTemplateColumns,
        gridTemplateRows,
    };
}

function presentMaterial(items) {

  items.forEach(item => {
    let parameters = item.content;
    
    var urls = {
      'Västtrafik': `https:\/\/avgangstavla.vasttrafik.se\/?source=vasttrafikse-stopareadetailspage&stopAreaGid=${parameters.stopAreaGid1}${parameters.stopAreaGid2 ? "&stopAreaGid=" + parameters.stopAreaGid2 : ""}`,
      'Google Slide': `https:\/\/docs.google.com\/presentation\/d\/e\/${parameters.presentationId}\/embed?start=true&loop=true&delayms=${parameters.delayms}&rm=minimal`, // Removed 'rm=minimal' if not valid
      "Klocka": `https:\/\/torand0503.github.io\/clock.html`,
      "Klocka (Svart)": `https:\/\/torand0503.github.io\/clock.html?black=1`,
      "Hemsida": parameters.url // Assuming parameters.url is a string
    };


    let url = urls[parameters.type]
  
    let zone = item.zone
  
    let containingDiv = $(`#${zone}`);
  
    let iframe = $("<iframe />").appendTo(containingDiv).prop('src', url)
    
    if (parameters.type == "Västtrafik") {
      $(iframe).css('zoom', '0.30')
    }
  })
}
