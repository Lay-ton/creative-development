import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'

import './paging.scss';

function Paging(props) {
    return (
        <Pagination className="paging_wrapper">
            {props.page_nums.map(num =>{
                return (
                    <Pagination.Item href={`${props.link_base}${num}`} active={props.current == num ? true : false}>{num}</Pagination.Item>
                )
            })}
        </Pagination>
    );
}

export default Paging;