import { useEffect, type ReactNode } from "react";
import {
  useWatch,
  type Control,
  type FieldValues,
  type Path,
  type UseFormSetValue,
} from "react-hook-form";
import { BadgeSeplag } from "../Badge";
import {
  DateFieldSeplag,
  RadioButtonFieldSeplag,
  TextAreaFieldSeplag,
} from "../Fields";
import {
  isDateAfterSeplag,
  isDateBeforeSeplag,
} from "../../uteis/manipulaData";

export const SITUACAO_VIGENCIA = {
  ATIVO: "ATIVO",
  ENCERRADO: "ENCERRADO",
  EXTINTO: "EXTINTO",
} as const;

export const STATUS_OPERACIONAL_VIGENCIA = {
  AGENDADO: "AGENDADO",
  AGENDADO_ENCERRAMENTO: "AGENDADO_ENCERRAMENTO",
  AGENDADO_EXTINCAO: "AGENDADO_EXTINCAO",
  ATIVO: "ATIVO",
  ENCERRADO: "ENCERRADO",
  EXTINTO: "EXTINTO",
} as const;

export type SituacaoVigenciaSeplag =
  (typeof SITUACAO_VIGENCIA)[keyof typeof SITUACAO_VIGENCIA];

export type StatusOperacionalVigenciaSeplag =
  (typeof STATUS_OPERACIONAL_VIGENCIA)[keyof typeof STATUS_OPERACIONAL_VIGENCIA];

export interface SituacaoVigenciaValueSeplag {
  situacao?: SituacaoVigenciaSeplag;
  dataAtivacao?: string;
  dataEncerramento?: string;
  motivoEncerramento?: string;
  dataExtincao?: string;
  motivoExtincao?: string;
}

export interface SituacaoVigenciaFieldNamesSeplag<T extends FieldValues> {
  situacao: Path<T>;
  dataAtivacao: Path<T>;
  dataEncerramento: Path<T>;
  motivoEncerramento: Path<T>;
  dataExtincao: Path<T>;
  motivoExtincao: Path<T>;
}

export interface SituacaoVigenciaSeplagProps<T extends FieldValues = any> {
  control: Control<T>;
  setValue?: UseFormSetValue<T>;
  names?: Partial<SituacaoVigenciaFieldNamesSeplag<T>>;
  disabled?: boolean;
  readOnly?: boolean;
  cols?: {
    situacao?: string;
    statusOperacional?: string;
    dataAtivacao?: string;
    dataEncerramento?: string;
    motivoEncerramento?: string;
    dataExtincao?: string;
    motivoExtincao?: string;
  };
  possuiVinculosOuDependencias?: boolean;
  permitirExtincaoDireta?: boolean;
  ocultarRotuloSituacao?: boolean;
  rotuloDataAtivacao?: string;
  getFormErrorMessage: (name: string) => ReactNode;
}

export interface ValidacaoSituacaoVigenciaOptionsSeplag {
  possuiVinculosOuDependencias?: boolean;
  permitirExtincaoDireta?: boolean;
}

const DEFAULT_NAMES = {
  situacao: "situacao",
  dataAtivacao: "dataAtivacao",
  dataEncerramento: "dataEncerramento",
  motivoEncerramento: "motivoEncerramento",
  dataExtincao: "dataExtincao",
  motivoExtincao: "motivoExtincao",
};

const STATUS_META: Record<
  StatusOperacionalVigenciaSeplag,
  { label: string; color: string; bg: string; icon: string }
