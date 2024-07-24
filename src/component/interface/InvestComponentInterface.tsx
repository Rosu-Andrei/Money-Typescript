import {Account} from "../../model/Account";
import React from "react";

export interface InvestComponentInterface {
    sourceAccount: Account;
    destAccount: Account;
    setSourceAccount: React.Dispatch<React.SetStateAction<Account>>;
    setDestAccount: React.Dispatch<React.SetStateAction<Account>>;
}