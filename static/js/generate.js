function generateSlides() {
    httpGet('https://anilkkt.github.io/data/slides.json');
}

function addTitleSlide(title) {
    var presentation = document.getElementById('webslides');
    var slide = getSlide('slide-top', 'aligncenter');
    addTitle(slide, title)
    presentation.appendChild(slide);
}

function addAgendaSlide(agenda) {
    var presentation = document.getElementById('webslides');
    var slide = getSlide('slide-top', 'content-left');
    addList(slide, agenda.heading, agenda.items)
    presentation.appendChild(slide);
}

function addSongSlide(section) {
    var presentation = document.getElementById('webslides');
    var slide = getSlide('slide-top', 'aligncenter');
    addPlainTitle(slide, {heading: section.heading});
    presentation.appendChild(slide);
    section.details.forEach(verse => {
        var verseSlide = getSlide('slide-top', 'content-left');
        addText(verseSlide, verse);
        presentation.appendChild(verseSlide);
    });
}

function addEndSlide(text) {
    var presentation = document.getElementById('webslides');
    var slide = getSlide('slide-center', 'aligncenter');
    addPlainTitle(slide, {heading: text});
    presentation.appendChild(slide);
}

function addTitle(slide, title) {
    var h1 = document.createElement('h1');
    var strong = document.createElement('strong');

    strong.innerText = title.heading;
    h1.appendChild(strong);
    slide.firstChild.appendChild(h1);

    if(title.subtitle) {
        var p = document.createElement('p');
        p.classList.add('text-intro');
        p.innerText = title.subtitle;    
        slide.firstChild.appendChild(p);
    }
}

function addPlainTitle(slide, title) {
    var h1 = document.createElement('h1');
    h1.innerText = title.heading;
    slide.firstChild.appendChild(h1);

    if(title.subtitle) {
        var p = document.createElement('p');
        p.classList.add('text-intro');
        p.innerText = title.subtitle;    
        slide.firstChild.appendChild(p);
    }
}

function addText(slide, text) {
    var p = document.createElement('p');
    //p.classList.add('text-intro');
    p.innerText = text;    
    slide.firstChild.appendChild(p);
}

function addList(slide, title, list, listStyle) {

    var h1 = document.createElement('h1');    
    h1.innerText = title;
    slide.firstChild.appendChild(h1);
    var p1 = document.createElement('p');
    slide.firstChild.appendChild(p1);

    list.forEach(text => {
        var p = document.createElement('p');
        p.classList.add('text-intro');
        if (listStyle) {
            p.classList.add(listStyle);
        }
        p.innerText = text;
        slide.firstChild.appendChild(p);
    });
}

function getSlide(style, contentStyle) {
    var slide = document.createElement('section');
    if(style) {
        slide.classList.add(style);
    }
    var div = document.createElement('div');
    div.classList.add('wrap');        
    if (contentStyle) {
        div.classList.add(contentStyle);        
    }

    slide.appendChild(div);

    return slide;
}

function httpGet(addr) {
    var xmlHttp = undefined;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xmlHttp.onreadystatechange=function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var data = JSON.parse(xmlHttp.responseText);
            addTitleSlide(data.title);
            addAgendaSlide(data.agenda);
            data.sections.forEach(section => {
                addSongSlide(section);
            });
            addEndSlide('Thank You!')
        }
    }
    xmlHttp.open('GET', addr, false);
    xmlHttp.send();
}