import React from "react";
import TableItemPage from '../TableItemPage/TableItemPage';

const TablePage = ({lists, url}) => {
    const tableItemPage = lists.map(
        list => (
            url === "help" ?
            <TableItemPage id={list.helpId} title={list.title} answer={list.comment} like={list.like} />
            :
            <TableItemPage id={list.qnaId} title={list.title} answer={list.answer} like={list.like} />
        )
    ) 

    return tableItemPage;
}

export default TablePage;