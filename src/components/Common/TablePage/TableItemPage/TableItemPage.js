import React from "react";
import { useHistory } from 'react-router';

import * as TableItemStyle from '../../../../assets/styles/Common/TablePage/TableItemPage';

const axios = require('axios');

const TablePage = ({ id, title, answer, like, url }) => {
    let history = useHistory();

    const handleClick = () => {
        history.push({
            pathname: `/${url}/${id}`
        })        
    }

    return (
        <TableItemStyle.Container key={id}>
            <TableItemStyle.Tdtag onClick={() => handleClick()}>{title}</TableItemStyle.Tdtag>
            <TableItemStyle.Tdtag>{answer}</TableItemStyle.Tdtag>
            <TableItemStyle.Tdtag>{like}</TableItemStyle.Tdtag>
        </TableItemStyle.Container>
    )
}

export default TablePage;