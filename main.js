let url = "https://github.com/topics";
let request = require("request");
let cheerio = require("cheerio");
const repoFn = require("./repo.js");
let fs = require("fs");
let path = require("path");

let dirPath = path.join(__dirname,"GitHubTopics");
dirCreater(dirPath)

// request(url,cb);
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
    let searchTool = cheerio.load(html);
    let linkArr = searchTool(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0; i<linkArr.length; i++){
        let link = searchTool(linkArr[i]).attr("href");
        let topicName = link.split("/").pop();
        // console.log(topicName);

        let fullLink = `https://github.com${link}`;
        // console.log(fullLink);
        repoFn(fullLink,topicName);
    }

    // let nameArr = searchTool(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
    // for(let i = 0;i<nameArr.length;i++){
    //     let name = searchTool(nameArr[i]).text().trim();
    //     console.log(name);
    // }
}


function dirCreater(filePath) {

    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }

}