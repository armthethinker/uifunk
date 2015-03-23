/*
 * uifunk.js
 * by Andrew R McHugh
 * forked from Ryhan Hassan's FixieJS
 * andrew@daseindesign.co
 *
 * Automagically adds filler content
 * whenever an element has class='uifunk'.
 * Hope you find it useful :)
 */
var uifunk = (function () {

    var selector;
    var imagePlaceHolder = 'http://placehold.it/${w}x${h}&text=${text}';

    if (typeof document.getElementsByClassName !== 'function') {
        document.getElementsByClassName = function (cl) {
            var retnode = [];
            var myclass = new RegExp('\\b' + cl + '\\b');
            var elem = this.getElementsByTagName('*');
            for (var i = 0; i < elem.length; i++) {
                var classes = elem[i].className;
                if (myclass.test(classes)) retnode.push(elem[i]);
            }
            return retnode;
        };
    }

    /*
     * Spec
     * Here are some functions you might find useful
     *
     * uifunk_handler(element)
     * uifunk_handle_elements(elements)
     *
     * uifunk_fetchWord();
     * uifunk_fetchPhrase();
     * uifunk_fetchSentence();
     * uifunk_fetchParagraph();
     * uifunk_fetchParagraphs();
     *
     */


    /*
     * uifunk_handler(element)
     *
     * Takes in an element and adds filler content.
     * Returns false if tag is unrecognized.
     */
    function uifunk_handler(element) {
        if (!/^\s*$/.test(element.innerHTML)) {
            var childs = element.children;
            if (childs.length) {
                for (var uifunk_i = 0; uifunk_i < childs.length; uifunk_i++) {
                    uifunk_handler(childs[uifunk_i]);
                }
            }
            return;
        }
        switch (element.nodeName.toLowerCase()) {
        case 'b':
        case 'em':
        case 'strong':
        case 'button':
        case 'th':
        case 'td':
        case 'title':
        case 'tr':
            element.innerHTML = uifunk_fetchWord();
            break;

        case 'header':
        case 'cite':
        case 'caption':
        case 'mark':
        case 'q':
        case 's':
        case 'u':
        case 'small':
        case 'span':
        case 'code':
        case 'pre':
        case 'li':
        case 'dt':
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            element.innerHTML = uifunk_fetchPhrase();
            break;

        case 'footer':
        case 'aside':
        case 'summary':
        case 'blockquote':
        case 'p':
            element.innerHTML = uifunk_fetchParagraph();
            break;

        case 'article':
        case 'section':
            element.innerHTML = uifunk_fetchParagraphs()
            break;

        // Special cases
        case 'a':
            var href = element.getAttribute('href') || element.href;
            if (href === '' || href === null) {
                element.href = '#';
            }
            element.innerHTML = 'www.' + uifunk_fetchWord() + uifunk_capitalize(uifunk_fetchWord()) + '.com';
            break;

        case 'img':
            var src = element.getAttribute('src') || element.src;
            var temp = element.getAttribute('uifunk-temp-img');
            if (src === '' || src === null || temp === true || temp === 'true') {
                var width = element.getAttribute('width') || element.width || (element.width = 250);
                var height = element.getAttribute('height') || element.height || (element.height = 100);
                var title = element.getAttribute('title') || '';
                element.src = imagePlaceHolder.replace('${w}', width).replace('${h}', height).replace('${text}', title);
                element.setAttribute('uifunk-temp-img', true);
            }
            break;

        case 'ol':
        case 'ul':
            element.innerHTML = uifunk_fetchList();
            break;

        case 'dl':
            element.innerHTML = uifunk_fetchDefinitionList();
            break;

        case 'hr':
            break;

        default:
            element.innerHTML = uifunk_fetchSentence();
        }
    }

    // Handle an array of elements
    function uifunk_handle_elements(elements) {
        for (var i = 0; i < elements.length; i++) {
            uifunk_handler(elements[i]);
        }
    }


    // Begin generator
    var uifunk_library_word = ['I',
                              '8-bit',
                              'ethical',
                              'reprehenderit',
                              'delectus',
                              'non',
                              'latte',
                              'uifunk',
                              'mollit',
                              'authentic',
                              '1982',
                              'moon',
                              'helvetica',
                              'dreamcatcher',
                              'esse',
                              'vinyl',
                              'nulla',
                              'Carles',
                              'bushwick',
                              'bronson',
                              'clothesline',
                              'fin',
                              'frado',
                              'jug',
                              'kale',
                              'organic',
                              'local',
                              'fresh',
                              'tassel',
                              'liberal',
                              'art',
                              'the',
                              'of',
                              'bennie',
                              'chowder',
                              'daisy',
                              'gluten',
                              'hog',
                              'capitalism',
                              'is',
                              'vegan',
                              'ut',
                              'farm-to-table',
                              'etsy',
                              'incididunt',
                              'sunt',
                              'twee',
                              'yr',
                              'before',
                              'gentrify',
                              'whatever',
                              'wes',
                              'Anderson',
                              'chillwave',
                              'dubstep',
                              'sriracha',
                              'voluptate',
                              'pour-over',
                              'esse',
                              'trust-fund',
                              'Pinterest',
                              'Instagram',
                              'DSLR',
                              'vintage',
                              'dumpster',
                              'totally',
                              'selvage',
                              'gluten-free',
                              'brooklyn',
                              'placeat',
                              'delectus',
                              'sint',
                              'magna',
                              'brony',
                              'pony',
                              'party',
                              'beer',
                              'shot',
                              'narwhal',
                              'salvia',
                              'letterpress',
                              'art',
                              'party',
                              'street-art',
                              'seitan',
                              'anime',
                              'wayfarers',
                              'non-ethical',
                              'viral',
                              'iphone',
                              'anim',
                              'polaroid',
                              'gastropub',
                              'city',
                              'classy',
                              'original',
                              'brew'
                           ]
    var uifunk_library_name =   ['A. J. Ayer',
                                 'Bertrand Russel',
                                 'Patricia Churchland',
                                 'W. V. O. Quine',
                                 'Hillary Putnam',
                                 'David Chalmers',
                                 'Noam Chomsky',
                                 'Daniel Dennet',
                                 'Alvin Plantinga',
                                 'Thomas Hobbes',
                                 'Jean-Paul Sartre',
                                 'Martin Hediegger',
                                 'John Searle',
                                 'Peter Singer',
                                 'Saul Kripke',
                                 'Fyodor Dostoyevsky',
                                 'Paul Tillich',
                                 'Soren Kierkegaard',
                                 'Friedrich Nietzsche',
                                 'Franz Kafka',
                                 'Hannah Arendt',
                                 'Karl Barth',
                                 'Simone de Beauvoir',
                                 'Edmund Husserl',
                                 'William James',
                                 'Albert Camus',
                                 'Maurice Merleau-Ponty',
                                 'Jose Ortega',
                                 'Susan Bordo',
                                 'Judith Butler',
                                 'Judith Jarvis Thomson',
                                 'Angela Davis',
                                 'Guilles Deleuze',
                                 'Jacques Derrida',
                                 'Paulo Freire',
                                 'Felix Guattari',
                                 'Jurgen Habermas']

    var uifunk_library_tree =   ['Ash',
                                 'Aspen',
                                 'Oak',
                                 'Maple',
                                 'Hickory',
                                 'Hemlock',
                                 'Fir',
                                 'Elm',
                                 'Cottonwood',
                                 'Chestnut',
                                 'Cherry',
                                 'Birch',
                                 'Beech',
                                 'Basswood',
                                 'Pine',
                                 'Spruce',
                                 'Walnut']

    var uifunk_library_job = ['HVAC',
                              'Plumbing',
                              'Electric',
                              'Cleaning',
                              'Painting']

    var uifunk_library_city =   ['Columbia',
                                 'Boston',
                                 'St. Louis',
                                 'Kansas City',
                                 'Palo Alto',
                                 'New York',
                                 'Chicago',
                                 'Providence',
                                 'Baltimore',
                                 'Los Angeles',
                                 'Houston',
                                 'Philadelphia',
                                 'Phoenix',
                                 'San Antonio',
                                 'San Diego',
                                 'Oakland',
                                 'Portland']
    
    var uifunk_library_state =  ['Alabama',
                                 'Alaska',
                                 'Arizona',
                                 'Arkansas',
                                 'California',
                                 'Colorado',
                                 'Connecticut',
                                 'Delaware',
                                 'Florida',
                                 'Georgia',
                                 'Hawaii',
                                 'Idaho',
                                 'Illinois',
                                 'Indiana',
                                 'Iowa',
                                 'Kansas',
                                 'Kentucky',
                                 'Louisiana',
                                 'Maine',
                                 'Maryland',
                                 'Massachusetts',
                                 'Michigan',
                                 'Minnesota',
                                 'Mississippi',
                                 'Missouri',
                                 'Montana',
                                 'Nebraska',
                                 'Nevada',
                                 'New Hampshire',
                                 'New Jersey',
                                 'New Mexico',
                                 'New York',
                                 'North Carolina',
                                 'North Dakota',
                                 'Ohio',
                                 'Oklahoma',
                                 'Oregon',
                                 'Pennsylvania',
                                 'Rhode Island',
                                 'South Carolina',
                                 'South Dakota',
                                 'Tennessee',
                                 'Texas',
                                 'Utah',
                                 'Vermont',
                                 'Virginia',
                                 'Washington',
                                 'West Virginia',
                                 'Wisconsin',
                                 'Wyoming']

    var uifunk_library_unit =   ['Joules',
                                 'pounds',
                                 'boxes',
                                 'units',
                                 'Watts',
                                 'Newtons',
                                 'crates']

    var uifunk_library_project =   ['Beam',
                                    'Phone Clip']

    var uifunk_library_company =   ['Apple Solutions',
                                    'Pear Crafts',
                                    'Orange Works',
                                    'Kale Associates']

    function uifunk_capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function uifunk_fetchWord() {
        return uifunk_library_word[constrain(0, uifunk_library_word.length - 1 )];
    }

    function constrain(min, max) {
         return Math.round(Math.random() * (max - min) + min);
    }

    function uifunk_fetch(min, max, func, join) {
        join || (join = ' ');
        var uifunk_length = constrain(min, max);
        var result = [];
        for (var uifunk_i = 0; uifunk_i < uifunk_length; uifunk_i++) {
            result.push(func());
        }
        return uifunk_capitalize(result.join(join));
    }

    function fetch_suroundWithTag(min, max, func, tagName) {
        var startTag = '<' + tagName + '>';
        var endTag = '</' + tagName + '>';
        return startTag + uifunk_fetch(min, max, func, endTag + startTag) + endTag;
    }

    function uifunk_fetchPhrase() {
        return uifunk_fetch(3, 5, uifunk_fetchWord);
    }

    function uifunk_fetchSentence() {
        return uifunk_fetch(4, 9, uifunk_fetchWord) + '.';
    }

    function uifunk_fetchParagraph() {
        return uifunk_fetch(3, 7, uifunk_fetchSentence);
    }

    function uifunk_fetchParagraphs() {
        return fetch_suroundWithTag(3, 7, uifunk_fetchParagraph, 'p');
    }

    function uifunk_fetchList() {
        return fetch_suroundWithTag(4, 8, uifunk_fetchPhrase, 'li');
    }

    function uifunk_fetchDefinitionList() {
        var html = ''
        for (var i = 0, l = constrain(3,5); i < l; i++) {
            html += fetch_suroundWithTag(1, 1, uifunk_fetchPhrase, 'dt') + fetch_suroundWithTag(1, 1, uifunk_fetchPhrase, 'dd');
        }
        console.log(html)
        return html;
    }


    // Handle all elements with class 'uifunk'
    uifunk_handle_elements(document.getElementsByClassName('uifunk'));

    // Handle elements which match give css selectors

    function init_str(selector_str) {
        if (!document.querySelectorAll) {
            return false;
        }
        try {
            uifunk_handle_elements(document.querySelectorAll(selector_str));
            return true;
        }
        catch (err) {
            return false;
        }
    }

    return {
        // returns true if successful, false otherwise
        'init': function() {
            if (selector) {
                init_str(selector);
            } else {
                uifunk_handle_elements(document.getElementsByClassName('uifunk'));
            }
        },
        'setImagePlaceholder': function(pl) {
            imagePlaceHolder = pl;
            return this;
        },
        'setSelector': function(sl) {
            if (typeof sl === 'object') {
                selector = sl.join(',');
            } else if (sl) {
                selector = sl;
            }
            return this;
        }
    };

})();