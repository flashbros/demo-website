import strucStyle from "./../../styles.module.css";
import style from "./leftPanel.module.css";
import { getSigner, getProvider } from "../../../../ethereum.js";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { stagger, animate } from "framer-motion";

export default function FlashLoaner({ contract, getBalance }) {
  const [walletBalance, setWalletBalance] = useState(0.0);
  const [flashLoanAmount, setFlashLoanAmount] = useState("");
  const [modal, setModal] = useState("");
  const [log, setLog] = useState([""]);

  let user3 = { name: "Charlie", id: 3 };

  useEffect(() => {
    dodo();
  }, [contract]);

  async function dodo() {
    if (contract) {
      let wb = ethers.utils.formatEther(
        (
          await getProvider().getBalance(
            "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
          )
        ).toString()
      );
      setWalletBalance(wb);
    }
  }

  const flashLoan = async () => {
    try {
      const conti = contract[3];
      const user1Contract = conti.connect(await getSigner(user3.id));
      console.log("DD:" + ethers.utils.parseEther(flashLoanAmount));
      await user1Contract.startFlashLoan(
        ethers.utils.parseEther(flashLoanAmount)
      );
      await getBalance();
      dodo();
      onSuccess();
    } catch (e) {
      onError(e);
    }
  };

  const onSuccess = async () => {
    setLog(["FlashLoan executed", "FlashLoan successful"]);
    setModal("FlashLoan successful!");
    const modal = document.getElementsByClassName(style.modal)[0];
    await animate(modal, { backgroundColor: "#46cc34" }, { duration: 0 });
    animate(modal, { opacity: 1 }, { duration: 1 });
    setTimeout(() => {
      animate(modal, { opacity: 0 }, { duration: 1 });
    }, 3000);
  };

  const onError = async (e) => {
    console.log(e);
    setModal("Error! FlashLoan failed.");
    const modal = document.getElementsByClassName(style.modal)[0];
    await animate(modal, { backgroundColor: "#CA3737" }, { duration: 0 });
    animate(modal, { opacity: 1 }, { duration: 1 });
    setLog(["FlashLoan executed", "FlashLoan failed", e.reason]);
    setTimeout(() => {
      animate(modal, { opacity: 0 }, { duration: 1, delay: 1 });
    }, 3000);
  };

  useEffect(() => {
    async function dodo() {
      const item = document.getElementsByClassName(style.item);
      await animate(item, { opacity: 0 }, { duration: 0 });
      animate(item, { opacity: 1 }, { delay: stagger(0.3) });
    }
    dodo();
  }, [log]);

  return (
    <div className={style.fitter}>
      <div className={style.container}>
        <div>Charlie</div>
        <div>Wallet: {walletBalance} ETH</div>
        <div className={style.actionField}>
          <input
            className={strucStyle.input}
            type="number"
            step=".01"
            placeholder="Amount"
            onChange={(e) => setFlashLoanAmount(e.target.value)}
          ></input>
          <div className={strucStyle.button} onClick={() => flashLoan()}>
            Request
          </div>
        </div>
        <div className={style.modal}>{modal}</div>
      </div>
      <div className={style.log}>
        <div className={style.title}>Log</div>
        <div className={style.logContent}>
          {log.map((entry, index) => (
            <div key={index} className={style.item}>
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
