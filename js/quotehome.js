function mostrarPaso(paso) {
  // Ocultar todos los pasos
  document.getElementById('paso1').style.display = 'none';
  document.getElementById('paso2').style.display = 'none';
  document.getElementById('paso3').style.display = 'none';
  
  // Mostrar el paso actual
  document.getElementById('paso' + paso).style.display = 'block';
}

function initForm() {
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
  const diaActual = fechaActual.getDate().toString().padStart(2, "0");
  const dateShipment = document.getElementById("date");
  dateShipment.setAttribute("min", `${añoActual}-${mesActual}-${diaActual}`);
  dateShipment.setAttribute("value", `${añoActual}-${mesActual}-${diaActual}`);
}

function maskPhone() {
  $("#phone").keyup(function () {
    $(this).val(
      $(this)
        .val()
        .replace(/^(\d{3})(\d{3})(\d+)$/, "($1) $2-$3")
    );
  });
}

function filterYearList(input, lista) {
  console.log(input, lista)
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

function changeValueToInput(id, value){
  let inputToChangeValue = document.getElementById(id);
  inputToChangeValue.value = value
}

function addElementToList(texto) {
  let yearList = document.getElementById("vehicleYearList");
  var newElement = document.createElement("li");
  newElement.innerText = texto;
  
  // Cambio importante aquí: Pasamos el año como parámetro a miFuncion usando una función anónima
  newElement.onclick = function() {
    changeValueToInput('vehicleYear', texto);
  };
  
  yearList.appendChild(newElement);
}

function addYearsToList() {
  const currentYear = new Date().getFullYear();
  const yearsToRest = 50;
  
  for(let i = 0; i <= yearsToRest; i++) {
    const year = currentYear - i;
    addElementToList(year.toString());
  }
}

function addMarksToList() {
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
  let  makeModelList = document.getElementById('vehicleMarkList')
  
  for(let i = 0; i < marks.length; i++) {
    let newElement = document.createElement("li");
    newElement.innerText = marks[i].name;
    newElement.onclick = function() {
      changeValueToInput('vehicleMark', marks[i].name);
    };
    makeModelList.append(newElement)
  }
}

function addModelsToList(models) {
  let  vehicleModelList = document.getElementById('vehicleModelList')
  
  while (vehicleModelList.firstChild) {
    vehicleModelList.removeChild(vehicleModelList.firstChild);
  }

  for(let i = 0; i < models.length; i++) {
    let newElement = document.createElement("li");
    newElement.innerText = models[i].Model_Name;
    newElement.onclick = function() {
      changeValueToInput('vehicleModel', models[i].Model_Name);
    };
    vehicleModelList.append(newElement)
  }
}

function controlListAndInput (input, div){
  div.style.display = 'none';

  // Muestra el div cuando el input gana foco
  input.addEventListener('focus', function() {
    div.style.display = 'block';
  });

  // Oculta el div cuando el input pierde foco
  input.addEventListener('blur', function() {
    if( input.id === 'vehicleMark' && input.value !== '' ){
      let inputYear = document.getElementById('vehicleYear')
      let valueYear = inputYear.value
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${input.value}/modelyear/${valueYear}?format=json`)
      .then(response => response.json())
      .then(data => {
        let models = data.Results.flat()
        addModelsToList(models)
      })
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
    }
    setTimeout(function() {
      div.style.display = 'none';
    }, 400);
  });
}

(function () {
  window.onload = async function () {

    // Handle Input And List of Vehicle Year
    addYearsToList();
    var inputVehicleYearList = document.getElementById('vehicleYear');
    var divVehicleYearList = document.getElementById('vehicleYearList');
    inputVehicleYearList.addEventListener('input', () => filterYearList(inputVehicleYearList, divVehicleYearList));
    controlListAndInput(inputVehicleYearList, divVehicleYearList);
  
    // Handle Input And List of Vehicle Mark
    addMarksToList(); 
    var inputVehicleMarkList = document.getElementById('vehicleMark');
    var divVehicleMarkList = document.getElementById('vehicleMarkList');
    inputVehicleMarkList.addEventListener('input', () => filterYearList(inputVehicleMarkList, divVehicleMarkList));
    controlListAndInput(inputVehicleMarkList, divVehicleMarkList);

    var inputVehicleModelList = document.getElementById('vehicleModel');
    var divVehicleModelList = document.getElementById('vehicleModelList');
    inputVehicleModelList.addEventListener('input', () => filterYearList(inputVehicleModelList, divVehicleModelList));
    controlListAndInput(inputVehicleModelList, divVehicleModelList);

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

function onlyNumbers(event) {
  const input = event.target;
  const inputValue = input.value;

  const numericValue = inputValue.replace(/[^\d]/g, "");

  input.value = numericValue;
}

function validateCars(event) {  
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

async function mp_show_wait_animation_check_form(event) {
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
    first_name: "From Landing",
    transport_type: "1",
    email: "",
    phone: "",
  };

  formResult.origin_city = document.getElementById("origin").value;
  formResult.destination_city = document.getElementById("destination").value;

  // Logic to save vehicles:
  let vehiclesInput = document.getElementById("vehicles");
  let vehicles = vehiclesInput.value.split(", ")

  var vehiclesFormatead = []

  vehicles.forEach(item => {
    let [vehicle_model_year, vehicle_make, vehicle_model] = item.split(" ")
    vehiclesFormatead.push({
      vehicle_model_year,
      vehicle_make,
      vehicle_model
    })
  })

  formResult.Vehicles = vehiclesFormatead;

  
  formResult.ship_date = document.getElementById("date").value;
  const format = new Date(
    formResult.ship_date.replaceAll("-", "/")
  ).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  formResult.ship_date = format;
  formResult.email = document.getElementById("email").value;
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

function saveEmail(data) {
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
    vehicleData[`vehicle_inop_${index + 1}`] ="No Data"
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

function sendEmail(data) {
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

function saveLead(data) {
  const dataToSend = {
    AuthKey: "849d9659-34b5-49c5-befd-1cd238e7f9fc",
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

function sendLead(data) {
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

var useGoogleAddressInCityOrigin = false
var useGoogleAddressInCityDestination = false

function autocompleteGoogleMap(){
  // Data to know if user selected a google option
  // Data to handle options in autocomplete
  const options = {
    types: ['(cities)'],
    componentRestrictions: { country: 'US' },
  };

  let inputCityOrigin = document.getElementById('origin');
  let autocompleteOrigin = new google.maps.places.Autocomplete(inputCityOrigin, options);
  autocompleteOrigin.addListener('place_changed', function () {
    useGoogleAddressInCityDestination = false
  });

  let inputCityDestination = document.getElementById('destination');
  let autocompleteDestination = new google.maps.places.Autocomplete(inputCityDestination, options);
  autocompleteDestination.addListener('place_changed', function () {
    useGoogleAddressInCityDestination = false
  });
}

function validateCity(event) {
  if (event.srcElement.id === 'origin') {
    if (!useGoogleAddressInCityOrigin) {
      let element = document.getElementById(event.srcElement.id);
      element.value = "";
    }
  }

  if (event.srcElement.id === 'destination') {
    if (!useGoogleAddressInCityDestination) {
      let element = document.getElementById(event.srcElement.id);
      element.value = "";
    }
  }
}

