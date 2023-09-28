let grid = document.getElementById("grid")

grid.nrOfRows = () => {
  return $(grid).css("grid-template-rows").split(" ").length;
}

grid.nrOfColumns = () => {
  return $(grid).css("grid-template-columns").split(" ").length;
}

grid.addRow = () => {
  let rowCount = grid.nrOfRows()
  let colCount = grid.nrOfColumns()

  $(grid).css("grid-template-rows", `repeat(${rowCount+1},1fr)`)
  
  for ( var i = 1; i <= colCount; i++) {
    let generatedCell = generateCell();

    $(generatedCell).css("grid-area", `${rowCount + 1} / ${i}` ).appendTo($(grid))
  }

  rowUnits.addRowUnit()
}

grid.popRow = () => {
  let rowCount = grid.nrOfRows()

  $(grid).css("grid-template-rows", `repeat(${rowCount-1},1fr)`)

  $(grid).find("div").get()
  .filter(cell => 
    $(cell).css("grid-row-start") == rowCount.toString()
  )
  .forEach(cell => {
    $(cell).remove();
  })

  rowUnits.popRowUnit();
}

grid.addColumn = () => {
  let rowCount = grid.nrOfRows()
  let colCount = grid.nrOfColumns()

  $(grid).css("grid-template-columns", `repeat(${colCount+1},1fr)`)
  
  for ( var i = 1; i <= rowCount; i++) {
    let generatedCell = generateCell();
    
    $(generatedCell).css("grid-area", `${i} / ${colCount + 1}` ).appendTo($(grid))
  }

  colUnits.addColUnit()
}

grid.popColumn = () => {
  let colCount = grid.nrOfColumns()

  $(grid).css("grid-template-columns", `repeat(${colCount-1},1fr)`)

  $(grid).find("div").get()
  .filter(cell => 
    $(cell).css("grid-column-start") == colCount.toString()
  )
  .forEach(cell => {
    $(cell).remove();
  })

  colUnits.popColUnit();
}