import style from "./buttonLayout.module.css";
import { useState, useEffect } from "react";

export default function ButtonLayout({
  user,
  state,
  setState,
  otherState,
  setOtherState,
  setOffChain,
}) {
  const [inactive, setInactiveButtons] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  useEffect(() => {
    switch (state) {
      case 0: // Anfang, nur open geht
        setInactiveButtons([false, true, true, true, true, true]);
        break;
      case 2: // noch nicht funded, nur fund geht
        setInactiveButtons([true, false, true, true, true, true]);
        break;
      case 4: // funded, nur update oder finalize geht //state 5: man updated gerade
        setInactiveButtons([true, true, false, false, true, true]);
        break;
      case 6: // finalized, nur close geht
        setInactiveButtons([true, true, true, true, false, true]);
        break;
      case 7: // close Zwischenstate (steht in der Mitte)
        setInactiveButtons([true, true, true, true, true, true]);
        break;
      case 8: // closed, nur withdraw geht
        setInactiveButtons([true, true, true, true, true, false]);
        break;
      case 9: // withdraw Zwischenstate (steht in der Mitte)
        setInactiveButtons([true, true, true, true, true, false]);
        break;
      default: // nichts geht
        setInactiveButtons([true, true, true, true, true, true]);
    }
  }, [state]);

  return (
    <div className={style.ButtonLayout}>
      <div
        className={`${style.button} ${inactive[0] ? style.inactive : ""}`}
        onClick={() => (!inactive[0] ? setState(1) : "")}
      >
        Open
      </div>
      <div
        className={`${style.button} ${inactive[1] ? style.inactive : ""}`}
        onClick={() => (!inactive[1] ? setState(3) : "")}
      >
        Fund
      </div>
      <div
        className={`${style.button} ${inactive[2] ? style.inactive : ""}`}
        onClick={() => (!inactive[2] ? setState(5) : "")}
      >
        Update
      </div>
      <div
        className={`${style.button} ${inactive[3] ? style.inactive : ""}`}
        onClick={() => {
          if (!inactive[3]) {
            setState(6);
            setOtherState(6);
            setOffChain((prev) => {
              return { ...prev, finalized: true };
            });
          }
        }}
      >
        Finalize
      </div>
      <div
        className={`${style.button} ${inactive[4] ? style.inactive : ""}`}
        onClick={() => {
          if (!inactive[4]) {
            setState(7);
            setOtherState(8);
          }
        }}
      >
        Close
      </div>
      <div
        className={`${style.button} ${inactive[5] ? style.inactive : ""}`}
        onClick={() => {
          if (!inactive[5]) {
            setState(9);
          }
        }}
      >
        Withdraw
      </div>
    </div>
  );
}
