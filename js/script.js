document.getElementById('submit-btn').addEventListener('click',function(){
    addInput_EventListeners('.form input')
    validateInputs('.form input',true) //validate inputs, and submit (true flag)
})

//make object with input name is the key, and input value as the value
function getNodeValues(inputQuerySelector){
    let inputs =  document.querySelectorAll(inputQuerySelector)
    
    return Object.keys(inputs).reduce(function(acc,key){
        let objKey = inputs[key].getAttribute('name')
        let value = inputs[key].value
        
        acc[objKey] = value
        return acc
    },{})
}

// validation
function validateInputs(inputQuerySelector,submitData){
    let formData = getNodeValues(inputQuerySelector)
    let errors = 0; //count the number or validation errors found
    
    // *** name
    if(formData.name != '' && formData.name != null ){
        handleErrorMessage('#name','remove')
    } else {
        handleErrorMessage('#name','add','Requiered')
        errors++
    } 
    
    // *** last name   
    if(formData.lastname != '' && formData.lastname != null){
        handleErrorMessage('#lastname','remove')
    } else {
        handleErrorMessage('#lastname','add','Requiered')
        errors++
    }
    
    // *** email
    let emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'g')
    

    if(formData.email == '' && formData.email != null ){
        handleErrorMessage('#email','add','Requiered')
        errors++
    } else if(emailRegExp.test(formData.email) === false){
        handleErrorMessage('#email','add','Invalid Email Address')
        errors++
    } else {
        handleErrorMessage('#email','remove')
    }
    
    // *** password
    if(formData.password != '' && formData.password != null ){
        handleErrorMessage('#password','remove')
    } else {
        handleErrorMessage('#password','add','Requiered')
        errors++
    }

    if(submitData === false || errors > 0){
        console.log('This data shall not be submitted.');
    } else {
        console.log('Success - data can be submitted!',formData);
        
    }
    
}

// This method is called for each error to decide whether to show the error message or not
function handleErrorMessage(inputSelector,action,message){
    let inputNode = document.querySelector(inputSelector)
    let textErrorNode = inputNode.parentNode.querySelector('.error-message span') //this will get the span that containts the error message

    if(message){
        textErrorNode.innerText = message;
    } else {
        textErrorNode.innerText = 'Error' // ------------------------------- change this later
    }
    inputNode.classList[action]('show-error')
    
    // console.log(inputSelector, action);
}


//adding on focus and blur listeners for all inputs - called on click of the form submit button 
function addInput_EventListeners(inputQuerySelector){
    let inputs =  document.querySelectorAll(inputQuerySelector)

    inputs.forEach(input=>{
        input.addEventListener('focus',function(){
            this.classList.remove('show-error') //on input focus, hide the error
        })

        input.addEventListener('blur',function(){
                validateInputs(inputQuerySelector,false) //on blur, re-validate all the inputs - without submitting (false flag)
        })
    })
}

