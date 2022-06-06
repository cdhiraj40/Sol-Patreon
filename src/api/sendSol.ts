import {web3} from "@project-serum/anchor";
import {
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";


const SendSol = async (from: any, to: PublicKey, lamports: number) => {

    const profile = anchor.web3.Keypair.generate();

    const connection = new web3.Connection(
        "https://api.devnet.solana.com",
        "confirmed"
    );

    const airdropSignature = await connection.requestAirdrop(
        from.publicKey,
        web3.LAMPORTS_PER_SOL
    );


    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdropSignature,
    });

    const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: profile.publicKey,
            toPubkey: to,
            lamports: lamports,
        })
    );

    const a = await sendAndConfirmTransaction(connection, transferTransaction, [profile]);

    console.log(a)
};

export default SendSol;