> = {
  AGENDADO: {
    label: "Agendado",
    color: "#8a5a00",
    bg: "#fff4d6",
    icon: "pi pi-clock",
  },
  AGENDADO_ENCERRAMENTO: {
    label: "Agendado para Encerramento",
    color: "#6b7280",
    bg: "#f1f5f9",
    icon: "pi pi-clock",
  },
  AGENDADO_EXTINCAO: {
    label: "Agendado para Extinção",
    color: "#b42318",
    bg: "#fee4e2",
    icon: "pi pi-clock",
  },
  ATIVO: {
    label: "Ativo",
    color: "#1f7a3f",
    bg: "#e7f6ed",
    icon: "pi pi-check-circle",
  },
  ENCERRADO: {
    label: "Encerrado",
    color: "#6b7280",
    bg: "#f1f5f9",
    icon: "pi pi-lock",
  },
  EXTINTO: {
    label: "Extinto",
    color: "#b42318",
    bg: "#fee4e2",
    icon: "pi pi-times-circle",
  },
};

function resolveNames<T extends FieldValues>(
  names?: Partial<SituacaoVigenciaFieldNamesSeplag<T>>,
): SituacaoVigenciaFieldNamesSeplag<T> {
  return { ...DEFAULT_NAMES, ...names } as SituacaoVigenciaFieldNamesSeplag<T>;
}

function todayAsDateOnly() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function calcularStatusOperacionalVigenciaSeplag(
  value: SituacaoVigenciaValueSeplag,
  dataReferencia: Date = todayAsDateOnly(),
): StatusOperacionalVigenciaSeplag {
  if (
    value.situacao === SITUACAO_VIGENCIA.ATIVO &&
    value.dataAtivacao &&
    isDateAfterSeplag(value.dataAtivacao, dataReferencia)
  ) {
    return STATUS_OPERACIONAL_VIGENCIA.AGENDADO;
  }

  if (value.situacao === SITUACAO_VIGENCIA.ENCERRADO) {
    if (
      value.dataEncerramento &&
      isDateAfterSeplag(value.dataEncerramento, dataReferencia)
    ) {
      return STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO;
    }

    return STATUS_OPERACIONAL_VIGENCIA.ENCERRADO;
  }

  if (value.situacao === SITUACAO_VIGENCIA.EXTINTO) {
    if (
      value.dataExtincao &&
      isDateAfterSeplag(value.dataExtincao, dataReferencia)
    ) {
      return STATUS_OPERACIONAL_VIGENCIA.AGENDADO_EXTINCAO;
    }

    return STATUS_OPERACIONAL_VIGENCIA.EXTINTO;
  }

  return STATUS_OPERACIONAL_VIGENCIA.ATIVO;
}

export function validarSituacaoVigenciaSeplag(
  value: SituacaoVigenciaValueSeplag,
  options: ValidacaoSituacaoVigenciaOptionsSeplag = {},
): string[] {
  const errors: string[] = [];

  if (!value.situacao) errors.push("Situação é obrigatória.");
  if (!value.dataAtivacao) errors.push("Data de Ativação é obrigatória.");

  if (value.situacao === SITUACAO_VIGENCIA.ENCERRADO) {
    if (!value.dataEncerramento) {
      errors.push("Data de Encerramento é obrigatória.");
    }
    if (!value.motivoEncerramento) {
      errors.push("Motivo do Encerramento é obrigatório.");
    }
  }

  if (value.situacao === SITUACAO_VIGENCIA.EXTINTO) {
    if (!value.dataExtincao) errors.push("Data de Extinção é obrigatória.");
    if (!value.motivoExtincao) {
      errors.push("Motivo da Extinção é obrigatório.");
    }
    if (options.possuiVinculosOuDependencias) {
      errors.push(
        "Não é possível extinguir este registro, pois existem vínculos ou associações relacionadas a ele.",
      );
    }
    if (!options.permitirExtincaoDireta && !value.dataEncerramento) {
      errors.push("O fluxo padrão exige encerramento antes da extinção.");
    }
  }

  if (
    value.dataAtivacao &&
    value.dataEncerramento &&
    isDateBeforeSeplag(value.dataEncerramento, value.dataAtivacao)
  ) {
    errors.push(
      "A Data de Encerramento não pode ser anterior à Data de Ativação.",
    );
  }

  if (
    value.dataAtivacao &&
    value.dataExtincao &&
    isDateBeforeSeplag(value.dataExtincao, value.dataAtivacao)
  ) {
    errors.push("A Data de Extinção não pode ser anterior à Data de Ativação.");
  }

  if (
    value.dataEncerramento &&
    value.dataExtincao &&
    isDateBeforeSeplag(value.dataExtincao, value.dataEncerramento)
  ) {
    errors.push(
      "A Data de Extinção não pode ser anterior à Data de Encerramento.",
    );
  }

  return errors;
}

