function handleLoadingPlayer() {
  let divcap = $("#selectionCap");
  divcap.empty();
  let listPlayer = $("#textplayer").val().toUpperCase();
  
  // console.log(listPlayer.toUpperCase());
  const arrayPlayer = listPlayer
    .split(/\s*,\s*|\s+/)
    .map((entry) => {
      // Remove números, pontos e o emoji 🆗
      let firstName = entry.replace(/[\d.🆗]/g, "");
      // Remove texto entre parênteses
      firstName = firstName.replace(/\([^)]*\)/g, "");
      // Remove espaços extras no início e no final
      firstName = firstName.trim();
      // Extrai apenas o primeiro nome
      return firstName.split(" ")[0];
    })
    .filter((item) => item !== "");
  // lucas,nath,laisa,gil,didi,filipe,edu,fernadnda
  if (arrayPlayer.length > 4) {
    divcap.removeClass("d-none");
  $("#txtlistateam").addClass("d-none");
  $("#textplayer").removeClass('is-invalid');
    let quantidadePlayer = arrayPlayer.length;
    let quantCapValid = Math.floor(quantidadePlayer / 4);
    $("#quantcaptem").val(quantCapValid);
  
    let dados = "<div class='row border bg-ice mt-2 rounded'>";
    dados += "<div class='col-12 mb-2'>";
    dados += `Selecione ${quantCapValid} capitão do time:`;
    dados += "</div>";
  
    arrayPlayer.forEach((element) => {
      
      dados += "<div class='col-6 '>";
      dados += "<div class='form-check'>";
      dados += `<input class='form-check-input border border-info' type='checkbox' value='${truncarString(element)}' id='${truncarString(element)}' />`;
      dados += `<label class='form-check-label' for=${element}>`;
      dados += truncarString(element);
      dados += "</label>";
      dados += "</div>";
      dados += "</div>";
    });
    dados += "</div>";
    dados += "<div class='text-center row rounded'>";
    dados +=
      "<button type='button' class='btn btn-danger col-12 btn-lg mt-3 form-group' onclick='getCaptionTeam()'>";
    dados += "Sortear Time";
    dados += "</button>";
    dados += "</div>";
  
    divcap.append(dados);
  } else {
    $("#textplayer").addClass('is-invalid');
  }
}

function getCaptionTeam() {
  let checkedCheckboxes = [];
  $('input[type="checkbox"]:checked').each(function () {
    checkedCheckboxes.push($(this).val());
  });
  // console.log(checkedCheckboxes.length);
  var checkboxesNaoMarcados = [];
  $('input[type="checkbox"]')
    .not(":checked")
    .each(function () {
      checkboxesNaoMarcados.push($(this).val());
    });
  let quantTotal = $("#quantcaptem").val();
  let quantSelect = checkedCheckboxes.length;

  if (quantSelect == quantTotal) {
    handleGroupForCaptain(checkboxesNaoMarcados, checkedCheckboxes);
  } else {
    desmarcarCheckboxes();
    handleGroupFreedom();
  }
}

