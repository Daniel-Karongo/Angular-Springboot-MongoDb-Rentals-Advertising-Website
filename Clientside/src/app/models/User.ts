export class User {
    #emailAddress!: string;
    #password!: string;

    constructor(
        emailAddress: string,
        password: string
    ) {
        this.#emailAddress = emailAddress;
        this.#password = password;
    }

    // Getters
    get emailAddress(): string {
        return this.#emailAddress;
    }
    get password(): string {
        return this.#password;
    }

    // Setters
    set emailAddress(emailAddress: string) {  // Update setter to match field name
        this.#emailAddress = emailAddress;
    }
    set password(password: string) {  // Update setter to match field name
        this.#password = password;
    }

    toString(): string {
        return `User [emailAddress=${this.#emailAddress}, password=${this.#password}]`;
    }
}