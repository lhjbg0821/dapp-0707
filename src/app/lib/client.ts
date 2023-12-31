"use client";

import { MetaMaskSDK } from "@metamask/sdk";

import Web3, { Personal } from "web3";

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "MotJa",
    url: "https://project.project",
  },
});

const ethereum = MMSDK.getProvider();

export const web3 = new Web3(ethereum);
export const personal = new Personal(ethereum);
