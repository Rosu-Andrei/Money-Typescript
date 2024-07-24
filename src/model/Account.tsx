import {AccountInterface} from "../interfaces/AccountInterface";
import {Money} from "./Money";

/**
 * Representation of Account that has a balance of type Money class.
 */
export class Account implements AccountInterface<Money> {
    constructor(public balance: Money) {
    }

}