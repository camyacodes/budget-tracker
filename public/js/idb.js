// create variable to hold db connection
let db;

// establish a connection to IndexedDB database called 'budget_tracker' and set it to version 1
const request = indexedDB.open('budget_tracker', 1);

// this event will emit if the database version changes
request.onupgradeneeded = function(event) {

    const db = event.target.result;

    db.createObjectStore('new_transaction', { autoIncrement: true });
};

// upon a successful
request.onsuccess = function(event) {

    db = event.target.result;

    if (navigator.onLine) {
        // todo: uploadTransaction();
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new transaction and there's no internet connection
function saveRecord(record) {

    const transaction = db.transaction(['new_transaction'], 'readwrite');

    const  budgetObjectStore = transaction.objectStore('new_transaction');

    budgetObjectStore.add(record);
}