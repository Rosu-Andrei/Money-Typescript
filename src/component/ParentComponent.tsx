// src/components/ParentComponent.tsx

import React, {useState} from 'react';
import TransferComponent from "./TransferComponent";
import InvestComponent from './InvestComponent';
import UpdateAccountsComponent from './UpdateAccountsComponent';
import {Money} from '../model/Money';
import styles from '../styles/Parent.module.css'; // Updated to use CSS module

const ParentComponent: React.FC = () => {
    const [sourceAccount, setSourceAccount] = useState({
        balance: new Money(1000, 'USD'),
    });
    const [destAccount, setDestAccount] = useState({
        balance: new Money(500, 'EUR'),
    });

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <h2 className={styles.header}>Transfer Money</h2>
                    <TransferComponent
                        sourceAccount={sourceAccount}
                        destAccount={destAccount}
                        setSourceAccount={setSourceAccount}
                        setDestAccount={setDestAccount}
                    />
                </div>
                <div className={styles.card}>
                    <h2 className={styles.header}>Invest Money</h2>
                    <InvestComponent
                        sourceAccount={sourceAccount}
                        destAccount={destAccount}
                        setSourceAccount={setSourceAccount}
                        setDestAccount={setDestAccount}
                    />
                </div>
            </div>
            <UpdateAccountsComponent
                sourceAccount={sourceAccount}
                destAccount={destAccount}
                setSourceAccount={setSourceAccount}
                setDestAccount={setDestAccount}
            />
        </div>
    );
};

export default ParentComponent;
