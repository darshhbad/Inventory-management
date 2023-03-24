var a=0;
var b;

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
    axios.post("https://crudcrud.com/api/7b98a65954d345d3a6eb348ba43b8b9e/data",obj)
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
        axios.put(`https://crudcrud.com/api/7b98a65954d345d3a6eb348ba43b8b9e/data/${b}`,obj)
        .then((response)=>{
            showupdated();
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
    child.textContent=obj.name+"       "+obj.desc+"       "+obj.price+"Rs."+"       "+obj.qty+"No."+"        "
    const deletebtn=document.createElement('input')
    deletebtn.style.width = '200px';
    deletebtn.type="button"
    deletebtn.value="Delete"
    deletebtn.onclick=()=>{
        axios.delete(`https://crudcrud.com/api/7b98a65954d345d3a6eb348ba43b8b9e/data/${b}`)
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

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/7b98a65954d345d3a6eb348ba43b8b9e/data")
    .then((res)=>{
      console.log(res)
      for(var i=0;i<res.data.length;i++){
        showonscreen(res.data[i])
      }
    })
    .catch((error)=>{
      console.log(error)
    })  
  })

function showupdated(){
    a=0
    axios.get(`https://crudcrud.com/api/7b98a65954d345d3a6eb348ba43b8b9e/data/${b}`)
    .then((res)=>{
      b=null;
      showonscreen(res.data)
      }
    )
    .catch((error)=>{
      console.log(error)
    })  
}
