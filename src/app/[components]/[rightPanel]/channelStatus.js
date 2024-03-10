import style from "./rightPanel.module.css";

export default function ChannelStatus({ channel, channelBalance }) {
  return (
    <div className={style.channelContainer}>
      <div>Balance</div>
      <div className={style.channelChainContainer}>
        <div className={style.channelStatus}>
          <div className={style.channelTitle}>On-Chain</div>
          <div>Balance A: 0</div>
          <div>Balance B: 0</div>
          <div>Ver.-Nr.: 0</div>
        </div>
        <div className={style.dividerY}></div>
        <div className={style.channelStatus}>
          <div className={style.channelTitle}>Off-Chain</div>

          <div className={style.right}>
            <div>Balance A: 0</div>
            <div>Balance B: 0</div>
            <div>Ver.-Nr.: 0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
