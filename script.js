const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

function getData() {
  var amount = document.getElementById('txtAmt');
  var lblResult = document.getElementById('lblRes');
  var From = document.getElementById('frmCurr');
  var To = document.getElementById('toCurr');
  var ToVal = To.value;

  fetch(
    `https://api.frankfurter.app/latest?amount=${amount.value}&from=${From.value}&to=${To.value}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let paesedRes = JSON.parse(result);
      lblResult.innerHTML = `${amount.value} ${From.value} = ${paesedRes.rates[
        ToVal
      ].toFixed(2)} ${To.value}`;
    })
    .catch((error) => console.error(error));
}

function updateTolist(selectedFrm) {
  // Get the select element
  const select = document.querySelector('#toCurr');

  // Get all the options in the select element
  const options = select.options;

  // Loop through the options and print their values
  for (const option of options) {
    if (option.value == selectedFrm) {
      option.disabled = true;
    }
  }
}

window.onload = chkNumber();
document.body.addEventListener('keyup', KeyCheck); //or however you are calling your method
function KeyCheck(event) {
  var KeyID = event.keyCode;
  console.log(KeyID);
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
  let amtChk = document.getElementById('txtAmt');
  if (amtChk.value.trim() == '') {
    amtChk.value = 1;
  }
}
