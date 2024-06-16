export const validations = {

  'required': (value, args) => {
    return {
      isValid: !!value,
      message: 'required'
    };
  },
  'minLength': (value, args) => {
    return {
      isValid: value.length >= Number(args[0]),
      message: 'minLength'
    };
  },
  'between': (value, args) => {
    return {
      isValid: value >= args[0] && value <= args[1],
      message: 'between'
    };
  },
  'digit': (value, args) => {
    return {
      isValid: value === args[0],
      message: 'digit'
    };
  }
};