import strucStyle from "./../../styles.module.css";
import style from "./leftPanel.module.css";
import FlashLoaner from "./flashLoaner";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getProvider } from "./../../../../ethereum.js";

export default function LeftPanel({ contract, getBalance }) {
  const [cmBalance, setCmBalance] = useState(0.0);

  useEffect(() => {
    async function dodo() {
      if (contract) {
        let cm = ethers.utils.formatEther(
          (
            await getProvider().getBalance(
              "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
            )
          ).toString()
        );
        setCmBalance(cm);
      }
    }
    dodo();
  }, [contract, getBalance]);

  return (
    <div className={strucStyle.LeftPanel}>
      <div className={style.rw}>
        <div className={style.position}>
          <div className={style.cm}>
            <div className={style.title}>Crypto Market</div>
            <div className={style.cmContent}>{cmBalance} ETH</div>
          </div>
          <FlashLoaner contract={contract} getBalance={getBalance} />
        </div>
      </div>
    </div>
  );
}
