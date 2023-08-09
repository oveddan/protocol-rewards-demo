import { Account } from "../components/Account";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { WriteContractPrepared } from "../components/CreateErc721";
import { MintERC721 } from "../components/MintErc721";

export default function Page() {
  return (
    <div>
      <h1>Zora Protocol Rewards Demo</h1>
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
        <WriteContractPrepared />
        <br />
        <hr />
        <MintERC721 />
      </Connected>
    </div>
  );
}
