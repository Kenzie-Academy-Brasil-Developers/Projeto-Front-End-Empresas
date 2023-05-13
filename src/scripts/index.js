export const baseUrl = "http://localhost:3333"

// ----------------------------------------------------------requests>

export const getAllCompanies = async () => {
    const allCompanies = await fetch (`http://localhost:3333/companies/readAll`, {
        method: "GET"
    })
    .then(response=>{
        if(response.ok) {
            return response.json()
        }else {
            throw new Error('Not Found');
        }
    })
    return allCompanies;
}

const getCategories = async ()=>{
    const categories = await fetch(`http://localhost:3333/categories/readAll`, {
        method: "GET"
    })
    .then(response=>{
        if(response.ok){
            return response.json()
        } else {
            throw new Error('Not Found');
        }
    })
    return categories;
}
const companiesBC=async(name)=>{
    const allCompanies = await fetch (`http://localhost:3333/companies/readByCategory/${name}`, {
        method: "GET"
    })
    .then(response=>{
        if(response.ok) {
            return response.json()
        }else {
            throw new Error('Not Found');
        }
    })
    return allCompanies;
}
// --------------------------------------------------------<requests

async function select() {
    const categories = await getCategories()
    const companies = await getAllCompanies()
    const select = document.querySelector('select')
console.log(companies)
    categories.forEach(i=>{
        const option = document.createElement('option')

        option.value=i.id;
        option.innerText=i.name;
        select.appendChild(option)
    })

    select.addEventListener('change',async (option)=>{
        if(select.value=='todos'){
            renderCompanies()
        } else {
            const comps= companies.filter((company)=>company.category_id==select.value)
            console.log(comps)
            renderFilter(comps)  
                
        }
        
    })
}

async function renderFilter(array) {
    const categories = await getCategories()
    const container = document.querySelector('ul')
    container.innerHTML = '';

    array.forEach(element => {
        const li = document.createElement('li');

        const h2 = document.createElement('h2');
            h2.innerHTML = element.name;

        const elCatId=document.createElement('p');
            elCatId.className = element.category_id;
            
        let elCat = document.createElement('p');
            elCat = categories.find (i=> i.id == elCatId.className)
            elCat.className = 'hideCategory';

        const cat = document.createElement('h3');
        cat.innerHTML = elCat.name;
         
        container.append(li);
        li.append(h2, cat);
    });
}


async function renderCompanies() {
    const companies = await getAllCompanies()
    const categories = await getCategories()
    const container = document.querySelector('ul')
    const select = document.querySelector('select')

   

    container.innerHTML = '';

    companies.forEach(element => {
        const li = document.createElement('li');

        const h2 = document.createElement('h2');
            h2.innerHTML = element.name;

        const elCatId=document.createElement('p');
            elCatId.className = element.category_id;
            
        let elCat = document.createElement('p');
            elCat = categories.find (i=> i.id == elCatId.className)
            elCat.className = 'hideCategory';

        const cat = document.createElement('h3');
        cat.innerHTML = elCat.name;
         
        container.append(li);
        li.append(h2, cat);
    });
}

const handleButtons=()=>{
    const loginBtn = document.querySelector('.button1');
    const registerBtn = document.querySelector('.registerBtn');
    
    loginBtn.addEventListener('click', (click)=>{
        location.replace('./src/pages/login.html');
    })
    registerBtn.addEventListener('click', (click)=>{
        location.replace('./src/pages/register.html');
    })
}

handleButtons()
select()
renderCompanies()