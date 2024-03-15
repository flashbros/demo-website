import style from "./rightPanel.module.css";

export default function ChannelStatus({
  contract,
  channelBalance,
  offChain,
  state1,
  state2,
}) {
  return (
    <div className={style.channelContainer}>
      <div className={style.channelChainContainer}>
        <div className={style.channelStatus}>
          <div className={style.channelTitle}>On-Chain</div>
          <div>
            Ver.-Nr.: {state1 >= 10 || state2 >= 10 ? offChain.version_num : 0}
          </div>
          <div>Balance: {channelBalance} ETH</div>
          <div>Finalized: {state1 >= 10 || state2 >= 10 ? "true" : "false"}</div>
        </div>
        <div className={style.dividerY}></div>
        <div className={style.channelStatus}>
          <div className={style.channelTitle}>Off-Chain</div>
          <div>Ver.-Nr.: {offChain.version_num}</div>
          <div>Balance A: {offChain.balance_A} ETH</div>
          <div>Balance B: {offChain.balance_B} ETH</div>
          <div>Finalized: {offChain.finalized || (state1 >= 10 || state2 >= 10) ? "true" : "false"}</div>
        </div>
      </div>
    </div>
  );
}
