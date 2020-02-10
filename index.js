// importing dependencies

const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require('html-pdf');

// calls to inquire and axios to get account information

inquirer
    .prompt([{
        message: "Enter GitHub User Name",
        name: "account"
        },
        {
        message: "Enter your favorite color",
        name: "userColor"
        }]).then(({account, userColor}) => {
        const queryUrl = `https://api.github.com/users/${account}`;

        axios.get(queryUrl).then((res) => {
            console.log(res.data);

            // pulling specific data out
            let profImage = res.data.avatar_url;
            let fullName = res.data.name;
            let userLoca = res.data.location;
            let userGitHubProf = res.data.html_url;
            let userBlog = res.data.blog;
            let userBio = res.data.bio;
            let pubRepo = res.data.public_repos;
            let followers = res.data.followers;
            let following = res.data.following;

            // formatting html content that will get saved to the html file. 
            const htmlContent = (`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" type="text/css" href="./index.css">
                <style>
                .head {
                    width: 75%;
                    margin: auto;
                    background-color: ${userColor};
                    border: lightgray 1px solid;
                    box-shadow: gray 0 2px 3px;
                    color: black;
                    text-align: center;
                    padding: 25px;
                }
                
                .img {
                    width: 20%;
                    margin: auto;
                    margin-top: 20px;
                    border: 1px lightgray solid;
                    box-shadow: gray 0 2px 3px;
                    
                }
                
                .links {
                    display: inline-block;
                    padding-right: 20px;
                }
                
                .link-style {
                    text-decoration: none;
                    color: black;
                    padding-right: 10px;
                }
                
                body {
                    background-color: lightblue;
                    height: 100%;
                }
                
                #bio {
                    width: 75%;
                    margin: auto;
                    text-align: center;
                    margin-top: 25px;
                
                }
                
                .content-box {
                    width: 75%;
                    margin: auto;
                    padding: 15px;
                 
                }
                
                .single-box {
                    display: inline-block;
                    width: 30%;
                    margin: 12px;
                    padding: 15px;
                    background-color: ${userColor};
                    border: 1px lightgray solid;
                    box-shadow: gray 0 2px 3px;
                }
                </style>
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
                    <h3 id="bio">${userBio}</h3>
                    <div class="content-box">
                        <div class="single-box">
                            <h3>Public Repos:</h3>
                            <h2>${pubRepo}</h2>
                        </div>
                        <div class="single-box">
                            <h3>Followers:</h3>
                            <h2>${followers}</h2>
                        </div>
                    </div>
                    <div class="content-box">
                        <div class="single-box">
                            <h3>GitHub Stars:</h3>
                            <h2>42</h2>
                        </div>
                        <div class="single-box">
                            <h3>Following:</h3>
                            <h2>${following}</h2>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `);

            // convert html into pdf

            var options = { format: 'Letter' };
            
            pdf.create(htmlContent, options).toFile('./public/profile.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
            console.log("Successful Conversion to PDF");
            
            });
        })
    })