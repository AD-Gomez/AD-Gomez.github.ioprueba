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
    cleanForm();

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

    initForm();

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

function cleanForm() {
  const inputs = document.querySelectorAll('input[type="text"]');

  inputs.forEach((input) => {
    input.value = "";
  });

  const inputsTel = document.querySelectorAll('input[type="tel"]');

  inputsTel.forEach((input) => {
    input.value = null;
  });

  const inputsNumber = document.querySelectorAll('input[type="number"]');

  inputsNumber.forEach((input) => {
    input.value = null;
  });
  const inputsEmail = document.querySelectorAll('input[type="email"]');

  inputsEmail.forEach((input) => {
    input.value = null;
  });

  const vehicleList = document.getElementById("vehicleList");
  const childrenCount = vehicleList?.childElementCount;
  let i = 1;
  while (i < childrenCount) {
    const vehicle = document.getElementById(vehicleList.children[i].id);

    vehicleList.removeChild(vehicle);

    index++;
  }
}

function initForm() {
  //date
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
  const diaActual = fechaActual.getDate().toString().padStart(2, "0");
  const dateShipment = document.getElementById("dateShipment");
  dateShipment.setAttribute("min", `${añoActual}-${mesActual}-${diaActual}`);
  dateShipment.setAttribute("value", `${añoActual}-${mesActual}-${diaActual}`);

  //zip
  const zipOrigin = document.getElementById("zip_origin");
  zipOrigin.style.display = "";
  zipOrigin.setAttribute("required", "true");
  const zipDestination = document.getElementById("zip_destination");
  zipDestination.style.display = "";
  zipDestination.setAttribute("required", "true");
}

function onlyNumbers(event) {
  const input = event.target;
  const inputValue = input.value;

  const numericValue = inputValue.replace(/[^\d]/g, "");

  input.value = numericValue;
}

function validYear(event) {
  const date = new Date();

  if (event.target.value < 1900 || event.target.value > date.getFullYear()) {
    alert("Enter a valid year");
    const checkZip = document.getElementById(event.srcElement.id);
    checkZip.value = date.getFullYear();
  }
}

function checkTypeAddress(value, event) {
  if (value == "zip") {
    const checkZip = document.getElementById("cityCheck");
    checkZip.checked = false;

    const zipOrigin = document.getElementById("zip_origin");
    zipOrigin.style.display = "";
    zipOrigin.setAttribute("required", "true");
    zipOrigin.setAttribute("type", "");

    const zipDestination = document.getElementById("zip_destination");
    zipDestination.style.display = "";
    zipDestination.setAttribute("required", "true");
    zipDestination.setAttribute("type", "");

    const cityOrigin = document.getElementById("city_origin");
    cityOrigin.style.display = "none";
    cityOrigin.setAttribute("required", "false");
    cityOrigin.setAttribute("type", "hidden");

    const cityDestination = document.getElementById("city_destination");
    cityDestination.style.display = "none";
    cityDestination.setAttribute("required", "false");
    cityDestination.setAttribute("type", "hidden");
  } else if (value == "city") {
    const checkCity = document.getElementById("zipCheck");
    checkCity.checked = false;

    const zipOrigin = document.getElementById("zip_origin");
    zipOrigin.style.display = "none";
    zipOrigin.setAttribute("required", "false");
    zipOrigin.setAttribute("type", "hidden");

    const zipDestination = document.getElementById("zip_destination");
    zipDestination.style.display = "none";
    zipDestination.setAttribute("required", "false");
    zipDestination.setAttribute("type", "hidden");

    const cityOrigin = document.getElementById("city_origin");
    cityOrigin.style.display = "";
    cityOrigin.setAttribute("required", "true");
    cityOrigin.setAttribute("type", "");

    const cityDestination = document.getElementById("city_destination");
    cityDestination.style.display = "";
    cityDestination.setAttribute("required", "true");
    cityDestination.setAttribute("type", "");
  }
}
function deleteVehicle(event) {
  const vehicle = document.getElementById(
    event.srcElement.parentNode.parentNode.id
  );
  const vehicleList = document.getElementById("vehicleList");
  vehicleList.removeChild(vehicle);
}
function addVehicle() {
  const vehicleList = document.getElementById("vehicleList");
  const children = vehicleList.childElementCount;
  if (children < 9) {
    if (validVehicles()) {
      const template = document.querySelector("#add-vehicle");
      const my_template_clone = template.content.cloneNode(true);
      const newVehicle = my_template_clone.getElementById("vehicle_");
      let newID = "";
      let index = 1;
      do {
        index++;
        newID = `vehicle_${children + index}`;
        const existID = document.getElementById(newID);
        result = existID ? true : false;
      } while (result);

      newVehicle.id = newID;

      const id = newID.split("_")[1];

      // radiobutton
      const eleVia = my_template_clone.querySelectorAll(
        'input[name="ship_via_id_"]'
      );
      for (const checkButton of eleVia) {
        checkButton.name = `ship_via_id_${id}`;
      }
      const eleRun = my_template_clone.querySelectorAll(
        'input[name="vehicle_runs_"]'
      );
      for (const check of eleRun) {
        check.name = `vehicle_runs_${id}`;
      }
      const inopIcon = my_template_clone.querySelector('img[id="inop_"]');

      inopIcon.id = `inop_${id}`;
      const eleYear = my_template_clone.querySelector('input[id="year_"]');

      eleYear.id = `year_${id}`;

      vehicleList.appendChild(newVehicle);
    }
  } else {
    alert("Has reached the maximum number of vehicles");
  }
}

