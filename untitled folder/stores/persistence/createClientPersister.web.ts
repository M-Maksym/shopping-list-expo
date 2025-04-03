import {createLocalPersister} from 'tinybase/persisters/persister-browser/with-schemas'
import {MergeableStore, OptionalSchemas} from 'tinybase/with-schemas'

export const createClientPersister = <Schemas extends OptionalSchemas> 
    (storeId: string, 
    store: MergeableStore<Schemas>
) => createLocalPersister(store,storeId);