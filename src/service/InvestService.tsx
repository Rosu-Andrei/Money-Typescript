import {AccountInterface} from "../interfaces/AccountInterface";
import {InvestInterface} from "../interfaces/InvestInterface";
import {Money} from "../model/Money";
import {MoneyOperationInterface} from "../interfaces/MoneyOperationInterface";
import {TransferServiceInterface} from "../interfaces/TransferServiceInterface";

export class InvestService implements InvestInterface<Money> {

    /**
     * Dependencies required for the investment logic
     * @private
     */
    private moneyOperations: MoneyOperationInterface<Money>;
    private transferService: TransferServiceInterface<Money>;

    /**
     * Injecting dependencies inside the constructor
     */
    constructor(moneyOperations: MoneyOperationInterface<Money>,
                transferService: TransferServiceInterface<Money>) {
        this.moneyOperations = moneyOperations;
        this.transferService = transferService;
    }


    invest(amount: Money, sourceAccount: AccountInterface<Money>, destinationAccount: AccountInterface<Money>): void {
        this.transferService.transfer(amount, sourceAccount, destinationAccount);
    }

    /**
     * we consider that the rate is cumulated yearly.
     */
    calculateReturns(amount: Money, rate: number, years: number): Money {
        const multiplayer = Math.pow(1 + rate, years);
        amount.value = Math.trunc(amount.value * multiplayer);
        return amount;
    }

    withdraw(amount: Money, sourceAccount: AccountInterface<Money>, destinationAccount: AccountInterface<Money>): void {
        this.transferService.transfer(amount, destinationAccount, sourceAccount);
    }

}