export function SituacaoVigenciaSeplag<T extends FieldValues = any>({
  control,
  setValue,
  names,
  disabled = false,
  readOnly = false,
  cols,
  possuiVinculosOuDependencias = false,
  permitirExtincaoDireta = false,
  ocultarRotuloSituacao = false,
  rotuloDataAtivacao = "Data de Ativação",
  getFormErrorMessage,
}: Readonly<SituacaoVigenciaSeplagProps<T>>) {
  const resolvedNames = resolveNames(names);
  const situacao = useWatch({ control, name: resolvedNames.situacao });
  const dataAtivacao = useWatch({ control, name: resolvedNames.dataAtivacao });
  const dataEncerramento = useWatch({
    control,
    name: resolvedNames.dataEncerramento,
  });
  const motivoEncerramento = useWatch({
    control,
    name: resolvedNames.motivoEncerramento,
  });
  const dataExtincao = useWatch({ control, name: resolvedNames.dataExtincao });
  const isDisabled = disabled || readOnly;
  const mostrarEncerramento =
    situacao === SITUACAO_VIGENCIA.ENCERRADO ||
    situacao === SITUACAO_VIGENCIA.EXTINTO;
  const mostrarExtincao = situacao === SITUACAO_VIGENCIA.EXTINTO;
  const statusOperacional = calcularStatusOperacionalVigenciaSeplag({
    situacao,
    dataAtivacao,
    dataEncerramento,
    dataExtincao,
  });
  const statusMeta = STATUS_META[statusOperacional];
  const desabilitarSituacaoPorAgendamento =
    statusOperacional === STATUS_OPERACIONAL_VIGENCIA.AGENDADO;
  const podeExtinguir =
    permitirExtincaoDireta ||
    Boolean(dataEncerramento && String(motivoEncerramento ?? "").trim());

  useEffect(() => {
    if (
      !setValue ||
      situacao === SITUACAO_VIGENCIA.ENCERRADO ||
      situacao === SITUACAO_VIGENCIA.EXTINTO
    ) {
      return;
    }
    setValue(resolvedNames.dataEncerramento, undefined as any);
    setValue(resolvedNames.motivoEncerramento, undefined as any);
  }, [
    resolvedNames.dataEncerramento,
    resolvedNames.motivoEncerramento,
    setValue,
    situacao,
  ]);

  useEffect(() => {
    if (!setValue || situacao === SITUACAO_VIGENCIA.EXTINTO) return;
    setValue(resolvedNames.dataExtincao, undefined as any);
    setValue(resolvedNames.motivoExtincao, undefined as any);
  }, [resolvedNames.dataExtincao, resolvedNames.motivoExtincao, setValue, situacao]);

  return (
    <div className="grid situacao-vigencia-seplag">
      <div className="col-12">
        <div className="grid situacao-vigencia-row situacao-vigencia-row-principal">
          <RadioButtonFieldSeplag
            name={resolvedNames.situacao}
            control={control}
            label={ocultarRotuloSituacao ? "" : "Situação"}
            cols={cols?.situacao ?? "12 12 5"}
            required={!ocultarRotuloSituacao}
            disabled={isDisabled || desabilitarSituacaoPorAgendamento}
            options={[
              { label: "Ativo", value: SITUACAO_VIGENCIA.ATIVO },
              { label: "Encerrado", value: SITUACAO_VIGENCIA.ENCERRADO },
              {
                label: "Extinto",
                value: SITUACAO_VIGENCIA.EXTINTO,
                disabled: !podeExtinguir,
              },
            ]}
            getFormErrorMessage={getFormErrorMessage}
          />

          <DateFieldSeplag
            name={resolvedNames.dataAtivacao}
            control={control}
            label={rotuloDataAtivacao}
            cols={cols?.dataAtivacao ?? "12 12 4"}
            required
            disabled={isDisabled}
            getFormErrorMessage={getFormErrorMessage}
          />

          <div
            className={`${
              cols?.statusOperacional ?? "col-12 md:col-4 lg:col-3"
            } situacao-vigencia-status-col`}
          >
            <label className="font-bold block mb-2">Status Operacional</label>
            <div style={{ minHeight: 40, display: "flex", alignItems: "center" }}>
              <BadgeSeplag
                label={statusMeta.label}
                color={statusMeta.color}
                bg={statusMeta.bg}
                icon={statusMeta.icon}
                size="md"
              />
            </div>
          </div>
        </div>
      </div>

      {mostrarEncerramento && (
        <div className="col-12">
          <div className="situacao-vigencia-divider" />
          <div className="grid situacao-vigencia-row situacao-vigencia-row-secundaria">
            <DateFieldSeplag
              name={resolvedNames.dataEncerramento}
              control={control}
              label="Data de Encerramento"
              cols={cols?.dataEncerramento ?? "12 12 4"}
              required={mostrarEncerramento}
              disabled={isDisabled}
              validateAfterDate={dataAtivacao}
              validateAfterMessage="A Data de Encerramento não pode ser anterior à Data de Ativação."
              getFormErrorMessage={getFormErrorMessage}
            />

            <TextAreaFieldSeplag
              name={resolvedNames.motivoEncerramento}
              control={control}
              label="Motivo do Encerramento"
              cols={cols?.motivoEncerramento ?? "12"}
              required={mostrarEncerramento}
              disabled={isDisabled}
              maxLength={500}
              rows={3}
              getFormErrorMessage={getFormErrorMessage}
            />
          </div>
        </div>
      )}

      {mostrarExtincao && (
        <div className="col-12">
          <div className="situacao-vigencia-divider" />
          <div className="grid situacao-vigencia-row situacao-vigencia-row-extincao">
            <DateFieldSeplag
              name={resolvedNames.dataExtincao}
              control={control}
              label="Data de Extinção"
              cols={cols?.dataExtincao ?? "12 12 4"}
              required={mostrarExtincao}
              disabled={isDisabled}
              validateAfterDate={dataEncerramento || dataAtivacao}
              validateAfterMessage={
                dataEncerramento
                  ? "A Data de Extinção não pode ser anterior à Data de Encerramento."
                  : "A Data de Extinção não pode ser anterior à Data de Ativação."
              }
              getFormErrorMessage={getFormErrorMessage}
            />

            <TextAreaFieldSeplag
              name={resolvedNames.motivoExtincao}
              control={control}
              label="Motivo da Extinção"
              cols={cols?.motivoExtincao ?? "12"}
              required={mostrarExtincao}
              disabled={isDisabled}
              maxLength={500}
              rows={3}
              getFormErrorMessage={getFormErrorMessage}
            />
          </div>
        </div>
      )}

      {mostrarExtincao && possuiVinculosOuDependencias && (
        <div className="col-12">
          <small className="text-red-600 font-semibold">
            Não é possível extinguir este registro, pois existem vínculos ou
            associações relacionadas a ele.
          </small>
        </div>
      )}

      {mostrarExtincao && !permitirExtincaoDireta && !dataEncerramento && (
        <div className="col-12">
          <small className="text-orange-600 font-semibold">
            O fluxo padrão recomenda encerrar o registro antes de extinguir.
          </small>
        </div>
      )}
    </div>
  );
}

export default SituacaoVigenciaSeplag;
