import { LaneComponent } from "./components/lane.component";

import "./style.css";

const addSection = document.querySelector("#add-section");
const modal = document.querySelector("#add-modal");
const form = modal.querySelector("form");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const input = ev.target.querySelector("input");
  const subreddit = input.value;

  if (!subreddit) return;

  modal.classList.add("pointer-events-none");
  modal.firstElementChild.classList.add("opacity-80");

  await LaneComponent({ subreddit });

  modal.classList.remove("pointer-events-none");
  modal.classList.remove("opacity-80");
  modal.classList.add("hidden");
  input.value = "";
});

addSection.querySelector("button").addEventListener("click", (ev) => {
  ev.stopPropagation();
  const input = modal.querySelector("input");

  modal.classList.remove("pointer-events-none");
  modal.firstElementChild.classList.remove("opacity-80");
  modal.classList.remove("hidden");
  input.value = "";
  input.focus();
});
