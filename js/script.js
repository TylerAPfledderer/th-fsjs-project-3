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
// ================ //
//        Form      //
//     Validation   //
// ================ //
// Grab 
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const activitiesBox = document.querySelector("#activities-box");
const ccInput = {
    ccNumber: document.querySelector("#cc-num"),
    ccZip: document.querySelector("#zip"),
    ccCVV: document.querySelector("#cvv")
};
const { ccNumber, ccZip, ccCVV } = ccInput;
// Function to update error or success styling on validation check
const validStyle = (containerEl, bool) => {
    // Store class name based of validation boolean
    const selectorName = bool ? "valid" : "not-valid";
    // Store display style of the error hint based on boolean
    const displayStyle = bool ? "none" : "unset";
    // Check if a validation class is already attached to activity container
    const classExist = containerEl.classList.contains("valid") || containerEl.classList.contains("not-valid");
    // Store the opposite class of the validation bool param
    const prevSelector = !bool ? "valid" : "not-valid";
    // Run proper TolkenList method to update validation class if one is already attached or not
    !classExist ? containerEl.classList.add(selectorName) : containerEl.classList.replace(prevSelector, selectorName);
    // Provide display style to the error hint element
    containerEl.lastElementChild.style.display = displayStyle;
};
// Declare variable that will store returned validation boolean
let valid;
// Validation checks on keyup in required text fields
form.addEventListener("keyup", ({ target }) => {
    // Run validations depending on input typed in
    if (target === nameInput) {
        valid = /^\S/g.test(target.value) && target.value !== '';
    }
    if (target === emailInput) {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(emailInput.value);
    }
    if (target === ccNumber) {
        valid = /^[0-9]{13,16}$/.test(ccNumber.value);
    }
    if (target === ccZip) {
        valid = /^[0-9]{5}$/.test(ccZip.value);
    }
    if (target === ccCVV) {
        valid = /^[0-9]{3}$/.test(ccCVV.value);
    }
    // Update validation class for the target's parent element
    validStyle(target.parentElement, valid);
});
form.addEventListener("submit", event => {
    // Store text fields in an array for submit check
    const inputGroup = [
        nameInput,
        emailInput,
        ccNumber,
        ccZip,
        ccCVV
    ];
    // Get array of all activity checkboxes for submit check
    const activitiesGroup = activitiesBox.querySelectorAll("input");
    // Show validation error for every text input that is still empty
    inputGroup.forEach((input) => {
        if (input.value === "") {
            validStyle(input.parentElement, false);
            valid = false;
        }
    });
    // Turn nodelist to an array and show validation error if none of the inputs are checked
    if (Array.from(activitiesGroup).every((checkBox) => checkBox.checked === false)) {
        validStyle(activitiesBox.parentElement, false);
        valid = false;
    }
    if (!valid) {
        event.preventDefault();
    }
});
