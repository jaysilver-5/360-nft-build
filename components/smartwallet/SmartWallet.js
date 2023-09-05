// import { ethers } from "ethers";
// import { SmartWallet } from "@thirdweb-dev/wallets";
// // import {
// //   TWApiKey,
// //   factoryAddress,
// //   activeChain,
// //   nftDropAddress,
// //   implementation,
// // } from "../../const/constants";
// import { SmartContract, NFT } from "@thirdweb-dev/sdk";
// import { WalletOptions } from "@thirdweb-dev/wallets";

// let account = 0x111d92DDab5211e5bE89B1Bd85066b2cfeC205B4;//Optimism Deployment Token Based Account
// let walletOptions = new WalletOptions();
// walletOptions.gasless = true;
// walletOptions.factoryAddress = factoryAddress;

// export default function newSmartWallet(token) {
//   const config = {
//     chain: activeChain,
//     factoryAddress: factoryAddress,
//     thirdwebApiKey: TWApiKey,
//     gasless: true,
//     factoryInfo: {
//       createAccount: async (factory, owner) => {
//         const account = factory.prepare("createAccount", [
//           implementation,
//           activeChain.chainId,
//           nftDropAddress,
//           token.metadata.id,
//           0,
//           ethers.utils.toUtf8Bytes(""),
//         ]);
//         console.log("here", account);
//         return account;
//       },
//       getAccountAddress: async (factory, owner) => {
//         return factory.call("account", [
//           implementation,
//           activeChain.chainId,
//           nftDropAddress,
//           token.metadata.id,
//           0,
//         ]);
//       },
//     },
//   };
//   return new SmartWallet(config);
// }
