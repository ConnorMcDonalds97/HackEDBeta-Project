// You can specify options in the Diagram's second argument
// These options not only include Diagram properties, but sub-properties, too.
const myDiagram =
  new go.Diagram("myDiagramDiv",
    { // enable Ctrl-Z to undo and Ctrl-Y to redo
      "undoManager.isEnabled": true,
      layout: new go.TreeLayout({
        treeStyle: go.TreeStyle.LastParents,
        arrangement: go.TreeArrangement.Horizontal,
        // properties for most of the tree:
        angle: 90,
        layerSpacing: 35,
        // properties for the "last parents":
        alternateAngle: 90,
        alternateLayerSpacing: 35,
        alternateAlignment: go.TreeAlignment.Bus,
        alternateNodeSpacing: 20
      })
    });

myDiagram.nodeTemplate =
    new go.Node("Horizontal",
    // the entire node will have a light-blue background
    { background: "#33CC33" })
  .add(
    new go.Panel(go.Panel.Auto, { name: 'BODY', width: 150})
    .add(
        new go.TextBlock("Default Text",  // the initial value for TextBlock.text
            // some room around the text, a larger font, and a white stroke:
            { margin: 12, stroke: "white", font: "16px sans-serif" })
        // TextBlock.text is data bound to the "name" property of the model data
        .bind("text", "course"),
        )
    );

myDiagram.linkTemplate =
  new go.Link(
      // default routing is go.Routing.Normal
      // default corner is 0
      { routing: go.Routing.Orthogonal, corner: 5 })
    .add(
      // the link path, a Shape
      new go.Shape({ strokeWidth: 3, stroke: "#555" }),
      // if we wanted an arrowhead we would also add another Shape with toArrow defined:
      //new go.Shape({  toArrow: "Standard", stroke: null  })
    );

// fetch the json file
myDiagram.model = new go.TreeModel(
  [
    { key: 1, course: "CMPUT 175" },
    { key: 2, course: "CMPUT 174", parent: 1 },
    { key: 3, course: "MATH 144", parent: 1 }
  ]);