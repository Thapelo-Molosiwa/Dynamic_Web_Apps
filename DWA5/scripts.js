const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  const wholenumber = dividend / divider;

  if (isNaN(dividend) || isNaN(divider)) {

    document.body.innerText = " Something critical went wrong. Please reload the page.";

    console.error("Invalid input provided. Program crashed");

  } else if (dividend == "" || divider === "") {

    result.innerText = " Division not performed. Both values are required in inputs. Try again ";

  } else if (dividend < 0 || divider < 0) {

    result.innerText = "Division not performed. Invalid number provided. Try again";
    
  } else result.innerText = Math.floor(wholenumber);
});


