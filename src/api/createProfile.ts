import {Program} from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import idl from '../utils/idl.json'

async function createProfile(provider: anchor.Provider, username: string, name: string, description: string,
                             pic_url: string, banner_url: string, personal_url: string) {

    /* Create the program interface combining the idl, program IDL, and provider */
    const jsonString = JSON.stringify(idl);
    const idlJSON = JSON.parse(jsonString);

    const program = new Program(idlJSON, idl.metadata.address, provider);

    const profile = anchor.web3.Keypair.generate();

    const tsx = await program.methods.createProfile(username,name,description,pic_url,banner_url,personal_url)
        .accounts({
            // account share...
            profile: profile.publicKey,
            author: program.provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers(
            // Key pairs of signers here...
            [profile]
        ).rpc();

    // log the transaction ID
    console.log("transaction ID:", tsx)

    // After sending the transaction to the blockchain.
    // Fetch the account details of the created LeetDroid account.
    const profileAccount = await program.account.profile.fetch(profile.publicKey);
    console.log("account:", profileAccount);

    // return the tsx ID
    return tsx;
}

export default createProfile;