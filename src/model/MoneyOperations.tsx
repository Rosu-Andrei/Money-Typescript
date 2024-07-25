import {MoneyOperationInterface} from "../interfaces/MoneyOperationInterface";
import {MoneyInterface} from "../interfaces/MoneyInterface";
import {Money} from "./Money";
import {DifferentCurrenciesError} from "../exception/DifferentCurrenciesError";

/**
 * This class implements the operations that are possible with money. These are addition, subtraction and splitting.
 */
export class MoneyOperations implements MoneyOperationInterface<MoneyInterface> {
    add(m1: Money, m2: Money): Money {
        if (m1.currency !== m2.currency) {
            throw new DifferentCurrenciesError("Cannot add money with different currencies");
        }
        return new Money(m1.value + m2.value, m1.currency);
    }

    subtract(m1: Money, m2: Money): Money {
        if (m1.currency !== m2.currency) {
            throw new DifferentCurrenciesError("Cannot subtract money with different currencies");
        }
        return new Money(m1.value - m2.value, m1.currency);
    }

    split(m: Money, n: number): Money[] {
        const partValue = Math.floor(m.value / n);
        const remainder = m.value % n;

        const result: Money[] = [];

        for (let i = 0; i < n; i++) {
            /**
             * if we don't also take the reminder in consideration, then we won't split the entire value, but only a part of it
             */
            if (i < remainder) {
                result.push(new Money(partValue + 1, m.currency));
            } else {
                result.push(new Money(partValue, m.currency));
            }
        }
        return result;
    }
}