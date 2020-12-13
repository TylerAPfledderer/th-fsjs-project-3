// ============ //
//   Job Role   //
//   Section    //
// ============ //
// Hide "Other" Job Role input on load if JS is turned on
const otherJobRole = document.querySelector("#other-job-role");
otherJobRole.hidden = true;
// Grab the Job Title selection menu
const titleSelection = document.querySelector("#title");
titleSelection.addEventListener("change", event => {
    // If user selects the "other" option only, display the text field
    if (event.target.value === "other") {
        otherJobRole.hidden = false;
    }
    else {
        otherJobRole.hidden = true;
    }
});
// ============== //
//  T-Shirt Info  //
//    Section     //
// ============== //
// Grab the Color selection menu
const colorSelection = document.querySelector("#color");
// Immediately disable it on load; Waits for a design selection
colorSelection.disabled = true;
// Declare variable to store color options
const colorOptions = colorSelection.querySelectorAll("option");
// Grab the Design selection menu
const designSelection = document.querySelector("#design");
designSelection.addEventListener("change", event => {
    const target = event.target;
    // On any change, enable the Color selection menu
    colorSelection.disabled = false;
    colorOptions.forEach(color => {
        color.hidden = false;
        if (target.value !== color.dataset.theme) {
            color.hidden = true;
        }
    });
});
// ========================= //
//  Register for Activities  //
//         Section           //
// ========================= //
document.querySelector("#activities").addEventListener("change", function () {
    // Collect the list of activities by their input element
    const activities = this.querySelectorAll(".activities-box input");
    // Grab element that displays total cost
    const totalCostDisplay = this.querySelector("#activities-cost");
    let totalCost = 0;
    activities.forEach((activity) => {
        if (activity.checked) {
            totalCost += parseInt(activity.dataset.cost);
        }
    });
    totalCostDisplay.textContent = `Total: $${totalCost}`;
});
