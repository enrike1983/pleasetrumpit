(function(exports) {

    'use strict';

    var MAIN = (function() {

        function _copy() {

            var _d = document;

            var filter = _d.querySelectorAll('#filter-goo-2 feGaussianBlur')[0];
            var particleCount = 12;
            var colors = ['#DE8AA0', '#8AAEDE', '#FFB300', '#60C7DA']

            var copyTextareaBtn = _d.querySelector('.url-button');

            copyTextareaBtn.addEventListener('click', function(event) {
                copyTextareaBtn.classList.add('stop')
                var copyTextarea = _d.querySelector('.url-input');
                copyTextarea.select();
                try {
                    var successful = _d.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    copyTextareaBtn.innerHTML = "COPIED!";
                    setTimeout(function(){
                        copyTextareaBtn.innerHTML = "COPY";
                        copyTextareaBtn.classList.remove('stop')
                    }, 2000)

                } catch (err) {
                    copyTextareaBtn.innerHTML = "ERROR!";
                    setTimeout(function(){
                        copyTextareaBtn.innerHTML = "COPY";
                    }, 2000)
                }

                var particles = [];
                var tl = new TimelineLite({onUpdate: function() {
                  filter.setAttribute('x', 0);
                }});

                tl.to(copyTextareaBtn.querySelectorAll('.button__bg'), 0.6, { scaleX: 1.05 });
                tl.to(copyTextareaBtn.querySelectorAll('.button__bg'), 0.9, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 0.6);

                for (var i = 0; i < particleCount; i++) {
                    particles.push(_d.createElement('span'));
                    copyTextareaBtn.appendChild(particles[i]);

                    particles[i].classList.add(i % 2 ? 'left' : 'right');

                    var dir = i % 2 ? '-' : '+';
                    var r = i % 2 ? getRandom(-1, 1)*i/2 : getRandom(-1, 1)*i;
                    var size = i < 2 ? 1 : getRandom(0.4, 0.8);
                    var tl = new TimelineLite({
                        onComplete: function(i) {
                            particles[i].parentNode.removeChild(particles[i]);
                            this.kill();
                        }, onCompleteParams: [i]
                    });

                    tl.set(particles[i], { scale: size });
                    tl.to(particles[i], 0.6, { x: dir + 20, scaleX: 3, ease: SlowMo.ease.config(0.1, 0.7, false) });
                    tl.to(particles[i], 0.1, { scale: size, x: dir +'=25' }, '-=0.1');
                    if(i >= 2) tl.set(particles[i], { backgroundColor: colors[Math.round(getRandom(0, 3))] });
                        tl.to(particles[i], 0.6, { x: dir + getRandom(60, 100), y: r*10, scale: 0.1, ease: Power3.easeOut });
                        tl.to(particles[i], 0.2, { opacity: 0, ease: Power3.easeOut }, '-=0.2');
                    }
                }
            );

        }


        function _init() {
            _copy()
        }

        return {
            init: _init
        }

    }());

    window.onload = function(){
        MAIN.init()
    };

}(window));



function getRandom(min, max){
  return Math.random() * (max - min) + min;
}

var isSafari = /constructor/i.test(window.HTMLElement);
var isFF = !!navigator.userAgent.match(/firefox/i);

if (isSafari) {
  document.getElementsByTagName('html')[0].classList.add('safari');
}
