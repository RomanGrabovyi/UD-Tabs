window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    // DELEGATION 
    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //TIMER

    let deadline = '2020-05-31'; //кінцева дата

    function getTimeRemainig(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), // різниця між кінцевою і теперішньою датою
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return { // return object
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemainig(endtime); //get all object

            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else return num;
            }

            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;


            if (t.total <= 0) {
                clearInterval(timeInterval); //зупинка таймера
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00'; //по нулях
            }

        }
    }
    setClock('timer', deadline);

    //Modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', () => {
        overlay.style.display = 'block';
        this.classList.add('.more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('.more-splash');
        document.body.style.overflow = '';
    });

    //Form
    let messages = {
        loading: "Loading...",
        succsess: "Дякуємо! Скоро ми зв'яжемось з вами!",
        failure: "Виникла помилка!!!"
    }

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = messages.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = messages.succsess;
            } else {
                statusMessage.innerHTML = messages.failure;
            }
        });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
    });

    //Contact Form
    let contactForm = document.querySelector('#form'),
        contactInput = contactForm.getElementsByTagName('input'),
        contactFormMessage = document.createElement('div');

        contactFormMessage.classList.add('status');

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            contactForm.appendChild(contactFormMessage);
    
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    
            let formData = new FormData(contactForm);
    
            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);
    
            request.send(json);
    
            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    contactFormMessage.innerHTML = messages.loading;
                } else if(request.readyState === 4 && request.status == 200) {
                    contactFormMessage.innerHTML = messages.succsess;
                } else {
                    contactFormMessage.innerHTML = messages.failure;
                }
            });
    
                for (let i = 0; i < contactInput.length; i++) {
                    contactInput[i].value = '';
                }
        });

});
