export class PropertyOwner {
    #id!: string;  // Change from number to string to match MongoDB _id field
    #firstName!: string;
    #lastName!: string;
    #phoneNumber!: string;
    #emailAddress!: string;
    #password!: string;

    constructor(
        id: string, firstName: string, lastName: string, phoneNumber: string, emailAddress: string, password: string
    ) {
        this.#id = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#phoneNumber = phoneNumber;
        this.#emailAddress = emailAddress;
        this.#password = password;
    }

    // Getters
    get id(): string {
        return this.#id;
    }
    get firstName(): string {
        return this.#firstName;
    }
    get lastName(): string {
        return this.#lastName;
    }
    get phoneNumber(): string {
        return this.#phoneNumber;
    }
    get emailAddress(): string {
        return this.#emailAddress;
    }
    get password(): string {
        return this.#password;
    }

    // Setters
    set id(id: string) {  // Update setter to match field name
        this.#id = id;
    }
    set firstName(firstName: string) {  // Update setter to match field name
        this.#firstName = firstName;
    }
    set lastName(lastName: string) {  // Update setter to match field name
        this.#lastName = lastName;
    }
    set phoneNumber(phoneNumber: string) {  // Update setter to match field name
        this.#phoneNumber = phoneNumber;
    }
    set emailAddress(emailAddress: string) {  // Update setter to match field name
        this.#emailAddress = emailAddress;
    }
    set password(password: string) {  // Update setter to match field name
        this.#password = password;
    }

    toString(): string {
        return `PropertyOwner [id=${this.#id}, firstName=${this.#firstName}, lastName=${this.#lastName}, phoneNumber=${this.#phoneNumber}, emailAddress=${this.#emailAddress}]`;
    }
}
