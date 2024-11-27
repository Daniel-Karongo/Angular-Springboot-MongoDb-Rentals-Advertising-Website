export class Property {
    private rentalId!: string;
    private propertyOwnerId!: string;
    private plotSummaryDescription!: string;
    private plotDetailedDescription!: string;
    private photographs!: File[];  // Changed from string[] to File[]
    private term!: string;
    private amount!: number;
    private tenantPreferences!: string[];
    private numberOfOccupants!: number;
    private type!: string;
    private location!: string;
    private amenities!: string[];
    private rating!: number;
    private rules!: string;

    constructor(
        term: string, plotSummaryDescription: string, plotDetailedDescription: string, photographs: File[], amount: number, tenantPreferences: string[], type: string, location: string, amenities: string[], rules: string, propertyOwnerId?: string, numberOfOccupants?: number, rating?: number
    ) {
        if(propertyOwnerId) {
            this.propertyOwnerId = propertyOwnerId;
        }
        if(numberOfOccupants) {
            this.numberOfOccupants = numberOfOccupants;
        }
        if(rating) {
            this.rating = rating;
        }
        this.plotSummaryDescription = plotSummaryDescription;
        this.plotDetailedDescription = plotDetailedDescription;
        this.photographs = photographs;
        this.term = term;
        this.amount = amount;
        this.tenantPreferences = tenantPreferences;
        this.type = type;
        this.location = location;
        this.amenities = amenities;
        this.rules = rules;
    }

    // Getters
    get _rentalId(): string {
        return this.rentalId;
    }
    get _propertyOwnerId(): string {
        return this.propertyOwnerId;
    }
    get _plotSummaryDescription(): string {
        return this.plotSummaryDescription;
    }
    get _plotDetailedDescription(): string {
        return this.plotDetailedDescription;
    }
    get _photographs(): File[] {  // Changed to return File[] 
        return this.photographs;
    }
    get _term(): string {
        return this.term;
    }
    get _amount(): number {
        return this.amount;
    }
    get _tenantPreferences(): string[] {
        return this.tenantPreferences;
    }
    get _numberOfOccupants(): number {
        return this.numberOfOccupants;
    }
    get _type():  string {
        return this.type;
    }
    get _location(): string {
        return this.location;
    }
    get _amenities(): string[] {
        return this.amenities;
    }
    get _rating(): number {
        return this.rating;
    }
    get _rules(): string {
        return this.rules;
    }

    // Setters
    set _rentalId(rentalId: string) {
        this.rentalId = rentalId;
    }
    set _propertyOwnerId(propertyOwnerId: string) {
        this.propertyOwnerId = propertyOwnerId;
    }
    set _plotSummaryDescription(plotSummaryDescription: string) {
        this.plotSummaryDescription = plotSummaryDescription;
    }
    set _plotDetailedDescription(plotDetailedDescription: string) {
        this.plotDetailedDescription = plotDetailedDescription;
    }
    set _photographs(photographs: File[]) {  // set _the photographs as an array of File objects
        this.photographs = photographs;
    }
    set _term(term: string) {
        this.term = term;
    }
    set _amount(amount: number) {
        this.amount = amount;
    }
    set _tenantPreferences(tenantPreferences: string[]) {
        this.tenantPreferences = tenantPreferences;
    }
    set _numberOfOccupants(numberOfOccupants: number) {
        this.numberOfOccupants = numberOfOccupants;
    }
    set _type(type:  string) {
        this.type = type;
    }
    set _location(location: string) {
        this.location = location;
    }
    set _amenities(amenities: string[]) {
        this.amenities = amenities;
    }
    set _rating(rating: number) {
        this.rating = rating;
    }
    set _rules(rules: string) {
        this.rules = rules;
    }

    toString(): string {
        // Ensure photographs is an array before calling .map
        const photographNames = Array.isArray(this.photographs)
        ? this.photographs.map(file => file.name).join(', ') 
        : 'No photographs available';  // Handle case if it's not an array

        return `Property [rentalId=${this.rentalId}, propertyOwnerId=${this.propertyOwnerId}, plotSummaryDescription=${this.plotSummaryDescription}, plotDetailedDescription=${this.plotDetailedDescription}, photographs=${photographNames}, term=${this.term}, amount=${this.amount}, tenantPreferences=${this.tenantPreferences.join(', ')}, numberOfOccupants=${this.numberOfOccupants}, type=${this.type}, location=${this.location}, amenities=${this.amenities.join(', ')}, rating=${this.rating}, rules=${this.rules}]`;
    }
}