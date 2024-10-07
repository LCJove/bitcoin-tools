import * as bitcoin from 'bitcoinjs-lib';
import * as tinysecp from 'tiny-secp256k1';
import {  ECPairInterface, ECPairFactory, ECPairAPI } from 'ecpair';
import * as crypto from 'crypto';

bitcoin.initEccLib(tinysecp);
const ECPair: ECPairAPI = ECPairFactory(tinysecp);

export class DummyWallet {
  public keyPair: ECPairInterface;
  public address: string;
  
  constructor() {
    // 生成一个随机的私钥
    const privateKeySeed = crypto.randomBytes(32);
    const keyPair = ECPair.fromPrivateKey(privateKeySeed);

    const privateKey = keyPair.privateKey;
    if (!privateKey) {
      throw new Error('Failed to generate private key');
    }

    this.keyPair = keyPair;
    // 使用私钥生成 P2TR 地址
    const { address } = bitcoin.payments.p2tr({
      internalPubkey: keyPair.publicKey.slice(1, 33),
      network: bitcoin.networks.bitcoin,
    });
    
    this.address = address as string;
  }
}

const wallet = new DummyWallet();
