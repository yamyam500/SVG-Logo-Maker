const inquirer = require("inquirer");
const fs = require("fs");

// Function to generate the SVG content based on user input
function generateLogoSVG(color, shape, text) {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="100" height="100" fill="${color}" />
      <text x="50%" y="50%" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
      ${shape}
    </svg>
  `;
  return svgContent;
}

// Function to save the SVG content to a file
function saveSVGToFile(svgContent, fileName) {
  fs.writeFile(fileName, svgContent, (err) => {
    if (err) {
      console.error("Error saving SVG file:", err);
    } else {
      console.log("SVG file saved successfully!");
    }
  });
}

// Function to prompt the user for input
function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "color",
        message: "Enter the color for the logg",
      },
      {
        type: "list",
        name: "shape",
        message: "Select a shape for the logo:",
        choices: ["circle", "square", "triangle"],
      },
      {
        type: "input",
        name: "text",
        message: "Enter the text for the logo:",
      },
      {
        type: "input",
        name: "fileName",
        message: "Enter the file name for the SVG:",
      },
    ])
    .then((answers) => {
      const { color, shape, text, fileName } = answers;
      const shapeContent =
        shape === "circle"
          ? '<circle cx="50" cy="50" r="40" fill="transparent" stroke="white" stroke-width="5" />'
          : shape === "square"
          ? '<rect width="80" height="80" x="10" y="10" fill="transparent" stroke="white" stroke-width="5" />'
          : '<polygon points="50,10 90,90 10,90" fill="transparent" stroke="white" stroke-width="5" />';

      const svgContent = generateLogoSVG(color, shapeContent, text);
      saveSVGToFile(svgContent, fileName);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
}

// Start the application
promptUser();
