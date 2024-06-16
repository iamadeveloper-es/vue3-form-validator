import { ref, reactive } from 'vue';
// import {validations} from '../validator/validations'

import FormValidator from '../validator/FormValidator';

export function useValidator (){
  const schema = reactive([]);
  const form = ref(null);

  function validateForm (ref){
    form.value = ref.value;
    const dataValidations = [];
    const inputs = form.value.querySelectorAll('input[validations]');

    inputs.forEach((input, index) => {
      const inptType = input.getAttribute('type');
      const value = inptType === 'checkbox' || inptType === 'checkbox' ? 
        input.checked :
        input.value;

      schema.push({
        fieldName: input.getAttribute('name'),
        rules: setRules(input.getAttribute('validations'))
      });
      validateField(schema[index], value);
    });

  }

  function setRules (dataValidations){
    return dataValidations.split('|').map(item => {
      return {
        rule: item.split(':')[0],
        args: item.split(':')[1]?.length ? 
          item.split(':')[1].split(',') :
          undefined
      };
    });
  }

  function validateField (schemaObj, value){
    const errors = [];
    schemaObj.rules.forEach(item => {
            
      const validationStatus = FormValidator.getRules()[item.rule](value, item.args);
      // debugger

      if(!validationStatus.isValid){
        errors.push(validationStatus.message);
      }
      else{
        errors.filter(error => error !== validationStatus.message);

      }
    });

    handleErrors(schemaObj, errors);
        
  }

  function handleErrors (schemaObj, errors){
    const spanError = form.value.querySelector(`[data-error="${schemaObj.fieldName}"]`);
    if(errors.length > 0){
      spanError.classList.add('show');
      spanError.textContent = errors[0];
    }
    else{
      spanError.classList.remove('show');
      spanError.textContent = '';
    }
  }

  return{
    validateForm
  };
}