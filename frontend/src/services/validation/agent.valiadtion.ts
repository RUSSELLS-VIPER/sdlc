import * as yup from 'yup'

export const agentContactschema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  message: yup.string().required('Message content cannot be empty'),
  consent: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});