var a=0;
var b;

async function savetolocal(event){
    try{
    event.preventDefault();
    const name=event.target.name.value;
    const desc=event.target.desc.value;
    const price=event.target.price.value;
    const qty=event.target.qty.value;
    const obj={
        name:name,
        desc:desc,
        price:price,
        qty:qty
    }
    if (a==0){
    let post = await axios.post("https://crudcrud.com/api/ec57674a88f74eb2906e0241fadb2278/data",obj)
      showonscreen(post.data)  
      console.log(post)
    }
    //showonscreen(obj)

    else{
        let put = await axios.put(`https://crudcrud.com/api/ec57674a88f74eb2906e0241fadb2278/data/${b}`,obj)
        showupdated();
    }
    }
    catch(err){
        console.log(err)
    }

}
function showonscreen(obj){
    const parent=document.getElementById('items')
    const child=document.createElement('li')
    child.id=obj._id
    child.textContent=obj.name+"       "+obj.desc+"       "+obj.price+"Rs."+"       "+obj.qty+"No."+"        "
    const deletebtn=document.createElement('input')
    deletebtn.style.width = '200px';
    deletebtn.type="button"
    deletebtn.value="Delete"
    deletebtn.onclick=()=>{
        b=obj._id
      axios.delete(`https://crudcrud.com/api/ec57674a88f74eb2906e0241fadb2278/data/${b}`)
        .catch((err)=>{
            console.log(err)
        })
        parent.removeChild(child)
    }

    const buy=document.createElement('input')
    buy.style.width = '200px';
    buy.type="button"
    buy.value="Buy"
    buy.onclick=()=>{
        b=obj._id
        a=1
        document.getElementById("name").value=obj.name
        document.getElementById("desc").value=obj.desc
        document.getElementById("price").value=obj.price
        document.getElementById("qty").value=obj.qty
        parent.removeChild(child)
        
    }

    child.appendChild(buy)
    child.appendChild(deletebtn)
    parent.appendChild(child)
}

window.addEventListener("DOMContentLoaded",async ()=>{
    try{
    let res = await axios.get("https://crudcrud.com/api/ec57674a88f74eb2906e0241fadb2278/data")
      console.log(res)
      for(var i=0;i<res.data.length;i++){
        showonscreen(res.data[i])
    }
}
    catch(err){
        console.log(err)
      }

})

function showupdated(){
    try{
    a=0
    axios.get(`https://crudcrud.com/api/ec57674a88f74eb2906e0241fadb2278/data/${b}`)
      b=null;
      showonscreen(res.data)
      }
      catch(err){
        console.log(err)
      }
}
