var inputListenersSet = false;

document.getElementById('submit-btn').addEventListener('click',function(){
    if (inputListenersSet === false) addInput_EventListeners('.form input'),inputListenersSet = true; //we only want to set the input listeners once upon the first form submission
    validateInputs('.form input',true) //validate inputs, and submit - 'true' flag
})

// Validation of all inputs
function validateInputs(inputsQuerySelector,submitFlag){
    let formData = getNodeValues(inputsQuerySelector)
    let errors = 0; //count the number or validation errors found (see line 54)
    
    // *** 1. ---- name validation check
    if (formData.name != '' && formData.name != null ){
        hideErrorMessage('#name')
    } else {
        showErrorMessage('#name','First Name cannot be empty')
        errors++
    }
    
    
    // *** 2. ---- lastname validation check
    if(formData.lastname != '' && formData.lastname != null){
        hideErrorMessage('#lastname')
    } else {
        showErrorMessage('#lastname','Last Name cannot be empty')
        errors++
    }

    
    // *** 3. ---- email validation check
    let emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'g')
    if(formData.email == '' && formData.email != null ){
        showErrorMessage('#email','Email cannot be empty')
        errors++
    } else if(emailRegExp.test(formData.email) === false){
        showErrorMessage('#email','Looks like this is not an email')
        errors++
    } else {
        hideErrorMessage('#email')
    }

    
    // *** 4. ---- password validation check
    if(formData.password != '' && formData.password != null ){
        hideErrorMessage('#password')
    } else {
        showErrorMessage('#password','Password cannot be empty')
        errors++
    }


    if(submitFlag !== false && errors <= 0){
        console.log('Success - data can be submitted!',formData)
    } else {
        console.log('This data shall not be submitted.')
    }
    
}


/** handling the display of error messages */
function showErrorMessage(inputSelector, message){
    let inputNode = document.querySelector(inputSelector)
    let textErrorNode = inputNode.parentNode.querySelector('.error-message span')

    textErrorNode.innerText = (message) ? message : 'Error';
    inputNode.classList.add('show-error')
}

function hideErrorMessage(inputSelector){
    let inputNode = document.querySelector(inputSelector)
    inputNode.classList.remove('show-error')
}


//return object where the input's name is the key, and it's value is the value
function getNodeValues(inputsQuerySelector){
    let inputs =  document.querySelectorAll(inputsQuerySelector)
    
    return Object.keys(inputs).reduce(function(acc,key){
        let objKey = inputs[key].getAttribute('name')
        let objValue = inputs[key].value
        
        acc[objKey] = objValue
        return acc
    },{})
}


//adding on focus and blur listeners for all inputs - called on click of the form submit button 
function addInput_EventListeners(inputsQuerySelector){
    let inputs =  document.querySelectorAll(inputsQuerySelector)

    inputs.forEach(input=>{
        input.addEventListener('blur',function(){
            validateInputs(inputsQuerySelector,false) //on blur, re-validate all the inputs - without submitting (false flag)
        })
    })
}

