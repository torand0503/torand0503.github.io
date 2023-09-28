$(function() {
  console.log("Hallå")
  console.log(generateClockUrl(black=true));

  $("span").click(function() {
    $("#myModal").css("display", "none")
  })

  $("#buttonGenerateUrl").click(function() {
    prepareAndGenerateUrl();
  })

  $("#buttonSaveLayout").click(function() {
    saveLayout();
  })

  $("#buttonReset").click(function() {
    resetLayout();
  })

  $("#buttonOpenGoogleAdmin").click(function() {
    openGoogleAdmin();
  })

  let nrOfColumns = document.getElementById("nrOfColumns")
  let nrOfRows    = document.getElementById("nrOfRows")

  let initialCell = generateCell();

  $(initialCell).css("grid-area", `1 / 1` ).appendTo($(grid))

  $(nrOfColumns).mouseup(function (event) {
    const gridComputedStyle = window.getComputedStyle(grid);

    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    const value = parseInt($(this).val());

    if (value > gridColumnCount) grid.addColumn();
    if (value < gridColumnCount) grid.popColumn();
  })

  $(nrOfRows).mouseup(function (event) {
    const gridComputedStyle = window.getComputedStyle(grid);

    const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
    const value = parseInt($(this).val());

    if (value > gridRowCount) grid.addRow();
    if (value < gridRowCount) grid.popRow();
  })
});
