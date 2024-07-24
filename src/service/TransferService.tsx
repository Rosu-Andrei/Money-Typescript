import {TransferServiceInterface} from "../interfaces/TransferServiceInterface";
import {Money} from "../model/Money";
import {MoneyOperationInterface} from "../interfaces/MoneyOperationInterface";
import {AccountInterface} from "../interfaces/AccountInterface";
import {NotEnoughMoneyError} from "../exception/NotEnoughMoneyError";
import {ConvertServiceInterface} from "../interfaces/ConvertServiceInterface";
import {MoneyInterface} from "../interfaces/MoneyInterface";

/**
 * This service contains the logic to transfer a certain amount of money from a source account to a destination account.
 */
export class TransferService implements TransferServiceInterface<Money> {

    private ops: MoneyOperationInterface<Money>;
    private convertService: ConvertServiceInterface<Money>

    constructor(ops: MoneyOperationInterface<Money>,
                convertService: ConvertServiceInterface<MoneyInterface>) {
        this.ops = ops;
        this.convertService = convertService;
    }

    transfer(amount: Money, source: AccountInterface<Money>, dest: AccountInterface<Money>): void {

        /**
         * firstly, we check if the source amount is at least equal with the amount we want to transfer. If not,
         * an exception is thrown because it means the transaction can't take place
         */
        if (!this.compareSourceAmount(amount, source)) {
            throw new NotEnoughMoneyError("The sender account doesn't have sufficient money to enable the transfer");
        }

        /**
         * we know check if the amount we want to transfer has different currency then both the source and destination accounts.
         * If that is the case, then we first convert the amount in the currency of the accounts, and then we continue with the
         * whole transfer process.
         *
         */
        if (source.balance.currency === dest.balance.currency && source.balance.currency !== amount.currency) {
            let convertedAmount = this.convertService.convert(amount, source.balance.currency);
            if (!this.compareSourceAmount(convertedAmount, source)) {
                throw new NotEnoughMoneyError("The sender account doesn't have sufficient money to enable the transfer");
            }
            source.balance = this.ops.subtract(source.balance, convertedAmount);
            dest.balance = this.ops.add(dest.balance, convertedAmount);

            /**
             * check if only the destination account has different currency and convert it.
             */
        } else if (source.balance.currency === amount.currency && dest.balance.currency !== amount.currency) {
            source.balance = this.ops.subtract(source.balance, amount);
            let convertedAmount = this.convertService.convert(amount, dest.balance.currency);
            dest.balance = this.ops.add(dest.balance, convertedAmount);

            /**
             * check if only the soruce account has different currency and convert it.
             */
        } else if (source.balance.currency !== amount.currency && dest.balance.currency === amount.currency) {
            let convertedAmount = this.convertService.convert(amount, source.balance.currency);
            if (!this.compareSourceAmount(convertedAmount, source)) {
                throw new NotEnoughMoneyError("The sender account doesn't have sufficient money to enable the transfer");
            }
            source.balance = this.ops.subtract(source.balance, convertedAmount);
            dest.balance = this.ops.add(dest.balance, amount);

        } else if (source.balance.currency === dest.balance.currency && source.balance.currency === amount.currency) {
            source.balance = this.ops.subtract(source.balance, amount);
            dest.balance = this.ops.add(dest.balance, amount);
        }

    }

    /**
     *
     * @param amount = the money we want to transfer
     * @param source = the source account money from where we want to extract the amount. If the amount we want to extract from the source
     * account is larger than the money available in the account, we then throw a custom error.
     */
    compareSourceAmount(amount: Money, source: AccountInterface<Money>): boolean {
        if (amount.currency !== source.balance.currency) {
            amount = this.convertService.convert(amount, source.balance.currency);
        }
        return source.balance.value >= amount.value;
    }
}