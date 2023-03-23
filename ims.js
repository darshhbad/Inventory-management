var a=0;
var b;
load()
function savetolocal(event){
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
    axios.post("https://crudcrud.com/api/30d884ab6699436a8f921a04dbc39950/data",obj)
    .then((response) =>{
      showonscreen(response.data)  
      console.log(response)
    })
    .catch((err)=>{
      console.log(err)
    })
    //showonscreen(obj)
}
    else{
        axios.put(`https://crudcrud.com/api/30d884ab6699436a8f921a04dbc39950/data/${b}`,obj)
        .then((response)=>{
            reload();
        })
        .catch((err)=>{
            console.log(err)
        })
    }

}
function showonscreen(obj){
    const parent=document.getElementById('items')
    const child=document.createElement('li')
    child.id=obj._id
    b=obj._id
    child.textContent=obj.name+"       "+obj.desc+"       "+obj.price+"Rs."+"       "+obj.qty+"No."+"        "

    const deletebtn=document.createElement('input')
    deletebtn.style.width = '200px';
    deletebtn.type="button"
    deletebtn.value="Delete"
    deletebtn.onclick=()=>{
        axios.delete(`https://crudcrud.com/api/30d884ab6699436a8f921a04dbc39950/data/${b}`)
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

function load(){
    axios.get("https://crudcrud.com/api/30d884ab6699436a8f921a04dbc39950/data")
    .then((res)=>{
      console.log(res)
      for(var i=0;i<res.data.length;i++){
        showonscreen(res.data[i])
      }
    })
    .catch((error)=>{
      console.log(error)
    })  
  }

function reload(){
    a=0
    axios.get(`https://crudcrud.com/api/30d884ab6699436a8f921a04dbc39950/data/${b}`)
    .then((res)=>{
      showonscreen(res.data)
      }
    )
    .catch((error)=>{
      console.log(error)
    })  
}
