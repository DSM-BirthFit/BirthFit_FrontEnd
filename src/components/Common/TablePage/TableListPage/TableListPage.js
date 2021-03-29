import React from "react";
import TableItemPage from '../TableItemPage/TableItemPage';

const TablePage = ({lists}) => {
    const tableItemPage = lists.map(
        list => (
            <TableItemPage id={list.id} title={list.title} answer={list.answer} like={list.like} />
        )
    ) 

    return tableItemPage;
}

export default TablePage;