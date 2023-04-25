import * as React from "react";
import { Button, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../todoSlice";

const ToDoTable = () => {
    const todoItems = useSelector((state) => state.todoItems);

    const dispatch = useDispatch();
    const onTodoTextDelete = (index) => {
        dispatch(deleteItem(index));
    };

    return (
        <Table>
            <TableBody>
                {todoItems.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item}</TableCell>
                        <TableCell>
                            <Button onClick={onTodoTextDelete}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ToDoTable;
