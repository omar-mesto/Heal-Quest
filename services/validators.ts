export default {
  rules: {
    phoneNumberRule: (value: string) => /^\+[0-9]{12}$/.test(value) || 'invalid phone number',
    userNameRule:(value:string)=>/^[0-9 a-z]/.test(value)||'invalid User Name',
    passwordRule:(value:string)=>/^[0-9 a-z]/.test(value)||'invalid password',
  },
}