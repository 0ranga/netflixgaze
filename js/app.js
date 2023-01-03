import {scaleLinear} from "https://cdn.skypack.dev/d3-scale@4";

//color scale for year of release
const releaseColor = scaleLinear().domain([1980, 2021]).range(["#1b04ed","#e50914"]);

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
                    containerDiv.setAttribute("data-imdbRating", c.imdbrating);
                    containerDiv.setAttribute("data-imgsrc", c.coverlink);



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

    if (property=="imdbrating"){
        document.querySelector(".arrow-tag").innerText = "Imdb rating out of 10";
    } else {
        document.querySelector(".arrow-tag").innerText = "Number of recommendations";
    }

    //replace innerText by property
    filmOfCurrentPage.forEach(f => {
        // f.filmTag.children[0].innerText = f[property];
        f.filmTag.querySelector('.bar-chart').setAttribute('style', f.filmTag.querySelector('.bar-chart').getAttribute('data-width'));
        f.filmTag.querySelector('.counts').style.opacity = 1;

        
        if (f[property]===null){
            f.filmTag.querySelector('.data-element').innerHTML = "<span class=\"icon-empty\"></span>";
            if (property=="imdbrating"){
                f.filmTag.querySelector('.bar-chart').style.width = "5%";
            }
        }
        else if(property=="production"){
            f.filmTag.querySelector('.data-element').innerHTML = f[property] == "Netflix" ? "<span class=\"icon-logo\"></span>" : "";
        }
        else if(property=="year") {
            let releaseDate = parseInt(f[property]);
            f.filmTag.querySelector('.data-element').innerHTML = `<span style="color:${releaseColor(releaseDate)}">` + f[property] + "</span>";

        }
        else if (property=="imdbrating"){
            f.filmTag.querySelector('.data-element').innerHTML = "<span>" + f[property] + "</span>";
            f.filmTag.querySelector('.bar-chart').style.width = f.imdbrating/10 * 70 + "%";
            f.filmTag.querySelector('.counts').style.opacity = 0;

        }
        else {
            f.filmTag.querySelector('.data-element').innerHTML = (f[property].toLowerCase() === "serie" || f[property].toLowerCase() === "series") ?  "series" : `<span style="color:#1b04ed">movie</span>`;
        }
    })
}

function extractArrayFromFilmData(){
    let url = new URL(window.location.href);
    let line = url.searchParams.get("line");
    let column = url.searchParams.get("column");

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

import DATA from "../json.js";


/* -------------------------------------------------------------------------- */
/*                                    MAIN                                    */
/* -------------------------------------------------------------------------- */


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
    filmOfCurrentPage[i].filmTag.querySelector('.bar-chart').setAttribute('data-width', filmOfCurrentPage[i].filmTag.querySelector('.bar-chart').getAttribute('style'));
}

const barChart = barChartSelector();
barChart.forEach(element => {
    let imgContainer = document.createElement('div');
    imgContainer.classList.add("cover")
    imgContainer.style.position = "absolute";
    imgContainer.style.zIndex = 100;
    let imgJ = document.createElement('img');
    imgJ.setAttribute("src", element.dataset.imgsrc);
    imgJ.style.borderRadius = "10px";
    imgContainer.appendChild(imgJ);

    element.addEventListener('animationend', (e)=>{
        if(e.animationName=='progress-bar'){
            e.target.addEventListener('mouseenter', f => {

                imgContainer.style.top = f.clientY + 10 + "px";
                imgContainer.style.left = f.clientX + 10 + "px";
                document.querySelector("body").appendChild(imgContainer);
                


                // f.target.setAttribute('data-width', f.target.getAttribute('style'));
                f.target.style.width = "90%";

                document.querySelector('.mini-map-container').classList.add('reduce-opacity');


            });
            e.target.addEventListener('mouseleave', f => {
                if(!ratingButton.checked){
                    f.target.setAttribute('style', f.target.getAttribute('data-width'));
                } else {
                    f.target.style.width = f.target.dataset.imdbrating!="null" ? f.target.dataset.imdbrating/10 * 70 + "%" : "5%";
                }
                document.querySelector('.mini-map-container').classList.remove('reduce-opacity');
                document.querySelector(".cover") ? document.querySelector("body").removeChild(imgContainer) : null;
            });
        }

    });
    element.addEventListener('mousemove', e => {
        let imgHeight = imgContainer.clientHeight;
        let imgBottom = imgHeight + 16 + e.clientY;
        let bodyBottom = document.querySelector('body').getBoundingClientRect().bottom;

        let diff = bodyBottom - imgBottom;
        let delta = 0;


        if (diff<0){
            delta = imgHeight/2;
            if ((bodyBottom-(e.clientY + 16 + delta))<0){
                delta = imgHeight;
                imgContainer.style.top = e.clientY - 16 - delta + "px";
            } else {
                imgContainer.style.top = e.clientY + 16 - delta + "px";
            }
        } else {
            imgContainer.style.top = e.clientY + 16 + "px";
        }
        imgContainer.style.left = e.clientX + 16 + "px";
        
    })
});

const numberToUpdate = document.querySelectorAll('.count-number');
numberToUpdate.forEach( (element, i )=> {
    setTimeout(() => {counter(element)}, i*200);
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