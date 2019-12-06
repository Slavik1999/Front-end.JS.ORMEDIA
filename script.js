window.onload = function () {

	var arrayOfWorkers = [];
	var arrSalary = [];
	var numOfIndustry;
	var indOfWorkerChanged;
	var jsonStringOfArray = '';

	var defaultArrayOfForm = ['Иван','Иванов','Иванович','мужской',42,4,10000,'МинскТранс','диспетчер'];

	drawDefaultForm();

	//добавление объекта(персонажа)
	document.getElementById('addPerson').onclick = function () {
	document.getElementById('myForm').style.display='block'
	document.getElementById('addPerson').style.display='none'
	document.getElementById('table').style.display='none'
	document.getElementById('button-submit').style.display='block'
	}

	//выбор определенного типа организации(компании)
	$('#myForm input').on('change', function() {
	if($('input[name=radioName]:checked', '#myForm').val() === '1'){
		numOfIndustry = 1;
		document.getElementById("name-org").innerHTML='Название индустриальной организации';
	}
	else{
		numOfIndustry = 2;
		document.getElementById("name-org").innerHTML='Название транспортной организации';
	}
	});

	//форма 
		$('#myForm').submit(function(event){
	
		if(this.checkValidity())
		{
			//отображение нужных элементов
			document.getElementById('addPerson').style.display='block'
			document.getElementById('table').style.display='table'
			document.getElementById('myForm').style.display='none'
	
			var masOfParametrs = [];
			var typeOrganization = "";
	
			var name = document.getElementsByTagName("input")[0].value;
			var organization = document.getElementsByTagName("input")[9].value;
			var position = document.getElementsByTagName("input")[10].value;
			
			
			if(numOfIndustry == 1){
			typeOrganization = "Индустриальная";
			}
			else{
			typeOrganization = "Транспортная";
			}
	
			//проверка есть ли кнопка редактирования тогда новый объект не создаем, а применяем сеттеры
			if(document.getElementById('button-edit').style.display == 'block') {
	
			document.getElementById('button-edit').style.display='none'
	
			
			arrayOfWorkers[indOfWorkerChanged].setParameters(organization, position);
			arrayOfWorkers[indOfWorkerChanged].setWorkerParameters(name );
	
			masOfParametrs.push( name, position, typeOrganization);
	
			updateTable(masOfParametrs, indOfWorkerChanged + 1);
			}
			// иначе создание нового
			else{
				//создание рабочего(объекта)
			var workerOfTransportCompany = new TransportWorker(name, organization, position);
			arrayOfWorkers.push(workerOfTransportCompany);
			masOfParametrs.push(name, position, typeOrganization, organization); //чтобы корректно отображалась информация
			
			drawTable(masOfParametrs, arrayOfWorkers.length);
			serializationJSON();
			}
		}
		});

	// обновление таблицы
	function updateTable(masOfParametrs, numOfRow) {
	var tr = document.getElementById('tr'+numOfRow);

	for (var i = 0; i < masOfParametrs.length; i++) {
		tr.getElementsByTagName('td').item(i).innerText = masOfParametrs[i];
	}
	}

	//отрисовка таблицы
	function drawTable(masOfParametrs, numId) {

	var table = document.getElementById('table');
	var tr = document.createElement('tr');
	tr.id = 'tr' + numId;  //создание ID

	for (var i = 0; i < masOfParametrs.length + 1; i++){ 
		var td = document.createElement('td')  //создание td

		
		if(i == masOfParametrs.length){

		var btnEdit = document.createElement("BUTTON");
		var btnDel = document.createElement("BUTTON");
		var btnOut = document.createElement("BUTTON");

		btnEdit.className = 'edit';
		btnDel.className = 'delete';
		btnOut.className = 'output';

		//создаем (формируем) ID для кнопок
		btnEdit.id = 'edit' + numId;
		btnDel.id = 'delete' + numId;
		btnOut.id = 'output' + numId;

		btnEdit.innerText = 'Редактировать';
		btnDel.innerText = 'Удалить';
		btnOut.innerText = 'Вывод';

		td.appendChild(btnEdit);
		td.appendChild(btnDel);
		td.appendChild(btnOut);

		tr.appendChild(td);
		break;
		}
		//Запись текста в них
		td.innerHTML = masOfParametrs[i]; 
		tr.appendChild(td);  
	}

	table.appendChild(tr);

	//Отслеживание клика по кнопкам(при нажатии)
	eventClickedButton();
	}


	function eventClickedButton() {

	// Редактирование строки(edit)
	$('.edit').on('click', function(event) {
		document.querySelector('#table').style.display = 'none';
		//Отслежка(чтобы событие вызывалось не на все кнопки данного класса)
		event.stopPropagation();
		event.stopImmediatePropagation();

		// ID edit[1..2..3..4..5.....]
		var idLine = 'edit' + event.target.id[4];
		var numId = event.target.id[4] - 1;

		document.getElementById('myForm').style.display='block'
		document.getElementById('addPerson').style.display='none'

		// присваение значения рабочего в классы
		arrayOfPropsWorker = arrayOfWorkers[numId].getAllPropsOfWorker();
		arrayOfProps = arrayOfWorkers[numId].getProps();

		
		for(var i = 0; i < 6; i++){
		document.getElementsByTagName("input")[i].value = arrayOfPropsWorker[i];
		}
		document.getElementsByTagName("input")[9].value = arrayOfWorkers[numId].getOrganization();
		document.getElementsByTagName("input")[10].value = arrayOfWorkers[numId].getPost();

		document.getElementById('button-submit').style.display='none';
		document.getElementById('button-edit').style.display='block';

		// ID 
		indOfWorkerChanged = numId;
	});


	//Вывод подробной информации
	$('.output').on('click', function(event) {

		event.stopPropagation();
		event.stopImmediatePropagation();

		document.getElementById('table-output').style.display='table';
		document.getElementById('table').style.display='none';

		var idLine = 'output' + event.target.id[6];
		var indOfObject = event.target.id[6] - 1;

		// создание массива из параметров рабочего для дальнейшего вывода в цикле
		var arrayOfProps = arrayOfWorkers[indOfObject].getAllPropsOfWorker();
		arrayOfProps.push(arrayOfWorkers[indOfObject].getOrganization(), arrayOfWorkers[indOfObject].getPost());

		for(var i = 1; i < 10; i++){
		document.getElementById('tr-'+i).getElementsByTagName('td').item(1).innerText = arrayOfProps[i-1];
		}


		// Отслежка по клику
		document.getElementById('button-table').onclick = function () {
		document.getElementById('table-output').style.display='none';
		document.getElementById('table').style.display='table';
		}
	});


		//Удаление рабочего 
	$('.delete').on('click', function(event) {

		event.stopPropagation();
		event.stopImmediatePropagation();
		var idLine = 'delete' + event.target.id[6]; 
		result = confirm('Вы действительно хотите удалить данного рабочего?');
		if (result == true) {
		document.querySelector('#table').removeChild(document.querySelector('#tr'+event.target.id[6]));}
		console.log(result);

	});
	}

	function drawDefaultForm() {
	for(var i = 0; i < 7; i++){
		document.getElementsByTagName("input")[i].value = defaultArrayOfForm[i];
	}
	document.getElementsByTagName("input")[9].value = defaultArrayOfForm[7];
	document.getElementsByTagName("input")[10].value = defaultArrayOfForm[8];
	}
	function serializationJSON() {
	jsonStringOfArray = JSON.stringify(arrayOfWorkers);
	console.log(jsonStringOfArray);
	}

}

