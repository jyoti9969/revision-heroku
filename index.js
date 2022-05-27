const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(cors());

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  return res.render("index");
});
//let sheetId = "1hS64YBsANmCnCS0ebhUPuhwmUap755dZXLs8orcaVho";
let sheetId = "1dSysPKpUWsnrH6HqjPPH1y0QQERtYYNCk3Nz4NvMGC4";

app.get("/get-data", async (req, res) => {
  try {
    console.log("getting data");

    let responseData = await axios.get(
      `https://holy-sheet-api.herokuapp.com/A2/B120000000/${sheetId}`
    );

    let entries = responseData.data.values;

    let backgroundColorData = [
      "rgb(75,0,130)",
      
    ];

    let borderColorData = [
      "rgb(0,0,125)",
     
    ];

    let labels = [];
    let values = [];

    entries.map((entry) => {
      labels.push(entry[0]);
      values.push(entry[1]);
    });

    let backgroundColor = [];
    let borderColor = [];
    let counter = 0;
    for (let i = 0; i < labels.length; i++) {
      backgroundColor.push(backgroundColorData[counter]);
      borderColor.push(borderColorData[counter]);
      counter++;
      if (counter === 6) {
        counter = 0;
      }
    }

    console.log("labels are ", labels, " values are ", values);

    let finObj = {};

    let dataSet = [
      {
        label: "Time X Frequency Graph",
        data: values,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ];

    finObj.labels = labels;
    finObj.dataSet = dataSet;

    // return res.send(responseData.data);
    return res.send(finObj);
  } catch (e) {
    console.log("error", e);
    return res.send({});
  }
});

// app.listen(8000, () => {
//   console.log("server running on port 8000");
// });

app.listen(process.env.PORT || 8000)