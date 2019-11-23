document.getElementsByClassName("ButtonLink")[0].onclick = function () { window.open("https://vk.com/white_power69", "_blank") }
document.getElementsByClassName("ButtonStyle")[0].onclick = function () {
    var el = document.querySelector("Link");
    if (el.className == "Slava") {
        el.href = "./css/SecondStyle.css";
        el.className = "NotSlava";
    }
    else {
        el.href = "./css/FirstStyle.css";
        el.className = "Slava";
    }
}
document.getElementsByClassName("ButtonMaket")[0].onclick = function () {
    var Cont = document.querySelector(".container")
    Cont.remove();
    var el = document.querySelector("Link");
    el.href = "./css/ThirdStyle.css";
    var Body = document.body;
    var Container = document.createElement("div");
    Body.appendChild(Container);
    Container.className = "Container";
    var Header = document.createElement("div");
    Body.appendChild(Header);
    Header.className = "Header";
    var Telo = document.createElement("div");
    Body.appendChild(Telo);
    Telo.className = "Body";
    var pTelo = document.createElement("p");
    pTelo.innerHTML = "Otrisovka maketa flexbox";
    Telo.appendChild(pTelo);
    var Footer = document.createElement("div");
    Body.appendChild(Footer);
    Footer.className = "Footer";

}

