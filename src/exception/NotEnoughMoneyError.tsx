/**
 * This class represents the error to be thrown when we try to transfer a sum of money greater than
 * available in the source account.
 */
export class NotEnoughMoneyError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}