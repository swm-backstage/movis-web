export const messageToCreateEvent = (clubId) =>  JSON.stringify(
    {
        type: "eventCreate",
        clubId: clubId
    }
);

export const messageToCreateTransactionDeposit = (clubId, eventId) => JSON.stringify(
    {
        type: "transactionHistoryDepositCreate",
        clubId: clubId,
        eventId: eventId
    }
);

export const messageToCreateTransactionWithdraw = (clubId, eventId) => JSON.stringify(
    {
        type: "transactionHistoryWithdrawCreate",
        clubId: clubId,
        eventId: eventId
    }
);

export const messageToUnClassified = (clubId) => JSON.stringify(
    {
        "type":"unClassifiedTransaction",
        clubId: clubId
    }
);

export const messageToGetToken = () => JSON.stringify(
    {
        "type":"getToken"
    }
);