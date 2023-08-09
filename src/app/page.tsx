import { Account } from "../components/Account";
import { Balance } from "../components/Balance";
import { BlockNumber } from "../components/BlockNumber";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { ReadContract } from "../components/ReadContract";
import { ReadContracts } from "../components/ReadContracts";
import { ReadContractsInfinite } from "../components/ReadContractsInfinite";
import { SendTransaction } from "../components/SendTransaction";
import { SendTransactionPrepared } from "../components/SendTransactionPrepared";
import { SignMessage } from "../components/SignMessage";
import { SignTypedData } from "../components/SignTypedData";
import { Token } from "../components/Token";
import { WatchContractEvents } from "../components/WatchContractEvents";
import { WatchPendingTransactions } from "../components/WatchPendingTransactions";
import { WriteContract } from "../components/WriteContract";
import { WriteContractPrepared } from "../components/WriteContractPrepared";

export default function Page() {
  return (
    <div>
      <h1>wagmi + Next.js</h1>
      <Connect />
      <Connected>
        <hr />
        <h2>Network</h2>
        <NetworkSwitcher />
        <br />
        <hr />
        <h2>Account</h2>
        <Account />
        <br />
        <hr />
        <h2>Balance</h2>
        <Balance />
        <br />
        <hr />
        <WriteContractPrepared />
      </Connected>
    </div>
  );
}
