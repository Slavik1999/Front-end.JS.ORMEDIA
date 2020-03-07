class Route {
  constructor(routeCome, dateGo, dateCome, price, transport) {
    this.routeCome = routeCome;
    this.dateGo = dateGo;
    this.dateCome = dateCome;
    this.price = price;
    for (let item of transport) {
      if (item.checked) {
        this.transport = item;
      }
    }
  }

  setValue = () => {
    let route = [
      this.routeCome.value,
      this.dateGo.value,
      this.dateCome.value,
      this.price.value,
      this.transport.value
    ];
    let list = document.getElementById("items");
    let tr = document.createElement("tr");
    for (let i = 0; i < route.length; i++) {
      let td = document.createElement("td");
      td.innerHTML = route[i];
      tr.appendChild(td);
    }
    list.appendChild(tr);
  };
}

form = document.getElementById("form");
routeCome = document.getElementById("route");
dateGo = document.getElementById("dateGo");
dateCome = document.getElementById("dateCome");
price = document.getElementById("price");
transport = document.querySelectorAll("input[name='transport']");
btnStyle = document.getElementById("btnStyle");
section = document.querySelectorAll("section");

btnStyle.addEventListener("click", () => {
  for (let val of section) {
    val.style.display = "block";
  }
  btnStyle.style.display = "none";
});

this.form.addEventListener("submit", event => {
  event.preventDefault();
  let route = new Route(routeCome, dateGo, dateCome, price, transport);
  route.setValue();
});
