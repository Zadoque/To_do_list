//functions 
const createToDoObj = function(name, state){
    this.name = name;
    this.state = state;
}

function getTextOfToDo(to_do){
    let paragra = to_do.querySelector('.content-body-item-text').querySelector('p').textContent;
    return paragra;
}

function toggleClass(element, cls = 'selected'){
    if(element.classList.contains(cls)){
        element.classList.remove(cls);
    }
    else{
        element.classList.add(cls);
    }
}
function createToDoDom(text,state) {
    console.log(`The text is ${text}`);
    let list_item = document.createElement('div');
    list_item.className = 'content-body-item';
    state === true && list_item.classList.add('item-checked');
    let inputContainer = document.createElement('div');
    inputContainer.className = 'content-body-item-input';
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = '';
    checkbox.id = 'input-item';
    checkbox.checked = state;
    inputContainer.appendChild(checkbox);
    const textContainer = document.createElement('div');
    textContainer.className = 'content-body-item-text';
    const paragraph = document.createElement('p');
    paragraph.textContent = text; 
    textContainer.appendChild(paragraph);
    list_item.appendChild(inputContainer);
    list_item.appendChild(textContainer);
    body.appendChild(list_item);
}
function removeFromDom(itens){
    itens.forEach(item => {
        item.remove();
    });
}
function createListToDoDom(all_list){
    all_list.forEach(obj => {
        createToDoDom(obj.name, obj.state);
    });
}

function updateBodyAndFooter(body, filter){
    let text = filter.textContent;
    let itens = body.querySelectorAll('.content-body-item');
    let count = 0;
    removeFromDom(itens);
    switch(text){
        case 'Todos':
            createListToDoDom(all_list);
            count = all_list.length;
            break;
        case 'Ativos':
            let active_list = all_list.filter(obj => obj.state === false);
            console.log(active_list);
            createListToDoDom(active_list);
            count = active_list.length;
            break;
        case 'Concluidos':
            let done_list = all_list.filter(obj => obj.state === true);
            console.log(done_list);
            createListToDoDom(done_list);
            count = done_list.length;
            break;
        case 'Limpeza Completa':
            itens = [];
            all_list = [];
            toggleClass(clean_button);
            toggleClass(all_button);
            break;
        default:
            console.log('something get wrong');
            break;
    }
    return count;
}


const updateItensLeft = (body, footer) => {
    let itens_left = footer.querySelector('.content-footer-itens-left');
    let filter = footer.querySelector('.selected');
    console.log('The fileter in update func is: ');
    console.log(filter.textContent);
    if(filter && itens_left){
        let itenslength = updateBodyAndFooter(body,filter);
        let str = `${itenslength} ite${itenslength > 1 ? 'ns' : 'm'} restante`;
        itens_left.textContent = str;
    }
}



//variables
var head = document.body.querySelector('.content-head');
var body = document.body.querySelector('.content-body');
var footer = document.body.querySelector('.content-footer');
var itens_left = footer.querySelector('#not-a-button');
var all_button = footer.querySelector('.content-footer-all');
var active_button = footer.querySelector('.content-footer-active');
var done_button = footer.querySelector('.content-footer-done');
var clean_button = footer.querySelector('.content-footer-clean');
var input = document.body.querySelector('.content-head-input').querySelector('input');
var all_list = [];

if(!(body && footer && itens_left && all_button && active_button && done_button && clean_button && input && head )){
    console.log("I didn't find some element ");
}

// Events
input.addEventListener('keyup', function(event){
    event.stopPropagation();
    if(input.value == ''){
        console.log(' An empty string was typed');
    }
    if(event.key === 'Enter' &&  /[a-zA-Z]/.test(input.value)) {
        if(! (all_list.find(obj => obj.name == input.value))){
            createToDoDom(input.value, false);
            let new_to_do_obj = new createToDoObj(input.value, false);
            all_list.push(new_to_do_obj);
            updateItensLeft(body, footer);
            input.value = "";
        }
    }
});

body.addEventListener('change', function(event){
    event.stopPropagation();
    if (event.target && event.target.type === 'checkbox') {
        let to_do_item = event.target.closest('.content-body-item');
        text = getTextOfToDo(to_do_item);
        obj = all_list.find(obj => obj.name === text);
        obj.state = !obj.state;
        updateItensLeft(body, footer);
    }
    
});

footer.addEventListener('click',function (event){
    event.stopPropagation();
    if((!(event.target.id === 'not-a-button')) && !(event.target.classList.contains('content-footer'))){
        let current = event.target.closest('.content-footer').querySelector('.selected');    
        if(current === event.target){
            console.log('nothing to do');
        }
        else{
            console.log(current);
            toggleClass(current);
            toggleClass(event.target);
            updateItensLeft(body,footer);
        }
    }   
});

head.querySelector('#dark-light-mode').addEventListener('click', function(event){
    event.stopPropagation();
    toggleClass(event.target, 'bi-moon' );
    toggleClass(event.target, 'bi-brightness-high');
    toggleClass(document.body, 'body--dark');
    toggleClass(document.body,'body--light');
    toggleClass(footer, 'content-footer--dark');
    toggleClass(footer, 'content-footer--light');
    let input = head.querySelector('.content-head-input-element');
    toggleClass(input, 'content-head-input-element--light');
    toggleClass(input, 'content-head-input-element--dark');
    toggleClass(body,'content-body--light');
    toggleClass(body,  'content-body--dark');    
});
