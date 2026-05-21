import { useState } from "react";
import {
  DocPage,
  PlaygroundCode,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import { ModalDeleteSeplag } from "@componentes/ModalDelete";
import { BotaoAdicionarSeplag } from "@componentes/Botao";
import "primereact/resources/themes/lara-light-blue/theme.css";

// ─── Playground ─────────────────────────────────────────────────────────────

const DEFAULT_MESSAGE = "Deseja realmente remover o registro selecionado?";

function ModalDeletePlayground() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const effectiveMessage = message.trim() === "" ? undefined : message.trim();

  const propLines = [
    `<ModalDeleteSeplag`,
    `  visible={visible}`,
    ...(effectiveMessage === undefined
      ? []
      : [`  message="${effectiveMessage}"`]),
    `  onConfirm={() => setVisible(false)}`,
    `  onCancel={() => setVisible(false)}`,
    `/>`,
  ];
  const code = propLines.join("\n");

  return (
    <div className="botao-playground">
      <div className="botao-playground-preview">
        <BotaoAdicionarSeplag
          label="Excluir registro"
          icon="pi pi-trash"
          onClick={() => {
            setVisible(true);
            setLastAction(null);
          }}
        />
        <ModalDeleteSeplag
          visible={visible}
          message={effectiveMessage}
          onConfirm={() => {
            setVisible(false);
            setLastAction("Confirmado!");
          }}
          onCancel={() => {
            setVisible(false);
            setLastAction("Cancelado.");
          }}
        />
        {lastAction !== null && (
          <span style={{ fontSize: "0.85rem", color: "#6c757d" }}>
            {lastAction}
          </span>
        )}
      </div>

      <div className="botao-playground-controls">
        <div className="pg-field">
          <label htmlFor="pg-md-message" className="pg-label">
            message
          </label>
          <input
            id="pg-md-message"
            className="pg-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={DEFAULT_MESSAGE}
            style={{ maxWidth: 480 }}
          />
        </div>
      </div>

      <PlaygroundCode code={code} />
    </div>
  );
}

function ModalDeleteBasicExample() {
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <BotaoAdicionarSeplag
        label="Excluir registro"
        icon="pi pi-trash"
        onClick={() => setVisible(true)}
      />
      <ModalDeleteSeplag
        visible={visible}
        onConfirm={() => {
          setVisible(false);
          setResult("Confirmado!");
        }}
        onCancel={() => {
          setVisible(false);
          setResult("Cancelado.");
        }}
      />
      {result && (
        <span style={{ fontSize: "0.85rem", color: "#6c757d" }}>{result}</span>
      )}
    </div>
  );
}

function ModalDeleteCustomMessageExample() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <BotaoAdicionarSeplag
        label="Remover usuário"
        icon="pi pi-user-minus"
        onClick={() => setVisible(true)}
      />
      <ModalDeleteSeplag
        visible={visible}
        message="Tem certeza que deseja remover este usuário? Esta ação não pode ser desfeita."
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />
    </>
  );
}

const sections: DocSection[] = [
  {
    title: "Playground",
    description: "Configure as propriedades e veja o resultado em tempo real.",
    example: <ModalDeletePlayground />,
    code: "",
  },
  {
    title: "Uso básico",
    description:
      "Modal de confirmação padrão com mensagem genérica de exclusão.",
    example: <ModalDeleteBasicExample />,
    code: `import { useState } from "react";
import { ModalDeleteSeplag } from "@seplag/ui-lib-react-18";

const [visible, setVisible] = useState(false);

<ModalDeleteSeplag
  visible={visible}
  onConfirm={() => setVisible(false)}
  onCancel={() => setVisible(false)}
/>`,
  },
  {
    title: "Mensagem customizada",
    description: "Substitua o texto padrão pela prop message.",
    example: <ModalDeleteCustomMessageExample />,
    code: `<ModalDeleteSeplag
  visible={visible}
  message="Tem certeza que deseja remover este usuário?"
  onConfirm={() => setVisible(false)}
  onCancel={() => setVisible(false)}
/>`,
  },
];

const props: DocProp[] = [
  {
    name: "visible",
    type: "boolean",
    required: true,
    description: "Controla a visibilidade do modal.",
  },
  {
    name: "onConfirm",
    type: "() => void",
    required: true,
    description: 'Callback chamado ao clicar em "Sim".',
  },
  {
    name: "onCancel",
    type: "() => void",
    required: true,
    description: 'Callback chamado ao clicar em "Não".',
  },
  {
    name: "message",
    type: "string",
    defaultValue: '"Deseja realmente remover o registro selecionado?"',
    required: false,
    description: "Texto alternativo à mensagem padrão de confirmação.",
  },
];

export default function ModalDeleteDoc() {
  return (
    <DocPage
      title="Modal de Exclusão"
      description="Dialog de confirmação de exclusão padrão SEPLAG. Exibe uma mensagem de alerta e aguarda confirmação do usuário antes de prosseguir com a operação destrutiva."
      badge="Estável"
      since="v0.0.1"
      importStatement={`import { ModalDeleteSeplag } from "@seplag/ui-lib-react-18";`}
      sections={sections}
      props={props}
    />
  );
}
