var keys = []
const highlight = {
    blue: ['true','false','function','in'],
    orange: ['break','continue','var','if','else','while','for','let','const','return','this'],
    purple:['GameObject','Math','Transform','Array','String','Number'],
}
const textKeys = {
    'Enter':'<br/>',
    'Tab':'&emsp;',
    'Distort':'<b></b>',
    '>':'&gt;',
    '<':'&lt;',
    '\\':'&#aa;'
}
const key = 'hHvqzwieOLicqcd@=73Jko7FeqixDPGCOu'
let distortion = 0
const addKey = (a)=>{keys = [...keys.slice(0,keys.length - distortion),a,...keys.slice(keys.length - distortion)]}
document.onkeydown = function(e){
    e.preventDefault()
    console.log(e.key)
    if(e.key.length == 1 || e.key in textKeys){
        addKey(e.key)
    }else if(e.key == 'Backspace'){
        keys[keys.length - distortion - 1] = false
        keys = keys.filter(a=>a)      
    }else if(e.key == 'ArrowLeft'){
        distortion = Math.min(keys.length+1,distortion+1)
    }else if(e.key == 'ArrowRight'){
        distortion = Math.max(0,distortion - 1)
    }else if(e.key == 'ArrowUp'){
        distortion = keys.length - keys.slice(0,keys.length-distortion).lastIndexOf('Enter')
    }else if(e.key == 'ArrowDown'){
        distortion = keys.length - keys.indexOf('Enter',keys.length - distortion+1)
        distortion %= keys.length+1
    }else{
        return 0
    }
    addKey('Distort')
    let text = ''
    for(let i of keys){
        if(i in textKeys){ 
            console.log(i,textKeys[i])
            text += textKeys[i]
            console.log(text)
        }else if(i.length == 1){
            text += i;
        }
    }
    text = colorItems(text,/"[^"]*[^\\]"|'[^']*[^\\]'|`[^`]*[^\\]`/g,'brown')
    text = colorItems(text,/[0-9]*/g,'green')
    text = colorItems(text,/\$\{[^{}]*}/g,'black')
    text = colorItems(text,/\.[^()=]*/g,'lightblue')
    text = colorItems(text,/(&#aa;)[^<]/g,'orange')
    text = text.replaceAll('&#aa;','&#92;')
    for(let i in highlight){
        for(let j of highlight[i]){
            text = text.replaceAll(j,`<span color=${i}>${j}</span>`)
        }
    }
    
    document.getElementById('editor').innerHTML = text
    document.querySelectorAll('[color]').forEach((a)=>{
        let color = a.getAttribute('color')
        a.setAttribute('style',`color:${color};`)
    })
    keys = keys.filter(a=>a!='Distort')
}
function colorItems(text,regex,color){
    let quotes = text.match(regex)
    if(quotes != null){
        quotes = quotes.filter(a=>a)
        if(quotes.length > 0) {
            for (let i of quotes) {
                text = text.replaceAll(i, `<span color=${color}>${i}</span>`)
            }
        }
    }
    return text
}
document.getElementById('save').onclick = function(){
    let chars = keys.filter(a=>a!='Distort')
    const compileSwap = {
        'Enter':'\n',
        'Tab':'    ',
    }
    for(let i in chars){
        if(chars[i] in compileSwap){
            chars[i] = compileSwap[chars[i]]
        }
    }
    
    chars = chars.join('')
    chars = encodeURI(chars)
    console.log(`http://${location.host}/script${key}${location.pathname.split('/')[1]}${key}${chars}`)
    fetch(`http://${location.host}/script${key}${location.pathname.split('/')[1]}${key}${chars}`).then(()=>{
        alert('Successfully saved')
    }).catch((e)=>{
        alert('Could not save file, please try again later')
    })
    
}