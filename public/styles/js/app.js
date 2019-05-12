console.log("Client Side javascript is running");

fetch("http://puzzle.mead.io/puzzle").then(response => {
  response.json().then(data => {
    console.log(data);
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  messageTwo.textContent = "";
  messageOne.textContent = "Loading.......";
  const location = search.value;
  fetch("http://localhost:3000/weather?location=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = "";
        console.log(data.location);
        console.log(data.forecast);
        messageTwo.textContent = data.location + "\n" + data.forecast;
      }
    });
  });
});
