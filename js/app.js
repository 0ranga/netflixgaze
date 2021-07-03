/* -------------------------------------------------------------------------- */
/*                                  SELECTORS                                 */
/* -------------------------------------------------------------------------- */

const viz = document.querySelector(".viz02");
const titreButton = document.querySelector("#titre");
const mediaButton = document.querySelector("#mediatype");
const productionButton = document.querySelector("#production");
const dateButton = document.querySelector("#date");
const ratingButton = document.querySelector("#rating");
const films = () => document.querySelectorAll(".film");
const barChartSelector = () => document.querySelectorAll('.bar-chart');
const soustitre = document.getElementById('soustitre');
const lineIdentifier = document.querySelector('.position-line');
const columnIdentifier = document.querySelector('.position-column');


let filmData;
let filmOfCurrentPage;


/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */

// titreButton.addEventListener('click', (e) => getProperty(e, "title"));
mediaButton.addEventListener('click', (e) => getProperty(e, "type"));
productionButton.addEventListener('click', (e) => getProperty(e, "production"));
dateButton.addEventListener('click', (e) => getProperty(e, "year"));
ratingButton.addEventListener('click', (e) => getProperty(e, "imdbrating"));


/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

// function fromCSVtoObjectArray(fileLink){
//     const allData = [];
//     return fetch(fileLink)
//     .then(response => response.text())
//     .then(data => {
//         let csv2json = data;
//         let test = csv2json.split("\r\n");

//         for (let i = 1; i < test.length; i++) {
//             let uneligne = test[i].split(",");
//             let element = {};
//             element.netflixId = parseInt(uneligne[0]) ;
//             element.count = parseInt(uneligne[1]);
//             element.line = parseInt(uneligne[2]);
//             element.column = parseInt(uneligne[3]);
//             element.imdbId = uneligne[4];
//             element.title = uneligne[5];
//             element.production = uneligne[6] == "N" ? "Netflix" : "Other";
//             element.type = uneligne[7];
//             element.year = uneligne[8];
//             element.imdbvotes = parseInt(uneligne[9]);
//             element.imdbrating = parseFloat(uneligne[10]);
//             element.coverlink = uneligne[11];

//             if(!allData[element.line]){
//                 allData[element.line] = [];
//             }
//             if (!allData[element.line][element.column]){
//                 allData[element.line][element.column]= [];
//             }

//             allData[element.line][element.column].push(element);


//             // allData.push(element);
//         }

//         return allData

//     });
// }

// function addDivToFilmArray(filmArray){

//     filmArray.forEach(a => {
//         a.forEach(b => {
//             if (b!= null){
//                 b.forEach(c => {
//                     //create film div
//                     const filmDiv = document.createElement('div');
//                     filmDiv.classList.add('film');

//                     //assign netflix id as ID to div
//                     filmDiv.id = c.netflixId;

//                     //create text element inside div
//                     const filmP = document.createElement('p');
//                     filmP.innerHTML = c.title;
//                     filmDiv.appendChild(filmP);

//                     //add it to filmArray
//                     c.filmTag = filmDiv;
//                 })
//             }
//         })
//     })
// }

function addDivToFilmArray(filmArray){

    filmArray.forEach(a => {
        a.forEach(b => {
            if (b!= null){
                b.forEach(c => {
                    //create film div
                    const filmDiv = document.createElement('div');
                    filmDiv.classList.add('film');

                    //assign netflix id as ID to div
                    filmDiv.id = c.netflixId;

                    let containerDiv = document.createElement('div');
                    containerDiv.classList.add('bar-chart');
                    containerDiv.style.width = "100%";


                    //create text element inside div
                    let filmP = document.createElement('p');
                    filmP.classList.add('film-title');
                    filmP.innerHTML = c.title;
                    // filmDiv.appendChild(filmP);

                    let dataElement = document.createElement('p');
                    dataElement.classList.add('data-element');
                    dataElement.innerText = "";

                    //create p element with number of count
                    let numberOfCounts = document.createElement('p');
                    numberOfCounts.classList.add('counts');
                    numberOfCounts.innerHTML = "<span class=\"count-number\" data-target=\"" + c.count  +"\">0</span>";

                    //add the "x" after the number of count
                    let xUnit = document.createElement('span');
                    xUnit.classList.add('x-unit');
                    xUnit.innerText = "x";

                    numberOfCounts.appendChild(xUnit);

                    containerDiv.append(filmP);
                    containerDiv.appendChild(dataElement);
                    filmDiv.appendChild(containerDiv);
                    filmDiv.appendChild(numberOfCounts);


                    //add it to filmArray
                    c.filmTag = filmDiv;
                })
            }
        })
    })
}

