"use client";

import { useState } from "react";
import { BaseError, Address } from "viem";
import {
  useAccount,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { wagmiContractConfig } from "./contracts";
import { useDebounce } from "../hooks/useDebounce";
import { stringify } from "../utils/stringify";
import { zoraNftCreatorV1Config } from "@zoralabs/zora-721-contracts";

export function WriteContractPrepared() {
  const [tokenId, setTokenId] = useState("");
  const debouncedTokenId = useDebounce(tokenId);

  const chainId = useChainId(); //as Address;

  const { address } = useAccount();

  const contractName = "My fun new contract";
  const symbol = "MCR";
  const editionSize = 50n;
  const royaltyBps = 0;
  const fundsRecipient = address!;
  const defaultAdmin = address!;
  const description = "my awesome token";
  const animationUri = "0x0";
  const imageUri = "0x0";
  const maxSalePurchasePerAddress = 4294967295;
  const createReferral = address!;

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    abi: zoraNftCreatorV1Config.abi,
    // @ts-ignore
    address: zoraNftCreatorV1Config.address[chainId] as Address,
    functionName: "createEditionWithReferral",
    args: [
      contractName,
      symbol,
      editionSize,
      royaltyBps,
      fundsRecipient,
      defaultAdmin,
      {
        maxSalePurchasePerAddress,
        presaleEnd: 0n,
        presaleStart: 0n,
        presaleMerkleRoot:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        publicSaleEnd: 18446744073709551615n,
        publicSalePrice: 0n,
        publicSaleStart: 0n,
      },
      description,
      animationUri,
      imageUri,
      createReferral,
    ],
  });

  const { write, data, error, isLoading, isError } = useContractWrite(config);
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  return (
    <>
      <h3>Create an Zora ERC721 Edition</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        <button disabled={!write} type="submit">
          Create
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
