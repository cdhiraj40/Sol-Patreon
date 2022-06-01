import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PatreonCloneRust } from "../target/types/patreon_clone_rust";

describe("patreon-clone-rust", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.PatreonCloneRust as Program<PatreonCloneRust>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
