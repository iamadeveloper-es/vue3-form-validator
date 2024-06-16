import FormValidator from '../validator/FormValidator';

export default {
  install: (app, options) => {

    app.config.globalProperties.$validator = FormValidator.init();
    if(options.customRules){
      options.customRules();
    }
  }
};