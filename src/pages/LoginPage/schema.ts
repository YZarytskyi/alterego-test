import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .email('⚠ Invalid email')
    .required('⚠ This field is required'),
  password: yup
    .string()
    .required('⚠ This field is required')
    .min(8, '⚠ Min length - 8 chars'),
});
