"use strict"

let btnCreate = document.getElementById('btnCreate')
let btnSaveCr = document.getElementById('btnSaveCr')
let btnSave = document.getElementById('btnSave')
let wrapper = document.getElementById('wrapper')
let btnCrud = document.getElementById('btnCrud')
let inform = document.getElementById('inform')
let selected_index = 1
const name = document.getElementsByTagName('input')[0] 
const surname = document.getElementsByTagName('input')[1]
const otchestvo = document.getElementsByTagName('input')[2]
const age = document.getElementsByTagName('input')[3]
const organisation = document.getElementsByTagName('input')[4]





let tblInfo = localStorage.getItem('tblInfo')
tblInfo = JSON.parse(tblInfo) 
let tblInfo0 = []

for (let key in tblInfo){
    let house = tblInfo[key]
    let obj = new Room(house.name, house.surname, house.otchestvo, house.age, house.organisation)
    tblInfo0.push(obj)

}



if (tblInfo === null) {

    tblInfo = []
} else{

    tblInfo = []
    tblInfo = tblInfo.concat(tblInfo0)
}


btnCreate.addEventListener('click', function () {

    btnCrud.style.display = 'none'
    wrapper.style.display = 'flex'
    list()

})


btnSave.addEventListener('click', function () {

    create()
    list()

})


function create() {

    let propInfoObj = new Room(name.value, surname.value, otchestvo.value, age.value, organisation.value)
    tblInfo.push(propInfoObj)

    localStorage.setItem("tblInfo", JSON.stringify(tblInfo))

}

function list() {

    let tblList = document.getElementById('tblList')

    tblList.innerHTML = ''
    tblList.innerHTML = `
            <thead class="colorTableTitle">
                <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Отчество</th>
                <th>Возраст</th>
                <th>Организация</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            `

    for (let i in tblInfo) {
        let per = tblInfo[i]
        let tbody = document.querySelector('#tblList tbody')

        tbody.innerHTML += `<tr> 
        <td>${per.name}</td>
        <td>${per.surname}</td>
        <td>${per.otchestvo}</td>
        <td>${per.age} </td>
        <td>${per.organisation} </td>
                <td>
                <div class="text-center">
                    <i class="fa fa-gavel" title='Edit${i}' id='btnEdit' onclick="editBtn(this)" ></i>  
                    <i class="fa fa-ban " title='Delete${i}' id='btnDelete' onclick="deleteBtn(this)"></i>
                </div>
                </td>
                
                </tr>`
    } 
}

function deleteBtn (e) {

    selected_index = e.getAttribute('title').replace('Delete', '')

    tblInfo.splice(selected_index, 1)

    localStorage.setItem("tblInfo", JSON.stringify(tblInfo))

    list()
}

function editBtn (e) {

    btnSave.style.display = "none"
    btnSaveCr.style.display = "inline-block"

    selected_index = e.getAttribute('title').replace('Edit', '')

    let per = tblInfo[selected_index]
    per.setInputValue(name, surname, otchestvo, age, organisation)

    inform.innerHTML = ""
    inform.innerHTML += `<div class="padd">${per.getInfoHouse()}</div>`



}

function btnSaveCreate() {
    
    btnSave.style.display = "inline-block"
    btnSaveCr.style.display = "none"

    tblInfo[selected_index].setParameters(name, surname, otchestvo, age, organisation)

    localStorage.setItem("tblInfo", JSON.stringify(tblInfo))

    list()
}

function House(name, surname, otchestvo, age, organisation) {
    this.name = name
    this.surname = surname
    this.otchestvo = otchestvo
    this.age = age
    this.organisation = organisation

    this.getInfoHouse = function () {
        return "Имя: " + this.name + ", Фамилия: " + this.surname +
            ", Отчество. " + this.otchestvo + "Возраст: " + this.age + ", Работает в организации: " + this.organisation
    }
    this.getAdress = function () {
        return this.name
    }
}


function Room(name, surname, otchestvo, age, organisation) {

    House.apply(this, arguments)

    this.age = age
    this.organisation = organisation

    this.setParameters = function (name, surname, otchestvo, age, organisation) {
        this.name = name.value
        this.surname = surname.value
        this.otchestvo = otchestvo.value
        this.age = age.value
        this.organisation = organisation.value
    }
    this.setInputValue = function (name, surname, otchestvo, age, organisation) {
        name.value = this.name
        surname.value = this.surname
        otchestvo.value = this.otchestvo
        age.value = this.age
        organisation.value = this.organisation

    }
}



