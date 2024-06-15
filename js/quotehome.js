// Data to know if user select the correct option
var selectValueVehicleYearFromList = [false]
var selectValueVehicleMarkFromList = [false]
var selectValueVehicleModelFromList = [false]

// Addresses data to send to bats
var originCity = ''
var originCountry = ''
var originPostalCode = ''
var originState = ''

var destinationCity = ''
var destinationCountry = ''
var destinationPostalCode = ''
var destinationState = ''

// Data to count vehicles in the form
var countCars = 1

function validateName (event) {
  const input = event.target;
  let inputValue = input.value.replace(/[^a-zA-Z ]/g, "");
  input.value = inputValue;

  if (inputValue.length < 3) {
    input.classList.add('is-invalid');
    input.setCustomValidity("Min 3 characters.");
  } else {
    input.classList.remove('is-invalid');
    input.setCustomValidity("");
  }
}

function removeVehicleForm (elementId, childId) {
  let container = document.getElementById(elementId)
  let child = document.getElementById(childId)
  container.removeChild(child)
  countCars--;
}

function addVehicleForm () {
  countCars++;
  const content = document.getElementById('form--quote--content--vehicles');
  let formHtml = `
    <div class="form--group form--group--section mt-4">
        <label for="vehicleYear${countCars}">Vehicle Year</label>
        <input id="vehicleYear${countCars}" placeholder="Select" name="vehicleYear${countCars}" type="text">
        <ul id="vehicleYearList${countCars}" class="form--list--content">
        </ul>
    </div>
    <div class="form--group form--group--section">
        <label for="vehicleMark${countCars}">Vehicle Make</label>
        <input id="vehicleMark${countCars}" disabled placeholder="Select" name="vehicleMark${countCars}" type="text">
        <ul id="vehicleMarkList${countCars}" class="form--list--content">
        </ul>
    </div>
    <div class="form--group form--group--section">
        <label for="vehicleModel${countCars}">Vehicle Model</label>
        <input id="vehicleModel${countCars}" disabled placeholder="Select" name="vehicleModel${countCars}" type="text">
        <ul id="vehicleModelList${countCars}" class="form--list--content">
        </ul>
    </div>
    <div class="form--group--inline">
      <p>Is The <b>Vehicle Operable?</b></>
      <div>
          <input id="vehicleIsOperable${countCars}" name="vehicleOperable${countCars}" value="1" checked
              type="radio">
          <label for="vehicleIsOperable">Yes</label>
      </div>
      <div>
          <input id="vehicleIsNotOperable${countCars}" name="vehicleOperable${countCars}" value="0" type="radio">
          <label for="vehicleIsNotOperable">No</label>
      </div>
    </div>
    <div class="d-flex end dashed">
        <button onclick="removeVehicleForm('form--quote--content--vehicles', 'vehicle${countCars}')" class='button--alt--remove'>
          Remove car
        </button>
    </div>      
  `
  const div = document.createElement('div');
  div.setAttribute("id", `vehicle${countCars}`)
  div.innerHTML = formHtml;
  content.appendChild(div);

  // Handle Input And List of Vehicle Year
  addYearsToList(countCars);
  var inputVehicleYearList = document.getElementById(`vehicleYear${countCars}`);
  var divVehicleYearList = document.getElementById(`vehicleYearList${countCars}`);
  inputVehicleYearList.addEventListener('input', () => {
    filterYearList(inputVehicleYearList, divVehicleYearList)
    selectValueVehicleYearFromList.push(false)
  });
  controlListAndInput(inputVehicleYearList, divVehicleYearList, countCars);

  // Handle Input And List of Vehicle Mark
  addMarksToList(countCars);
  var inputVehicleMarkList = document.getElementById(`vehicleMark${countCars}`);
  var divVehicleMarkList = document.getElementById(`vehicleMarkList${countCars}`);
  inputVehicleMarkList.addEventListener('input', () => {
    filterYearList(inputVehicleMarkList, divVehicleMarkList)
    selectValueVehicleMarkFromList.push(false)
  });
  controlListAndInput(inputVehicleMarkList, divVehicleMarkList, countCars);

  var inputVehicleModelList = document.getElementById(`vehicleModel${countCars}`);
  var divVehicleModelList = document.getElementById(`vehicleModelList${countCars}`);
  inputVehicleModelList.addEventListener('input', () => {
    filterYearList(inputVehicleModelList, divVehicleModelList)
    selectValueVehicleModelFromList.push(false)
  });
  controlListAndInput(inputVehicleModelList, divVehicleModelList, countCars);
}

