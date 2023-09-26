const result = document.querySelector('#result');

getData('../../data.json')
    .then(setProgress)
    .then(data => setResult(result));

/*-------------------------------*/

async function getData (url) {
    const res = await fetch(url);

    return res.json();
}

function setProgress(data) {
    data.forEach(obj => {
        const elem = document.querySelector(`#${obj.category.toLowerCase()}`);
        elem.textContent = obj.score;
        elem.setAttribute('data-progress', obj.score);

        const icon = elem.parentElement.parentElement.querySelector('.icon')

        createIcon(icon, obj);
    })
}

function createIcon(parent, data) {
    const img = document.createElement('img')
    
    img.src = data.icon;
    img.alt = data.category;

    parent.append(img);
}

function setResult(elem) {
    let res = 0;
    document.querySelectorAll('[data-progress]')
        .forEach(data => {
            res += +data.getAttribute('data-progress');
        }, 0)

    elem.textContent = (res / document.querySelectorAll('[data-progress]').length).toFixed(0);
}