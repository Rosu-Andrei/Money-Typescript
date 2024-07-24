import React, {useState} from 'react';
import {Money} from '../model/Money';
import {Account} from '../model/Account';
import {TransferService} from '../service/TransferService';
import {MoneyOperations} from '../model/MoneyOperations';
import {ConvertService} from '../service/ConvertService';
import styles from '../styles/TransferComponent.module.css';

interface TransferComponentProps {
    sourceAccount: Account;
    destAccount: Account;
    setSourceAccount: React.Dispatch<React.SetStateAction<Account>>;
    setDestAccount: React.Dispatch<React.SetStateAction<Account>>;
}

const TransferComponent: React.FC<TransferComponentProps> = ({
                                                                 sourceAccount,
                                                                 destAccount,
                                                                 setSourceAccount,
                                                                 setDestAccount,
                                                             }) => {
    const [amount, setAmount] = useState<Money>({value: 0, currency: 'USD'});

    const moneyOperations = new MoneyOperations();
    const convertService = new ConvertService();
    const transferService = new TransferService(moneyOperations, convertService);

    const handleTransfer = () => {
        try {
            transferService.transfer(amount, sourceAccount, destAccount);
            setSourceAccount({...sourceAccount});
            setDestAccount({...destAccount});
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
            <button onClick={handleTransfer} className={styles.button}>Transfer</button>
        </div>
    );
};

export default TransferComponent;
