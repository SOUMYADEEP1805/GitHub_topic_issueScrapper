// let url = "https://github.com/topics/gulp";
let request = require("request");
let cheerio = require("cheerio");
let issueFn = require("./issue.js");
function repoFn(url,topicName){
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
        let srTool = cheerio.load(html);
        let repoArr = srTool(".f3.color-text-secondary.text-normal.lh-condensed");
        // console.log(repoArr.length);
        // console.log(topicName);
        for(let i=0; i<8;i++){
            let anchors = srTool(repoArr[i]).find("a");
            let link  = srTool(anchors[1]).attr("href");
            let repoName = link.split("/").pop();
            let fullLink = `https://github.com${link}/issues`;
            // console.log(fulllink); 
            issueFn(fullLink,topicName,repoName);
        }
        console.log("``````````````````````")
    }
}

module.exports = repoFn;