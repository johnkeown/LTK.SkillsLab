const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
const isLocal = true;

const loanFilePath = "./loans.json";

// app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
    res.json({
        message: "✨ 👋🌏 ✨",
        stage: process.env.NODE_ENV,
    });
});

app.get("/ping", (req, res) => {
    res.json({
        message: "🏓",
    });
});

app.get("/getAllLoans", (req, res) => {
    fs.readFile(loanFilePath, "UTF-8", (err, data) => {
        if (err) {
            console.log(`Error reading file ${loanFilePath}:  ${err}`);
            return;
        }
        res.json({
            message: JSON.parse(data),
        });
    });
});

app.get("/getLoanById/:loanId", (req, res) => {
    if (req.params.loanId) {
        fs.readFile(loanFilePath, "UTF-8", (err, data) => {
            if (err) {
                console.log(`Error reading file ${loanFilePath}:  ${err}`);
                return;
            }
            let loans = JSON.parse(data);
            res.json({
                message: loans.filter(
                    (loan) => loan.loanId == req.params.loanId
                ),
            });
        });
    }
    return;
});

app.post("/addLoan", urlencodedParser, (req, res) => {
    console.log(req.body);
    if (
        req.body.borrower1FirstName &&
        req.body.borrower1LastName &&
        req.body.borrower1Phone
    ) {
        // set loanId and borrower 1 info
        let reqData = {
            borrowers: [
                {
                    pairId: 1,
                    firstName: req.body.borrower1FirstName,
                    lastName: req.body.borrower1LastName,
                    phone: req.body.borrower1Phone,
                },
            ],
        };

        // if received in request, set borrower 2 info
        if (
            req.body.borrower2FirstName &&
            req.body.borrower2LastName &&
            req.body.borrower2Phone
        ) {
            reqData.borrowers.push({
                pairId: 2,
                firstName: req.body.borrower2FirstName,
                lastName: req.body.borrower2LastName,
                phone: req.body.borrower2Phone,
            });
        }

        console.log(reqData);

        let fileData;

        fs.readFile(loanFilePath, "UTF-8", (err, data) => {
            if (err) {
                console.log(err);
                res.json({
                    message: "An error occurred while opening JSON file",
                });
                return;
            }
            fileData = JSON.parse(data);
            console.log("fileData:  ", fileData);

            let nextLoanId =
                Math.max(...fileData.map((loan) => loan.loanId)) + 1;

            reqData.loanId = nextLoanId;

            let mergedData = fileData.concat(reqData);

            fs.writeFile(loanFilePath, JSON.stringify(mergedData), (err) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: "An error occurred while saving JSON file",
                    });
                    return;
                }
                res.json({ message: "OK" });
                console.log("here2");
                return;
            });
        });
    }
    return;
});

if (isLocal) {
    //local host
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
} else {
    //for lambda export
    module.exports = app;
}
