export class Profile {
    public publicKey: any;
    public author: any;
    public timestamp: String;
    public username: String;
    public name: String;
    public description: String;
    public pic_url: String;
    public banner_url: String;
    public personal_url: String;

    constructor(publicKey: any, accountData: { author: any; timestamp: { toString: () => any; }; username: String; name: String; description: String; pic_url: String; banner_url: String; personal_url: String }) {
        this.publicKey = publicKey
        this.author = accountData.author
        this.timestamp = accountData.timestamp.toString()
        this.username = accountData.username
        this.name = accountData.name
        this.description = accountData.description
        this.pic_url = accountData.pic_url
        this.banner_url = accountData.banner_url
        this.personal_url = accountData.personal_url
    }

    get author_display() {
        const author = this.author.toBase58()
        return author.slice(0, 4) + '..' + author.slice(-4)
    }
}