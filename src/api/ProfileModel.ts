import {PublicKey} from "@solana/web3.js";

export class ProfileModel {
    public publicKey: PublicKey;
    public author: any;
    public timestamp: String;
    public username: String;
    public name: String;
    public description: String;
    public picUrl: string;
    public bannerUrl: string;
    public personalUrl: string;

    constructor(publicKey: any, accountData: { author: any; timestamp: { toString: () => any; }; username: String; name: String; description: String; picUrl: string; bannerUrl: string; personalUrl: string }) {
        this.publicKey = publicKey
        this.author = accountData.author
        this.timestamp = accountData.timestamp.toString()
        this.username = accountData.username
        this.name = accountData.name
        this.description = accountData.description
        this.picUrl = accountData.picUrl
        this.bannerUrl = accountData.bannerUrl
        this.personalUrl = accountData.personalUrl
    }

    get author_display() {
        const author = this.author.toBase58()
        return author.slice(0, 4) + '..' + author.slice(-4)
    }

}