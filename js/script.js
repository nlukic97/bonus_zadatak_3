document.getElementById('submit-btn').addEventListener('click',function(){
    validateInputs('.form input')
})

function getNodeValues(inputQuerySelector){
    let inputs =  document.querySelectorAll(inputQuerySelector)
    
    return Object.keys(inputs).reduce(function(acc,key){
        let objKey = inputs[key].getAttribute('name')
        let value = inputs[key].value
        
        acc[objKey] = value
        return acc
    },{})
}

function validateInputs(inputQuerySelector){
    let formData = getNodeValues(inputQuerySelector)
    
    // name
    let nameFunction = (formData.name != '' && formData.name != null ) ? 'remove':'add';
    handleErrorMessage('#name',nameFunction)
    
    // last name
    let lastNameFunction = (formData.lastname != '' && formData.lastname != null ) ? 'remove':'add';
    handleErrorMessage('#lastname',lastNameFunction)
    
    // email
    let emailFunction
    let emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'g')

    if(formData.email == '' && formData.email != null ){
        // console.log('please enter a name');
        emailFunction = 'add';
    } else if(emailRegExp.test(formData.email) === false){
        // console.log('----invalid email');
        emailFunction = 'add';
    } else {
        emailFunction = 'remove'
    }
    handleErrorMessage('#email',emailFunction)
    
    // password
    let passwordFunction = (formData.password != '' && formData.password != null ) ? 'remove':'add';
    handleErrorMessage('#password',passwordFunction)
    
}

validateInputs('.form input')

function handleErrorMessage(inputSelector,action,message){
    let item = document.querySelector(inputSelector)
    item.classList[action]('show-error')
    //inner text od aftera za ovaj element posle namesti

    console.log(inputSelector, action);
}