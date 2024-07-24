// src/components/UpdateAccountsComponent.tsx

import React from 'react';
import {Account} from '../model/Account';
import styles from '../styles/UpdateAccountsComponent.module.css';

interface UpdateAccountsComponentProps {
    sourceAccount: Account;
    destAccount: Account;
    setSourceAccount: React.Dispatch<React.SetStateAction<Account>>;
    setDestAccount: React.Dispatch<React.SetStateAction<Account>>;
}

const UpdateAccountsComponent: React.FC<UpdateAccountsComponentProps> = ({
                                                                             sourceAccount,
                                                                             destAccount,
                                                                             setSourceAccount,
                                                                             setDestAccount,
                                                                         }) => {
    const handleSourceBalanceChange = (value: number, currency: string) => {
        setSourceAccount({balance: {value, currency}});
    };

    const handleDestBalanceChange = (value: number, currency: string) => {
        setDestAccount({balance: {value, currency}});
    };

    return (
        <div className={styles.updateAccountsContainer}>
            <h3>Update Accounts</h3>
            <div className={styles.accountGroup}>
                <div className={styles.account}>
                    <h4>Source Account</h4>
                    <input
                        type="number"
                        value={sourceAccount.balance.value}
                        onChange={(e) => handleSourceBalanceChange(parseInt(e.target.value, 10), sourceAccount.balance.currency)}
                        className={styles.input}
                    />
                    <select
                        value={sourceAccount.balance.currency}
                        onChange={(e) => handleSourceBalanceChange(sourceAccount.balance.value, e.target.value)}
                        className={styles.select}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>

                <div className={styles.account}>
                    <h4>Destination Account</h4>
                    <input
                        type="number"
                        value={destAccount.balance.value}
                        onChange={(e) => handleDestBalanceChange(parseInt(e.target.value, 10), destAccount.balance.currency)}
                        className={styles.input}
                    />
                    <select
                        value={destAccount.balance.currency}
                        onChange={(e) => handleDestBalanceChange(destAccount.balance.value, e.target.value)}
                        className={styles.select}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default UpdateAccountsComponent;