function validVehicles() {
  const years = document.getElementsByName("year");
  const vehicleMake = document.getElementsByName("make");
  const vehicleModel = document.getElementsByName("model");
  if (Array.from(years).some((e) => e.value === null || e.value === "")) {
    alert("Enter a valid year");
    return false;
  }
  if (Array.from(vehicleMake).some((e) => e.value === null || e.value === "")) {
    alert("Enter a valid vehicle make");

    return false;
  }
  if (
    Array.from(vehicleModel).some((e) => e.value === null || e.value === "")
  ) {
    alert("Enter a valid vehicle model");

    return false;
  }
  return true;
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
    Vehicles: [],
    ship_date: "",
    first_name: "",
    email: "",
    phone: "",
  };
  const eleZipCheck = document.getElementById("zipCheck");

  if (eleZipCheck.checked) {
    formResult.origin_postal_code = document.getElementById("zip_origin").value;
    formResult.destination_postal_code =
      document.getElementById("zip_destination").value;
  } else {
    formResult.origin_city = document.getElementById("city_origin").value;
    formResult.destination_city =
      document.getElementById("city_destination").value;
  }

  vehicleList = document.getElementById("vehicleList");

  optionsTransport = document.getElementsByName(`ship_via_id_0`);
  transport_type = "";
  for (const option of optionsTransport) {
    if (option.checked) {
      transport_type = option.value;
    }
  }

  for (let i = 0; i < vehicleList.childElementCount; i++) {
    const vehicle = Array.from(vehicleList.children)[i];
    vehicle_model_year = vehicle.querySelector('input[name="year"]').value;
    vehicle_make = vehicle.querySelector('input[name="make"]').value;
    vehicle_model = vehicle.querySelector('input[name="model"]').value;
    id = vehicle.id.split("_")[1];

    optionsRuns = vehicle.querySelectorAll(`input[name="vehicle_runs_${id}"]`);
    vehicle_inop = "";
    for (const option of optionsRuns) {
      if (option.checked) {
        vehicle_inop = option.value;
      }
    }
    const data = {
      vehicle_model_year,
      vehicle_make,
      vehicle_model,
      vehicle_inop,
    };
    formResult.Vehicles.push(data);
  }

  formResult.ship_date = document.getElementById("dateShipment").value;
  const format = new Date(
    formResult.ship_date.replaceAll("-", "/")
  ).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  formResult.ship_date = format;
  formResult.first_name = document.getElementById("name").value;
  formResult.email = document.getElementById("email").value;
  formResult.phone = document.getElementById("phone").value;

  const submitBTN = document.getElementById("submit_button");
  submitBTN.value = "Sending request...";
  submitBTN.disabled = true;
  try {
    saveLead({ ...formResult, transport_type });
    saveEmail({ ...formResult, transport_type });

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
    vehicleData[`vehicle_inop_${index + 1}`] =
      vehicle.vehicle_inop === "1" ? "Inoperable" : "Operable";

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
    AuthKey: "f895aa95-10ea-41ae-984f-c123bf7e0ff0",
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

function changeImage(type, event) {
  switch (type) {
    case "open":
      const image = document.getElementById("typeTransport");
      image.src = "../img/truck-flatbed.svg";
      break;
    case "enclosed":
      const imageA = document.getElementById("typeTransport");
      imageA.src = "../img/truck.svg";
      break;
    case "operable":
      const index = event.target.name.split("vehicle_runs_")[1];
      const imageB = document.getElementById(`inop_${index}`);
      imageB.src = "../img/op.png";
      break;
    case "inoperable":
      const indexA = event.target.name.split("vehicle_runs_")[1];
      const imageC = document.getElementById(`inop_${indexA}`);
      imageC.src = "../img/inop.png";
      break;
    default:
      break;
  }
}
