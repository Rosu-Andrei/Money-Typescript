import {MoneyInterface} from "./MoneyInterface";

/**
 * Represents the bank account that a person can have. Has only an attribute, a generic that extends MoneyInterface.
 */
export interface AccountInterface<T extends MoneyInterface> {
    balance: T;
}