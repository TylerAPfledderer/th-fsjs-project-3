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
    if (event.target.value !== "other") {
        otherJobRole.hidden = true;
        return;
    }
    otherJobRole.hidden = false;
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
    const { target } = event;
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
// When the Activites selections are checked or unchecked
document.querySelector("#activities").addEventListener("change", function () {
    // Collect the list of activities by their input element
    const activities = this.querySelectorAll(".activities-box input");
    // Grab element that displays total cost
    const totalCostDisplay = this.querySelector("#activities-cost");
    // Declare a variable to store total cost
    let totalCost = 0;
    activities.forEach((activity) => {
        // Quick access to current activity's data attributes
        const { dayAndTime, cost } = activity.dataset;
        // Quick access to current activity's main attributes
        const { checked, disabled } = activity;
        // Function to change disable an activity depending of inputs with same date/time
        function changeActivityDisable(activities, bool) {
            activities.forEach((similarActivity) => {
                if (similarActivity !== activity && similarActivity.dataset.dayAndTime === dayAndTime) {
                    similarActivity.disabled = bool;
                    return;
                }
            });
        }
        if (checked) {
            // If the activity is check, add its cost to the total cost
            totalCost += parseInt(cost);
            // Disable activities with same date/time
            changeActivityDisable(activities, true);
        }
        // If the current activity is not checked or disabled
        if (!checked && !disabled) {
            // Enable any activities with same date/time
            changeActivityDisable(activities, false);
        }
    });
    totalCostDisplay.textContent = `Total: $${totalCost}`;
});
// ============== //
//  Payment Info  //
//     Section    //
// ============== //
// Grab the Credit Card, Paypal and Bitcoin displays
const creditcardDisplay = document.querySelector("#credit-card");
const paypalDisplay = document.querySelector("#paypal");
const bitcoinDisplay = document.querySelector("#bitcoin");
const paymentDisplays = [creditcardDisplay, paypalDisplay, bitcoinDisplay];
// Auto Select the "Credit Card" option and hide the PayPal and Bitcoin info on page load
document.querySelector("option[value='credit-card']").selected = true;
paypalDisplay.hidden = true;
bitcoinDisplay.hidden = true;
// Check for changes on the payment method
document.querySelector("#payment").addEventListener("change", event => {
    const target = event.target;
    paymentDisplays.forEach(display => {
        if (display.className === target.value) {
            display.hidden = false;
            return;
        }
        display.hidden = true;
    });
});
