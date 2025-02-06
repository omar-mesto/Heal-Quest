export default {
  rules: {
    birthdateRule: (value: string) => /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/.test(value) || 'Invalid birthdate. Use M/D/YYYY format',
    fullNameRule: (value: string) => /^[\u0600-\u06FFa-zA-Z\s]+$/.test(value) || 'Invalid full name',
    genderRule: (value: string) => /^(male|female)$/i.test(value) || 'Invalid gender',
    passwordRule: (value: string) => /^(?=.*[A-Za-z]|\d)[A-Za-z\d]{1,}$/.test(value) || 'Invalid password',
    phoneNumberRule: (value: string) => /^\+[0-9]{12}$/.test(value) || 'Invalid phone number',
    userNameRule: (value: string) => /^[\u0600-\u06FFa-zA-Z0-9\s]+$/.test(value) || 'Invalid username',
    imageRule: (value:string) => {if (!value) return 'Image is required.';},
    required:(value:string)=> !!value || 'Required field',
  },
}