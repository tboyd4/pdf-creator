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

            // pulling specific data out
            let profImage = res.data.avatar_url;
            let userName = res.data.login;
            let userLoca = res.data.location;
            let userGitHubProf = res.data.url;
            let userBlog = res.data.blog;
            let userBio = res.data.bio;
            let pubRepo = res.data.public_repos;
            let followers = res.data.followers;
            let following = res.data.following;
        })
    })