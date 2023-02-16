import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let data = await fetch(`${config.backendEndpoint}/reservations`);
    if (data.status >= 200 && data.status <= 299) {
      let jsonData = await data.json();
      return jsonData;
    } else {
      console.log(data.status, data.statusText);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
    let noreservationBannerDiv = document.getElementById(
      "no-reservation-banner"
    );
    let reservationTableBlock = document.getElementById(
      "reservation-table-parent"
    );
    if (reservations.length === 0 || reservations === null) {
      noreservationBannerDiv.style.display = "block";
      reservationTableBlock.style.display = "none";
    } else if (reservations.length > 0) {
      noreservationBannerDiv.style.display = "none";
      reservationTableBlock.style.display = "block";
    }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm

  */
  const tableBody = document.getElementById("reservation-table");
  reservations.forEach((reservation) => {
    const row = getDataRow(reservation);
    tableBody.appendChild(row);
  });
}
  function getDataRow(dataObj) {
  const dateObject = new Date(dataObj.date);
  const bookingTimeObject = new Date(dataObj.time);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  //console.log(bookingTimeObject.toLocaleDateString('en-IN', options));
  //console.log(dateObject.toLocaleDateString());
  const tableRow = document.createElement("tr");
  const tableData = `
  <td>${dataObj.id}</td>
  <td>${dataObj.name}</td>
  <td>${dataObj.adventureName}</td>
  <td>${dataObj.person}</td>
  <td>${dateObject.toLocaleDateString("en-IN")}</td>
  <td>${dataObj.price}</td>
  <td>${bookingTimeObject.toLocaleDateString("en-IN", options)}</td>
  <td id=${dataObj.id}><a href="../detail/?adventure=${
    dataObj.adventure
  }"><button class="reservation-visit-button">Visit Adventure</button></a></td>
  `;
  tableRow.innerHTML = tableData;
  return tableRow;
}

export { fetchReservations, addReservationToTable };