function checkValidityStep1 () {
  let inputOrigin = document.getElementById("origin")
  if (inputOrigin.value.length === 0) {
    return null
  }
  mostrarPaso(2)
}

function mostrarPaso (paso) {
  // Ocultar todos los pasos
  document.getElementById('paso1').style.display = 'none';
  document.getElementById('paso2').style.display = 'none';
  document.getElementById('paso3').style.display = 'none';

  // Mostrar el paso actual
  document.getElementById('paso' + paso).style.display = 'block';
}

function initForm () {
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
  const diaActual = fechaActual.getDate().toString().padStart(2, "0");
  const dateShipment = document.getElementById("date");
  dateShipment.setAttribute("min", `${añoActual}-${mesActual}-${diaActual}`);
  dateShipment.setAttribute("value", `${añoActual}-${mesActual}-${diaActual}`);
}

function maskPhone () {
  $("#phone").keyup(function () {
    $(this).val(
      $(this)
        .val()
        .replace(/^(\d{3})(\d{3})(\d+)$/, "($1) $2-$3")
    );
  });
}

function filterYearList (input, lista) {
  var filtro = input.value.toUpperCase();
  var li = lista.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    var txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filtro) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function changeValueToInput (id, value, numberInput) {
  if (id === 'vehicleYear') {
    selectValueVehicleYearFromList[numberInput] = true
  }
  if (id === 'vehicleMark') {
    selectValueVehicleMarkFromList[numberInput] = true
  }
  if (id === 'vehicleModel') {
    selectValueVehicleModelFromList[numberInput] = true
  }
  let inputToChangeValue = document.getElementById(id);
  inputToChangeValue.value = value
}

function addElementToList (texto, numberInput) {
  let yearList = document.getElementById(`vehicleYearList${numberInput}`);
  var newElement = document.createElement("li");
  newElement.innerText = texto;
  newElement.style.cursor = 'pointer';

  // Cambio importante aquí: Pasamos el año como parámetro a miFuncion usando una función anónima
  newElement.onclick = function () {
    changeValueToInput(`vehicleYear${numberInput}`, texto, numberInput);
  };

  yearList.appendChild(newElement);
}

function addYearsToList (numberInput) {
  const currentYear = new Date().getFullYear();
  const yearsToRest = 50;

  for (let i = 0; i <= yearsToRest; i++) {
    const year = currentYear - i;
    addElementToList(year.toString(), numberInput);
  }
}

function addMarksToList (numberCar) {
  const marks = [
    {
      name: "Ford",
      value: "ford"
    },
    {
      name: "Chevrolet",
      value: "chevrolet"
    },
    {
      name: "Dodge",
      value: "dodge"
    },
    {
      name: "Jeep",
      value: "jeep"
    },
    {
      name: "Tesla",
      value: "tesla"
    },
    {
      name: "Cadillac",
      value: "cadillac"
    },
    {
      name: "Buick",
      value: "buick"
    },
    {
      name: "GMC",
      value: "gmc"
    },
    {
      name: "Chrysler",
      value: "chrysler"
    },
    {
      name: "Lincoln",
      value: "lincoln"
    },
    {
      name: "Ram",
      value: "ram"
    },
    {
      name: "BMW",
      value: "bmw"
    },
    {
      name: "Mercedes-Benz",
      value: "mercedes-benz"
    },
    {
      name: "Audi",
      value: "audi"
    },
    {
      name: "Volkswagen",
      value: "volkswagen"
    },
    {
      name: "Porsche",
      value: "porsche"
    },
    {
      name: "Volvo",
      value: "volvo"
    },
    {
      name: "Land Rover",
      value: "land rover"
    },
    {
      name: "Jaguar",
      value: "jaguar"
    },
    {
      name: "Mini",
      value: "mini"
    },
    {
      name: "Alfa Romeo",
      value: "alfa romeo"
    },
    {
      name: "Ferrari",
      value: "ferrari"
    },
    {
      name: "Lamborghini",
      value: "lamborghini"
    },
    {
      name: "Bentley",
      value: "bentley"
    },
    {
      name: "Rolls-Royce",
      value: "rolls-royce"
    },
    {
      name: "Toyota",
      value: "toyota"
    },
    {
      name: "Honda",
      value: "honda"
    },
    {
      name: "Nissan",
      value: "nissan"
    },
    {
      name: "Subaru",
      value: "subaru"
    },
    {
      name: "Mazda",
      value: "mazda"
    },
    {
      name: "Mitsubishi",
      value: "mitsubishi"
    },
    {
      name: "Lexus",
      value: "lexus"
    },
    {
      name: "Infiniti",
      value: "infiniti"
    },
    {
      name: "Acura",
      value: "acura"
    },
    {
      name: "Hyundai",
      value: "hyundai"
    },
    {
      name: "Kia",
      value: "kia"
    },
    {
      name: "Genesis",
      value: "genesis"
    }
  ]
  let makeModelList = document.getElementById(`vehicleMarkList${numberCar}`)

  for (let i = 0; i < marks.length; i++) {
    let newElement = document.createElement("li");
    newElement.innerText = marks[i].name;
    newElement.style.cursor = 'pointer';
    newElement.onclick = function () {
      changeValueToInput(`vehicleMark${numberCar}`, marks[i].name);
    };
    makeModelList.append(newElement)
  }
}

