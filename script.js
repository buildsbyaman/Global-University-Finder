const btn = document.querySelector("button");
const ul = document.querySelector("ul");
const h3 = document.querySelector("h3");
const searchBox = document.querySelector("input");

const apiFetchData = async (searchBoxValue) => {
  try {
    let apiUrl;
    if (location.hostname === "127.0.0.1" || location.hostname == "localhost") {
      apiUrl = "http://universities.hipolabs.com/search";
    } else {
      apiUrl =
        "https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search";
    }

    let apiCall = await axios.get(`${apiUrl}?country=${searchBoxValue}`);
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

      let domains = uniLi["domains"];
      for (let domain of domains) {
        let linkp = document.createElement("p");
        linkp.innerHTML = `<a href="${domain}" target=_blank>${domain}</a>`;
        p2.appendChild(linkp);
      }

      li.innerText = uniLi.name;

      li.appendChild(p1);
      li.appendChild(p2);
      ul.appendChild(li);
    }
  } catch (err) {
    h3.textContent = "Failed to fetch data. Please try again later.";
    console.error("Error occurred while connecting to the API - ", err.message);
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

window.open("https://cors-anywhere.herokuapp.com/corsdemo", "_blank");
