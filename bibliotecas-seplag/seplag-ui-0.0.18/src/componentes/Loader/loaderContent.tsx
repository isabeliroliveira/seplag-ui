import logo from "../../assets/img/Logo_Branco_Estado_MT.png";
import styles from "./style.module.css";

export function loaderSeplag(message = "Carregando") {
  const dots = ["first", "second", "third", "fourth"];
  const displayMessage = message.trim() || "Carregando";

  return (
    <div className={styles["loader-overlay"]}>
      <img className={styles.text} src={logo} alt="loader" />
      <div className={styles["lds-ellipsis"]}>
        {dots.map((dot) => (
          <div key={`loader-dot-${dot}`}></div>
        ))}
      </div>
      <span className={styles.msg}>{displayMessage}</span>
    </div>
  );
}
