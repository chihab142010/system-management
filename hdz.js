let selectedindices = []
let showExcelBtns = false
let ddate = new Date()

const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1; // Added 1 because January is 0
const day = now.getDate();


const addbtn = document.getElementById("addbtn")
const overlay = document.getElementById("modaloverlay")
const closebtn = document.getElementById("closebtn")

const designation = document.getElementById("designation")
const reference = document.getElementById("reference")
const marque = document.getElementById("marque")
const price1 = document.getElementById("price1")
const price2 = document.getElementById("price2")
const qte = document.getElementById("qte")
const adding = document.getElementById("adding")


const card1 = document.querySelector(".card1")
const card2 = document.querySelector(".card2")
const card3 = document.querySelector(".card3")
const card4 = document.querySelector(".card4")

const search = document.getElementById("search")


let ttprix =0;
let tts = 0
let tpuv = 0
let moode = 'create'
let tmp;
let dataPro;
if(localStorage.productts != null){
    dataPro = JSON.parse(localStorage.productts);

}else{
    dataPro = [];
}

card()

addbtn.addEventListener('click',()=>{
    overlay.classList.add('active')
})

closebtn.addEventListener('click',()=>{
    overlay.classList.remove('active')
    moode = 'create'
})
adding.addEventListener('click',()=>{


    let newpro ={
        designation : designation.value ,
        reference : reference.value,
        marque : marque.value,
        price1 : price1.value,
        price2 : price2.value,
        qte : qte.value,

        totalprixa : Number(price1.value) * Number(qte.value),
        montant : Number(price2.value) * Number(qte.value),

        winpuv : Number(price2.value) - Number(price1.value),
        win :(Number(price2.value) * Number(qte.value)) - (Number(price1.value) * Number(qte.value))


        
    }
    if(moode === 'create'){
dataPro.push(newpro)
    }
    else if (moode ==='update') {
        dataPro[tmp] = newpro
        moode = 'create'
        

    }

    
    localStorage.setItem('productts', JSON.stringify(dataPro))
    
    cleardata()
    showdata()
    overlay.classList.remove('active')
    card()
    
})

function cleardata (){
    designation.value = ''
    reference.value= ''
    marque.value = ''
    price1.value = ''
    price2.value = ''
    qte.value = ''

}
//let showExcelBtns = false;
function showdata (){
    let table = ''
    for(let i = 0; i<dataPro.length;i++){
        table += `
          <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].reference}</td>
                        <td>${dataPro[i].designation}</td>
                        <td>${dataPro[i].marque}</td>
                        <td>${dataPro[i].price1}</td>
                        <td>${dataPro[i].qte}</td>
                        <td>${dataPro[i].price2}</td>
                        <td>${dataPro[i].totalprixa}</td>
                        <td>${dataPro[i].montant}</td>
                        <td>${dataPro[i].winpuv}</td>
                        <td>${dataPro[i].win}</td>
                        <td><button id="updatebtn" onclick="updatdata(${i})">update</button></td>
                        <td><button class="deletebtn" onclick="deleteitem(${i})">delete</button></td>
                    <td><button class="excelbtn ${showExcelBtns ? 'nothide' : 'hide'} ${selectedindices.includes(i) ? 'greenbtn' : ''}" onclick="markgreen(this,${i})" type="button">Add</button></td>
            </tr>
                    </tr>
        
        
        `
        ttprix += Number(dataPro[i].totalprixa)
        tts += Number(dataPro[i].montant)
        tpuv += Number(dataPro[i].win)

    }
    document.getElementById('tbody').innerHTML = table
    card()
}
showdata()

function deleteitem(i){
    dataPro.splice(i,1)
    localStorage.setItem('productts',JSON.stringify(dataPro))
    
    showdata()

    

    window.location.reload()
    card()

}

function updatdata (i){
    designation.value = dataPro[i].designation
    reference.value = dataPro[i].reference
    marque.value = dataPro[i].marque
    price1.value = dataPro[i].price1
    price2.value = dataPro[i].price2
    qte.value = dataPro[i].qte


    adding.innerHTML = "Update"
    moode = 'update'
    tmp = i;
    overlay.classList.add('active')



    scroll({
        top : 0,
        behavior : "smooth"
    })

    tmp = i
card()
}

function card (){
    card1.innerHTML = `
    <h3>Total Product</h3>
    <p>${dataPro.length}</p>
    `
    card2.innerHTML = `
    <h3>Total Prix</h3>
    <p>${ttprix}</p>
    `
    card3.innerHTML = `
    <h3>Total Prix Selling</h3>
    <p>${tts}</p>
    
    `
    card4.innerHTML = `
    <h3>Total win</h3>
    <p>${tpuv}</p>
    `
    
}
card()

//let selectedindices = []
function markgreen(btn,index) {
    btn.classList.toggle('greenbtn'); 

    if(selectedindices.includes(index)){
        selectedindices = selectedindices.filter(i => i !=index)
    }else{
        selectedindices.push(index)
    }
}


function select(){

    showExcelBtns = !showExcelBtns;
    selectedindices = []
    
   
    let selectBtn = document.getElementById('selectbtn');
    let downloadBtn = document.getElementById('downloadExcelBtn');
    if(selectBtn) {
        selectBtn.innerHTML = showExcelBtns ? "Cancel" : "Select Product";
    }

    if(downloadBtn) {
        if(showExcelBtns) {
            downloadBtn.classList.remove('hide');
        } else {
            downloadBtn.classList.add('hide');
        }
    }

    showdata();
}






