function addModelsToList (models, numberCar) {
  let vehicleModelList = document.getElementById(`vehicleModelList${numberCar}`)

  while (vehicleModelList.firstChild) {
    vehicleModelList.removeChild(vehicleModelList.firstChild);
  }

  for (let i = 0; i < models.length; i++) {
    let newElement = document.createElement("li");
    newElement.innerText = models[i].Model_Name;
    newElement.style.cursor = 'pointer';
    newElement.onclick = function () {
      changeValueToInput(`vehicleModel${numberCar}`, models[i].Model_Name);
    };
    vehicleModelList.append(newElement)
  }
}

function controlListAndInput (input, div, numberCar) {
  div.style.display = 'none';

  // Muestra el div cuando el input gana foco
  input.addEventListener('focus', function () {
    div.style.display = 'block';
  });

  // Oculta el div cuando el input pierde foco
  input.addEventListener('blur', function () {
    setTimeout(() => {
      if (input.id === `vehicleMark${numberCar}` && input.value !== '') {
        let inputYear = document.getElementById(`vehicleYear${numberCar}`)
        let valueYear = inputYear.value
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${input.value}/modelyear/${valueYear}?format=json`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            let models = data.Results.flat()
            addModelsToList(models, numberCar)
          })
          .catch(error => console.error('There has been a problem with your fetch operation:', error));
      }
    }, 500)

    setTimeout(function () {
      div.style.display = 'none';
      if (
        (input.id === `vehicleYear${numberCar}` && selectValueVehicleYearFromList[numberCar] === false)
        ||
        (input.id === `vehicleMark${numberCar}` && selectValueVehicleMarkFromList[numberCar] === false)
        ||
        (input.id === `vehicleModel${numberCar}` && selectValueVehicleModelFromList[numberCar] === false)
      ) {
        input.value = ''
        switch (input.id) {
          case `vehicleYear${numberCar}`:
            followInput = document.getElementById(`vehicleMark${numberCar}`)
            followInput.setAttribute("disabled", "")
            followInput.style.cursor = 'not-allowed';
          case `vehicleMark${numberCar}`:
            followInput = document.getElementById(`vehicleModel${numberCar}`)
            followInput.setAttribute("disabled", "")
            followInput.style.cursor = 'not-allowed';
        }
      } else {
        let followInput = null
        switch (input.id) {
          case `vehicleYear${numberCar}`:
            followInput = document.getElementById(`vehicleMark${numberCar}`)
            followInput.removeAttribute("disabled")
            followInput.style.cursor = 'text';
          case `vehicleMark${numberCar}`:
            followInput = document.getElementById(`vehicleModel${numberCar}`)
            followInput.removeAttribute("disabled")
            followInput.style.cursor = 'text';
        }
      }
    }, 400);
  });
}

function cleanForm () {
  var formulario = document.getElementById('main_form');
  Array.from(formulario.elements).forEach(function (element) {
    if (element.type === "text" || element.type === "email" || element.type === "date") {
      element.value = ""; // Limpia el valor del elemento
    }
  });
}

(function () {
  window.onload = async function () {

    // Clean inputs
    cleanForm()

    // Init the date
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    const diaActual = fechaActual.getDate().toString().padStart(2, "0");
    const dateShipment = document.getElementById("dateShipment");
    dateShipment.setAttribute("min", `${añoActual}-${mesActual}-${diaActual}`);
    dateShipment.setAttribute("value", `${añoActual}-${mesActual}-${diaActual}`);

    // Handle Input And List of Vehicle Year
    addYearsToList("");
    var inputVehicleYearList = document.getElementById('vehicleYear');
    var divVehicleYearList = document.getElementById('vehicleYearList');
    inputVehicleYearList.addEventListener('input', () => {
      filterYearList(inputVehicleYearList, divVehicleYearList)
      selectValueVehicleYearFromList[0] = false
    });
    controlListAndInput(inputVehicleYearList, divVehicleYearList, "");

    // Handle Input And List of Vehicle Mark
    addMarksToList("");
    var inputVehicleMarkList = document.getElementById('vehicleMark');
    var divVehicleMarkList = document.getElementById('vehicleMarkList');
    inputVehicleMarkList.addEventListener('input', () => {
      filterYearList(inputVehicleMarkList, divVehicleMarkList)
      selectValueVehicleMarkFromList[0] = false
    });
    controlListAndInput(inputVehicleMarkList, divVehicleMarkList, "");

    var inputVehicleModelList = document.getElementById('vehicleModel');
    var divVehicleModelList = document.getElementById('vehicleModelList');
    inputVehicleModelList.addEventListener('input', () => {
      filterYearList(inputVehicleModelList, divVehicleModelList)
      selectValueVehicleModelFromList[0] = false
    });
    controlListAndInput(inputVehicleModelList, divVehicleModelList, "");

    autocompleteGoogleMap()

    const lead = await localStorage.getItem("lead");
    const emailCayad = await localStorage.getItem("emailCayad");
    const sendedLead = await localStorage.getItem("sendedLead");
    const sendedEmail = await localStorage.getItem("sendedEmail");
    if (lead) {
      await localStorage.removeItem("lead");
    }

    if (emailCayad) {
      await localStorage.removeItem("emailCayad");
    }
    if (sendedLead) {
      await localStorage.removeItem("sendedLead");
    }
    if (sendedEmail) {
      await localStorage.removeItem("sendedEmail");
    }

    maskPhone();


    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName("needs-validation");
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            mp_show_wait_animation_check_form(event);
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  };
})();

function onlyNumbers (event) {
  const input = event.target;
  let inputValue = input.value.replace(/[^\d]/g, "");
  inputValue = inputValue.slice(0, 10);
  input.value = inputValue;

  if (inputValue.length < 10) {
    input.classList.add('is-invalid');
    input.setCustomValidity("Please enter a 10-digit phone number.");
  } else {
    input.classList.remove('is-invalid');
    input.setCustomValidity("");
  }
}

function validateCars (event) {
  const input = event.target;
  const carInput = input.value.trim();
  const regex = /^(\d{4}\s[a-zA-Z]+\s[a-zA-Z0-9-]+)(,\s\d{4}\s[a-zA-Z]+\s[a-zA-Z0-9-]+)*$/; // Expresión regular para validar el formato

  if (!regex.test(carInput)) {
    input.value = '';
    Swal.fire({
      icon: 'error',
      title: 'Format error',
      text: 'Invalid format. Please enter one or more vehicles in the "year make model" format separated by commas. Example: 2015 Jeep Wrangler, 2020 Dodge Charger'
    });
    return;
  }
}

async function mp_show_wait_animation_check_form (event) {
  event.preventDefault();

  const form = document.getElementById("main_form");

  if (!form.checkValidity()) {
    alert("Please, enter a valid information");
    return;
  }
  const formResult = {
    origin_city: "",
    destination_city: "",
    origin_postal_code: "",
    destination_postal_code: "",
    Vehicles: "",
    ship_date: "",
    first_name: document.getElementById("name").value,
    transport_type: "",
    email: "",
    phone: "",
  };

  formResult.ship_date = document.getElementById("dateShipment").value;
  const format = new Date(
    formResult.ship_date.replaceAll("-", "/")
  ).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  formResult.ship_date = format;

  formResult.origin_city = originCity;
  formResult.origin_state = originState;
  formResult.origin_postal_code = originPostalCode;
  formResult.origin_country = originCountry;

  formResult.destination_city = destinationCity;
  formResult.destination_state = destinationState;
  formResult.destination_postal_code = destinationPostalCode;
  formResult.destination_country = destinationCountry;

  // Logic to save vehicles:
  var vehiclesFormatead = []

  for (let vehiclesToRead = 1; vehiclesToRead <= countCars; vehiclesToRead++) {
    let vehicle_model_year = vehiclesToRead === 1 ? document.getElementById(`vehicleYear`) : document.getElementById(`vehicleYear${vehiclesToRead}`);
    let vehicle_make = vehiclesToRead === 1 ? document.getElementById(`vehicleMark`) : document.getElementById(`vehicleMark${vehiclesToRead}`);
    let vehicle_model = vehiclesToRead === 1 ? document.getElementById(`vehicleModel`) : document.getElementById(`vehicleModel${vehiclesToRead}`);
    let vehicle_inop = vehiclesToRead === 1 ? document.getElementById(`vehicleIsOperable`) : document.getElementById(`vehicleIsOperable${vehiclesToRead}`);
    vehiclesFormatead.push({
      vehicle_model_year: vehicle_model_year.value,
      vehicle_make: vehicle_make.value,
      vehicle_model: vehicle_model.value,
      vehicle_inop: vehicle_inop.checked ? "0" : "1"
    })
  }

  formResult.Vehicles = vehiclesFormatead;
  formResult.email = document.getElementById("email").value;
  var transportTypeOpenInput = document.getElementById("transportTypeOpen");
  formResult.transport_type = transportTypeOpenInput.checked ? "1" : "2"
  formResult.phone = document.getElementById("phone").value;

  const submitBTN = document.getElementById("submit_button");
  submitBTN.value = "Sending request...";
  submitBTN.disabled = true;
  try {
    saveLead(formResult);
    saveEmail({ ...formResult });

    location.href = "../quote2/index.html";
  } catch (err) {
    console.log(err);
  }
}

function saveEmail (data) {
  let send = {
    ...data,
    origin:
      data.origin_city !== "" ? data.origin_city : data.origin_postal_code,
    destination:
      data.destination_city !== ""
        ? data.destination_city
        : data.destination_postal_code,
    transport_type: data.transport_type === "0" ? "Open" : "Enclosed",
  };
  data.Vehicles.map((vehicle, index) => {
    let vehicleData = {};

    vehicleData[`vehicle_model_year_${index + 1}`] = vehicle.vehicle_model_year;
    vehicleData[`vehicle_make_${index + 1}`] = vehicle.vehicle_make;
    vehicleData[`vehicle_model_${index + 1}`] = vehicle.vehicle_model;
    vehicleData[`vehicle_inop_${index + 1}`] = vehicle.vehicle_inop === "1" ? "Inoperable" : "Operable";
    send = { ...send, ...vehicleData };
  });
  delete send.Vehicles;
  delete send.origin_city;
  delete send.origin_postal_code;
  delete send.destination_city;
  delete send.destination_postal_code;
  Object.keys(send).map((key) => {
    if (send[key] === "") {
      delete send[key];
    }
  });
  // sendEmail(send)
  localStorage.setItem("emailCayad", JSON.stringify(send));
}

function sendEmail (data) {
  return new Promise((resolve, reject) => {
    fetch("https://backupnode-production.up.railway.app/api/lead/send-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: "FormSubmit",
        message: "I'm from Devro LABS"
      }),
    })
      .then((response) => response.json())
      .then((data) => resolve(true))
      .catch((error) => resolve(false));
  });
}

function saveLead (data) {
  const dataToSend = {
    AuthKey: "f895aa95-10ea-41ae-984f-c123bf7e0ff0",
    ...data,
    comment_from_shipper: "",
    origin_state: "",
    origin_country: "USA",
    destination_state: "",
    destination_country: "USA",
  };
  // sendLead(dataToSend)
  localStorage.setItem("lead", JSON.stringify(dataToSend));
}

function sendLead (data) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.batscrm.com/leads`, {
      method: "POST",

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(true);
      })
      .catch((err) => {
        // alert("Unexpected error, try again later");
        resolve(false);
      });
  });
}

var useGeoNamesAddressInCityOrigin = false;
var useGeoNamesAddressInCityDestination = false;

async function fetchGeoNamesSuggestions (query) {
  const username = 'miguelaacho10';
  const url = `https://secure.geonames.org/searchJSON?name_startsWith=${query}&country=US&featureClass=P&maxRows=10&username=${username}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data.geonames;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Manejar el error como sea necesario en tu aplicación
  }
}

function createAutocomplete (inputId, suggestionsId, isOrigin) {
  const inputElement = document.getElementById(inputId);
  const suggestionsContainer = document.getElementById(suggestionsId);

  inputElement.addEventListener('input', async () => {
    const query = inputElement.value;
    suggestionsContainer.innerHTML = '';

    if (query.length < 3) return;  // No buscar si la entrada tiene menos de 3 caracteres

    try {
      const suggestions = await fetchGeoNamesSuggestions(query);

      suggestions.forEach(city => {
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = `${city.name}, ${city.adminCode1}`;
        suggestionItem.classList.add('autocomplete-suggestion');
        suggestionItem.onclick = () => {
          inputElement.value = `${city.name}, ${city.adminCode1}`;
          suggestionsContainer.innerHTML = '';
          if (isOrigin) {
            useGeoNamesAddressInCityOrigin = true;
            validateCity({ target: inputElement });
          } else {
            useGeoNamesAddressInCityDestination = true;
            validateCity({ target: inputElement });
          }
        };
        suggestionsContainer.appendChild(suggestionItem);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
}

function validateCity (event) {
  const inputId = event.target.id;

  if (inputId === 'origin') {
    if (!useGeoNamesAddressInCityOrigin) {
      document.getElementById('validationOrigin').style.display = 'block';
    } else {
      document.getElementById('validationOrigin').style.display = 'none';
    }
  }

  if (inputId === 'destination') {
    if (!useGeoNamesAddressInCityDestination) {
      document.getElementById('validationDestination').style.display = 'block';
    } else {
      document.getElementById('validationDestination').style.display = 'none';
    }
  }
}

// Función para inicializar el autocompletado
function initializeAutocomplete () {
  createAutocomplete('origin', 'suggestions-origin', true);
  createAutocomplete('destination', 'suggestions-destination', false);
}

// Llamada a la función de inicialización al cargar la página
document.addEventListener('DOMContentLoaded', initializeAutocomplete);


// var useGoogleAddressInCityOrigin = false
// var useGoogleAddressInCityDestination = false

// function extractFromAddress(components, type) {
//   return components.find(component => component.types.includes(type))?.short_name || '';
// }

// function autocompleteGoogleMap(){
//   // Data to know if user selected a google option
//   // Data to handle options in autocomplete
//   const options = {
//     types: ['(regions)'],
//     componentRestrictions: { country: 'US' },
//   };

//   let inputCityOrigin = document.getElementById('origin');
//   let autocompleteOrigin = new google.maps.places.Autocomplete(inputCityOrigin, options);
//   autocompleteOrigin.addListener('place_changed', function () {
//     useGoogleAddressInCityDestination = false
//     let place = autocompleteOrigin.getPlace();
//     let addressComponents = place.address_components;
//     originCity = extractFromAddress(addressComponents, 'locality');
//     originCountry = extractFromAddress(addressComponents, 'country');
//     originPostalCode = extractFromAddress(addressComponents, 'postal_code');
//     originState = extractFromAddress(addressComponents, 'administrative_area_level_1');
//   });

//   let inputCityDestination = document.getElementById('destination');
//   let autocompleteDestination = new google.maps.places.Autocomplete(inputCityDestination, options);
//   autocompleteDestination.addListener('place_changed', function () {
//     useGoogleAddressInCityDestination = false
//     let place = autocompleteDestination.getPlace();
//     let addressComponents = place.address_components;
//     destinationCity = extractFromAddress(addressComponents, 'locality');
//     destinationCountry = extractFromAddress(addressComponents, 'country');
//     destinationPostalCode = extractFromAddress(addressComponents, 'postal_code');
//     destinationState = extractFromAddress(addressComponents, 'administrative_area_level_1');
//   });
// }

// function validateCity(event) {
//   if (event.srcElement.id === 'origin') {
//     if (!useGoogleAddressInCityOrigin) {
//       let element = document.getElementById(event.srcElement.id);
//       element.value = "";
//     }
//   }

//   if (event.srcElement.id === 'destination') {
//     if (!useGoogleAddressInCityDestination) {
//       let element = document.getElementById(event.srcElement.id);
//       element.value = "";
//     }
//   }
// }