function handleGroupForCaptain(checkboxesNaoMarcados, checkedCheckboxes) {
  let resultSorteio = $("#result");
  resultSorteio.empty();
  resultSorteio.removeClass("d-none");
  $("#selectionCap").addClass("d-none");

  // console.log("Checkboxes marcados:", checkedCheckboxes);
  // console.log("Checkboxes Não marcados:", checkboxesNaoMarcados);

  checkedCheckboxes = shuffle(checkedCheckboxes);
  checkboxesNaoMarcados = shuffle(checkboxesNaoMarcados);

  var grupos = [];
  while (checkedCheckboxes.length > 0) {
    var grupo = [];
    // Adicionar um checkbox marcado ao grupo
    grupo.push(checkedCheckboxes.pop());
    // Adicionar três checkboxes não marcados ao grupo
    for (var i = 0; i < 3; i++) {
      if (checkboxesNaoMarcados.length > 0) {
        grupo.push(checkboxesNaoMarcados.pop());
      }
    }
    grupos.push(grupo);
  }
  let dados = "";
  grupos.forEach(function (grupo, index) {
    // console.log("Grupo " + (index + 1) + ":");
    dados += "<div class='border bg-ice mb-2 container-fluid rounded'>";
    dados +=
      "<p class='bg-title poppins-bold fs-4 text-center'> Time " +
      (index + 1) +
      "</p>";
    dados += "<div class='row' >";
    grupo.forEach(function (player, idx) {
      // console.log((idx + 1) + "- " + player);
      dados += "<div class='col-6 d-flex justify-content-center'>";
      dados += "<i class='fa-solid fa-volleyball color-volei'></i>";
      dados +=
        "<span class='bg-team poppins-medium-italic col-6 mb-2 mgleft justify-content-start align-items-center'>" +
        player +
        "</span>";
      dados += "</div>";
    });
    dados += "</div>";
    dados += "</div>";
  });
  dados += "<div class='text-center'>";
  dados += "<div>";
  dados +=
    "<button type='button' class='btn btn-danger col-12 btn-lg mt-3' onclick='getCaptionTeam()'>";
  dados += "Sortear Novamente";
  dados += "</button>";
  dados += "</div>";
  dados += "<div>";
  dados +=
    "<button type='button' class='btn btn-danger col-12 btn-lg mt-3 form-group accordion' onclick='handleBackBegin()'>";
  dados += "Inicio";
  dados += "</button>";
  dados += "</div>";
  dados += "</div>";
  resultSorteio.append(dados);
}

function handleGroupFreedom() {
  var checkboxesNaoMarcados = [];
  $('input[type="checkbox"]')
    .not(":checked")
    .each(function () {
      checkboxesNaoMarcados.push($(this).val());
    });
  let resultSorteio = $("#result");
  resultSorteio.empty();
  resultSorteio.removeClass("d-none");
  $("#selectionCap").addClass("d-none");
  // alert("SELECIONE A QUANTIDADE INFORMADA");
  checkboxesNaoMarcados = shuffle(checkboxesNaoMarcados);
  var grupos = [];
  while (checkboxesNaoMarcados.length > 0) {
    var grupo = [];
    // Adicionar três checkboxes não marcados ao grupo
    for (var i = 0; i < 4; i++) {
      if (checkboxesNaoMarcados.length > 0) {
        grupo.push(checkboxesNaoMarcados.pop());
      }
    }
    grupos.push(grupo);
  }

  let dados = "";
  grupos.forEach(function (grupo, index) {
    // console.log("Grupo " + (index + 1) + ":");
    dados += "<div class='border bg-ice mb-2 container-fluid rounded'>";
    dados +=
      "<p class='bg-title poppins-bold fs-4 text-center'> Time " +
      (index + 1) +
      "</p>";
    dados += "<div class='row'>";
    grupo.forEach(function (player, idx) {
      // console.log((idx + 1) + "- " + player);
      dados += "<div class='col-6 d-flex justify-content-center'>";
      dados += "<i class='fa-solid fa-volleyball color-volei'></i>";
      dados +=
        "<span class='bg-team poppins-medium-italic col-6 mb-2 mgleft justify-content-start align-items-center'>" +
        player +
        "</span>";
      dados += "</div>";
    });
    dados += "</div>";
    dados += "</div>";
  });
  dados += "<div class='text-center'>";
  dados += "<div>";
  dados +=
    "<button type='button' class='btn btn-danger col-12 btn-lg mt-3' onclick='getCaptionTeam()'>";
  dados += "Sortear Novamente";
  dados += "</button>";
  dados += "</div>";
  dados += "<div>";
  dados +=
    "<button type='button' class='btn btn-danger col-12 btn-lg mt-3 form-group accordion' onclick='handleBackBegin()'>";
  dados += "Inicio";
  dados += "</button>";
  dados += "</div>";
  dados += "</div>";
  resultSorteio.append(dados);

  // console.log("Grupos de checkboxes não marcados:", grupos);
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function handleBackBegin() {
  $("#result").addClass("d-none");
  $("#result").empty();
  $("#txtlistateam").removeClass("d-none");
}

function desmarcarCheckboxes() {
  $('input[type="checkbox"]').prop("checked", false);
}

function truncarString(str) {
  if (str.length <= 12) {
      return str;
  } else {
      return str.substring(0, 13);
      // return str.substring(0, 12) + "...";
  }
}