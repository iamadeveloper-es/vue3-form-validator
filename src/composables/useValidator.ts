/**
 * Exportar
 */
import { ref, reactive, computed, getCurrentInstance, onUnmounted } from 'vue';
// import {validations} from '../validator/validations'
import FormValidator from '../validator/FormValidator';
export function useValidator() {
    const internalInstance = getCurrentInstance();
    const formMap = reactive(new Map());

    internalInstance?.appContext.app.directive('validate-form', {
        mounted(el, binding) {
            const config = {
                element: el,
                params: binding?.value
            };
            init(config);
        }
    });

    const hasErrors = computed(() => {
        
    })

    const formErrors = computed(() => {
        // const iterator = formMap.keys()
        // const errors = {}
        // formMap.forEach(item => {
        //     const formKey = iterator.next().value
        //     errors[formKey] = item.errors.length ?
        //         item.errors.map(error => {
        //             const fieldName = error.fieldName
        //             return {
        //                 [fieldName]: error.message
        //             }
        //         }) : {}
        // })

        // debugger
        // return errors
    })

    function init(config) {
        const formMapId = `form-${config.params.id}`;
        const validationMode = config?.params?.mode || 'onSubmit';
        formMap.set(formMapId, {
            form: config.element,
            schema: [],
            errors: [],
            mode: validationMode
        });
        setSchema(formMapId);

        if (validationMode === 'instant') {
            initInstantValidation(formMap.get(formMapId).form, formMapId)
        }
    }

    function initInstantValidation(form, formMapId){
        form.addEventListener('input', function (e) {
            instantValidation(e, formMap.get(formMapId), formMapId);
        }, true);
    }

    function instantValidation(event, form, formMapId) {
        const target = event.target;
        const inptType = target.getAttribute('type');
        const inptName = target.getAttribute('name');
        const value = inptType === 'checkbox' || inptType === 'checkbox' ?
            target.checked :
            target.value;
        let schemaIndex = form.schema.findIndex(item => item.fieldName === inptName);
        if (schemaIndex == -1) {
            setSchema(formMapId);
            schemaIndex = form.schema.findIndex(item => item.fieldName === inptName);
        }
        validateField(form, form.schema[schemaIndex], value);
    };

    function setSchema(formMapId) {
        const form = formMap.get(formMapId);
        form.schema = [];
        const inputs = form.form.querySelectorAll('input[validations]');
        inputs.forEach((input, index) => {
            form.schema.push({
                fieldName: input.getAttribute('name'),
                rules: setRules(input.getAttribute('validations'))
            });
        });
    }
    
    function validateForm(id) {
        const formMapId = `form-${id}`;
        const form = formMap.get(formMapId);
        const inputs = form.form.querySelectorAll('input[validations]');
        inputs.forEach((input, index) => {
            const inptType = input.getAttribute('type');
            const value = inptType === 'checkbox' || inptType === 'checkbox' ?
                input.checked :
                input.value;
            if (inputs.length !== form.schema.length) {
                setSchema(formMapId);
            }
            validateField(form, form.schema[index], value);
        });

        if(form.mode === 'instant-on-submit'){
            initInstantValidation(form.form, formMapId)
        }
    }

    function setRules(dataValidations) {
        return dataValidations.split('|').map(item => {
            return {
                rule: item.split(':')[0],
                args: item.split(':')[1]?.length ?
                    item.split(':')[1].split(',') :
                    undefined
            };
        });
    }
    function validateField(form, schemaObj, value) {
        const errors = [];
        schemaObj.rules.forEach(item => {
            const validationStatus = FormValidator.getRules()[item.rule](value, item.args);

            if (!validationStatus.isValid) {
                errors.push({
                    fieldName: schemaObj.fieldName,
                    message: validationStatus.message
                });
            
            }
            else {
                errors.filter(error => error.message !== validationStatus.message);
            }

            form.errors = errors
        });
        handleErrors(form, schemaObj);
    }

    function handleErrors(form, schemaObj) {
        const spanError = form.form.querySelector(`[data-error="${schemaObj.fieldName}"]`);
        const inpt = form.form.querySelector(`input[name="${schemaObj.fieldName}"]`);
        const errors = form.errors
        if (errors.length > 0) {
            inpt.classList.add('has-error')
            spanError.classList.add('show');
            spanError.textContent = errors[0].message;
        }
        else {
            inpt.classList.remove('has-error')
            spanError.classList.remove('show');
            spanError.textContent = '';
        }
    }

    onUnmounted(() => {
        for (const [key, value] of formMap) {
            debugger;
            if (value.mode === 'insant') {
                value.form.removeEventListener('input', instantValidation, true);
            }
        }
    });
    return {
        formErrors,
        validateForm
    };
}
