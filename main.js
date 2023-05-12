let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discound = document.getElementById("discound");
let total = document.getElementById("total");
let count = document.getElementById("count");
let categry = document.getElementById("categry");
let submit = document.getElementById("submit");
let mood = 'creat'
let tmp
// get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
        - +discound.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040"
    }else{
        total.innerHTML = ""
        total.style.backgroundColor = "#a00d02"
    }
}

let datapro = [] ;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
     product=[];
}

submit.onclick = function(){
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discound:discound.value,
        total:title.innerHTML,
        count:count.value,
        categry:categry.value,
    }
    if(mood === 'creat'){
        if(newpro.count > 1){
            for(let i = 0; i < newpro.count; i++){
                datapro.push(newpro)
            }
        }else{
            datapro.push(newpro);
        }
    }else{
        datapro[tmp]= newpro;
        mood = 'creat'
        submit.innerHTML = "creat"
        count.style.display = "block"
    }
    localStorage.setItem('product', JSON.stringify(datapro) )
    console.log(datapro)
    cleardata()
    showdata()
}

//clear data
function cleardata(){
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discound.value = ""
    total.innerHTML = ""
    count.value = ""
    categry.value = ""
}

// readd

function showdata(){
    getTotal()
    let table = ""
    for(let i = 0; i < datapro.length; i++){
        table += `
        <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discound}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].categry}</td>
          <td><button onclick="updatedata(${i})" id="update">update</button><td>
          <td><button onclick="deletedata(${i})" id="delete">delete</button><td>
         </tr>
        `
        document.getElementById("tbody").innerHTML = table;
        let btndelete = document.getElementById("deleteall");
        if(datapro.length > 0){
            btndelete.innerHTML = `
            <button onclick="deleteall(${i})">delete all ${datapro.length}</button>
            `
        }else{
            btndelete.innerHTML = ""
        }
    }
}
showdata()

// delete 
function deletedata(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showdata()
}

function deleteall(i){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}

// updata

function updatedata(i){
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discound.value = datapro[i].discound
    categry.value = datapro[i].categry
    getTotal()
    count.style.display = "none"
    submit.innerHTML = "update"
    mood = 'update'
    tmp = i
    scroll({
        top:0
})
}

//search 
let searchmood = 'title';

function getsearchmood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchmood = 'title';
        search.Placeholder = "search by title"
    }else{
        searchmood = 'category';
        search.Placeholder = "search by category";
    }
search.focus()
}

function searchdata(value){
    let table = '';
    if(searchmood == 'title'){
         for(let i = 0; i< datapro.length; i++){
            if(datapro[i].title.includes(value)){
                table += `
        <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discound}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].categry}</td>
          <td><button onclick="updatedata(${i})" id="update">update</button><td>
          <td><button onclick="deletedata(${i})" id="delete">delete</button><td>
         </tr>
        `
            }
         }
    }else{
        for(let i = 0; i< datapro.length; i++){
            if(datapro[i].categry.includes(value)){
                table += `
        <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discound}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].categry}</td>
          <td><button onclick="updatedata(${i})" id="update">update</button><td>
          <td><button onclick="deletedata(${i})" id="delete">delete</button><td>
         </tr>
        `
            }
         }
    }
    document.getElementById("tbody").innerHTML = table;
}