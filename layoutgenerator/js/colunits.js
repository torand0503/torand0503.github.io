let colUnits    = document.getElementById("colunits");

const generateColSizeElement = () => {
  return $("<div />").append($("<input />").addClass("columnWidth") )
}

colUnits.nrOfColumns = () => {
  return $(colUnits).css("grid-template-columns").split(" ").length;
}

colUnits.getColUnit = (index) => {
  return $(colUnits).find(".columnWidth").eq(index)
}

colUnits.addColUnit = () => {
  let colCount = colUnits.nrOfColumns()

  $(colUnits).css("grid-template-columns", `repeat(${colCount+1},1fr)`)
  
  let colSizeElement = generateColSizeElement();

  $(colSizeElement).height("1fr").css("grid-area", `1 / ${colCount + 1}` ).appendTo($(colUnits))

  colUnits.updateColSizes()
}

colUnits.popColUnit = () => {
  let colCount = colUnits.nrOfColumns()

  $(colUnits).css("grid-template-columns", `repeat(${colCount-1},1fr)`)

  $(colUnits).find("div").get()
  .filter(cell => 
    $(cell).css("grid-column-start") == colCount.toString()
  )
  .forEach(cell => {
    $(cell).remove();
  })
}

colUnits.updateColSizes = () => {
  let nrOfCols = colUnits.nrOfColumns();
  
  $(colUnits).find("input").val(`${(1 / nrOfCols) * 100}%`)
}