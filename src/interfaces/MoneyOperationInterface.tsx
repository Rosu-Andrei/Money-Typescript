import {MoneyInterface} from "./MoneyInterface";

/**
 * Interface for the MoneyOperation class responsible for the operations that we can do with Money.
 */
export interface MoneyOperationInterface<T extends MoneyInterface> {
    add(m1: T, m2: T): T;

    subtract(m1: T, m2: T): T;

    split(m: T, n: number): T[];
}