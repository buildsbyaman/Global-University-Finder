const btn = document.querySelector("button");
const ul = document.querySelector("ul");
const h3 = document.querySelector("h3");
const searchBox = document.querySelector("input");

const apiFetchData = async (searchBoxValue) => {
  let apiCall = await axios.get(
    `http://universities.hipolabs.com/search?country=${searchBoxValue}`
  );
  h3.innerText = "";
  uniLis = apiCall.data;
  if (apiCall.data.length == 0) {
    h3.innerText = "Please enter a valid country!";
  }
  for (let uniLi of uniLis) {
    let li = document.createElement("li");

    let p1 = document.createElement("p");

    p1.innerHTML = uniLi["state-province"]
      ? `Location - ${uniLi["state-province"]}`
      : `${searchBoxValue}`;

    let p2 = document.createElement("p");
    p2.innerText = "College Domains - ";

    let domains = uniLi["web_pages"];
    for (let domain of domains) {
      let linkp = document.createElement("p");
      linkp.innerHTML = `<a href="${domain}" target=_blank>${domain}</a>`;
      console.log(linkp);
      p2.appendChild(linkp);
    }

    li.innerText = uniLi.name;

    li.appendChild(p1);
    li.appendChild(p2);
    ul.appendChild(li);
  }
};

btn.addEventListener("click", () => {
  let searchBoxValue = searchBox.value.trim();
  searchBox.value = "";
  ul.innerText = "";

  if (searchBoxValue) {
    h3.innerText = "Loading....";
    apiFetchData(searchBoxValue);
  }
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    btn.click();
  }
});
