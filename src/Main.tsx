import {Money} from "./model/Money";
import {TransferService} from "./service/TransferService";
import {MoneyOperations} from "./model/MoneyOperations";
import {Account} from "./model/Account";
import {ConvertService} from "./service/ConvertService";
import {InvestService} from "./service/InvestService";
import {InvestInterface} from "./interfaces/InvestInterface";
import {MoneyInterface} from "./interfaces/MoneyInterface";


const transferService = new TransferService(new MoneyOperations(), new ConvertService());
const investService: InvestInterface<MoneyInterface> = new InvestService(new MoneyOperations(), transferService);
const amountToTransfer = new Money(150, "EUR");
const senderAccount = new Account(new Money(300, "USD"));
const receiverAccount = new Account(new Money(275, "EUR"));

console.clear();
console.log("\n");
console.log("Initial source: ", senderAccount);
console.log("Initial destination: ", receiverAccount);
console.log("\n");

transferService.transfer(amountToTransfer, senderAccount, receiverAccount);

console.log("Final source: ", senderAccount);
console.log("Final destination: ", receiverAccount);
console.log("\n");


const investmentAmount = new Money(150, "USD");
const returns = investService.calculateReturns(investmentAmount, 0.15, 2);
console.log("returns: ", Math.trunc(returns.value));


