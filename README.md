# vue3-form-validator

Librería minmalísta para validaciones de formulario para Vue 3.

## Configuaración del proyecto

### Instalar las dependecias:
```sh
npm install @iamadeveloper-es/vue3-form-validator
```

### main.js en la parte superior del archivo importamos el plugin:
```js
import { formValidator } from '@iamadeveloper-es/vue3-form-validator'
```

### main.js Le decimos a Vue que use nuestro plugin:
```js
app.use(formValidator, {})
```

### main.js Configuració del plugin:
* Validaciones Custom
```js
import { customValidations } from './validations/custom-validations'
app.use(formValidator, {
    customRules: customValidations
})
```

### Uso en vista o componente:
1. Importamos el composable 'useValidator'
2. Traemos la función 'validateForm' del composable
3. asignamos un 'ref' a nuestro formulario
4. Añadimos las validaciones a los inputs con el atributo 'validations'
5. Creamos un span para mostrar los errores con el atributo 'data-error' y el mismo valor del name del input
6. Cuando queramos validar el formulario, llamamos a la función 'validateForm' del composable pasándole la ref del formulario
```js
import { useValidator } from '@iamadeveloper-es/vue3-form-validator';

const { validateForm } = useValidator()
const form = ref(null)
const formData = ref({
  userName: ''
})

const onSubmit = () => {
  validateForm(form)
}
</script>

<template>
  <form 
  ref="form"
  @submit.prevent="onSubmit">
    <label for="userName">User name</label>
    <input 
    type="text"
    id="userName"
    name="userName"
    v-model="formData.userName"
    validations="required">
    <span data-error="userName"></span>

    <button type="submit">Send</button>
  </form>
</template>
```