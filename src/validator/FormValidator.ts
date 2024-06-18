/**
 * Exportar
 */
import {validations} from './validations';

// const options = {
//   dictionary: 'custom'
// }

export default class FormValidator{

  static rules;

  /**
   * Inicializa el validador
   * @param options 
   */
  static init (options: object){
    FormValidator.rules = validations;
  }

  static extends (ruleName: string, callback: Function){
    FormValidator.rules[ruleName] = callback;
    // debugger
  }

  static getRules (){
    return FormValidator.rules;
  }

    
}