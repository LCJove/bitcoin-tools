import * as bitcoin from 'bitcoinjs-lib';

export const singlePsbtWithFeeRate = (psbt: bitcoin.Psbt, feeRate: number) => {
  const finalPsbt = psbt.clone();
  finalPsbt.txInputs.forEach
}


