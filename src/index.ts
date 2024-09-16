import bitcoin from 'bitcoinjs-lib';
import { bech32m as bech32 } from 'bech32';

export const scriptPublicToP2TRAddress = (scriptPublic: string, network: bitcoin.networks.Network) => {
    network = network || bitcoin.networks.bitcoin;
    const scriptPubKey = Buffer.from(scriptPublic, 'hex');
    const words = bech32.toWords(scriptPubKey);
    words.unshift(0x01); // version 1 for P2TR
    return bech32.encode(network.bech32, words);
}
