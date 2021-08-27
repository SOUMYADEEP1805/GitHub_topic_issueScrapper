let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let pdfkit = require("pdfkit");
function issueFn(url,topicName,repoName){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else if(response.statusCode == 404){
            console.log("page not found");
        }else{
            // console.log(html);
            // console.log("html",);
    
            dataExtractor(html);
        }
    }

    function dataExtractor(html){
        let tool = cheerio.load(html);
        let issueArr = tool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");

        let arr = [];
        for(let i=0; i<issueArr.length;i++){
            let issueData = tool(issueArr[i]).text().trim();
            // console.log(issueData);
            let issueLink = tool(issueArr[i]).attr("href");
            let fullIssueLink = `https://github.com${issueLink}`;
            console.log(topicName+" || "+ repoName+" || "+ fullIssueLink+" || "+ issueData);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

            let issueobj = {
                Topic:topicName,
                Repository:repoName,
                IssueLink: fullIssueLink,
                IssueName: issueData
            }
            arr.push(issueobj);

            // gitFolder(topicName,repoName,issueData,fullIssueLink);
        }

        let folderPath = path.join(__dirname,"GitHubTopics",topicName);
        isDirrectory(folderPath);
        let filePath = path.join(folderPath,repoName+".pdf");
        let text =  JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
    }

    // function gitFolder(topicName,repoName,issueData,fullIssueLink){
    //     let content =[];
    //     let mainObject = {
    //         topicName,repoName,issueData,fullIssueLink
    //     };
    //     content.push(mainObject);
    //     if(fs.existsSync(filePath)) {
    //         let data = fs.readFileSync(filePath);
    //         content = JSON.parse(data);
    //     }
    //     content.push(mainObject);
    // }

}
function isDirrectory(folderPath) {
    if(fs.existsSync(folderPath)== false){
        fs.mkdirSync(folderPath);
    }
}

module.exports = issueFn;