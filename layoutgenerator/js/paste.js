const pasteGooglePresentation = (cellChoice, pasteValue) => {

  let url = pasteValue.slice(pasteValue.indexOf("https"), pasteValue.indexOf('"', pasteValue.indexOf("https") + 1))
  
  let embedUrl = url.slice(0, url.indexOf("?"))
  let params = url.slice(url.indexOf("?"))
  
  const urlParams = new URLSearchParams(params);

  let inputs = $(cellChoice).next(".optionParams").find("input")

  $(inputs[0]).val(embedUrl)
  $(inputs[1]).val(urlParams.get("delayms"))
}

const pasteVästtrafikPresentation = (cellChoice, pasteValue) => {
  let params = pasteValue.slice(pasteValue.indexOf("?"))

  const urlParams = new URLSearchParams(params);

  let stopAreaGids = []

  for ( let [urlParam, stopAreaGid] of urlParams) {
    if (urlParam == "stopAreaGid")
      stopAreaGids.push(stopAreaGid)
  }

  let inputs = $(cellChoice).next(".optionParams").find("input")

  stopAreaGids.forEach((stopAreaGid, index) => {
    console.log(inputs[index])
    console.log(stopAreaGid)

    $(inputs[index]).val(stopAreaGid);
  })
}

const parsePaste = (input) => {
  let cellChoice = $(input).parent().parent().prev(".selectChoice")

  let pasteValue = $(input).val();

  let cellValue = $(cellChoice).val()

  if (cellValue == "Google Presentation")
    pasteGooglePresentation(cellChoice, pasteValue)
  if (cellValue == "Västtrafik")
    pasteVästtrafikPresentation(cellChoice, pasteValue)
}
