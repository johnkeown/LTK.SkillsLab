import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useDispatch } from "react-redux";
import { addItem } from "../todoSlice";
import ToDoTable from "./ToDoTable";

const BasicForm = () => {
    const [todoText, setTodoText] = useState("");
    const dispatch = useDispatch();
    const onTodoTextChanged = (e) => setTodoText(e.target.value);
    const onSubmit = () => {
        if (todoText) {
            dispatch(addItem(todoText));
            setTodoText("");
        }
    };
    return (
        <div>
            <h1>TODO</h1>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                }}
                onSubmit={(values) => {}}
            >
                <Form onSubmit={onSubmit}>
                    <label htmlFor="todo">Add ToDo </label>
                    <Field
                        id="todo"
                        name="Add ToDo"
                        placeholder="TextHere"
                        onChange={onTodoTextChanged}
                    />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <ToDoTable />
        </div>
    );
};

export default BasicForm;
