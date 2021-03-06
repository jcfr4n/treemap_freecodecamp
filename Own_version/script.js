// jshint esversion:6

/**
 * coded by: Juan Carlos Francisco Mesa.
 *
 * Code at codepen.io: https://codepen.io/jcfr4n/pen/QWaVKWq
 *
 * code at github.com: https://github.com/jcfr4n/treemap_freecodecamp
 */

// Define an set some vars
let urlDataMovies =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

let movieData;

let canvas = d3.select("#canvas");

/**
 * Function drawCanvas.
 *
 * This function handle the showing of the data
 *
 */

let drawCanvas = () => {
  let hierarchy = d3
    .hierarchy(movieData, (node) => {
      return node.children;
    })
    .sum((node) => {
      return node.value;
    })
    .sort((node1, node2) => {
      return node2.value - node1.value;
    });

  let createTreeMap = d3.treemap().size([1000, 600]);

  createTreeMap(hierarchy);

  let movieTiles = hierarchy.leaves();

  let block = canvas
    .selectAll("g")
    .data(movieTiles)
    .enter()
    .append("g")
    .attr("transform", (movie) => {
      return "translate (" + movie.x0 + ", " + movie.y0 + ")";
    });

  console.log(hierarchy.leaves());

  block
    .append("rect")
    .attr("class", "tile")
    .attr("fill", (movie) => {
      let color = "black";
      switch (movie.data.category) {
        case "Action":
          color = "orange";
          break;
        case "Drama":
          color = "blue";
          break;
        case "Adventure":
          color = "red";
          break;
        case "Family":
          color = "yellow";
          break;
        case "Animation":
          color = "tan";
          break;
        case "Comedy":
          color = "green";
          break;
        case "Biography":
          color = "violet";
          break;
      }
      return color;
    })
    .attr("data-name", (movie) => {
      return movie.data.name;
    })
    .attr("data-category", (movie) => {
      return movie.data.category;
    })
    .attr("data-value", (movie) => {
      return movie.data.value;
    })
    .attr("width", (movie) => {
      return movie.x1 - movie.x0;
    })
    .attr("height", (movie) => {
      return movie.y1 - movie.y0;
    })
    .on("mouseover", (event, movie) => {
      tooltip.transition().duration(500).style("opacity", 0.9);

      tooltip
        .html(
          "Nombre: " +
            movie.data.name +
            "<br>Categor??a: " +
            movie.data.category +
            "<br>Value: " +
            movie.data.value
        )
        .attr("id", "tooltip")
        .attr("data-value", movie.data.value)
        .style("left", event.pageX + 20 + "px")
        .style("top", event.pageY - 30 + "px");
    })
    .on("mouseout", (event, item) => {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

  block
    .append("text")
    .text((movie) => {
      return movie.data.name;
    })
    .attr("x", 5)
    .attr("y", 20);
};

/**
 * Conection with remote url to obtain the data
 */

d3.json(urlDataMovies).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    movieData = data;

    drawCanvas();
  }
});
