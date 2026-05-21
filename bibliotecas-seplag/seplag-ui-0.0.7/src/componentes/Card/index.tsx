import { Card } from "primereact/card";
import gridCss from "../../uteis/Grid";
import { BotaoVoltarSeplag } from "../Botao";
import type { ReactNode } from "react";

export interface CardSeplagProps {
  cols?: string;
  title?: string | ReactNode;
  handleVoltar?: () => void;
  legenda?: () => ReactNode;
  cardHeaderClassNames?: string;
  /** Additional class applied to the root wrapper */
  /** Inline style for the root wrapper */
  style?: React.CSSProperties;
  /** Footer node rendered below the children */
  footer?: ReactNode;
  actions?: ReactNode | null;
  children: ReactNode;
}

export const CardSeplag = (props: CardSeplagProps) => {
  function colClasseCss() {
    return gridCss(props.cols ? props.cols : "12");
  }

  function title() {
    if (!props.title) {
      return <></>;
    }

    if (props.handleVoltar) {
      return (
        <div className="col-12">
          <div className="grid" style={{ alignItems: "center" }}>
            <div className="col-12">
              <div className="flex w-full justify-content-between align-items-center">
                <div className="flex align-items-center" style={{ gap: 12 }}>
                  <BotaoVoltarSeplag onClick={props.handleVoltar} />
                  <h5
                    style={{ flex: 1, minHeight: "35px", marginBottom: "0px" }}
                  >
                    <strong>{props.title}</strong>
                  </h5>
                </div>
                {props.actions}
              </div>
            </div>
            <div className="col-12">{props.legenda?.()}</div>
          </div>

          <hr />
        </div>
      );
    }

    return (
      <div className="col-12">
        <div className="flex justify-content-between align-items-center">
          <h5 style={{ flex: 1, minHeight: "35px", marginBottom: "0px" }}>
            <strong>{props.title}</strong>
            {props.legenda?.()}
          </h5>
          {props.actions}
        </div>

        <hr />
      </div>
    );
  }

  return (
    <div className={colClasseCss()} style={props.style}>
      <Card className={props.cardHeaderClassNames}>
        <div className="grid">
          {title()}
          <div className="col-12">{props.children}</div>
          {props.footer && <div className="col-12">{props.footer}</div>}
        </div>
      </Card>
    </div>
  );
};

export default CardSeplag;
