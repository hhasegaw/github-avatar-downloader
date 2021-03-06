var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner === undefined || repoName === undefined) {
    throw new Error("Either of the parameters is not provided")
  }
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors"
    , headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function (err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(process.argv[2], process.argv[3], function (err, result) {
  console.log("Errors:", err);
  //console.log("Result:", JSON.parse(result));
  var jasonObject = JSON.parse(result);
  for (let element of jasonObject) {
    downloadImageByURL(element.avatar_url, "avatars/" + element.login + ".jpg");
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      if (err) return err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusMessage);
      console.log(response.headers['content-type']);
      console.log('Download complete.');

    })
    .pipe(fs.createWriteStream(filePath));
  console.log('Downloading image...');
}

 
  
  

    