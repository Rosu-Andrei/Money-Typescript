/**
 * This class represents the error to be thrown when we try to either add or subtract two values with different currencies.
 */
export class DifferentCurrenciesError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}