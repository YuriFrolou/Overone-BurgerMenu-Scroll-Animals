const container = document.querySelector('.container');
const contentButtons = document.getElementsByClassName('btn-add');
const main = document.querySelector('.main');
const images = document.getElementsByClassName('image');
const loader = document.querySelector('.loading');
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const navClose = document.querySelector('.nav__close');
const list = document.querySelector('.list');


let index = 0;
let sectionQuantity = 2;

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < sectionQuantity; i++) {
        createSection(index);
        index++;
    }
    window.addEventListener('scroll', (e) => {
            const button = document.createElement('button');
            button.classList.add('btn-add');
            button.innerHTML = 'Показать ещё';
            if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 200) {
                if (index < sections.length) {
                    for (const btn of contentButtons) {
                        btn.remove();
                    }
                    const button = createAddContentBtn();
                    button.innerHTML = 'Показать ещё';
                    addBtnEvent(button);
                    main.append(button);

                }
            } else {
                for (const btn of contentButtons) {
                    btn.remove();
                }
            }
        },
    );
    console.log('Событие: DOMContentLoaded');
    getLoadedImages();

});

window.addEventListener('load', () => {
    loader.style.display = 'none';
    console.log('Событие: load');
    getLoadedImages();
});

window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = false;
    console.log('Событие: beforeunload');
    getLoadedImages();
});

function createSection() {
    const section = createElem('section', 'section', main);
    createElem('h2', 'section-title', section);
    const container = createElem('div', 'container', section);
    createElem('img', 'image', container);
    const description = createElem('div', 'desc-block', container);
    createElem('p', 'info', description);
    createElem('img', 'arrow', description);
    createElem('p', 'info-add', description);
}

function addBtnEvent(btn) {
    btn.addEventListener('click', () => {
        for (let i = 0; i < sectionQuantity; i++) {
            createSection(index);
            index++;
        }
    });
    btn.remove();
}


function addArrowEvent(arrow) {
    arrow.addEventListener('click', (event) => {
        event.target.classList.toggle('active');
        event.target.nextElementSibling.classList.toggle('active');
    });
}

function createAddContentBtn() {
    const btn = document.createElement('a');
    btn.classList.add('btn-add');
    btn.href = `#${index}`;
    btn.style.margin = '40px auto';
    return btn;
}

function createElem(elemName, className, parentName) {
    const element = document.createElement(elemName);
    element.classList.add(className);
    switch (className) {
        case 'section':
            element.id = `${index}`;
            break;
        case 'section-title':
            element.innerHTML = sections[index].title;
            break;
        case 'image':
            element.src = sections[index].image;
            break;
        case 'info':
            element.innerHTML = sections[index].info;
            break;
        case 'arrow':
            element.src = './img/down-arrow.png';
            addArrowEvent(element);
            break;
        case 'info-add':
            element.innerHTML = sections[index].addInfo;
            break;
    }
    parentName.append(element);
    return element;
}

function getLoadedImages() {
    console.log(`Изображения на странице:`);
    if (images.length < 1) {
        console.log('Не найдены');
    } else {
        for (let i = 0; i < images.length; i++) {
            console.log(`Изображение ${i + 1}: ширина ${getComputedStyle(images[i]).width}, высота ${getComputedStyle(images[i]).height}`)
        }
    }
}

menuBtn.addEventListener('click', (e) => {
    nav.classList.add('active');
    e.currentTarget.classList.add('hide');
    document.body.style.overflow = 'hidden';
});

navClose.addEventListener('click', (e) => {
    nav.classList.remove('active');
    menuBtn.classList.remove('hide');
    document.body.style.overflow = '';
});


list.addEventListener('click', (e) => {
    if (e.target.closest('.list__item a')) {
        nav.classList.remove('active');
        menuBtn.classList.remove('hide');
        document.body.style.overflow = '';
    }

});