function getMostCount(filmArray) {
    const counts = [];
    for (let i = 0; i < filmArray.length; i++) {
        //get all the numbers of count
        let element = filmArray[i].count;
        counts.push(element);
    }
    return Math.max(...counts);
}

function getProperty(event, property){
    // event.preventDefault();

    //replace innerText by property
    filmOfCurrentPage.forEach(f => {
        // f.filmTag.children[0].innerText = f[property];
        if(property=="production"){
            f.filmTag.querySelector('.data-element').innerHTML = f[property] == "Netflix" ? "<span class=\"icon-logo\"></span>" : "";
        }
        else if(property=="year") {
            f.filmTag.querySelector('.data-element').innerHTML = (f[property].endsWith('Now') || f[property].endsWith('2021')) ? f[property] : "<span class=\"netflix-old\">" + f[property] + "</span>";
        }
        else if (property=="imdbrating"){

            // Hue saturation and shade
            // f.filmTag.querySelector('.data-element').innerHTML = "<span class =\"span-imdbrating\" style=\"color:hsl(" + (281+parseFloat(f[property])/10*76) +"," + (parseFloat(f[property])/10*100) +"%," + (parseFloat(f[property])/10*47) +"%);\">" + f[property] + "</span>";
            
            //Hue
            // f.filmTag.querySelector('.data-element').innerHTML = "<span style=\"color:hsl(" + (281+parseFloat(f[property])/10*76) +",92%, 47%);\">" + f[property] + "</span>";

            //Saturation
            // f.filmTag.querySelector('.data-element').innerHTML = "<span style=\"color:hsl(357," + (parseFloat(f[property])/10*100) +"%, 47%);\">" + f[property] + "</span>";

            //Shade
            // f.filmTag.querySelector('.data-element').innerHTML = "<span style=\"color:hsl(357, 92%," + (parseFloat(f[property])/10*47) +"%);\">" + f[property] + "</span>";
            
            //Hue and saturation
            // f.filmTag.querySelector('.data-element').innerHTML = "<span style=\"color:hsl(" + (281+parseFloat(f[property])/10*76) +"," + (parseFloat(f[property])/10*100) +"%, 47%);\">" + f[property] + "</span>";
            
            //Hue and shade
            // f.filmTag.querySelector('.data-element').innerHTML = "<span style=\"color:hsl(" + (281+parseFloat(f[property])/10*76) +", 92%," + (parseFloat(f[property])/10*47) +"%);\">" + f[property] + "</span>";
            
            //Saturation and shade
            // f.filmTag.querySelector('.data-element').innerHTML = "<span style=\"color:hsl(357," + (parseFloat(f[property])/10*100) +"%," + (parseFloat(f[property])/10*47) +"%);\">" + f[property] + "</span>";
            
            //Saturation shade and Opacity
            // f.filmTag.querySelector('.data-element').innerHTML = "<span style=\"color:hsla(357," + (parseFloat(f[property])/10*100) +"%," + (parseFloat(f[property])/10*47) +"%," + (parseFloat(f[property])/10*100) +"%);\">" + f[property] + "</span>";
            
            //Opacity
            f.filmTag.querySelector('.data-element').innerHTML = "<span style=\"color:hsla(357, 92%, 47%," + ((parseFloat(f[property])-3.5)/6*100) +"%);\">" + f[property] + "</span>";
        }
        else {
            f.filmTag.querySelector('.data-element').innerHTML = (f[property].toLowerCase() === "serie" || f[property].toLowerCase() === "series") ? "series" : "movie";
        }
    })
}

