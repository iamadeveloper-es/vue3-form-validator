export const validations = {

  'required': (value: unknown,) => {
    return {
      isValid: !!value,
      message: 'required'
    };
  },
  'alphaNumeric': (value: string) => {
    return {
      isValid: value.match(/^[a-zA-Z0-9]+$/),
      message: 'alphaNumeric'
    };
  },
  'minLength': (value: string, args: string[] | number[]) => {
    return {
      isValid: value.length >= Number(args[0]),
      message: 'minLength',
      getMessage: {
        message: 'minLength',
        args: [value, ...args]
      }
    };
  },
  'between': (value: string | number, args: string[] | number[]) => {
    return {
      isValid: Number(value) >= Number(args[0]) && Number(value) <= Number(args[1]),
      message: 'between',
      getMessage: {
        message: 'between', 
        args: [value, ...args]
      }
    };
  },
  'email': (value: string) => {
    return {
      isValid: value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
      message: 'email'
    };
  },
  'digit': (value: string | number, args: string[] | number[]) => {
    return {
      isValid: Number(value) === Number(args[0]),
      message: 'digit'
    };
  }
};
