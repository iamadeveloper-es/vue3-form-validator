<script setup lang="ts">
import { ref } from 'vue';
// import { useValidator } from '@iamadeveloper-es/vue3-form-validator';
import { useValidator } from '../index';

const { validateForm, formErrors } = useValidator()

const formData = ref({
  userName: '',
  lastname: '',
  email: '',
  minlength: ''
})
const formData2 = ref({
  userName: '',
  email: ''
})

const onSubmit = () => {
  // validateForm(form)
  validateForm('form-1')
}

const onSubmit2 = () => {
  // validateForm(form2)
  validateForm('form-2')
}
</script>

<template>
  <form 
  @submit.prevent="onSubmit" v-validate-form="{id: 'form-1', mode: 'instant'}">
    <fieldset>
      <label for="userName">User name</label>
      <br>
      <input 
      type="text"
      id="userName"
      name="userName"
      v-model="formData.userName"
      validations="required|otra_validacion">
      <span data-error="userName"></span>
    </fieldset>
    <fieldset v-if="formData.userName && formData.userName === 'custom'">
      <label for="lastname">Lastname</label>
      <br>
      <input 
      type="text"
      id="lastname"
      name="lastname"
      v-model="formData.lastname"
      validations="required|minLength:7">
      <span data-error="lastname"></span>
    </fieldset>
    <fieldset>
      <label for="email">Email</label>
      <br>
      <input 
      type="text"
      id="email"
      name="email"
      v-model="formData.email"
      validations="required|email">
      <span data-error="email"></span>
    </fieldset>
    <fieldset>
      <label for="minlength">minlength</label>
      <br>
      <input 
      type="text"
      id="minlength"
      name="minlength"
      v-model="formData.minlength"
      validations="minLength:3">
      <span data-error="minlength"></span>
    </fieldset>
    <!-- <pre>{{ formErrors }}</pre> -->
    <button type="submit">Send</button>
  </form>

  <form 
  @submit.prevent="onSubmit2" v-validate-form="{id: 'form-2'}">
    <fieldset>
      <label for="userName">User name</label>
      <br>
      <input 
      type="text"
      id="userName"
      name="userName"
      v-model="formData2.userName"
      validations="required">
      <span data-error="userName"></span>
    </fieldset>
    <button type="submit">Send</button>
  </form>
  <p>{{ $t('message') }}</p>
</template>

<style scoped>
form fieldset{
  border: none;
  padding: 0;
}

button[type="submit"]{
  margin-top: 10px;
}
</style>
