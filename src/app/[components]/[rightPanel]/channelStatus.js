import style from "./rightPanel.module.css";
import { useEffect, useState } from "react";

export default function ChannelStatus({ contract, channelBalance, offChain }) {
  const [versNr, setVersNr] = useState(0);

  useEffect(() => {
    async function dodo() {
      if (contract) {
        setVersNr((await contract[0].channels(1)).state.version_num.toString());
      }
    }
    dodo();
  }, [contract, channelBalance]);

  return (
    <div className={style.channelContainer}>
      <div className={style.channelChainContainer}>
        <div className={style.channelStatus}>
          <div className={style.channelTitle}>On-Chain</div>
          <div>ID: 1</div>
          <div>Balance: {channelBalance}</div>
          <div>Ver.-Nr.: 0</div>
        </div>
        <div className={style.dividerY}></div>
        <div className={style.channelStatus}>
          <div className={style.channelTitle}>Off-Chain</div>
          <div>Balance A: {offChain.balance_A} ETH</div>
          <div>Balance B: {offChain.balance_B} ETH</div>
          <div>Ver.-Nr.: {offChain.version_num}</div>
        </div>
      </div>
    </div>
  );
}
