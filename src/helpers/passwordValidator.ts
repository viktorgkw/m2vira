export const validatePasswordComplexity = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

  return regex.test(password);
};

const validateCommonPasswords = (password: string, username: string) => {
  const commonPasswords = [
    "password",
    "1234567",
    "qwertyu",
    "asdasda",
    "abcdefg",
    "parola123",
  ];

  return (
    !commonPasswords.includes(password.toLowerCase()) &&
    !password.toLowerCase().includes(username.toLowerCase())
  );
};

export const validateInputs = (user: any) => {
  const isPasswordComplex = validatePasswordComplexity(user.password);
  const isEmailValid = user.email.length > 12 && user.email.includes("@");
  const isUsernameValid = user.username.length > 6;
  const isCommonPasswords = validateCommonPasswords(
    user.password,
    user.username
  );

  return (
    isPasswordComplex && isEmailValid && isUsernameValid && isCommonPasswords
  );
};
