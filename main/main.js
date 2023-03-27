let pos = [0,0]
const key = 'hHvqzwieOLicqcd@=73Jko7FeqixDPGCOu'
fetch(`http://${location.host}/img${key}https://c8.alamy.com/comp/MXEPJF/letter-a-with-red-roses-on-white-background-MXEPJF.jpg`).then(response=>response.text()).then(data=>{
    let game = new GameObject(
        ['a','b'],
        new Transform([10,10],5,[1,1]),
        data
    )
    console.log(game)
}).catch(e=>{
    alert('Can not add object')
})