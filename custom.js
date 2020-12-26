const data = {
    USD: {EUR: 0.82, GBP: 0.74, BWP:9.00},
    EUR: {USD: 1.23, GBP: 0.91, BWP:9.00},
    GBP: {USD: 1.35, EUR: 1.10, BWP:9.00},
    BWP: {USD: 1.35, EUR: 1.10, GBP: 1.14}, //BOTSVANA
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName) {
    for (let i = 0; i < elements.length; i++) {
        const currencyKeyDiv = document.createElement("div");
        currencyKeyDiv.setAttribute("class", "fromDiv");
        const currencyKeyInput = document.createElement("input");
        currencyKeyInput.setAttribute("type", "radio");
        currencyKeyInput.setAttribute("name", inputName);
        currencyKeyInput.setAttribute("id", inputName + elements[i]);
        currencyKeyInput.setAttribute("value", elements[i]);

        const currencyKeyLabel = document.createElement("label");
        currencyKeyLabel.setAttribute("for", inputName + elements[i]);
        currencyKeyLabel.textContent = elements[i];

        currencyKeyDiv.appendChild(currencyKeyInput);
        currencyKeyDiv.appendChild(currencyKeyLabel);
        root.appendChild(currencyKeyDiv);
    }
}


//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);


const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function () {

    let fromTarget, toTarget;
    // kimden ceviriyourz
    var _fromTarget = document.querySelectorAll("input[name='currency_from']");
    let fromCounter = 0;
    for (frt of _fromTarget) {
        if (frt.checked) {
            fromTarget = frt.value;
            console.log("fromTar");
            console.log(fromTarget);
            fromCounter = 0
            break;
        } else {

            fromCounter++;
        }
    }


    // kime ceviriyoruz
    var _toTarget = document.querySelectorAll("input[name='currency_to']");
    var tCounter = 0;
    for (t of _toTarget) {

        if (t.checked) {
            console.log(t);
            toTarget = t.value;
            console.log("toTarget");
            console.log(toTarget);
            tCounter = 0;
            break;
        } else {

            tCounter++;
        }
    }


    // amountu alalim
    const amount = document.querySelector("input[name='amount']").value;
    
    if((toTarget == null && toTarget==undefined)&&(fromTarget==null && fromTarget==undefined)){
      const currencyResult = document.querySelector("#currency-result");
            currencyResult.innerHTML = "Seçim Yapınız";
      return false;
    } 
    if(toTarget == fromTarget){
        const currencyResult = document.querySelector("#currency-result");
            currencyResult.innerHTML = "Aynı Seçim Olamaz";
        return false;
    }

    if (fromCounter == 0) {
        if (tCounter == 0) {
            const currentCurrencyObject = data[fromTarget];

            const resultForOne = currentCurrencyObject[toTarget];
            const result = amount * resultForOne;
            console.log(resultForOne);
            console.log(amount);
            const currencyResult = document.querySelector("#currency-result");
            currencyResult.innerHTML = amount + " " + fromTarget + " = " + result + " " + toTarget;
        } else {
            const currencyResult = document.querySelector("#currency-result");
            currencyResult.innerHTML = "To Seçili Olmalı";
        }
    }else{
        const currencyResult = document.querySelector("#currency-result");
            currencyResult.innerHTML = "From Seçili Olmalı";
    }
});