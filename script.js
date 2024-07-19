let BaseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"

let dropdown = document.querySelectorAll(".dorpdown select");
let btn = document.querySelector("form button");
let formCurr = document.querySelector(".form select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updateExchangeRate();
})

for (let select of dropdown) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "form" && currcode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
    const URL = `${BaseURL}/${formCurr.value.toLowerCase()}/${toCurr.value.toLowerCase(0)}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalamount = amtval * rate;
    msg.innerText = `${amtval} ${formCurr.value} = ${finalamount} ${toCurr.value}`;
}