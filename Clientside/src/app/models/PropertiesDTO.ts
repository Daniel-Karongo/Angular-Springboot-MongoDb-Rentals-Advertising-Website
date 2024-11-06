import { PropertyOwner } from "./PropertyOwner";

export class PropertiesDTO {
    #rentalId!: string;
    #propertyOwner!: PropertyOwner;
    #term!: string;
    #amount!: number;
    #tenantPreferences!: string[];
    #numberOfOccupants!: number;
    #type!: string;
    #photographs!: string[];
    #location!: string;
    #amenities!: string[];
    #rating!: number;

    constructor(
        propertyOwner: PropertyOwner, term: string, amount: number, tenantPreferences: string[], numberOfOccupants: number, type: string, photographs: string[], location: string, amenities: string[], rating: number
    ) {
        this.#propertyOwner = propertyOwner;
        this.#term = term;
        this.#amount = amount;
        this.#tenantPreferences = tenantPreferences;
        this.#numberOfOccupants = numberOfOccupants;
        this.#type = type;
        this.#photographs = photographs;
        this.#location = location;
        this.#amenities = amenities;
        this.#rating = rating;
    }

    // Getters
    get rentalId(): string {
        return this.#rentalId;
    }
    get propertyOwner(): PropertyOwner {
        return this.#propertyOwner;
    }
    get term(): string {
        return this.#term;
    }
    get amount(): number {
        return this.#amount;
    }
    get tenantPreferences(): string[] {
        return this.#tenantPreferences;
    }
    get numberOfOccupants(): number {
        return this.#numberOfOccupants;
    }
    get type():  string {
        return this.#type;
    }
    get photographs(): string[] {
        return this.#photographs;
    }
    get location(): string {
        return this.#location;
    }
    get amenities(): string[] {
        return this.#amenities;
    }
    get rating(): number {
        return this.#rating;
    }


    // Setters
    set rentalId(rentalId: string) {
        this.#rentalId = rentalId;
    }
    set propertyOwner(propertyOwner: PropertyOwner) {
        this.#propertyOwner = propertyOwner;
    }
    set term(term: string) {
        this.#term = term;
    }
    set amount(amount: number) {
        this.#amount = amount;
    }
    set tenantPreferences(tenantPreferences: string[]) {
        this.#tenantPreferences = tenantPreferences;
    }
    set numberOfOccupants(numberOfOccupants: number) {
        this.#numberOfOccupants = numberOfOccupants;
    }
    set type(type:  string) {
        this.#type = type;
    }
    set photographs(photographs: string[]) {
        this.#photographs = photographs;
    }
    set location(location: string) {
        this.#location = location;
    }
    set amenities(amenities: string[]) {
        this.#amenities = amenities;
    }
    set rating(rating: number) {
        this.#rating = rating;
    }

    toString(): string {
        return `Property [rentalId=${this.#rentalId}, propertyOwner=${this.#propertyOwner}, term=${this.#term}, amount=${this.#amount}, tenantPreferences=${this.#tenantPreferences.join(', ')}, numberOfOccupants=${this.#numberOfOccupants}, type=${this.#type}, location=${this.#location}, amenities=${this.#amenities.join(', ')}, rating=${this.#rating}]`;
    }
}