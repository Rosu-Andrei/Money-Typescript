import {MoneyInterface} from "../interfaces/MoneyInterface";

/**
 * Representation of Money.
 */
export class Money implements MoneyInterface {
    constructor(public value: number, public currency: string) {
    }
}