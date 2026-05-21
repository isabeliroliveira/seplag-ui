export function formatarParaCNPJComPaddingSeplag(cnpjString: string): string {
  let cnpjLimpo = cnpjString.replaceAll(/\D/g, "");
  const tamanhoEsperado = 14;

  if (cnpjLimpo.length < tamanhoEsperado) {
    const zerosParaAdicionar = tamanhoEsperado - cnpjLimpo.length;
    cnpjLimpo = "0".repeat(zerosParaAdicionar) + cnpjLimpo;
  } else if (cnpjLimpo.length > tamanhoEsperado) {
    return "CNPJ inválido (mais de 14 dígitos)";
  }
  return cnpjLimpo.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5",
  );
}

export const formatCPFSeplag = (cpf: string) =>
  cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");

export const formatCNPJSeplag = (cnpj: string) =>
  cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");

export const unmaskedSeplag = (unmask: string) => unmask.replaceAll(/\D/g, "");

export function validarCNPJSeplag(cnpj: string): boolean {
  const digits = cnpj.replaceAll(/\D/g, "");

  if (digits.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(digits)) return false;

  const calcDigit = (base: string, weights: number[]) => {
    const sum = base
      .split("")
      .reduce((acc, d, i) => acc + Number(d) * weights[i], 0);
    const rem = sum % 11;
    return rem < 2 ? 0 : 11 - rem;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const d1 = calcDigit(digits.slice(0, 12), w1);
  const d2 = calcDigit(digits.slice(0, 13), w2);

  return Number(digits[12]) === d1 && Number(digits[13]) === d2;
}
