export default {  
  rules: {  
    phoneNumberRule: (value: string) => /^\+[0-9]{12}$/.test(value) || 'Invalid phone number',  
    userNameRule: (value: string) => /^[a-zA-Z0-9\s]+$/.test(value) || 'Invalid username',
    passwordRule: (value: string) => /^(?=.*[A-Za-z]|\d)[A-Za-z\d]$/.test(value) || 'Invalid password',
    fullNameRule: (value: string) => /^[a-zA-Z\s]+$/.test(value) || 'Invalid full name', 
    genderRule: (value: string) => /^(male|female)$/i.test(value) || 'Invalid gender', 
    birthdateRule: (value: string) => /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/.test(value) || 'Invalid birthdate. Use M/D/YYYY format',
  },
}