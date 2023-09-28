let rowUnits    = document.getElementById("rowunits");

const generateRowSizeElement = () => {
  return $("<div />").append($("<input />").addClass("rowHeight") )
}

rowUnits.nrOfRows = () => {
  return $(rowUnits).css("grid-template-rows").split(" ").length;
}

rowUnits.getRowUnit = (index) => {
  return $(rowUnits).find(".rowHeight").eq(index)
}

rowUnits.addRowUnit = () => {
  let rowCount = rowUnits.nrOfRows()

  $(rowUnits).css("grid-template-rows", `repeat(${rowCount+1},1fr)`)
  
  let rowSizeElement = generateRowSizeElement();

  $(rowSizeElement).height("1fr").css("grid-area", `${rowCount + 1} / 1` ).appendTo($(rowUnits))

  rowUnits.updateRowSizes();
}

rowUnits.popRowUnit = () => {
  let rowCount = rowUnits.nrOfRows()

  $(rowUnits).css("grid-template-rows", `repeat(${rowCount-1},1fr)`)

  $(rowUnits).find("div").get()
  .filter(cell => 
    $(cell).css("grid-row-start") == rowCount.toString()
  )
  .forEach(cell => {
    $(cell).remove();
  })
}

rowUnits.updateRowSizes = () => {
  let nrOfRows = rowUnits.nrOfRows();
  
  $(rowUnits).find("input").val(`${(1 / nrOfRows) * 100}%`)
}