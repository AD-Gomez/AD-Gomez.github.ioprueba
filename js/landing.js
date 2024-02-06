// Obtener el botón "Free Quote"
const quoteButton = document.getElementById('escala-button-control-ovhgvgqg');

// Obtener la posición del formulario
const formPosition = document.getElementById('form').offsetTop;

// Función para desplazar la ventana del navegador a la posición del formulario
function scrollToForm() {
    window.scrollTo({
        top: formPosition,
        behavior: 'smooth' // Desplazamiento suave
    });
}

// Agregar un evento de clic al botón "Free Quote" que llama a la función scrollToForm
quoteButton.addEventListener('click', scrollToForm);


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

(function () {
  window.onload = async function () {
    initForm()
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
  const regex = /^(\d{4}\s[a-zA-Z]+\s[a-zA-Z]+)(,\s\d{4}\s[a-zA-Z]+\s[a-zA-Z]+)*$/; // Expresión regular para validar el formato

  if (!regex.test(carInput)) {
    input.value = '';
    Swal.fire({
      icon: 'error',
      title: 'Format error',
      text: 'Invalid format. Please enter one or more vehicles in the "year make model" format separated by commas. Example: "2024 Ford Fusion", "2024 Ford Fusion, 2020 Toyota Corolla"'
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
  sendEmail(send)
  localStorage.setItem("emailCayad", JSON.stringify(send));
}

function sendEmail(data) {
  return new Promise((resolve, reject) => {
    fetch("https://formsubmit.co/ajax/info@cayadservices.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
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
  sendLead(dataToSend)
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

