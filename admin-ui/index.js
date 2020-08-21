import { UpdateItems, DeleteItems, CreateItem } from '@keystonejs/app-admin-ui/components';
// console.log("heheheheh")
import React from 'react';

const ExportCsvButton = () => {
    const { list, selectedItems } = useList();
    // your logic and react state hooks etc
    // selectedItems contains array of item Ids which are selected, list is the list you are in.
    const exportCsv = () => {
        // your logic to retrieve the items and data for exporting or doing custom work
        // you can use graphql to get 
    }
    return (<Button onClick={() => exportCSV()}> Export CSV </Button>)
}

const MyAwesomeLogo = () => {
    return (<p>Hello</p>)
}
export default {
    // re-implement the default delete many and update many items buttons + custom text

    listManageActions: () => (<div><UpdateItems /><DeleteItems /><ExportCsvButton /></div>),

    logo: () => (<MyAwesomeLogo />),

    listHeaderActions: () => (
        <div>
            <CreateItem />
            <p>Hello world</p>
        </div>
    ),

};
