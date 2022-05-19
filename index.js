const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(cors());

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  return res.render("index");
});

let sheetId = "1hS64YBsANmCnCS0ebhUPuhwmUap755dZXLs8orcaVho";

app.get("/get-data", async (req, res) => {
  try {
    console.log("getting data");

    let responseData = await axios.get(
      `https://holy-sheet-api.herokuapp.com/A2/B120000000/${sheetId}`
    );

    let entries = responseData.data.values;

    let backgroundColorData = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ];

    let borderColorData = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
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