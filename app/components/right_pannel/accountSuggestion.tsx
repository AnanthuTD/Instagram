import React from "react";
import Accounts from "./accounts";
import SuggestedAccounts from "./suggestedAccounts";

function account_suggestion() {
    return (
        <div style={{width:'350px'}}>
            <Accounts />
            <div className="my-3"></div>
            <SuggestedAccounts />
        </div>
    );
}

export default account_suggestion;
