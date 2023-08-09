"use client";

import { BaseError, Address } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useChainId,
  useAccount,
} from "wagmi";

import { stringify } from "../utils/stringify";
import { zoraNftCreatorV1Config } from "@zoralabs/zora-721-contracts";

export function WriteContractPrepared() {
  const chainId = useChainId() as keyof typeof zoraNftCreatorV1Config.address;

  const { address } = useAccount();

  // hardcoded erc721 creation params.
  const contractName = "My fun new contract";
  const symbol = "MCR";
  const editionSize = 50n;
  const royaltyBps = 0;
  const fundsRecipient = address!;
  const defaultAdmin = address!;
  const description = "my awesome token";
  const animationUri = "0x0";
  const imageUri = "0x0";
  // max value for maxSalePurchasePerAddress, results in no mint limit
  const maxSalePurchasePerAddress = 4294967295;
  const createReferral = address!;

  // prepare the transaction
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    abi: zoraNftCreatorV1Config.abi,
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
        // max value for end date, results in no end date for mint
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
