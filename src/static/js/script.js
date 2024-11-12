let course = ""

function encodeJSONData(course)
{
    // JSON Encode the data
    data = {name: course}

    console.log(data)

    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            data
        })
        .catch(error => console.error('Error:', error));
}

function changeGraph() {
    const myDiagram = go.Diagram.fromDiv('myDiagramDiv');
    fetch('../static/js/JSON/diagramData.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data[0][0]["key"]);
      if (data[0][0]["key"] == "I") {
        console.log("SAME");
        data[0] = [{key:"Invalid Course ID", level: 0}]
      }
      myDiagram.model = new go.GraphLinksModel(
        data[0], data[1]
      );
    })
    .catch(error => console.error('Error loading file:', error));
  }

function loadingGraph() {
  const myDiagram = go.Diagram.fromDiv('myDiagramDiv');
  myDiagram.model = new go.GraphLinksModel([{key:"Loading", level:0},{key:"dot.", level:1},{key:"dot..", level:2},{key:"dot...", level:3}], [{from:"Loading", to:"dot."}, {from:"dot.", to:"dot.."}, {from:"dot..", to:"dot..."}]);
}


function sendData(course) {
    console.log(course);
    loadingGraph();
    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: course })  // Send the message as JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.reply);
        changeGraph();
    })
    .catch(error => console.error('Error:', error));

    
}

const body = document.querySelector("body");
body.setAttribute("style", "display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0px")

const banner = document.createElement("div");
banner.setAttribute("style", 
    "width: 100%; height: 100px; background-color: #285D39; box-shadow: 3px 3px 3px #CCCCCC; color: white; font-size: 48px; font-family: Verdana; display: flex; align-items: center; justify-content: center; margin-top: 0px")

banner.textContent = "Course Prerequisite Finder"
body.appendChild(banner);






const secondRow = document.createElement("div")
secondRow.setAttribute("style", "display: flex; justify-content: space-between; align-items: center; width: 100%;");
secondRow.setAttribute("id", "secondRow")
const left = document.createElement("div")
const middle = document.createElement("div")
const right = document.createElement("div")


const legend = document.createElement("div")
legend.setAttribute("style", "margin: 16px; padding: 16px; background-color: #285D39; width: 350px; height: 50px; display:flex; font-family: Verdana; color: white; font-size: 14px; display:flex; align-items: center; justify-content: center;")
legend.setAttribute("class", "box-div")
legend.textContent = "Classes connected with the same colour line are equivalent. You can do either one to progress to the next course."
left.appendChild(legend)

const userInput = document.createElement("input")
userInput.setAttribute("style","margin:16px 16px 16px -128px; height: 32px; width: 200px;")
userInput.setAttribute("id", "userInput")
userInput.setAttribute("type","text")
userInput.setAttribute("placeholder", "Example: 'CMPUT 101'")
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        course = document.getElementById("userInput").value
        console.log(course)

        sendData(course)
    }
  });
const button = document.createElement("button")
button.setAttribute("style", "width: 64px; height: 32px; color: white")
button.setAttribute("class", "box-div")
button.setAttribute("id", "submit")
button.addEventListener("click", function(){
    course = document.getElementById("userInput").value
    console.log(course)

    sendData(course)
})
button.textContent = "Submit"

const inputs = document.createElement("div")
inputs.setAttribute("style", "margin:16px;display: flex; align-items: center; justify-content: center")

inputs.appendChild(userInput)
inputs.appendChild(button)
middle.appendChild(inputs)

// Create the main div with the class "box-div" and inline style
const themeContainer = document.createElement("div");
themeContainer.setAttribute("style","margin:16px")
themeContainer.setAttribute("class", "box-div")

// Create the <p> element with the class "theme-select" and text content "Theme: "
const themeLabel = document.createElement("p");
themeLabel.classList.add("theme-select");
themeLabel.textContent = "Theme: ";

// Create the <select> element with the class "theme-box", id "theme", and onchange attribute
const themeSelect = document.createElement("select");
themeSelect.classList.add("theme-box");
themeSelect.id = "theme";
themeSelect.setAttribute("onchange", "changeTheme(), changeMainTheme()");

// Create the "Base" option element
const baseOption = document.createElement("option");
baseOption.value = "base";
baseOption.selected = true;
baseOption.textContent = "Base";

// Create the "Pretty" option element
const prettyOption = document.createElement("option");
prettyOption.value = "pretty";
prettyOption.textContent = "Pretty";

// Append the options to the select element
themeSelect.appendChild(baseOption);
themeSelect.appendChild(prettyOption);

// Append the label and select elements to the main div
themeContainer.appendChild(themeLabel);
themeContainer.appendChild(themeSelect);

right.appendChild(themeContainer)

secondRow.appendChild(left)
secondRow.appendChild(middle)
secondRow.appendChild(right)

body.appendChild(secondRow)

//theme build
theme_colors = {
  "base":"#285D39",
  "pretty":"#DD70A9"
}

//make variable theme
function changeMainTheme() {
  banner.style.backgroundColor = theme_colors[document.getElementById('theme').value];

  // box-div elements
  const elements = document.querySelectorAll(".box-div");

  elements.forEach(element => {
      element.style.backgroundColor = theme_colors[document.getElementById('theme').value];;
  });
}

const footer = document.createElement("div")
footer.setAttribute("id", "footer")
footer.setAttribute("style", "width: 100%; height: 30px; background-color: #285D39; color: white; font-size: 16px; font-family: Verdana; display: flex; align-items: center; justify-content: center")
footer.setAttribute("class", "box-div")


const members = document.createElement("div")
members.textContent = "Ben Bui, Olivia Cai, Kevin Cao, James Cote, Vinson Lou"
members.setAttribute("style", "cursor: pointer; color: white;")

footer.appendChild(members)
body.appendChild(footer)
