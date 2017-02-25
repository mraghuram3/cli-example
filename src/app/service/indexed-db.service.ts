import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

import { ObjectStore } from '../model/object-store';

@Injectable()
export class IndexedDBService {
db: IDBDatabase;
objectStores: ObjectStore = new ObjectStore();
openrequest: IDBOpenDBRequest;
request: IDBRequest;

 tx: IDBTransaction;
 store: IDBObjectStore;
 cursor: IDBCursorWithValue;
    constructor() { }

    openDBAsync(dbName: string, version: number) {

        return new Observable((observer: Observer<string>) => {

            this.openrequest = indexedDB.open(dbName, version);

            this.openrequest.onsuccess = (event: Event) => {

                // Instances the db object.
                this.db = (<IDBOpenDBRequest>event.target).result;
                observer.next((<IDBOpenDBRequest>event.target).readyState);
                observer.complete();

            };
            this.openrequest.onerror = (event: Event) => {
                console.log('IndexedDB service: ' + (<IDBOpenDBRequest>event.target).error.name);
                observer.error((<IDBOpenDBRequest>event.target).error.name);
            };
            // The db doesn't exist, so cretes it.
            this.openrequest.onupgradeneeded = (event: Event) => {
                this.db = (<IDBOpenDBRequest>event.target).result;
                this.objectStores.createStores(this.db);
                console.log('IndexedDB service: creating ' + dbName + ' completed.');
            }
        });

    }

    private getObjectStore(storeName: string, mode: string) {

        this.tx = this.db.transaction(storeName, mode);
        return this.tx.objectStore(storeName);

    }

    getAllRecordsAsync(storeName: string) {
        this.store = this.getObjectStore(storeName, 'readonly');

        return new Observable((observer: Observer<any>) => {

            this.request = this.store.openCursor();

            this.request.onsuccess = (event: Event) => {

                // Steps through all the values in the object store.
                this.cursor = (<IDBRequest>event.target).result;

                if (this.cursor) {

                    observer.next(this.cursor.value);
                    this.cursor.continue();
                } else {observer.complete(); }
            }
            // Error.
            this.request.onerror = (event: Event) => {

                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);

                observer.error((<IDBRequest>event.target).error.name);

            }

        });

    }

    addRecordAsync(storeName: string, record: any) {

        this. store = this.getObjectStore(storeName, 'readwrite');

        return new Observable((observer: Observer<string>) => {

            this.request = this.store.add(record, record.id); // Adds a new record.

            this.request.onsuccess = (event: Event) => {

                observer.next((<IDBRequest>event.target).readyState);
                observer.complete();

            }
            // Error.
            this.request.onerror = (event: Event) => {

                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);

                observer.error((<IDBRequest>event.target).error.name);

            }

        });

    }

    deleteRecordAsync(storeName: string, key: number) {

        // Gets the object store.
        this.store = this.getObjectStore(storeName, 'readwrite');

        return new Observable((observer: Observer<string>) => {

            this.request = this.store.delete(key); // Deletes the record by the key.
            // Success.
            this.request.onsuccess = (event: Event) => {

                observer.next((<IDBRequest>event.target).readyState);
                observer.complete();
            };
            this.request.onerror = (event: Event) => {

                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);

                observer.error((<IDBRequest>event.target).error.name);
            }
        });

    }
    editRecordAsync(storeName: string, record: any) {

        // Gets the object store.
        this.store = this.getObjectStore(storeName, 'readwrite');

        return new Observable((observer: Observer<string>) => {

            this.request = this.store.put(record); // Puts the updated record back into the database.
            this.request.onsuccess = (event: Event) => {

                observer.next((<IDBRequest>event.target).readyState);
                observer.complete();
            }
            this.request.onerror = (event: Event) => {

                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);

                observer.error((<IDBRequest>event.target).error.name);

            }
        });

    }
    clearObjectStoreAsync(storeName: string) {
        // Gets the object store.
        this.store = this.getObjectStore(storeName, 'readwrite');

        return new Observable((observer: Observer<string>) => {

            this.request = this.store.clear(); // Clears the object store.

           this.request.onsuccess = (event: Event) => {

                observer.next((<IDBRequest>event.target).readyState);
                observer.complete();

            }
            this.request.onerror = (event: Event) => {
                console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
                observer.error((<IDBRequest>event.target).error.name);
            }
        });

    }
    closeDB() {
        this.db.close();
    }
}

