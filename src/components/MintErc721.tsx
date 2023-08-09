"use client";

import { BaseError, parseEther } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";

import { stringify } from "../utils/stringify";
import { erc721DropABI } from "@zoralabs/nft-drop-contracts";

export function MintERC721() {
  const { address } = useAccount();

  // contract to mint against
  // if desired to mint against another contract, update this.
  const erc721Address = "0x6c9a773f8d5f1d7724729abf98d9aa5a436f8a4f";
  const recipient = address!;
  const quantity = 3n;
  const comment = "my awesome token";
  // address that will receive mint referrral rewards
  const mintReferral = "0x917dC724b63389e9140C9534ab6902D3390a0544";

  const mintFee = parseEther("0.000777");

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    abi: erc721DropABI,
    address: erc721Address,
    functionName: "mintWithRewards",
    args: [recipient, quantity, comment, mintReferral],
    value: mintFee * quantity,
  });

  const { write, data, error, isLoading, isError } = useContractWrite(config);
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  return (
    <>
      <h3>Mint an ERC721 at address {erc721Address} </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        <button disabled={!write} type="submit">
          Mint
        </button>
      </form>
      {isPrepareError && <div>{prepareError?.message}</div>}
      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  );
}
