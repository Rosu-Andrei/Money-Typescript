/**
 * This error will be thrown when we try to use any currency that is not supported (at the moment, any currency that is different
 * from USD or EUR).
 */
export class CurrencyNotSupportedError extends Error {
    constructor(msg: string) {
        super(msg);
    }

}