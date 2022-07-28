let tittle =document.getElementById('tittle');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let count =document.getElementById('count');
let total =document.getElementById('total');
let category =document.getElementById('category');
let create =document.getElementById('create');
let search =document.getElementById('search');
let searchTitle =document.getElementById('searchTitle');
let searchCategory =document.getElementById('searchCategory');
let tableBody =document.getElementById('tableBody'); 
let deleteAll=document.getElementById('deleteAll');
let mood='Create';
let temp;
// get total
function getTotal()
{
    if(price.value !=='')
    {
        let result=(+price.value + +ads.value + +taxes.value)-
        +discount.value;
        total.innerHTML=result;
        total.style.background='#198754';
    }
    else{
        total.style.background='#dc3545';
        total.innerHTM ===''
    }
}
//create product 
let dataProduct;
if(localStorage.productJson!=null)
{
    dataProduct=JSON.parse(localStorage.productJson);
}else
{
    dataProduct=[];
}
create.onclick=function()
{
    let products={
        tittle: tittle.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase() 
    }
    //count of products and clean to  data inputs
    if(tittle.value != '' && price.value != '' && category.value !='')
    {
        if(mood==='Create' && count.value>1)
        {                

            for(let i=0;i<count.value;i++)
            {
                dataProduct.push(products)
            }

        }
             else
             {
                dataProduct.push(products)
                dataProduct[temp]=products;
                create.innerHTML='Create';
                mood='Create';
                create.style.background='#198754'
                count.style.display='flex';
            }
           clearData()
    }
    //save localstorage
    localStorage.setItem('productJson', JSON.stringify(dataProduct) );  
    readProduct()
}
//clear inputs
function clearData()
{
    tittle.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value='' 
}
//read
function readProduct()
{
    let rowData='';
    for(var i=0; i<dataProduct.length;i++)
    {
        rowData+=
        `<tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].tittle}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick='updateProduct(${i})'  class='btn btn-warning btnRow'>Update</button></td>
        <td><button onclick='deleteProduct(${i})' class='btn btn-danger btnRow'>Delete</button></td>
        </tr>`
    }
    tableBody.innerHTML=rowData;
    if(dataProduct.length>0)
    {
        deleteAll.innerHTML=`<button onclick="deletAll()" class="btn btn-danger w-100"> Delete All (${dataProduct.length}) </button>`;
        deleteAll.style.display='flex'
    }
    else
    {
        deleteAll.style.display='none';

    }
    total.style.background='#dc3545';

}
readProduct()
//delete
function deleteProduct(i)
{
    dataProduct.splice(i,1);
    localStorage.productJson=JSON.stringify(dataProduct);
    readProduct()
}
function deletAll() 
{
    localStorage.clear();
    dataProduct.splice(0);
    readProduct();
}
//update
function updateProduct(i)
{
    tittle.value=dataProduct[i].tittle;
    price.value=dataProduct[i].price;
    taxes.value=dataProduct[i].taxes;
    ads.value=dataProduct[i].ads;
    discount.value=dataProduct[i].discount;
    category.value=dataProduct[i]. category;
    getTotal()
    count.style.display='none';
    create.innerHTML='Update',
    create.style.background='#ffc107'
    mood='Update';
    temp=i;
    scroll({
        top:0,
        behavior:'smooth'
    });

}
//search
let searchMode ='title';
function getSearchMood(id)
{
    if(id=='searchTitle')
    {
        searchMode ='title';
    }
    else
    {
        searchMode ='category';
    }
    search.focus()
    search.value='';
    readProduct();
}
function searchDate(value)
{
    let rowData=''
    for(let i=0; i<dataProduct.length;i++) {
        if(searchMode==='title')
         {
            if(dataProduct[i].tittle.includes(value.toLowerCase())) {
                rowData+=
                `<tr>
                <td>${i}</td>
                <td>${dataProduct[i].tittle}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick='updateProduct(${i})'  class='btn btn-warning btnRow'>Update</button></td>
                <td><button onclick='deleteProduct(${i})' class='btn btn-danger btnRow'>Delete</button></td>
                </tr>`}}
         else{
             if(dataProduct[i].category.includes(value.toLowerCase())) {
                rowData+=
                    `<tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].tittle}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick='updateProduct(${i})'  class='btn btn-warning btnRow'>Update</button></td>
                    <td><button onclick='deleteProduct(${i})' class='btn btn-danger btnRow'>Delete</button></td>
                    </tr>`}}}
   tableBody.innerHTML=rowData;
}     