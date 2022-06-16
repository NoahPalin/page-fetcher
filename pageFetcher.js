const request = require('request');
const fs = require('fs');

/* Downloads the HTML of a given web page and saves it to a specified file.
url: a website URL passed into the function via a command line argument.
fileLocation: the file path passed into the function via a command line argument.
callback: a function that is used to get the number of bytes of the downloaded file. */
const pageDownloader = function(url, fileLocation, callback) {

  /* Downloads the HTML of the given URL to the given file.
  Note that error and response aren't needed for this project. */
  request(url, (error, response, body) => {
    fs.writeFile(fileLocation, body, err => {

      // Prints the error message if one occurs.
      if (err) {
        console.error(err);
      }

      // Calls the fileSize function to then calculate the size of the downloaded file.
      callback(fileLocation);
    });
  });
};

/* Gathers the stats of the downloaded file, however, only the size is that will be used.
fileLocation: where the downloaded file has been saved. */
const fileSize = function(fileLocation) {
  fs.stat(fileLocation, (err, stats) => {

    // Prints the error message if one occurs.
    if (err) {
      console.error(err);
    }

    // Prints a message telling the user how big their file is and where it has been stored.
    console.log(`Downloaded and saved ${stats.size} bytes to ${fileLocation}`);
  });
};

// Saves the URL and file location given by the user.
const userInput = process.argv;

// Removes the first two elements of the array that are not needed in this program.
userInput.splice(0, 2);

// Calls pageDownloader.
pageDownloader(userInput[0], userInput[1], fileSize);