function extractArrayFromFilmData(){
    let url = new URL(window.location.href);
    let line = url.searchParams.get("line");
    let column = url.searchParams.get("column");

    // soustitre.innerHTML = `<span class="case-first-line">Top 5 of most recommended content in February 2021</span><br/>at position : Line <span class="netflix-red">${parseInt(line)+0}</span> - Column <span class="netflix-red">${parseInt(column)+1}</span>`
    lineIdentifier.innerText = parseInt(line)+0;
    columnIdentifier.innerText = parseInt(column)+1;

    return filmData[line][column];
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
//download(jsonData, 'json.txt', 'text/plain');

//Counter
function counter(element) {
    const speed = 50
    const target = +element.getAttribute("data-target");

    const inc = 2; 

    const updateCount = () => {
        const count = +element.innerText;
        // console.log(count);
    
        if (count<target){
            element.innerText = count + inc;
            setTimeout(updateCount, 30);
        } else {
            element.innerText = target;
        }
    }

    updateCount();
}

//import DATA from "../json.js";
import DATA from "../json-no-undefined.js";


/* -------------------------------------------------------------------------- */
/*                                    MAIN                                    */
/* -------------------------------------------------------------------------- */

// let dataArray = fromCSVtoObjectArray('../data.csv');
// dataArray.then(arrayOfFilms => {

//     // let arrayOfFilms = unTest;
//     console.log(arrayOfFilms);

//     //save data to JSON file
//     // download(JSON.stringify(arrayOfFilms), 'json.json', 'application/json');

//     //create div and add it to the array
//     addDivToFilmArray(arrayOfFilms);

//     //set global variable filmData so that it can be used in other functions
//     filmData = arrayOfFilms;

//     //get only the film of the current page
//     filmOfCurrentPage = extractArrayFromFilmData();

//     //get the most counts
//     let max = getMostCount(filmOfCurrentPage);

//     // add the divs to the body with a maximum of 6
//     for (let i = 0; i < (filmOfCurrentPage.length < 5 ? filmOfCurrentPage.length : 5) ; i++) {
//         //add to viz div
//         viz.appendChild(filmOfCurrentPage[i].filmTag);

//         filmOfCurrentPage[i].filmTag.style.width = filmOfCurrentPage[i].count/max * 100 +"%";

//     }

//     // arrayOfFilms.forEach((f, i) => {
//     //     viz.appendChild(f.filmTag);
//     // })

// });


let arrayOfFilms = DATA;

//create div and add it to the array
addDivToFilmArray(arrayOfFilms);

//set global variable filmData so that it can be used in other functions
filmData = arrayOfFilms;

//get only the film of the current page
filmOfCurrentPage = extractArrayFromFilmData();

//get the most counts
let max = getMostCount(filmOfCurrentPage);

// add the divs to the body with a maximum of 6
for (let i = 0; i < (filmOfCurrentPage.length < 5 ? filmOfCurrentPage.length : 5) ; i++) {
    //add to viz div
    viz.appendChild(filmOfCurrentPage[i].filmTag);

    // counter(filmOfCurrentPage[i].filmTag.querySelector('.counts'), parseInt(filmOfCurrentPage[i].filmTag.querySelector('.counts').innerText.substring(0,2)));


    // filmOfCurrentPage[i].filmTag.style.width = filmOfCurrentPage[i].count/max * 100 +"%";
    filmOfCurrentPage[i].filmTag.querySelector('.bar-chart').style.width = filmOfCurrentPage[i].count/max * 85 +"%";

}

const barChart = barChartSelector();
barChart.forEach(element => {
    element.addEventListener('animationend', (e)=>{
    //     e.target.addEventListener('mouseenter', (event) => {
    //         event.target.setAttribute('data-width', event.target.getAttribute('style'));
    
    //         // e.target.style.width = e.target.offsetWidth;
    //         // e.target.classList.add('targeted');
    //         e.target.style.width = "90%";
    //     });
    //     e.target.addEventListener('mouseleave', (event) => { 
    //         event.target.setAttribute('style', event.target.getAttribute('data-width'));
    //     });
 
        if(e.animationName=='progress-bar'){
            e.target.addEventListener('mouseenter', f => {

                f.target.setAttribute('data-width', f.target.getAttribute('style'));
                f.target.style.width = "90%";

                document.querySelector('.mini-map-container').classList.add('reduce-opacity');

                e.target.addEventListener('mouseleave', f => {
                    f.target.setAttribute('style', f.target.getAttribute('data-width'));
                    document.querySelector('.mini-map-container').classList.remove('reduce-opacity');
                })
            });
            
        }

    });
});

const numberToUpdate = document.querySelectorAll('.count-number');
numberToUpdate.forEach( (element, i )=> {
    setTimeout(() => {counter(element)}, i*200);
    // counter(element);
});

let currentURL = new URL(window.location.href);

document.querySelectorAll('.box').forEach(
    (element) => {
        // console.log(window.location.origin);
        // console.log(element.getAttribute('href'));
        let boxURL = new URL(element.getAttribute('href'), window.location.origin);
        if (boxURL.searchParams.get('line') == currentURL.searchParams.get('line') && boxURL.searchParams.get('column') == currentURL.searchParams.get('column')){
            element.classList.add('current-box', 'firing');
        }
    }
)