const generateCell = () => {

  let optionParams = {
    "Google Presentation": [
      "Publish URL (embed)",
      "Delay",
    ], "Västtrafik": [
      "Hållplats 1",
      "Hållplats 2"
    ], "Hemsida": [
      "URL"
    ], "Klocka": [],
    "Klocka svart": [],
  }

  let options = $("<select />").addClass("classic").addClass("selectChoice").append([
    $("<option />").text("Välj alternativ:"),
    $("<option />").text("Google Presentation"),
    $("<option />").text("Västtrafik"),
    $("<option />").text("Hemsida"),
    $("<option />").text("Klocka"),
    $("<option />").text("Klocka svart"),
  ])

  $(options).on("change", function() {
    let settings = optionParams[this.value]

    $(options).parent().find("div.optionParams").empty().append(
      settings.map(setting => $("<fieldset />").append([
        `<label for="${setting}">${setting}</label>`,
        $("<input />").on("paste", function() {
          let _this = this;
          setTimeout(function(){
            parsePaste(_this);
          },1);
        })
      ]))
    )
  })
  return $("<div />").addClass("gridCell").append($("<div />").addClass("settings").append([options, $("<div />").addClass("optionParams")]) )
}
