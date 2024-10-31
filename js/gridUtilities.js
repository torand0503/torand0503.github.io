var layouts = {
    fullScreenUL: `
        "ul ul"
        "ul ul"
    `,
    allFour: `
        "ul ur"
        "ll lr"
    `,
    topFull: `
        "ul ul"
        "ll lr"
    `,
    bottomFull: `
        "ul ur"
        "ll ll"
    `,
    leftFull: `
        "ul ur"
        "ul lr"
    `,
    rightFull: `
        "ul ur"
        "ll ur"
    `,
    twoFullRows: `
        "ul ur"
        "ul ur"
    `,
    twoFullColumns: `
        "ul ul"
        "ll ll"
    `,
}

function getLayout(items) {
    const ulItem = items.find(item => item.zone === 'ul')
    const urItem = items.find(item => item.zone === 'ur')
    const llItem = items.find(item => item.zone === 'll')
    const lrItem = items.find(item => item.zone === 'lr')

    const ulFullScreen = items.some(item => item.zone === 'ul' && item.height === '100%' && item.width === '100%')

    if (ulFullScreen) {
        return {
            layout: layouts.fullScreenUL,
            gridTemplateRows: "1fr",
            gridTemplateColumns: "1fr",
        }
    }

    const hasTwoFullRows = items.filter(item => item.height === '100%').length >= 2
    const hasTwoFullColumns = items.filter(item => item.width === '100%').length >= 2

    if (hasTwoFullRows) {
        return {
            layout: layouts.twoFullRows,
            gridTemplateRows: "1fr",
            gridTemplateColumns: `${ulItem.width} ${urItem.width}`
        }
    }

    if (hasTwoFullColumns) {
        return {
            layout: layouts.twoFullColumns,
            gridTemplateRows: `${ulItem.height} ${llItem.height}`,
            gridTemplateColumns: "1fr"
        }
    }

    const topFull = items.some(item => item.zone === 'ul' && item.width === '100%')
    const bottomFull = items.some(item => item.zone === 'll' && item.width === '100%')

    if (topFull) {
        return {
            layout: layouts.topFull,
            gridTemplateRows: `${ulItem.height} ${llItem.height}`,
            gridtemplateColumns: `${llItem.width} ${lrItem.width}`
        }
    }

    if (bottomFull) {
        return {
            layout: layouts.bottomFull,
            gridTemplateRows: `${ulItem.height} ${llItem.height}`,
            gridTemplateColumns: `${ulItem.width} ${urItem.width}`
        }
    }

    const leftFull = items.some(item => item.zone === 'ul' && item.height === '100%')
    const rightFull = items.some(item => item.zone === 'ur' && item.height === '100%')

    if (leftFull) {
        return {
            layout: layouts.leftFull,
            gridTemplateRows: `${urItem.height} ${lrItem.height}`,
            gridTemplateColumns: `${ulItem.width} ${urItem.width}`
        }
    }

    if (rightFull) {
        return {
            layout: layouts.rightFull,
            gridTemplateRows: `${ulItem.height} ${llItem.height}`,
            gridTemplateColumns: `${ulItem.width} ${urItem.width}`
        }
    }

    return {
        layout: layouts.allFour,
        gridTemplateRows: `${ulItem.height} ${llItem.height}`,
        gridTemplateColumns: `${ulItem.width} ${urItem.width}`
    }
}

function presentMaterial(items) {

  items.forEach(item => {
    let parameters = item.content;
    
    var urls = {
      'Västtrafik': `https:\/\/avgangstavla.vasttrafik.se\/?source=vasttrafikse-stopareadetailspage&stopAreaGid=${parameters.stopAreaGid1}${parameters.stopAreaGid2 ? "&stopAreaGid=" + parameters.stopAreaGid2 : ""}`,
      'Google Slide': `https:\/\/docs.google.com\/presentation\/d\/e\/${parameters.presentationId}\/embed?start=true&loop=true&delayms=${parameters.delayms}&rm=minimal`, // Removed 'rm=minimal' if not valid
      "Klocka": `https:\/\/torand0503.github.io\/clock.html`,
      "Klocka (Svart)": `https:\/\/torand0503.github.io\/clock.html?black=1`,
      "Klocka (Lila)": `https:\/\/torand0503.github.io\/clock.html?purple=1`,
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
