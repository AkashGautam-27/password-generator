export const passwordStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      text: "Weak",
      width: "25%",
      color: "bg-red-500",
    };
  }

  if (score <= 4) {
    return {
      text: "Medium",
      width: "60%",
      color: "bg-yellow-500",
    };
  }

  return {
    text: "Strong",
    width: "100%",
    color: "bg-green-500",
  };
};