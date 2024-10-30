function generateTemplateAreas(items) {
  let templateAreas = "";
  let gridTemplateRows = "";
  let gridTemplateColumns = "";

  // Step 1: Identify items with full width, full height, and partial sizes
  const fullWidthItems = items.filter(item => item.width === "100%");
  const fullHeightItems = items.filter(item => item.height === "100%");
  const partialItems = items.filter(item => item.width !== "100%" && item.height !== "100%");

  // Step 2: Handle different layout scenarios

  if (items.length === 1) {
    // Single item cases with specific scenarios
    const singleItem = items[0];
    if (singleItem.width === "100%" && singleItem.height === "100%") {
      templateAreas = `"${singleItem.zone} ${singleItem.zone}"
                        "${singleItem.zone} ${singleItem.zone}"`;
      gridTemplateRows = "100%";
      gridTemplateColumns = "100%";

    } else if (singleItem.height === "100%" && parseInt(singleItem.width) < 100) {
      templateAreas = `"${singleItem.zone} ."
                      "${singleItem.zone} ."`;

      gridTemplateRows = `100%`;
      gridTemplateColumns = `${parseInt(singleItem.width)}% ${100-parseInt(singleItem.width)}%`;

    } else if (singleItem.width === "100%" && parseInt(singleItem.height) < 100) {
      templateAreas = `"${singleItem.zone} ${singleItem.zone}"
                       ". ."`;

      gridTemplateRows = `${parseInt(singleItem.height)}% ${100-parseInt(singleItem.height)}%`;
      gridTemplateColumns = `100%`;
    }
  } else if (fullWidthItems.length > 0) {
    // Case: At least one full-width item (either in top or bottom)
    const topRow = fullWidthItems[0].zone === "ul" ? `${fullWidthItems[0].zone} ${fullWidthItems[0].zone}` : "ul ur";
    const bottomRow = fullWidthItems[0].zone === "ll" ? `${fullWidthItems[0].zone} ${fullWidthItems[0].zone}` : "ll lr";
    templateAreas = `"${topRow}"
                       "${bottomRow}"`;
  } else if (fullHeightItems.length > 0) {
    // Case: At least one full-height item
    const leftColumn = fullHeightItems[0].zone === "ul" ? `${fullHeightItems[0].zone} ${fullHeightItems[0].zone}` : "ul ur";
    const rightColumn = fullHeightItems[0].zone === "ur" ? `${fullHeightItems[0].zone} ${fullHeightItems[0].zone}` : "ll lr";
    templateAreas = `"${leftColumn} ${rightColumn}"
                       "${leftColumn} ${rightColumn}"`;
  } else if (partialItems.length === 2) {
    // Default 2x2 grid when there are no full-width or full-height items
    templateAreas = `"ul ur"
                       "ll lr"`;
  } else {
    let upperLeft = items.find(item => item.zone == "ul")
    let upperRight = items.find(item => item.zone == "ur")
    let lowerLeft = items.find(item => item.zone == "ll")
    let lowerRight = items.find(item => item.zone == "lr")

    // Handle mixed cases dynamically based on item configuration
    templateAreas = `"ul ur"
                       "ll lr"`;

    gridTemplateRows = `${parseInt(upperLeft.height)}% ${parseInt(lowerLeft.height)}%`;
    gridTemplateColumns = `${parseInt(upperLeft.width)}% ${parseInt(upperRight.width)}%`;
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
