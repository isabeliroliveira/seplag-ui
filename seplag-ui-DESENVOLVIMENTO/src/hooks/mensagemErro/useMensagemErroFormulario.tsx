import { useCallback } from "react";
import type { FieldValues, FieldErrors } from "react-hook-form";
import { getErrorMessageInObjectSeplag } from "../../uteis/getErrorMessageInObject";

/**
 * Hook que encapsula o padrão de exibição de erro de campo de formulário.
 * Elimina a duplicação da função `obterMensagemErro` / `getFormErrorMessage`
 * em todos os componentes de formulário do sistema.
 *
 * @param erros - Objeto `errors` retornado pelo `useForm` ou `useFormContext`
 * @returns Função `obterMensagemErro(nome)` pronta para uso no prop `getFormErrorMessage`
 *
 * @example
 * const obterMensagemErro = useMensagemErroFormulario(errors)
 * // uso:
 * <TextField getFormErrorMessage={obterMensagemErro} />
 */
export function useMensagemErroFormularioSeplag<T extends FieldValues>(
  erros: FieldErrors<T>,
) {
  return useCallback(
    (nome: string) => {
      const erro = getErrorMessageInObjectSeplag(erros, nome);
      return erro ? <small className="p-error">{erro.message}</small> : null;
    },
    [erros],
  );
}
