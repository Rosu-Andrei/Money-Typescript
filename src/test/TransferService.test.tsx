import {ConvertService} from "../service/ConvertService";
import {ConvertServiceInterface} from "../interfaces/ConvertServiceInterface";
import {MoneyInterface} from "../interfaces/MoneyInterface";
import {MoneyOperationInterface} from "../interfaces/MoneyOperationInterface";
import {MoneyOperations} from "../model/MoneyOperations";
import {TransferServiceInterface} from "../interfaces/TransferServiceInterface";
import {TransferService} from "../service/TransferService";
import {Account} from "../model/Account";
import {Money} from "../model/Money";
import {NotEnoughMoneyError} from "../exception/NotEnoughMoneyError";

describe("TransferServiceTest", () => {

    let convertService: ConvertServiceInterface<MoneyInterface>;
    let moneyOperation: MoneyOperationInterface<MoneyInterface>;
    let transferService: TransferServiceInterface<MoneyInterface>;

    beforeAll(() => {
        convertService = new ConvertService();
        moneyOperation = new MoneyOperations();
        transferService = new TransferService(moneyOperation, convertService);
    });

    test("amount value is greater then source account balance", () => {
        const accountBalance = new Money(100, "USD");
        const sourceAccount = new Account(accountBalance);
        const amount = new Money(200, "USD");
        expect(transferService.compareSourceAmount(amount, sourceAccount)).toBe(false);

    });

    test("amount value is smaller then source account balance", () => {
        const accountBalance = new Money(280, "USD");
        const sourceAccount = new Account(accountBalance);
        const amount = new Money(230, "EUR");  // will be converted to aprox 271.4 USD
        expect(transferService.compareSourceAmount(amount, sourceAccount)).toBe(true);

    });

    test("transfer can't take place because the amount we want to transfer is greater than" +
        "the amount available in the source account", () => {
        const amount = new Money(500, "EUR");
        const sourceAccount = new Account(new Money(400, "EUR"));
        const destinationAccount = new Account(new Money(200, "EUR"));

        expect(() => transferService.transfer(amount, sourceAccount, destinationAccount)).toThrow(NotEnoughMoneyError);

    });

    test("transfer can't take place because the amount we want to transfer is greater than" +
        "the amount available in the source account, after conversion", () => {
        const amount = new Money(375, "EUR");
        const sourceAccount = new Account(new Money(400, "USD"));
        const destinationAccount = new Account(new Money(200, "EUR"));

        expect(() => transferService.transfer(amount, sourceAccount, destinationAccount)).toThrow(NotEnoughMoneyError);

    });

    test("transfer takes place, no currency conversion required", () => {
        const amount = new Money(500, "EUR");
        const sourceAccount = new Account(new Money(750, "EUR"));
        const destinationAccount = new Account(new Money(100, "EUR"));
        transferService.transfer(amount, sourceAccount, destinationAccount);

        expect(sourceAccount.balance.value).toBe(250);
        expect(destinationAccount.balance.value).toBe(600);
    });

    test("transfer takes place, amount to transfer currency is different from source and destination",
        () => {
            let sourceAccount = new Account(new Money(1000, "EUR"));
            let destAccount = new Account(new Money(350, "EUR"));
            let amount = new Money(475, "USD");

            transferService.transfer(amount, sourceAccount, destAccount);
            expect(sourceAccount.balance.value).toBe(597);
            expect(sourceAccount.balance.currency).toBe("EUR");
            expect(destAccount.balance.value).toBe(753);
            expect(destAccount.balance.currency).toBe("EUR");
        });

    test("transfer takes place, amount to transfer currency is different from source",
        () => {
            let sourceAccount = new Account(new Money(800, "EUR"));
            let destAccount = new Account(new Money(164, "USD"));
            let amount = new Money(225, "USD");

            transferService.transfer(amount, sourceAccount, destAccount);
            expect(sourceAccount.balance.value).toBe(609);
            expect(sourceAccount.balance.currency).toBe("EUR");
            expect(destAccount.balance.value).toBe(389);
            expect(destAccount.balance.currency).toBe("USD");
        });

    test("transfer takes place, amount to transfer currency is different from destination",
        () => {
            let sourceAccount = new Account(new Money(500, "USD"));
            let destAccount = new Account(new Money(100, "EUR"));
            let amount = new Money(50, "USD");

            transferService.transfer(amount, sourceAccount, destAccount);
            expect(sourceAccount.balance.value).toBe(450);
            expect(sourceAccount.balance.currency).toBe("USD");
            expect(destAccount.balance.value).toBe(142);
            expect(destAccount.balance.currency).toBe("EUR");
        });
});