let searchmood = 'searchbyd'
function getsearchmood(id) {
    if(id === 'designationbtn'){
        searchmood = 'searchbyd'
        search.placeholder ='search by Designation'
        

    }else if(id === 'marquebtn'){
        searchmood = 'searchbym'
        search.placeholder ='search by Marque'
    }else{
        searchmood = 'searchbyr'
        search.placeholder = 'search by Reference'
    }
    search.focus()
    search.value = ''
    showdata()

}








function searchdata (value){
    let table = ''
    if(searchmood === 'searchbyd'){
        for(let i = 0; i<dataPro.length;i++){
            if(dataPro[i].designation.includes(value)){
                table += `
          <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].reference}</td>
                        <td>${dataPro[i].designation}</td>
                        <td>${dataPro[i].marque}</td>
                        <td>${dataPro[i].price1}</td>
                        <td>${dataPro[i].qte}</td>
                        <td>${dataPro[i].price2}</td>
                        <td>${dataPro[i].totalprixa}</td>
                        <td>${dataPro[i].montant}</td>
                        <td>${dataPro[i].winpuv}</td>
                        <td>${dataPro[i].win}</td>
                        <td><button id="updatebtn" onclick="updatdata(${i})">update</button></td>
                        <td><button class="deletebtn" onclick="deleteitem(${i})">delete</button></td>
                    <td><button class="excelbtn ${showExcelBtns ? 'nothide' : 'hide'} ${selectedindices.includes(i) ? 'greenbtn' : ''}" onclick="markgreen(this,${i})" type="button">Add</button></td>

            </tr>
                    </tr>
        
        
        `
            }
        }
    }
    else if (searchmood ==='searchbym'){
        for(let i = 0;i<dataPro.length;i++){
            if(dataPro[i].marque.includes(value)){
                table += `
          <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].reference}</td>
                        <td>${dataPro[i].designation}</td>
                        <td>${dataPro[i].marque}</td>
                        <td>${dataPro[i].price1}</td>
                        <td>${dataPro[i].qte}</td>
                        <td>${dataPro[i].price2}</td>
                        <td>${dataPro[i].totalprixa}</td>
                        <td>${dataPro[i].montant}</td>
                        <td>${dataPro[i].winpuv}</td>
                        <td>${dataPro[i].win}</td>
                        <td><button id="updatebtn" onclick="updatdata(${i})">update</button></td>
                        <td><button class="deletebtn" onclick="deleteitem(${i})">delete</button></td>
                    <td><button class="excelbtn ${showExcelBtns ? 'nothide' : 'hide'}" onclick="markgreen(this)" type="button">Add</button></td>
            </tr>
                    </tr>
        
        
        `
            }
        }
    }
    else{
        for(let i = 0;i<dataPro.length;i++){
            if(dataPro[i].reference.includes(value)){
                table += `
          <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].reference}</td>
                        <td>${dataPro[i].designation}</td>
                        <td>${dataPro[i].marque}</td>
                        <td>${dataPro[i].price1}</td>
                        <td>${dataPro[i].qte}</td>
                        <td>${dataPro[i].price2}</td>
                        <td>${dataPro[i].totalprixa}</td>
                        <td>${dataPro[i].montant}</td>
                        <td>${dataPro[i].winpuv}</td>
                        <td>${dataPro[i].win}</td>
                        <td><button id="updatebtn" onclick="updatdata(${i})">update</button></td>
                        <td><button class="deletebtn" onclick="deleteitem(${i})">delete</button></td>
                    <td><button class="excelbtn ${showExcelBtns ? 'nothide' : 'hide'} ${selectedindices.includes(i) ? 'greenbtn' : ''}" onclick="markgreen(this,${i})" type="button">Add</button></td>

            </tr>
                    </tr>
        
        
        `
            }
        }
    }
document.getElementById('tbody').innerHTML = table
}

async function exportToExcel() {
    if (selectedindices.length === 0) {
        alert("choose a product");
        return;
    }


    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Feuil1');

    
    worksheet.columns = [
        { key: 'col', width: 8 },
        { key: 'ref', width: 18 },
        { key: 'des', width: 45 },
        { key: 'mar', width: 18 },
        { key: 'prix', width: 15 }
    ];

   
    worksheet.getCell('A7').value = 'TEL:0771151030';
    worksheet.getCell('A7').font = { name: 'Arial', size: 11, bold: true };

   
    const headerRow = worksheet.getRow(8);
    headerRow.values = ['Colon...', 'Référence', 'Désignation', 'Marque', 'Prix,u'];
    
  
    headerRow.eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF00' } 
        };
        cell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FF0000' } }; // أحمر
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

 
    selectedindices.forEach((index, i) => {
        const item = dataPro[index];
        const row = worksheet.addRow([
            i + 1,
            item.reference,
            item.designation,
            item.marque,
            Number(item.price2).toLocaleString('fr-FR') + ',00' 
        ]);

        
        const isEven = i % 2 === 0;
        const bgColor = isEven ? 'E0E0E0' : 'FFFFFF';

        row.eachCell((cell, colNumber) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: bgColor }
            };
            cell.font = { name: 'Arial', size: 10, bold: colNumber <= 2 }; 
            cell.border = {
                top: { style: 'thin', color: { argb: 'D3D3D3' } },
                left: { style: 'thin', color: { argb: 'D3D3D3' } },
                bottom: { style: 'thin', color: { argb: 'D3D3D3' } },
                right: { style: 'thin', color: { argb: 'D3D3D3' } }
            };
        });
    });


    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `ARIVAGE ${year}-${month}-${day}.xlsx`);
}