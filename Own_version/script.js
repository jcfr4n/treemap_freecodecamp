// jshint esversion:6

// Define an set some vars
let urlDataMovies = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

let movieData;

let canvas = d3.select('#canvas');

/**
 * 
 */

let drawCanvas = () => {
    let hierarchy = d3.hierarchy(movieData, (node) => {
        return node.children;
    }).sum((node) => {
        return node.value;
    }).sort((node1, node2) => {
        return node2.value - node1.value;   
    });

    let createTreeMap = d3.treemap()
                            .size([1000, 600]);

    createTreeMap(hierarchy);

    let movieTiles = hierarchy.leaves();

    let block = canvas.selectAll('g')
                        .data(movieTiles)
                        .enter()
                        .append('g');

    block.append('rect')
        .attr('class','tile');

    console.log(hierarchy.leaves());
};

d3.json(urlDataMovies).then((data, error) => {
    if (error) {
        console.log(error);
    }else{
        movieData = data;

        drawCanvas();
    }

});