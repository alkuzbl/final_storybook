// eslint-disable-next-line consistent-return
export const loginValidationCheck = (dataForm: { email: string; password: string }) => {
  if (!dataForm.email) {
    return {
      email: 'Email is required',
    };
  }
  if (!dataForm.password) {
    return {
      password: 'Password is required',
    };
  }
};
