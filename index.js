// importing dependencies

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

// calls to inquire and axios to get account information

inquirer
    .prompt({
        message: "Enter GitHub User Name",
        name: "account"
    }).then(({account}) => {
        const queryUrl = `https://api.github.com/users/${account}`;

        axios.get(queryUrl).then((res) => {
            console.log(res.data);
        })
    })