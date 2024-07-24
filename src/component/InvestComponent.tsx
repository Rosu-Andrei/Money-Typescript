// src/components/InvestComponent.tsx

import React, {useState} from 'react';
import {Money} from "../model/Money";
import {Account} from "../model/Account";
import {InvestService} from "../service/InvestService";
import {MoneyOperations} from "../model/MoneyOperations";
import {TransferService} from "../service/TransferService";
import {ConvertService} from "../service/ConvertService";
import styles from '../styles/InvestComponent.module.css';

interface InvestComponentProps {
    sourceAccount: Account;
    destAccount: Account;
    setSourceAccount: React.Dispatch<React.SetStateAction<Account>>;
    setDestAccount: React.Dispatch<React.SetStateAction<Account>>;
}

const InvestComponent: React.FC<InvestComponentProps> = ({
                                                             sourceAccount,
                                                             destAccount,
                                                             setSourceAccount,
                                                             setDestAccount
                                                         }) => {
    const [amount, setAmount] = useState<Money>({value: 0, currency: 'USD'});
    const [rate, setRate] = useState<number>(0);
    const [years, setYears] = useState<number>(1);

    const moneyOperations = new MoneyOperations();
    const convertService = new ConvertService();
    const transferService = new TransferService(moneyOperations, convertService);
    const investService = new InvestService(moneyOperations, transferService);

    const handleInvest = () => {
        try {
            investService.invest(amount, sourceAccount, destAccount);
            setSourceAccount({...sourceAccount});
            setDestAccount({...destAccount});
        } catch (error) {
            alert(error);
        }
    };

    const handleWithdraw = () => {
        try {
            investService.withdraw(amount, sourceAccount, destAccount);
            setSourceAccount({...sourceAccount});
            setDestAccount({...destAccount});
        } catch (error) {
            alert(error);
        }
    };

    const handleCalculateReturns = () => {
        const returns = investService.calculateReturns(amount, rate / 100, years);
        alert(`Returns after ${years} years: ${returns.value} ${returns.currency}`);
    };

    return (
        <div className={styles.investContainer}>
            <h3>Invest Money</h3>
            <div className={styles.inputGroup}>
                <input
                    type="number"
                    value={amount.value}
                    onChange={(e) => setAmount({...amount, value: parseInt(e.target.value, 10)})}
                    placeholder="Amount"
                />
                <select
                    value={amount.currency}
                    onChange={(e) => setAmount({...amount, currency: e.target.value})}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
            <button onClick={handleInvest} className={styles.button}>Invest</button>
            <button onClick={handleWithdraw} className={styles.button}>Withdraw</button>

            <h3>Calculate Returns</h3>
            <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="rate">Rate:</label>
                <input
                    id="rate"
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    placeholder="Rate"
                />
                <label className={styles.label} htmlFor="years">Years:</label>
                <input
                    id="years"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(parseInt(e.target.value, 10))}
                    placeholder="Years"
                />
            </div>
            <button onClick={handleCalculateReturns} className={styles.button}>Calculate Returns</button>
        </div>
    );
};

export default InvestComponent;
