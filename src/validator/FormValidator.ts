import {validations} from './validations';

export default class FormValidator{

  static rules;

  static init (){
    FormValidator.rules = validations;
  }

  static extends (ruleName, callback){
    FormValidator.rules[ruleName] = callback;
    // debugger
  }

  static getRules (){
    return FormValidator.rules;
  }

    
}