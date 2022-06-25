/*const fs = require("fs");

fs.readFile("./data.txt", function(text){
    const buffer = fs.readFileSync("./data.txt");
    const answers = buffer.toString();
    let data = [];
    for(let i=0; i<answers.length(); i++){
        data.push({
        "_index": "some36",
          "_id": Number.toString(i),
          "_source": {
              "text": answers[i],
          }
        })
    }
    console.log(answers);
    
});*/

const fs = require("fs");


fs.readFile("C:\Users\nizar\Desktop\frontrnd1\PS9_Horizon\ElasticSearch\scrapper\data.txt", (err, buff) => {
  
  if (err) {
    console.error(err);
    return;
  }

  console.log(buff.toString());

});