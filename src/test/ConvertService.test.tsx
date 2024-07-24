import {ConvertService} from "../service/ConvertService";
import {Money} from "../model/Money";
import {CurrencyNotSupportedError} from "../exception/CurrencyNotSupportedError";

/**
 * Implemented exchange rates:
 * USD_EUR: 0.85
 * EUR_USD: 1.18
 */
describe("ConvertServiceTest", () => {
    let convertService: ConvertService;

    beforeAll(() => {
        convertService = new ConvertService();
    });

    test("convert USD to EUR successfully", () => {
        const amount = new Money(100, "USD");
        const result = convertService.convert(amount, "EUR");
        expect(result.value).toBeCloseTo(85); // 100 * 0.85
        expect(result.currency).toBe("EUR");
    });

    test("convert EUR to USD successfully", () => {
        const amount = new Money(100, "EUR");
        const result = convertService.convert(amount, "USD");
        expect(result.value).toBeCloseTo(118); // 100 * 1.18
        expect(result.currency).toBe("USD");
    });

    test("throw an error for unsupported currency conversion", () => {
        const amount = new Money(75, "USD");
        expect(() => convertService.convert(amount, "RON")).toThrow(CurrencyNotSupportedError);
    });
});