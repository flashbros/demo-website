import ButtonLayout from "../[buttonLayout]/buttonLayout";
import style from "./userPanel.module.css";
import { useState, useEffect } from "react";
import ActionField from "./actionField";
import { ethers } from "ethers";
import { getSigner } from "../../../../ethereum.js";

export default function UserPanel({
  user = { name: "user", id: 0 },
  users = [{ name: "user", id: 0 }],
  contract,
  ownState,
  otherState,
  setState,
  setOtherState,
  channelBalance,
  offChain,
  setOffChain,
}) {
  const [walletBalance, setWalletBalance] = useState(0.0);
  const [userBalance, setUserBalance] = useState(0.0);

  useEffect(() => {
    async function dodo() {
      if (contract) {
        let wb = ethers.utils
          .formatEther(
            (await (await getSigner(user.id + 1)).getBalance()).toString()
          )
          .slice(0, 7);
        setWalletBalance(wb);
        if (offChain.finalized) {
          setUserBalance(user.id === 0 ? offChain.balance_A : offChain.balance_B)
        } else {
          let ub = ethers.utils.formatEther(
            (await contract[0].channels(1))[0][user.id + 1].toString()
          );
          setUserBalance(ub);
        }
      }
    }
    dodo();
  }, [contract, ownState, channelBalance, offChain]);

  return (
    <div className={style.userContainer}>
      <div className={style.topWrapper}>
        <div className={style.left}>
          <div>{user.name}</div>
          <div>Wallet: {walletBalance} ETH</div>
        </div>
        <div className={style.right}>
          <div>{userBalance} ETH - User Balance</div>
        </div>
      </div>
      <div className={style.actionField}>
        <ActionField
          state={ownState}
          user={user}
          users={users}
          contract={contract}
          walletBalance={walletBalance}
          channelBalance={channelBalance}
          setState={setState}
          offChain={offChain}
          setOffChain={setOffChain}
        />
      </div>
      <ButtonLayout
        user={user}
        state={ownState}
        setState={setState}
        otherState={otherState}
        setOtherState={setOtherState}
        setOffChain={setOffChain}
      />
    </div>
  );
}
