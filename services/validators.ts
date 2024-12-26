
export default {

  rules: {
    phoneNumberRule: (value: string) => /^\+[0-9]{12}$/.test(value) || 'invalid phone number',
  },
}