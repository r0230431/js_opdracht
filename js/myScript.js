//Hide alerts wanneer pagina wordt geladen
window.addEventListener('load', hideAlerts);

function hideAlerts() {
	document.querySelector('#correct').classList.add('d-none')
	document.querySelector('#errors').classList.add('d-none')
	document.querySelector('#betaling').classList.add('d-none')
}

//Initialiseren foutenlijst
let errors = [];

//Activeer validatie bij button click
document.querySelector('#btnCheck').addEventListener('click', validateForm);

function validateForm() {
	
	//Maak foutenlijst leeg wanneer op button wordt geklikt (om dubbele foutmeldingen te vermijden)
	errors = [];
	
	//Check lege velden (deel 1)
	checkEmptyField('voornaam', 'Het veld voornaam is vereist.');
	checkEmptyField('naam', 'Het veld naam is vereist.');
	checkEmptyField('username', 'Het veld gebruikersnaam is vereist.');
	checkEmptyField('email', 'Het veld email is vereist.');

	//Check e-mail
	let email = document.querySelector('#email')
	if(email.value != ""){
		if(!validateEmail(email)) {
			errors.push('E-mailadres is niet correct.');
		}
	}

	//Check wachtwoorden
	checkEmptyField('wachtwoord', 'Het veld wachtwoord is vereist.');
	checkEmptyField('wachtwoord2', 'Het veld herhaal wachtwoord is vereist.');
	
	let wachtwoord = document.querySelector('#wachtwoord').value;
	let wachtwoord2 = document.querySelector('#wachtwoord2').value;

	validatePassword(wachtwoord, wachtwoord2)

	//Check lege velden (deel 2)
	checkEmptyField('adres', 'Het veld adres is vereist.');
	checkEmptyField('land', 'Het veld land is vereist.');
	checkEmptyField('provincie', 'Het veld provincie is vereist.');
	
	//Check postcode
	checkPC('postcode')
	
	//Check betalingswijze
	validatePayment('betalingswijze')

	//Check algemene voorwaarden (gtob = general terms of business)
	let gtob = document.querySelector('#gtob')
	if(!gtob.checked){
		errors.push('Je moet de algemene voorwaarden accepteren.')
	}

	//Genereer foutenlijst
	document.querySelector("#errors p").innerHTML = ""
	if (errors.length > 0) {
		errors.forEach(error => {
			document.querySelector("#errors p").innerHTML += `${error}<br>`;
		});
		document.querySelector('#correct').classList.add('d-none');
		document.querySelector('#betaling').classList.add('d-none');
		document.querySelector('#errors').classList.remove('d-none');

	} else {
		document.querySelector('#correct').classList.remove('d-none');
		document.querySelector('#betaling').classList.remove('d-none');
		document.querySelector('#errors').classList.add('d-none');
	}
	
}

//Controles in afzonderlijke functies
function checkEmptyField(veld, melding){
	let field = document.querySelector('#' + veld)
	if(field.value == ""){
		errors.push(melding)
	}
}

function validateEmail(emailadres){
	// https://www.regular-expressions.info/quickstart.html
	// https://builtin.com/software-engineering-perspectives/javascript-regex
	// https://www3.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html

	const mailRegex = /^[^\.\-][a-zA-Z0-9_\-\.]+@[a-zA-Z0-9][a-zA-Z0-9_\-\.]+\.[a-zA-Z]+/
	return emailadres.value.match(mailRegex)   
}

function validatePayment(veld){
	let payMethods = document.querySelectorAll(`input[name=${veld}]`)
	payMethods.forEach(payMethod => {
		if(payMethod.checked){    
			document.querySelector('#betaling p').textContent = `Je betalingswijze is ${payMethod.value}.`
		}
	})
}

function validatePassword(wachtwoord, wachtwoord2){
	//Lengte wachtwoord
	if(wachtwoord != "" && wachtwoord.length < 8){
		errors.push('Je wachtwoord moet minstens 8 tekens lang zijn.');
		return
	}
	//Overeenstemming
	if(wachtwoord != "" && wachtwoord2 != "" && wachtwoord !== wachtwoord2){
		errors.push('Je wachtwoorden komen niet overeen.');
	}             
}

function checkPC(veld){
	let field = document.querySelector('#' + veld)
	if(field.value == ""){
		errors.push('Het veld postcode is vereist.')
		return
	}
	if(field.value != "" && (field.value < 1000 || field.value >= 10000)){
		errors.push('De waarde van postcode moet tussen 1000 en 9999 liggen.')
	}
}