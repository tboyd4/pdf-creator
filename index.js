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
            let fullName = res.data.name;
            let userLoca = res.data.location;
            let userGitHubProf = res.data.html_url;
            let userBlog = res.data.blog;
            let userBio = res.data.bio;
            let pubRepo = res.data.public_repos;
            let followers = res.data.followers;
            let following = res.data.following;

            const htmlContent = (`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" type="text/css" href="./index.css">
            </head>
            <body>
                <div class="background">
                    <div class="head">
                        <img class="img" src="${profImage}" />
                        <h1>Hello! My Name is ${fullName}!</h1>
                        <div class="links">
                            <a class="link-style" >${userLoca}</a>
                            <a class="link-style" href="${userGitHubProf}">GitHub</a>
                            <a class="link-style" href="${userBlog}">Blog</a>
                        </div>
                    </div>
                    <h1 id="bio">${userBio}</h1>
                    <div class="content-box">
                        <div class="single-box">
                            <h1>Public Repositories</h1>
                            <h2>${pubRepo}</h2>
                        </div>
                        <div class="single-box">
                            <h1>Followers</h1>
                            <h2>${followers}</h2>
                        </div>
                    </div>
                    <div class="content-box">
                        <div class="single-box">
                            <h1>GitHub Stars</h1>
                            <h2>42</h2>
                        </div>
                        <div class="single-box">
                            <h1>Following</h1>
                            <h2>${following}</h2>
                        </div>
                    </div>

                </div>


            </body>
            </html>
            
            `);


            fs.writeFile('./public/index.html', htmlContent, (err)=>{
                if (err) {
                    console.log(err)
                } else {
                    console.log("write success")
                }
            })
            
        })
    })