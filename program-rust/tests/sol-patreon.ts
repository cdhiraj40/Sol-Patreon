import * as anchor from "@project-serum/anchor";
import {Program, web3} from "@project-serum/anchor";
import {SolPatreon} from "../target/types/sol_patreon";
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

    const createProfile = async (_author: anchor.web3.PublicKey, _username: string, _name: string, _description: string, _pic_url: string, _banner_url: string, _personal_url: string) => {
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

        return profile
    }

    it('can update a profile', async () => {

        // Creating a Profile and fetching its account.
        const author = program.provider.wallet.publicKey;
        const profile = await createProfile(author, 'cdhiraj40', 'Dhiraj', 'Hey this is Dhiraj', 'https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200');
        const profileAccount = await program.account.profile.fetch(profile.publicKey);

        // Ensuring the right data.
        assert.equal(profileAccount.username, 'cdhiraj40');
        assert.equal(profileAccount.name, 'Dhiraj');
        assert.equal(profileAccount.description, 'Hey this is Dhiraj');

        // Update the Profile.
        await program.rpc.updateProfile('cdhiraj40', 'Dhiraj 2.0', 'Hey this is Dhiraj but updated xD', 'https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200', {
            accounts: {
                // account share...
                profile: profile.publicKey,
                author: program.provider.wallet.publicKey,
            }
        });

        // Ensure the updated Profile has the updated data.
        const updatedProfileAccount = await program.account.profile.fetch(profile.publicKey);
        assert.equal(updatedProfileAccount.username, 'cdhiraj40');
        assert.equal(updatedProfileAccount.name, 'Dhiraj 2.0');
        assert.equal(updatedProfileAccount.description, 'Hey this is Dhiraj but updated xD');
    });

    it('cannot update someone else\'s profile', async () => {
        // Creating profile.
        const author = program.provider.wallet.publicKey;
        const profile = await createProfile(author, 'cdhiraj40', 'Dhiraj', 'Hey this is Dhiraj', 'https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200');

        // Update the Profile.
        try {
            await program.rpc.updateProfile('cdhiraj40', 'Dhiraj 2.0', 'Hey this is Dhiraj but updated xD', 'https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200', {
                accounts: {
                    profile: profile.publicKey,
                    author: anchor.web3.Keypair.generate().publicKey,
                },
            });

            assert.fail('Able to update someone else\'s profile.');
        } catch (error) {

            // Ensuring the profile account kept the initial data.
            const profileAccount = await program.account.profile.fetch(profile.publicKey);
            assert.equal(profileAccount.username, 'cdhiraj40');
            assert.equal(profileAccount.name, 'Dhiraj');
            assert.equal(profileAccount.description, 'Hey this is Dhiraj');
        }
    });


    it('can transfer 0.1 sol', async () => {

        const fromKeypair = web3.Keypair.generate();
        const toKeypair = new web3.PublicKey("EgG3NfWrYW8vbPePm1D4KbP3j5kQcimrJLHGhLirWbXi");

        const connection = new web3.Connection(
            "https://api.devnet.solana.com",
            "confirmed"
        );

        const airdropSignature = await connection.requestAirdrop(
            fromKeypair.publicKey,
            web3.LAMPORTS_PER_SOL
        );
        const latestBlockHash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: airdropSignature,
        });

        const transferTransaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: fromKeypair.publicKey,
                toPubkey: toKeypair,
                lamports: 1_000_000_00, // 0.1 SOL
            })
        );

        await web3.sendAndConfirmTransaction(connection, transferTransaction, [
            fromKeypair,
        ]);
    });
});
