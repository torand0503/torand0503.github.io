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
