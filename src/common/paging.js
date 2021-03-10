import React from 'react';
import Pagination from 'react-bootstrap/Pagination'

function Paging(props) {

    // Might come back to this later to account for more items, this code is messy though.
    // const middle = Object.entries(props.page_data).map(([key, value]) => {
    //     if (key == "prev" && value) {
    //         return (
    //             <Pagination.Item onClick={props.change(value)}>{value}</Pagination.Item>
    //         )
    //     }
    //     else if (key == "cur") {
    //         return (
    //             <Pagination.Item onClick={props.change(value)} active>{value}</Pagination.Item>
    //         )
    //     }
    //     else if (key == "next" && value) {
    //         return (
    //             <Pagination.Item onClick={props.change(value)}>{value}</Pagination.Item>
    //         )
    //     }
    //     console.log(key)
    // }) 

    return (
        <Pagination>
            {props.page_nums.map(num =>{
                return (
                    <Pagination.Item onClick={() => props.change(num)} active={props.current == num ? true : false}>{num}</Pagination.Item>
                )
            })}
        </Pagination>
    );
}

export default Paging;