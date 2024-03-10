import style from "./rightPanel.module.css";
import { useEffect, useState } from "react";

export default function ChannelStatus({ contract, channelBalance, offChain }) {
  const [versNr, setVersNr] = useState(0);
  const [finalized, setFinalized] = useState(false);

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
          <div>Ver.-Nr.: {versNr}</div>
          <div>Balance: {channelBalance}</div>
          <div>Finalized: {offChain.finalized ? "true" : "false"}</div>
        </div>
        <div className={style.dividerY}></div>
        <div className={style.channelStatus}>
          <div className={style.channelTitle}>Off-Chain</div>
          <div>Ver.-Nr.: {offChain.version_num}</div>
          <div>Balance A: {offChain.balance_A} ETH</div>
          <div>Balance B: {offChain.balance_B} ETH</div>
        </div>
      </div>
    </div>
  );
}
