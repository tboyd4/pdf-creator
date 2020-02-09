// importing dependencies

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

// async function to get account info

async function getAccountInfo () {
    try {
        // creating my await promises from inquirer, allowing user input
        const { account } = await inquirer.prompt({
            message: "Please enter your GitHub user name",
            name: "account"
        })
        const { favColor } = await inquirer.prompt({
            message: "Please enter your favorite color",
            name: "favColor"
        })

        console.log(account + " " + favColor);



    } catch (err) {
        if (err) throw err
    }
}

getAccountInfo();