import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolPatreon } from "../target/types/sol_patreon";
import * as assert from "assert";

describe("sol-patreon", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolPatreon as Program<SolPatreon>;

  it('can create a new profile', async () => {
    const profile = anchor.web3.Keypair.generate();

    await program.methods.createProfile('cdhiraj40', 'Dhiraj', 'Hey this is Dhiraj', 'https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200')
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

    // After sending the transaction to the blockchain.
    // Fetch the account details of the created LeetDroid account.
    const leetdroidAccount = await program.account.profile.fetch(profile.publicKey);

    // Ensure it has the right data.
    assert.equal(leetdroidAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(leetdroidAccount.username, 'cdhiraj40');
    assert.equal(leetdroidAccount.name, 'Dhiraj');
    assert.equal(leetdroidAccount.description, 'Hey this is Dhiraj');
    assert.equal(leetdroidAccount.picUrl, 'https://picsum.photos/200');
    assert.equal(leetdroidAccount.bannerUrl, 'https://picsum.photos/200');
    assert.equal(leetdroidAccount.personalUrl, 'https://picsum.photos/200');
    assert.ok(leetdroidAccount.timestamp);
  });
});
