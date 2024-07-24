import {Account} from "../../model/Account";
import React from "react";

export interface UpdateAccountsComponentInterface {
    sourceAccount: Account;
    destAccount: Account;
    setSourceAccount: React.Dispatch<React.SetStateAction<Account>>;
    setDestAccount: React.Dispatch<React.SetStateAction<Account>>;
}