export const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  const digits = cpf.split("").map(Number);
  const [a, b, c, d, e, f, g, h, i, j, k] = digits;

  const sum1 =
    10 * a + 9 * b + 8 * c + 7 * d + 6 * e + 5 * f + 4 * g + 3 * h + 2 * i;
  const remainder1 = sum1 % 11;
  const firstVerifier = remainder1 < 2 ? 0 : 11 - remainder1;

  const sum2 =
    11 * a +
    10 * b +
    9 * c +
    8 * d +
    7 * e +
    6 * f +
    5 * g +
    4 * h +
    3 * i +
    2 * firstVerifier;
  const remainder2 = sum2 % 11;
  const secondVerifier = remainder2 < 2 ? 0 : 11 - remainder2;

  return firstVerifier === j && secondVerifier === k;
};
