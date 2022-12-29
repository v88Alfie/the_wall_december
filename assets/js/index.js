document.addEventListener("DOMContentLoaded", function(){
    let sign_up_form = document.querySelector("#sign_up_form");
    let sign_in_form = document.querySelector("#sign_in_form");

    document.querySelector("#show_sign_in_form").addEventListener("click", toggleSelectorForm);
    document.querySelector("#show_sign_up_form").addEventListener("click", toggleSelectorForm);

    sign_in_form.addEventListener("submit", (event) => submitForm(event, sign_in_form));
    sign_up_form.addEventListener("submit", (event) => submitForm(event, sign_up_form));
});

/**
 * DOCU: This function will submit form <br>
 * Triggered: sign_in_form.addEventListener("submit", (event) => submitForm(event, sign_in_form));
 * Triggered: sign_up_form.addEventListener("submit", (event) => submitForm(event, sign_up_form));
 * Last Updated Date: December 29, 2022
 * @function
 * @param event
 * @param form = selected form
 * @author Alfie
 */
submitForm = (event, form) => {
    event.preventDefault();

    let input_fields = document.querySelectorAll(`#${form.id} input`);

    validateInput(input_fields);

    if(!(document.querySelectorAll(`#${form.id} .input_error`).length)){
        window.location.replace("wall.html");
    }
};

/**
 * DOCU: This function will validate form fields <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param form_input_fields = selected form fields
 * @author Alfie
 */
validateInput = (form_input_fields) => {
    for(let field of form_input_fields){
        field.addEventListener("focus", () => {
            field.classList.remove("input_error");
        });

        field.value ? field.classList.remove("input_error") : field.classList.add("input_error");
    }
};

/**
 * DOCU: This function will toggle the showing of login/register forms. <br>
 * Triggered: document.querySelector("#show_sign_in_form").addEventListener("click", toggleSelectorForm); <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param event = event selected
 * @author Alfie
 */
toggleSelectorForm = (event) => {
    let selected_link = event.target;

    selected_link.closest("form").classList.add("hidden");

    if(selected_link.id === "show_sign_up_form"){
        selected_link.closest("form").previousElementSibling.classList.remove("hidden");
        changeWelcomeText(selected_link.id);
    }
    else{
        selected_link.closest("form").nextElementSibling.classList.remove("hidden");
        changeWelcomeText(selected_link.id);
    }
};

/**
 * DOCU: This function will change welcome selected text on index <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param form = selected form
 * @author Alfie
 */
changeWelcomeText = form => {
    let welcome_text = document.querySelector(".form_header p");

    welcome_text.innerHTML = form === "show_sign_up_form" ? "Register a new account." : "Login your account.";
};