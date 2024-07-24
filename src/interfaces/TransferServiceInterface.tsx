import {MoneyInterface} from "./MoneyInterface";
import {AccountInterface} from "./AccountInterface";
import {MoneyOperationInterface} from "./MoneyOperationInterface";
import {Money} from "../model/Money";

/**
 * Interface for the TransferService.
 */
export interface TransferServiceInterface<T extends MoneyInterface> {
    transfer(amount: T, source: AccountInterface<T>, dest: AccountInterface<T>): void;

    compareSourceAmount(amount: T, source: AccountInterface<T>): boolean
}