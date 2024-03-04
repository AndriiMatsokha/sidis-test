export function generatePassword(): string {
  const uppercaseLetters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters: string = 'abcdefghijklmnopqrstuvwxyz';
  const digits: string = '0123456789';
  const symbols: string = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  const randomUppercase = randomCharFrom(uppercaseLetters);
  const randomLowercase = randomCharFrom(lowercaseLetters);
  const randomDigit = randomCharFrom(digits);
  const randomSymbol = randomCharFrom(symbols);

  const randomChars: string[] = [randomUppercase, randomLowercase, randomDigit, randomSymbol];

  for (let i = 0; i < 4; i++) {
    randomChars.push(randomCharFrom(uppercaseLetters + lowercaseLetters + digits + symbols));
  }

  return randomChars.sort(() => Math.random() - 0.5).join('');
}

function randomCharFrom(characters: string): string {
  return characters.charAt(Math.floor(Math.random() * characters.length))
}
