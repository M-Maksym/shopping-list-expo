import {createExpoSqlitePersister} from 'tinybase/persisters/persister-expo-sqlite/with-schemas'
import * as SQLite from 'expo-sqlite';
import {MergeableStore, OptionalSchemas} from 'tinybase/with-schemas'

export const createClientPersister = <Schemas extends OptionalSchemas> 
    (storeId: string, 
    store: MergeableStore<Schemas>
) => createExpoSqlitePersister(store, SQLite.openDatabaseSync(storeId + '.db'));