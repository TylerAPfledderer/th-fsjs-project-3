// --- Variables --- //
const otherJobRole = document.querySelector("#other-job-role");
const titleSelection = document.querySelector("#title");
const colorSelection = document.querySelector("#color");
const colorOptions = colorSelection.querySelectorAll("option");

// Grab the Credit Card, Paypal and Bitcoin displays
const creditcardDisplay = document.querySelector("#credit-card");
const paypalDisplay = document.querySelector("#paypal");
const bitcoinDisplay = document.querySelector("#bitcoin");
const paymentDisplays = [creditcardDisplay, paypalDisplay, bitcoinDisplay];

// Grab form and required inputs
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

// --- Functions --- //

// Function to update error or success styling on validation check
const validStyle = (containerEl, bool, errorText = '') => {
    const selectorName = bool ? "valid" : "not-valid";
    const displayStyle = bool ? "none" : "unset";

    // Check if a validation class is already attached to activity container
    const classExist = containerEl.classList.contains("valid") || containerEl.classList.contains("not-valid");

    // Store the opposite class of the validation bool param
    const prevSelector = !bool ? "valid" : "not-valid";

    // Run proper TolkenList method to update validation class if one is already attached or not
    !classExist ? containerEl.classList.add(selectorName) : containerEl.classList.replace(prevSelector, selectorName);

    // Provide display style to the error hint element
    const { lastElementChild } = containerEl;
    lastElementChild.style.display = displayStyle;
    lastElementChild.textContent = errorText;
};

// ============ //
//   Job Role   //
//   Section    //
// ============ //

// Hide "Other" Job Role input on load if JS is turned on
otherJobRole.hidden = true;

document.querySelector("#title").addEventListener("change", event => {

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


// Immediately disable it on load; Waits for a design selection
colorSelection.disabled = true;

document.querySelector("#design").addEventListener("change", event => {
    const { target } = event;

    // On any change, enable the Color selection menu
    colorSelection.disabled = false;

    let colorsActive = [];
    for (let i = 0; i < colorOptions.length; i++) {
        const color = colorOptions[i];
        color.hidden = false;
        if (target.value !== color.dataset.theme) {
            color.hidden = true;
        }
        color.hidden === false ? colorsActive.push(color) : null;
    }
    colorsActive[0].selected = true;
});

// ========================= //
//  Register for Activities  //
//         Section           //
// ========================= //

let isValid;

// When the Activites selections are checked or unchecked
document.querySelector("#activities").addEventListener("change", function () {

    // Collect the list of activities by their input element
    const activities = this.querySelectorAll(".activities-box input");

    // Grab element that displays total cost
    const totalCostDisplay = this.querySelector("#activities-cost");

    let selected = false; 

    // Declare a variable to store total cost
    let totalCost = 0;
    activities.forEach((activity) => {

        // Quick access to current activity's data attributes
        const { dayAndTime, cost } = activity.dataset;

        // Quick access to current activity's main attributes
        const { checked, disabled } = activity;

        // Function to disable an activity depending of inputs with same date/time
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
            selected = true;
        }

        // If the current activity is not checked or disabled
        if (!checked && !disabled) {

            // Enable any activities with same date/time
            changeActivityDisable(activities, false);
        }
    });

    // Provide validation style based on variable 'selected' (line 90)
    validStyle(this, selected);
    isValid = selected;

    totalCostDisplay.textContent = `Total: $${totalCost}`;
});

// ============== //
//  Payment Info  //
//     Section    //
// ============== //

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

const errorDisplayText = (value, regex, noLengthMsg, badStringMsg) => {
    if (value.length === 0) {
        return noLengthMsg;
    }
    if (!regex.test(value)) {
        return badStringMsg;
    }
};
// Validation checks on keyup in required text fields
form.addEventListener("keyup", ({ target }) => {
    const validInputTargets = [
        {
            input: nameInput,
            regex: /^\S/,
            errorHint(value, regex) {
                return errorDisplayText(value, regex, "Please enter your name.", "Your name can not begin or only contain spaces.");
            }
        },
        {
            input: emailInput,
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
            errorHint(value, regex) {
                return errorDisplayText(value, regex, "Please enter your email address.", "Your email address needs to have the correct format.");
            }
        },
        {
            input: ccNumber,
            regex: /^[0-9]{13,16}$/,
            errorHint(value, regex) {
                return errorDisplayText(value, regex, "Please Enter a Credit Card Number", "Not a valid Credit Card Number");
            }
        },
        {
            input: ccZip,
            regex: /^[0-9]{5}$/,
            errorHint(value, regex) {
                return errorDisplayText(value, regex, "Please Enter the Zip Code for the Credit Card.", "Not a valid Zip Code.");
            }
        },
        {
            input: ccCVV,
            regex: /^[0-9]{3}$/,
            errorHint(value, regex) {
                return errorDisplayText(value, regex, "Please Enter The Credit Card's Security Code", "Not a Valid Credit Card Security Code.");
            }
        }
    ];

    validInputTargets.forEach(({ input, regex, errorHint }) => {
        const { value } = input;
        if (target === input) {
            isValid = value.length !== 0 && regex.test(value);
            validStyle(input.parentElement, isValid, errorHint(value, regex));
        }
    });
});


// Validation checks on submit
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
        if (ccNumber || ccZip || ccCVV) {
            if (document.querySelector("#payment option[value='credit-card']").selected === false) {
                return;
            }
        }
        
        if (input.value === "") {
            validStyle(input.parentElement, false, "Required field empty.");
            isValid = false;
        }
    });
    
    // Turn nodelist to an array and show validation error if none of the inputs are checked
    if (Array.from(activitiesGroup).every((checkBox) => checkBox.checked === false)) {
        validStyle(activitiesBox.parentElement, false);
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});

const activityCheckboxes = document.querySelectorAll("#activities-box input");
activityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("focus", function () {
        this.parentElement.classList.add("focus");
    });
    checkbox.addEventListener("blur", function () {
        this.parentElement.classList.remove("focus");
    });
});
