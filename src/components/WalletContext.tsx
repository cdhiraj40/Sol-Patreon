import React, {ReactNode, useMemo} from "react";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {clusterApiUrl} from "@solana/web3.js";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter, SolflareWalletAdapter, SolletExtensionWalletAdapter,
    SolletWalletAdapter
} from "@solana/wallet-adapter-wallets";

const WalletContext = (
    {
        children
    }: {
        children: ReactNode
    }
) => {
    // The Wallet network is set to "devnet".
    const network = WalletAdapterNetwork.Devnet;

    // We can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // wallet that are compiled into the application
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({network}),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({network}),
            new SolletExtensionWalletAdapter({network}),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContext;