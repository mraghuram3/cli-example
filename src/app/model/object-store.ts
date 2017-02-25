
export class ObjectStore {
movieStore: IDBObjectStore;
    createStores(db: IDBDatabase) {
         this.movieStore = db.createObjectStore('MovieStore');
}
}