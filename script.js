"use strict";

import { data } from "./hp.js";

// const url = "http://hp-api.herokuapp.com/api/characters";
// const data = await getData(url)

const grid = document.querySelector(".wrapper_cards");
const inp = document.querySelector("input");
const sel = document.querySelector(".select");
const form = document.forms[0];

const schools = data.map((elem) => elem.house);
const uSchools = [...new Set(schools)];
const index = uSchools.findIndex((elem) => elem === "");
const resIndex = uSchools.splice(index, 1, "Unknown");

// async function getData(url) {
// let response = await fetch(url);
// let data = await response.json();
// return data
// }

function createCard(data) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("div");
  img.className = "card_image";
  img.style.backgroundImage = `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuUqTeGb7w2iryw66jGXnflSb3h8Vy_z3_NQ&usqp=CAU")`;

  const text = document.createElement("div");
  text.className = "card_items";

  const image = document.createElement("img");
  image.setAttribute("src", data.image);
  image.setAttribute("width", 334);
  image.setAttribute("height", 192);

  const name = document.createElement("h3");
  name.textContent = data.name;
  name.className = "card_items--h3";

  const actor = document.createElement("p");
  actor.textContent = `Actor: ${data.actor}`;
  actor.className = "card_items--p";

  const gender = document.createElement("p");
  gender.textContent = `Gender: ${data.gender}`;
  gender.className = "card_items--p";

  const house = document.createElement("p");
  house.textContent = `House: ${data.house}`;
  house.className = "card_items--p";

  const wand = document.createElement("p");
  wand.textContent = `Wand core: ${data.wand.core}`;
  wand.className = "card_items--p";

  const alive = document.createElement("p");
  alive.textContent = `Alive: ${data.alive === true ? "yes" : "no"}`;
  alive.className = "card_items--p";

  card.append(img);
  card.append(text);
  img.append(image);
  text.append(name, actor, gender, house, wand, alive);

  return card;
}

data.forEach((elem) => grid.append(createCard(elem)));

form.addEventListener("submit", (event) => event.preventDefault());

inp.addEventListener("input", inputName);

sel.addEventListener("change", inputName);

function inputName() {
  let name = inp.value.toLowerCase().trim();
  let house = sel.value.toLowerCase();
  let res = data
    .filter((elem) => elem.name.toLowerCase().includes(name))
    .filter((elem) => elem.house.toLowerCase() === house || house === "all");

  grid.innerHTML = "";
  res.forEach((elem) => grid.append(createCard(elem)));
}

function createOptions(school) {
  const opt = document.createElement("option");
  opt.textContent = school;
  opt.setAttribute("value", school === "Unknown" ? "" : school);
  sel.append(opt);
}

uSchools.forEach((elem) => sel.append(createOptions(elem)));

window.onscroll = function () {
  showPosition();
};

function showPosition() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;

  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  let scrolled = (winScroll / height) * 100;

  document.getElementById("progress-bar").style.width = scrolled + "%";
}
showPosition();
