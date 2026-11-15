import { ethers } from "ethers";
import abi from "./abi.json";

const contractAddress =
  "0x572Ec5beBdA7B0749a26e7511eBdcD5235aB7425";

export const getReadContract = () => {
  const provider = new ethers.JsonRpcProvider(
    "https://ethereum-sepolia-rpc.publicnode.com"
  );

  return new ethers.Contract(
    contractAddress,
    abi,
    provider
  );
};

export const getContract = async () => {
  const provider =
    new ethers.BrowserProvider(
      window.ethereum
    );

  const signer =
    await provider.getSigner();

  return new ethers.Contract(
    contractAddress,
    abi,
    signer
  );
};