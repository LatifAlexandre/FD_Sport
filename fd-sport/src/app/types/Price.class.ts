export class Price {

    initialPrice: number;
    reduction: number; // a number between 0 and 1. 30% of reduciton -> 0.3

    constructor(initialPrice, reduction) {
        this.initialPrice = initialPrice;
        this.reduction = reduction;
    }

    public static fake(): Price {
        return new Price(100,0.2);
    }

    getReducedPrice() {
        return this.initialPrice - this.initialPrice * this.reduction;
    }
    
}