export const generatePassword = (
    length,
    uppercase,
    lowercase,
    numbers,
    symbols
) => {
    let chars = "";

    if (uppercase) {
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (lowercase) {
        chars += "abcdefghijklmnopqrstuvwxyz";
    }

    if (numbers) {
        chars += "0123456789";
    }

    if (symbols) {
        chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    if (!chars) {
        return "";
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(
            Math.random() * chars.length
        );

        password += chars[randomIndex];
    }

    return password;
};