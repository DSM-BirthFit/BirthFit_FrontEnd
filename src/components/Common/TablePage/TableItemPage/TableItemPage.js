import React from "react";
import * as TableItemStyle from '../../../../assets/styles/Common/TablePage/TableItemPage';

const TablePage = ({ id, title, answer, like }) => {
    return (
        <TableItemStyle.Container key={id}>
            <TableItemStyle.Tdtag>{title}</TableItemStyle.Tdtag>
            <TableItemStyle.Tdtag>{answer}</TableItemStyle.Tdtag>
            <TableItemStyle.Tdtag>{like}</TableItemStyle.Tdtag>
        </TableItemStyle.Container>
    )
}

export default TablePage;