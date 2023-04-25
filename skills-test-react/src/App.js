import * as React from "react";
import Container from "@mui/material/Container";
import AccountMenu from "./components/AccountMenu";
import Root from "./components/Root";
import BasicForm from "./components/BasicForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <Container maxWidth="sm">
            <BrowserRouter>
                <AccountMenu />
                <Routes>
                    <Route path="/" element={<Root />}></Route>
                    <Route path="/todo" element={<BasicForm />}></Route>
                </Routes>
            </BrowserRouter>
        </Container>
    );
}
