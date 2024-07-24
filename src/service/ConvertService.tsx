import {ConvertServiceInterface} from "../interfaces/ConvertServiceInterface";
import {Money} from "../model/Money";
import {CurrencyNotSupportedError} from "../exception/CurrencyNotSupportedError";
import {MoneyInterface} from "../interfaces/MoneyInterface";

export class ConvertService implements ConvertServiceInterface<MoneyInterface> {

    /**
     * contains the available currencies and the rates of exchange between them.
     */
    private exchangeRates: { [key: string]: number } = {
        'USD_EUR': 0.85,
        'EUR_USD': 1.18
    };

    /**
     *
     * @param amount = the Money we want to convert
     * @param targetCurrency = the currency to which we want to convert the money.
     */
    convert(amount: Money, targetCurrency: string): Money {

        /**
         * We first check if the currency to which the user wants to convert the money is supported. If not, we
         * then throw an error.
         */
        if (targetCurrency !== "EUR" && targetCurrency !== "USD") {
            throw new CurrencyNotSupportedError("Currency: " + targetCurrency + " is not supported at the moment.")
        }
        /**
         * return the money as they are if the target currency is the same as the original.
         */
        if (amount.currency === targetCurrency) {
            return new Money(amount.value, targetCurrency);
        }

        const rateKey = amount.currency + '_' + targetCurrency; // here we extract the rate key so that we know the rate value for the conversion.
        const rate = this.exchangeRates[rateKey]; // we extract the rate value for the conversion.

        if (rate === undefined) {
            throw new CurrencyNotSupportedError("Conversion rate not available for " + amount.currency + " to " + targetCurrency);
        }

        const convertedValue = amount.value * rate;  // convert the money value.
        return new Money(Math.trunc(convertedValue), targetCurrency);
    }
}