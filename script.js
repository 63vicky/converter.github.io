const requestOptions = {
  method: "GET",
  redirect: "follow",
};

function getData() {
  var amount = document.getElementById("txtAmt");
  var lblResult = document.getElementById("lblRes");
  var From = document.getElementById("frmCurr");
  var To = document.getElementById("toCurr");
  var ToVal = To.value;

  fetch(`https://api.frankfurter.app/latest?amount=${amount.value}&from=${From.value}&to=${To.value}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      let paesedRes = JSON.parse(result);
      lblResult.innerHTML = `${amount.value} ${From.value} = ${paesedRes.rates[ToVal].toFixed(2)} ${To.value}`;
    })
    .catch((error) => console.error(error));
}

// function updateTolist(selectedFrm) {
//   // Get the select element
//   const select = document.querySelector("#toCurr");

//   // Get all the options in the select element
//   const options = select.options;

//   // Loop through the options and print their values
//   for (const option of options) {
//     if (option.value == selectedFrm) {
//       option.disabled = true;
//     }
//   }
// }
function updateTolist(selectedFrm) {
  // Get the select element
  const select = selectedFrm;

  // Filter out the selected currency
  let options = Array.from(select.options);

  // Add the new options to the dropdown list
  options.forEach((option) => {
    if (option.value == selectedFrm.value) {
      option.setAttribute("disabled", "disabled");
    } else {
      option.removeAttribute("disabled", "disabled");
    }
  });

  $(".Sel2").select2({
    templateResult: function (item) {
      return format(item);
    },
    templateSelection: function (item) {
      return format(item);
    },
  });
}

document.body.addEventListener("keyup", KeyCheck); //or however you are calling your method
function KeyCheck(event) {
  var KeyID = event.keyCode;
  switch (KeyID) {
    case 8:
      chkNumber();
      break;
    case 32:
      chkNumber();
      break;
    case 46:
      chkNumber();
      break;
    default:
      break;
  }
}
function chkNumber() {
  let amtChk = document.getElementById("txtAmt");
  if (amtChk.value.trim() == "") {
    amtChk.value = 1;
  }
}

function format(item) {
  if (!item.id) {
    return item.text;
  }
  var countryUrl = "https://hatscripts.github.io/circle-flags/flags/";

  var url = countryUrl;
  var img = $("<img>", {
    class: "img-flag",
    width: 26,
    src: url + item.element.getAttribute("data-flag").toLowerCase() + ".svg",
  });
  var span = $("<span>", {
    text: " " + item.text,
  });
  span.prepend(img);
  return span;
}

$(document).ready(function () {
  $(".Sel2").select2({
    templateResult: function (item) {
      return format(item);
    },
    templateSelection: function (item) {
      return format(item);
    },
  });
  chkNumber();
  getData();
});
