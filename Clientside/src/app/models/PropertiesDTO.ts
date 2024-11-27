import { PropertyOwner } from "./PropertyOwner";

export class PropertiesDTO {
    #rentalId!: string;
    #propertyOwner!: PropertyOwner;
    #plotSummaryDescription!: string;
    #plotDetailedDescription!: string;
    #photographs!: string[];
    #term!: string;
    #amount!: number;
    #tenantPreferences!: string[];
    #numberOfOccupants!: number;
    #type!: string;
    #location!: string;
    #amenities!: string[];
    #rating!: number;
    #rules!: string;

    constructor(
        propertyOwner: PropertyOwner, plotSummaryDescription: string, plotDetailedDescription: string, photographs: string[], term: string, amount: number, tenantPreferences: string[], numberOfOccupants: number, type: string, location: string, amenities: string[], rating: number, rules: string
    ) {
        this.#propertyOwner = propertyOwner;
        this.#plotSummaryDescription = plotSummaryDescription;
        this.#plotDetailedDescription = plotDetailedDescription;
        this.#photographs = photographs;
        this.#term = term;
        this.#amount = amount;
        this.#tenantPreferences = tenantPreferences;
        this.#numberOfOccupants = numberOfOccupants;
        this.#type = type;
        this.#location = location;
        this.#amenities = amenities;
        this.#rating = rating;
        this.#rules = rules;
    }

    // Getters
    get rentalId(): string {
        return this.#rentalId;
    }
    get propertyOwner(): PropertyOwner {
        return this.#propertyOwner;
    }
    get plotSummaryDescription(): string {
        return this.#plotSummaryDescription;
    }
    get plotDetailedDescription(): string {
        return this.#plotDetailedDescription;
    }
    get photographs(): string[] {
        return this.#photographs;
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
    get location(): string {
        return this.#location;
    }
    get amenities(): string[] {
        return this.#amenities;
    }
    get rating(): number {
        return this.#rating;
    }
    get rules(): string {
        return this.#rules;
    }


    // Setters
    set rentalId(rentalId: string) {
        this.#rentalId = rentalId;
    }
    set propertyOwner(propertyOwner: PropertyOwner) {
        this.#propertyOwner = propertyOwner;
    }
    set plotSummaryDescription(plotSummaryDescription: string) {
        this.#plotSummaryDescription = plotSummaryDescription;
    }
    set plotDetailedDescription(plotDetailedDescription: string) {
        this.#plotDetailedDescription = plotDetailedDescription;
    }
    set photographs(photographs: string[]) {
        this.#photographs = photographs;
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
    set location(location: string) {
        this.#location = location;
    }
    set amenities(amenities: string[]) {
        this.#amenities = amenities;
    }
    set rating(rating: number) {
        this.#rating = rating;
    }
    set rules(rules: string) {
        this.#rules = rules;
    }

    // toString(): string {
    //     return `Property [rentalId=${this.#rentalId}, propertyOwner=${this.#propertyOwner}, plotSummaryDescription=${this.#plotSummaryDescription}, plotDetailedDescription=${this.#plotDetailedDescription}, photographs=${this.#photographs.join(', ')}, term=${this.#term}, amount=${this.#amount}, tenantPreferences=${this.#tenantPreferences.join(', ')}, numberOfOccupants=${this.#numberOfOccupants}, type=${this.#type}, location=${this.#location}, amenities=${this.#amenities.join(', ')}, rating=${this.#rating}]`;
    // }
}