const applyTransition = (e)=>{
    e.style.transition = 'all 0.5s';
}
const changePosition = (e,value)=>{
    e.style.position = value;
}
const changeOpacity = (o,value)=>{
    o.style.opacity = `${value}`
}
const addTextOrderAcs = (e,prop,call)=>{
    var speedOfAnimi = prop.speed;
    var text = e.textContent;
    e.textContent = '‎';
    var textArray = Array.from(text);
    var index = 0;
    var loop = setInterval(()=>{
        if(index >= textArray.length){ 
            clearInterval(loop);
            call(true);
        };
        e.textContent += (textArray[index] ? textArray[index] : '') 
        index++;
    },speedOfAnimi);
}
const changeToBigWrite = (e,callback,withMode) => {
    var text = e.textContent;
    e.textContent = '‎';
    var textArray = Array.from(text);
    var index = 0;
    
    var loop = setInterval(() => {
        if (index >= textArray.length) {
            clearInterval(loop);
            callback(true);
            return;
        }

        // Create a new span element
        var span = document.createElement('span');
        span.className = 'animi-define-class-js';
        span.textContent = (textArray[index] ? textArray[index] : '');
        if(withMode){
            e.textContent += (textArray[index] ? textArray[index] : '');
        }
        // Append the span to the body
        document.body.appendChild(span);
        
        // Remove the span after 1 second
        setTimeout(() => {
            if (span.parentNode) {
                span.parentNode.removeChild(span);
            }
        }, 1000);
        
        index++;
    }, 1000);
};

function Observe(e,th,callback){
    var element = document.querySelector(e);
    const o = new IntersectionObserver(((en,cs)=>{
        en.forEach(enti=>{
            callback(enti.isIntersecting,element);
        })
    }),{
        root:null,
        rootMargin:'0px',
        threshold:th ?? 0.5,
    });
    o.observe(element)
}

function Writing(element,text,prop,callBack){
    var dom = document.querySelectorAll(element);
    dom.forEach(AnimiElement =>{
        AnimiElement.textContent = text ?? AnimiElement.textContent;
        addTextOrderAcs(AnimiElement,prop,(res)=>{
            callBack(res);
        })
    })
}

function TextDim(element,withMode,callback){
    var dom = document.querySelectorAll(element);
    dom.forEach(AnimiElement=>{
        changeToBigWrite(AnimiElement,(res)=>{
            callback(res);
        },withMode);
    })
}

function slideShow(e,data){

    let dom = document.querySelector(e);

    let index = 0;
    let animiFlag = true;
    let flag = true;

    if(data.item && data.item == true){
        for(let n = 0; n < data.list.item.length; n++){
            var itemDom = document.querySelector(data.list.item[n]);
            itemDom.setAttribute('img-index',n);
            itemDom.classList.add('img-item-dot');
        }
    }

    const removeDot=()=>{
        if(data.item && data.item == true){
            for(let n = 0; n < data.list.item.length; n++){
                var itemDom = document.querySelector(data.list.item[n]);
                itemDom.classList.remove(data.list.style);
            }
        }
    }
    if(data.item && data.item == true){
        var click = document.querySelectorAll('.img-item-dot');
        click.forEach(citem=>{
            citem.addEventListener('click',()=>{
                var goto = (citem.getAttribute('img-index'));
                animiFlag = false;
                removeAnimations();
                removeDot();
                index = goto;
                changeDotAndImage();
            })
        });
    }

    const changeDotAndImage = ()=>{
        if(data.item && data.item == true){            
            var Dot = document.querySelector(data.list.item[index]);
            Dot.classList.add(data.list.style);
        }
        
        dom.src = data.imgs[index];
        if(dom.classList.contains(data.class ?? 'animi-fade-in')){
        }else{
            if(animiFlag){
                dom.classList.add(data.class ?? 'animi-fade-in');
            }
        }
    }

    const removeAnimations = ()=>{
        setTimeout(() => {
            if(dom.classList.contains(data.class ?? 'animi-fade-in')){
                dom.classList.remove(data.class ?? 'animi-fade-in')
            };
        }, data.remove ?? 2000);
    }

    setInterval(() => {

        if(index >= data.imgs.length){
            index = 0;
        }
        if(flag == true){
            index++;
        }
    
        removeDot();
        changeDotAndImage();
        removeAnimations();
        animiFlag = true;
        flag = false;
        index++;

    }, data.speed ?? 3000);
}

