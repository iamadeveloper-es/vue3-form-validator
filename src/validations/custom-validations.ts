import {FormValidator} from '../index'

export const customValidations = () => {
    FormValidator.extends('otra_validacion', (value, args) => {
        return {
            isValid: value === 'custom',
            message: 'validación custom'
          };
    })
}