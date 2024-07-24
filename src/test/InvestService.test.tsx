import {Money} from "../model/Money";
import {MoneyOperations} from "../model/MoneyOperations";
import {InvestService} from "../service/InvestService";
import {TransferServiceInterface} from "../interfaces/TransferServiceInterface";
import {AccountInterface} from "../interfaces/AccountInterface";
import {InvestInterface} from "../interfaces/InvestInterface";
import {MoneyInterface} from "../interfaces/MoneyInterface";
import {MoneyOperationInterface} from "../interfaces/MoneyOperationInterface";

/**
 * Create a Mock for the TransferService without implementing any of its methods because we won't need them
 */
class MockTransferService implements TransferServiceInterface<Money> {
    compareSourceAmount(amount: Money, source: AccountInterface<Money>): boolean {
        return true;
    }

    transfer(amount: Money, source: AccountInterface<Money>, dest: AccountInterface<Money>): void {
    }
}

describe("InvestService Test", () => {

    let moneyOperation: MoneyOperationInterface<MoneyInterface>;
    let investService: InvestInterface<MoneyInterface>;

    beforeAll(() => {
        moneyOperation = new MoneyOperations();
        investService = new InvestService(moneyOperation, new MockTransferService());
    })

    test("verify that investment will return expected value is USD", () => {
        let moneyToInvest = new Money(150, "USD");
        let result = investService.calculateReturns(moneyToInvest, 0.05, 5);
        expect(result.value).toBe(191);
        expect(result.currency).toBe("USD");
    });

    test("verify that investment will return expected value is EUR", () => {
        let moneyToInvest = new Money(350, "EUR");
        let result = investService.calculateReturns(moneyToInvest, 0.07, 15);
        expect(result.value).toBe(965);
        expect(result.currency).toBe("EUR");
    });
});