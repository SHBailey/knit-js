const fs = require("fs");

const getAllIndicies = (string, substring) => {
  let indicies = [];
  for (let i = 0; i < string.length; i++) {
    if (string.slice(i, i + substring.length) === substring) {
      indicies.push(i);
    }
  }
  return indicies;
};

const parseFile = (fileName) => {
  const data = fs.readFileSync(fileName, "utf8");
  const lines = data.split("\n");

  for (let i = 1184; i < lines.length; i++) {
    // Find the word "row" and get the number at the end of the row.
    const maybeRow = lines[i].slice(3, 6) === "row";

    // If the row was found, check for a matching row number 10 lines ahead
    if (maybeRow) {
      // we found a row, get the number
      const [number] = lines[i].split(" ").slice(-1);
      if (lines[i + 11]?.includes(number)) {
        // we found a match, modify the lines accordingly
        // const increment = lines[i + 4]?.slice(0, 5) === "FRNT" ? 1 : 2;
        const increment = 3;
        // frnt1
        const newFrnt1 = lines[i + increment].replaceAll("__-_-__", "___-___");
        lines[i + increment] = newFrnt1;
        // rear1
        const newRear1 = lines[i + 5].replaceAll("__-_-__", "___-___");
        lines[i + 5] = newRear1;
        // frnt2
        const newFrnt2 = lines[i + 13].replaceAll("___-___", "__-_-__");
        lines[i + 13] = newFrnt2;
        // rear2
        const newRear2 = lines[i + 15].replaceAll("___-___", "__-_-__");
        lines[i + 15] = newRear2;
      }
    }
  }

  // Write the modified lines back to the file.
  fs.writeFileSync(fileName + "-output", lines.join("\n"));
};

parseFile("./sample file.kc");
