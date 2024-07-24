import {MoneyInterface} from "./MoneyInterface";

/**
 * Interface for the ConvertService.
 */
export interface ConvertServiceInterface<T extends MoneyInterface> {
    convert(amount: T, targetCurrency: string): T;
}