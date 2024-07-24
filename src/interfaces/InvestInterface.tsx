import {MoneyInterface} from "./MoneyInterface";
import {AccountInterface} from "./AccountInterface";

/**
 * Interface for the InvestService.
 */
export interface InvestInterface<T extends MoneyInterface> {

    invest(amount: T, sourceAccount: AccountInterface<T>, destinationAccount: AccountInterface<T>): void;

    calculateReturns(amount: T, rate: number, years: number): T;

    withdraw(amount: T, sourceAccount: AccountInterface<T>, destinationAccount: AccountInterface<T>): void;
}