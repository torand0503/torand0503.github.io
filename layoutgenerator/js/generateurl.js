const generateClockUrl = (black=false) => {
  let baseUrl = "https://torand0503.github.io/clock.html"

  let clockUrl = `${baseUrl}${black ? "?black=1": ""}`

  return clockUrl
}

const generateGooglePresentationUrl = (inputs) => {
  let publishUrl = $(inputs[0]).val()
  let delayms    = $(inputs[1]).val()

  let outputUrl = `${publishUrl}?start=true&loop=true&delayms=${delayms}&rm=minimal`

  return outputUrl
}

const generateVästtrafikUrl = (inputs) => {
  let outputUrl = "https://avgangstavla.vasttrafik.se/?source=vasttrafikse-depatureboardlinkgenerator"

  let stop1 = $(inputs[0]).val()
  let stop2 = $(inputs[1]).val()

  if (stop1) outputUrl += `&stopAreaGid=${stop1}`
  if (stop2) outputUrl += `&stopAreaGid=${stop2}`
  
  return outputUrl
}

const generateUrlParam = (cell) => {
  let selectChoice = $(cell).find(".selectChoice")

  let selectValue = $(selectChoice).val()

  if (selectValue == "Google Presentation")
    return generateGooglePresentationUrl($(cell).find("input"))
  else if (selectValue == "Västtrafik")
    return generateVästtrafikUrl($(cell).find("input"))
  else if (selectValue == "Klocka") {
    return generateClockUrl();
  }
  else if (selectValue == "Klocka svart") {
    return generateClockUrl(black=true)
  }
  else if (selectValue == "Hemsida") {
    return $(cell).find("input").first().val()
  }
}

console.log("");

const showUrl = (url) => {
  $("#buttonCopyPolicyForExtensions").click(function () {
    let policyForExtensions = `{
      "schedule": {
        "Value": [
          {
            "items": [
              {
                "autoReload": 600000,
                "cachePolicy": "forever",
                "content": "${url}",
                "repetition": "-",
                "zone": "fs",
                "zoneHeight": "100%",
                "zoneWidth": "100%",
                "zoneXOffset": "0",
                "zoneYOffset": "0"
              }
            ],
            "name": "${ document.getElementById('configname').value }"
          }
        ]
      }
    }`

    navigator.clipboard.writeText(policyForExtensions);
  })

  $("#buttonCopyToClipboard").click(function () {
    navigator.clipboard.writeText(url);
  })

  $("#myModal").css("display", "block");
}

const generateUrl = (gridOutput) => {
  let fileName = window.location.href.slice(window.location.href.lastIndexOf("/")+1)
  let url = window.location.href.slice(0, window.location.href.lastIndexOf("/"))
  url = url.slice(0, url.lastIndexOf("/")) + "/signage.html"

  let baseURL = new URL(url)

  gridOutput = gridOutput.map(row => {
    return row.map(cell => generateUrlParam(cell))
  })

  let [ul, ur] = gridOutput[0] || []
  let [ll, lr] = gridOutput[1] || []

  let params = {ul, ur, ll, lr}

  let sizes = {
    uh: $(rowUnits.getRowUnit(0)).val(),
    lh: $(rowUnits.getRowUnit(1)).val(),
    lw: $(colUnits.getColUnit(0)).val(),
    rw: $(colUnits.getColUnit(1)).val(),
  }

  console.log(sizes)

  console.log(colUnits.getColUnit(1))

  sizes = Object.fromEntries(Object.entries(sizes).filter(([k, v]) => v))

  params = Object.fromEntries(Object.entries(params).filter(([k, v]) => v))

  params = Object.assign(params, sizes)

  params = Object.fromEntries(Object.entries(params).filter(([k, v]) => v))

  baseURL.search = new URLSearchParams(params)

  let outputUrl = baseURL.toString();

  showUrl(outputUrl)
}

const prepareAndGenerateUrl = () => {
  let nrOfRows = grid.nrOfRows();
    let nrOfColumns = grid.nrOfColumns();

    let gridOutput = []

    for ( var i = 0; i < nrOfRows; i++) {
      gridOutput.push([])
    }

    for ( var i = 1; i < nrOfRows + 1; i++) {
      for ( var j = 1; j < nrOfColumns + 1; j++) {
        let gridCell = $("#grid").find(".gridCell").filter(function() {

          return $(this).css("grid-area").startsWith(`${i} / ${j}`)
        }).first();

        gridOutput[i-1][j-1] = gridCell;
      }
    }

  generateUrl(gridOutput);
}
