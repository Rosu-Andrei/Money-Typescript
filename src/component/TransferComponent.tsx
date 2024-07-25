import React, { useState } from 'react';
import { Money } from '../model/Money';
import { TransferService } from '../service/TransferService';
import { MoneyOperations } from '../model/MoneyOperations';
import { ConvertService } from '../service/ConvertService';
import styles from '../styles/TransferComponent.module.css';
import { TransferComponentInterface } from "./interface/TransferComponentInterface";

const TransferComponent: React.FC<TransferComponentInterface> = ({
                                                                     sourceAccount,
                                                                     destAccount,
                                                                     setSourceAccount,
                                                                     setDestAccount,
                                                                 }) => {
    const [amount, setAmount] = useState<Money>({ value: 0, currency: 'USD' });
    const [splitCount, setSplitCount] = useState<number>(1);
    const [splitAccounts, setSplitAccounts] = useState<Money[]>([]);

    const moneyOperations = new MoneyOperations();
    const convertService = new ConvertService();
    const transferService = new TransferService(moneyOperations, convertService);

    const handleTransfer = () => {
        try {
            transferService.transfer(amount, sourceAccount, destAccount);
            setSourceAccount({ ...sourceAccount });
            setDestAccount({ ...destAccount });
        } catch (error) {
            alert(error);
        }
    };

    const handleSplit = () => {
        try {
            const newAccounts = moneyOperations.split(sourceAccount.balance, splitCount);
            setSplitAccounts(newAccounts);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className={styles.transferContainer}>
            <h3>Transfer Money</h3>
            <div className={styles.inputGroup}>
                <input
                    type="number"
                    value={amount.value}
                    onChange={(e) => setAmount({ ...amount, value: parseInt(e.target.value, 10) })}
                    placeholder="Amount"
                />
                <select
                    value={amount.currency}
                    onChange={(e) => setAmount({ ...amount, currency: e.target.value })}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
            <button onClick={handleTransfer} className={styles.button}>Transfer</button>

            <h3>Split Account</h3>
            <div className={styles.inputGroup}>
                <input
                    type="number"
                    value={splitCount}
                    onChange={(e) => setSplitCount(parseInt(e.target.value, 10))}
                    placeholder="Number of splits"
                />
            </div>
            <button onClick={handleSplit} className={styles.button}>Split</button>

            {splitAccounts.length > 0 && (
                <div className={styles.splitResults}>
                    <h4>Split Accounts</h4>
                    {splitAccounts.map((account, index) => (
                        <div key={index} className={styles.account}>
                            <span>Account {index + 1}: {account.value} {account.currency}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransferComponent;