//Конструкторы классов
function Worker( name){

	this._name = name;

	this.setWorkerParameters = function ( name) {
		this._name = name;  
		}

	this.getName = function () {
		return this._name;
	}

	this.getAllPropsOfWorker = function () {
		var arrayParams = [this._name];
		return arrayParams;
	}
}

function IndustryWorker(name,   nameIndustryOrganization, position) {

	Worker.apply(this, arguments); 

		this._nameIndustryOrganization = nameIndustryOrganization;
		this._position = position;

	this.setParameters = function (name, post) {
	this._nameIndustryOrganization = name;
	this._position = post;
	}

	this.getOrganization = function () {
	return this._nameIndustryOrganization;
	}

	this.getPost = function () {
	return this._position;
	}

	this.getProps = function () {
	var array = [this._nameIndustryOrganization, this._position];
	return array;
	}
}

function TransportWorker(name,  nameTransportOrganization, position) {
	
	Worker.apply(this, arguments); 
		this._nameTransportOrganization = nameTransportOrganization;
		this._position = position;

	this.setParameters = function (name, post) {
	this._nameTransportOrganization = name;
	this._position = post;
	}

	this.getOrganization = function () {
	return this._nameTransportOrganization;
	}

	this.getPost = function () {
	return this._position;
	}

	this.getProps = function () {
	var array = [this._nameTransportOrganization, this._position];
	return array;
	}
}


