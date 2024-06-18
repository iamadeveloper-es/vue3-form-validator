import FormValidator from '../validator/FormValidator';

export default {
  install: (app, options) => {

    app.config.globalProperties.$validator = FormValidator.init(options);
    if(options.customRules){
      options.customRules();
    }
  }
};