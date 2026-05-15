const eventList = document.querySelector("#event-list");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");

fetch("http://localhost:5000/events")
  .then((response) => response.json())
  .then((events) => {
    events.forEach((event) => renderEvent(event));
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();

  if (!title) {
    alert("Please enter an event title.");
    return;
  }

  fetch("http://localhost:5000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  })
    .then((response) => response.json())
    .then((event) => {
      renderEvent(event);
      titleInput.value = "";
    });
});

const renderEvent = (event) => {
  const li = document.createElement("li");
  li.textContent = event.title;
  eventList.appendChild(li);
};