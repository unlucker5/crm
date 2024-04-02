// const { json } = require("stream/consumers")
// API


const getClients = async () => {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'GET'
    });

    const result = await response.json();
    return result;
}

const createClient = async (clientObj) => {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify(clientObj)
    });

    const result = await response.json();

} 

const changeClient= async (id, clientObj) => {
    await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(clientObj)
    });

}

const deleteClient= async (id) => {
        await fetch(`http://localhost:3000/api/clients/${id}`, {
            method: 'DELETE',
        });
   
}


const $addBtn = document.getElementById('clients__btn-add'),
 $modalAdd = document.getElementById('modal-add'),
 $modalAddClose = document.getElementById('modal-add-close'),
 $modalAddBack = document.getElementById('form-add-btn-delete'),
 $modalChangeForm = document.getElementById('modal-form'),
 $modalAddForm = document.getElementById('modal-add-form'),
 $addError = document.getElementById('modal-add-error'),
 $addSurname = document.getElementById('form-add-surname'),
 $addName = document.getElementById('form-add-name'),
 $addLastname = document.getElementById('form-add-lastname'),
 $addClinetWrapper = document.getElementById('form-add-contacts-wrapper'),
 $formClientWrapper = document.getElementById('form-contacts-wrapper'),
 $formAddContactsAdd = document.getElementById('form-add-contacts-add'),
 $formContactsAdd = document.getElementById('form-contacts-add'),
 $changeModal = document.getElementById('modal-change'),
$changeBtnClose = document.getElementById('modal-close'),
$changeBtnDelete = document.getElementById('form-btn-delete'),
$changeID = document.getElementById('modal-id-number'),
$changeInputName = document.getElementById('form-name'),
$changeInputSurname = document.getElementById('form-surname'),
$changeInputLastname = document.getElementById('form-lastname'),
$changeContactAdd = document.getElementById('form-contacts-add'),
$changeBtnSave = document.getElementById('form-btn-save'),
$changeErrorWrapper = document.getElementById('form-error-wrapper'),
$addErrorWrapper = document.getElementById('add-error-wrapper')





let idArray = []
// let clients =[new Client ('Алексей', 'Иванов', 'Ильич', )]

function newClientTR(client) {
    const $clientTR = document.createElement('tr'),
        $idTD = document.createElement('td'),
        $fioTD = document.createElement('td'),
        $creationDateTD = document.createElement('td'),
        $creationDate =document.createElement('span'),
        $creationTime = document.createElement('span'),
        $changeDateTD = document.createElement('td'),
        $changeDate =document.createElement('span'),
        $changeTime = document.createElement('span'),
        $contactsTD = document.createElement('td'),
        $buttonsTD = document.createElement('td'),
        $changeBtn = document.createElement('button'),
        $deleteBtn = document.createElement('button')
        
        
        
        
            

        
    $idTD.textContent =  client.id.substr(7, 14)
    $fioTD.textContent = client.surname + ' ' + client.name + ' ' + client.lastName
    $creationDate.textContent = new Date(client.createdAt).toLocaleString().split(',')[0] 
    $creationTime.textContent = new Date(client.createdAt).toLocaleString().split(',')[1].substring(0,6)
    $changeDate.textContent = new Date(client.updatedAt).toLocaleString().split(',')[0] 
    $changeTime.textContent = new Date(client.updatedAt).toLocaleString().split(',')[1].substring(0,6)
    // $contactsTD.textContent = JSON.stringify(client.contacts) 
    $changeBtn.textContent = 'Изменить'
    $deleteBtn.textContent = 'Удалить'

    $clientTR.id = $idTD.textContent
    
    const allTD =  document.querySelectorAll('td')

    allTD.forEach((el) => {
        el.classList.add("table__data");
    })

    

    $clientTR.classList.add("table__row");
    $contactsTD.classList.add('contacts__td')
    $changeBtn.classList.add("btn-reset", "table__btn")
    $deleteBtn.classList.add("btn-reset", "table__btn", "btn-delete")
    $creationTime.classList.add('time-grey')
    $changeTime.classList.add('time-grey')
   
    // tooltip

    for (let i=0; i < client.contacts.length; i++ ){
        const $contactTooltip = document.createElement('div'),
        $contactIconWrapper = document.createElement('div'),
        $contactIconType = document.createElement('span'),
        $contactIconValue = document.createElement('a')

        $contactTooltip.classList.add("contact__icon-link")
        $contactsTD.append($contactTooltip)

            let clientType = client.contacts[i].type
            let clientValue = client.contacts[i].value

            if (clientType === 'Телефон') {
                $contactTooltip.classList.add("contact__icon-tel")  
               
            }
            if (clientType === 'Доп. телефон') {
                $contactTooltip.classList.add("contact__icon-addTel") 
                   
            }
            if (clientType === 'Email') {
                $contactTooltip.classList.add("contact__icon-email")     
               
            }
            if (clientType === 'VK') {
                $contactTooltip.classList.add("contact__icon-vk") 
                   
            }
            if (clientType === 'Facebook') {
                $contactTooltip.classList.add("contact__icon-fb")   
            }
            // hover 
            tippy($contactTooltip, {
                theme: 'custom',
                content:  clientType + ':'+ `<span>${clientValue}</span>` ,
                allowHTML: true
            })
    }

    // аппендикс

    $buttonsTD.append($changeBtn)
    $buttonsTD.append($deleteBtn)
    $creationDateTD.append($creationDate, $creationTime)
    $changeDateTD.append($changeDate, $changeTime)


    // modal-change 
    function clientChange() {
        $changeID.textContent = client.id.substr(7, 14)
        $changeInputName.value = client.name
        $changeInputSurname.value = client.surname
        $changeInputLastname.value = client.lastName

        function fillIdArray(){
            idArray.push(client.id)
        }
        fillIdArray()
    
        for (let i=0; i < client.contacts.length; i++){
            createContacts()
            setTimeout(()=>{
                const $formContactsInput = document.querySelectorAll('.form-contacts-input'),
                $formContactsSelect = document.querySelectorAll('.form-select')
                
                $formContactsSelect[i].value = client.contacts[i].type
                $formContactsInput[i].value = client.contacts[i].value

            },1)
        }
       
    }

    $changeContactAdd.addEventListener('click', createContacts)
    // $changeBtnSave.addEventListener('click', )

    $changeBtn.addEventListener('click', (id)=> {
        $changeModal.classList.add('open')
        clientChange()
    })

    

    // modal-DELETE
   
   const  $modalDelete = document.getElementById('modal-delete'),
    $modalDeleteClose = document.getElementById('modal-delete-close'),
    $modalDeleteBtn = document.getElementById('delete-btn-delete'),
    $modalDeleteSave = document.getElementById('delete-btn-save')

    let deleteArray = []
    let fillDeleteArray = function() {
        deleteArray.push(client.id)
    }

$deleteBtn.addEventListener('click', ()=> {
    fillDeleteArray()
    $modalDelete.classList.add('open')
})

function modalDeleteRemove(){
    $modalDelete.classList.remove('open')
}
$modalDeleteBtn.addEventListener('click', modalDeleteRemove)
$modalDeleteSave.addEventListener('click', modalDeleteRemove)
$modalDeleteClose.addEventListener('click', modalDeleteRemove)
  
    // delete API 
    $modalDeleteBtn.addEventListener('click', () => { 
            deleteClient(Number(deleteArray[0]));
            deleteArray.length = 0
    });
   
 
    $clientTR.append($idTD)
    $clientTR.append($fioTD)
    $clientTR.append($creationDateTD)
    $clientTR.append($changeDateTD)
    $clientTR.append($contactsTD)
    $clientTR.append($buttonsTD)

    return $clientTR
}

const $tableBody = document.getElementById('table-body')

let clientArray = []

const fillClientArray = async () => {
    let clientAsyncArray = await getClients()
    for (let i=0; i < clientAsyncArray.length; i++){
        clientArray.push(clientAsyncArray[i])
    }
    
} 
fillClientArray()

let column = 'id'
let columnDir = false

const $preloader = document.getElementById('preloader')
function preloader(){
    $preloader.classList.add('open')
    setTimeout(()=> $preloader.classList.remove('open'),1500)
}



function render() {
    let clientCopy = [...clientArray]
    function getSortClients(prop, dir) {
        return clientCopy.sort(function(clientA, clientB){
            if ((!dir === false ? clientA[prop] < clientB[prop] : clientA[prop] > clientB[prop]))
            return -1;
            console.log(clientA[prop],clientB[prop] )
        })
    }
    
    clientCopy = getSortClients(column, columnDir)
    $tableBody.innerHTML = ''
    
    for (const client of clientCopy) {
        $tableBody.append(newClientTR(client))
    }
}
window.addEventListener('DOMContentLoaded',preloader)
setTimeout(render,1500)

const $tableTH =document.querySelectorAll('.table__header')

$tableTH.forEach(element => {
    element.addEventListener('click', function(){
        column = this.dataset.column;
        columnDir = !columnDir   
        render()
    })
})

// search 
const $searchInput = document.getElementById('search-input'),
    $searchForm = document.getElementById('search-form'),
    $searchReset = document.getElementById('search-reset')
function searchClient(value){
    let clientCopy = [...clientArray]
    // let  split = clientCopy.filter( el => Object.values(el.surname.toLowerCase()).includes(value.toLowerCase()))
    let split = clientCopy.filter( el => el.surname.toLowerCase().includes(value.toLowerCase()))
    $tableBody.innerHTML = ''
    for (const client of split) { 
            $tableBody.append(newClientTR(client))
    }
    console.log(split)

}

$searchInput.addEventListener('input', ()=>{
    if($searchInput.value !== ''){
        $searchReset.classList.add('open')
    } else {
        $searchReset.classList.remove('open')
        location.reload()
    }
})

$searchReset.addEventListener('click', (e)=> {
    e.preventDefault()
    location.reload()
})


    $searchForm.addEventListener('keyup', () => {
        setTimeout(() => {searchClient($searchInput.value);
        console.log($searchInput.value)
        },300)
    })


// modal 




// создание контактов 

function createContacts(){
    const $contactsSelect = document.createElement('select'),
    $contactsInput = document.createElement('input'),
    $contactsBtnDelete = document.createElement('button'),
    $contactsWrap = document.createElement('div'),
    $contactsTooltip = document.createElement('div'),
    $contactsTooltipText = document.createElement('span')

    $contactsTooltipText.textContent = 'Удалить контакт'
let contactsNameArray = ['Телефон', 'Доп. телефон', 'Email' , 'VK','Facebook']
// let contactsTypeArray = ['tel' , 'optTel', 'vk' , 'fb']

for (var i = 0; i < contactsNameArray.length; i++) {
    const option = document.createElement("option");
    option.value = contactsNameArray[i];
    option.text = contactsNameArray[i];
    option.classList.add('form-option')
    $contactsSelect.appendChild(option);
}

$contactsTooltip.classList.add("form-tooltip")
$contactsTooltipText.classList.add("form-tooltip-text")
$contactsWrap.classList.add("form-contacts-wrap");
$contactsSelect.classList.add("form-select");
$contactsInput.classList.add("form-contacts-input", "just-validate");
$contactsBtnDelete.classList.add("btn-reset", "form-contacts-delete");

$contactsTooltip.append($contactsTooltipText)
$contactsBtnDelete.append($contactsTooltip)
$contactsWrap.append($contactsSelect)
$contactsWrap.append($contactsInput)
$contactsWrap.append($contactsBtnDelete)

    if ($modalAdd.classList.contains('open') && $addClinetWrapper.childNodes.length < 10 ){
        $addClinetWrapper.append($contactsWrap) 
    } if ($changeModal.classList.contains('open') &&  $formClientWrapper.childNodes.length < 10 ){
        $formClientWrapper.append($contactsWrap) 
    } if ($modalAdd.classList.contains('open') && $addClinetWrapper.childNodes.length == 10 ){
        $formAddContactsAdd.classList.add('visually-hidden') 
    } if ($changeModal.classList.contains('open') &&  $formClientWrapper.childNodes.length == 10 ){
        $formContactsAdd.classList.add('visually-hidden') 
    } 

    	$contactsBtnDelete.addEventListener('click', function(e) {
        e.preventDefault();
        e.currentTarget.parentNode.remove();
        if ($modalAdd.classList.contains('open') && $addClinetWrapper.childNodes.length !== 10 ){
        $formAddContactsAdd.classList.remove('visually-hidden') 
        } if ($changeModal.classList.contains('open') &&  $formClientWrapper.childNodes.length !== 10 ){
        $formContactsAdd.classList.remove('visually-hidden') 
        } 
    	});
}



$formAddContactsAdd.addEventListener('click',()=> {
    createContacts()
})

$formContactsAdd.addEventListener('click',createContacts()) 




// Отправка клиента
$modalAddForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const $contactsType = document.querySelectorAll('.form-select')
    const $contactsInput = document.querySelectorAll('.form-contacts-input')

    let messages = [];
    let contacts = [];
    let clientObj = {};

    for (let i = 0; i < ($contactsType.length); i++) {
        contacts.push({
            type: $contactsType[i].value,
            value: $contactsInput[i].value
        });
        if($contactsInput[i].value.trim() === ''){
            messages.push('введите '  + $contactsType[i].value)
            }
    }


    clientObj.name = $addName.value;
    clientObj.surname = $addSurname.value;
    clientObj.lastName = $addLastname.value;
    clientObj.contacts = contacts
    

    if ($addLastname.value.trim() === ''){
        messages.push('введите отчество')
        }
            if ($addSurname.value.trim() === ''){
            messages.push('введите фамилию')
                }
                if ($addName.value.trim() === ''){
                    messages.push('введите имя')
                    } if ($contactsInput.value === ''){
                        messages.push('введите' + $contactsType)
                    }
                    if (messages.length > 0){
                        $addErrorWrapper.innerText = messages.join(', ')
                        } else {
                            $addErrorWrapper.innerText = ''
                            messages.length = 0
                            await createClient(clientObj);
                        }        
})

$modalChangeForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const $contactsType = document.querySelectorAll('.form-select')
    const $contactsInput = document.querySelectorAll('.form-contacts-input')

    let id = Number(idArray[0])
    let messages = [];
    let contacts = [];
    let clientObj = {};

    for (let i = 0; i < ($contactsType.length); i++) {
        contacts.push({
            type: $contactsType[i].value,
            value: $contactsInput[i].value
        });
        if($contactsInput[i].value.trim() === ''){
            messages.push('введите '  + $contactsType[i].value)
            }
    }

    clientObj.name =  $changeInputName.value;
    clientObj.surname = $changeInputSurname.value;
    clientObj.lastName = $changeInputLastname.value;
    clientObj.contacts = contacts

    if ($changeInputLastname.value.trim() === ''){
        messages.push('Введите отчество')
        }
            if ($changeInputSurname.value.trim() === ''){
            messages.push('введите фамилию')
                }
                if ($changeInputName.value.trim() === ''){
                    messages.push('введите имя')
                    }
                    if (messages.length > 0){
                        $changeErrorWrapper.innerText = messages.join(', ')
                        } else {await changeClient(id, clientObj);}       
})



$addBtn.addEventListener('click', ()=> {
    $modalAdd.classList.add('open')
})

function modalAddRemove (){
    $modalAdd.classList.remove('open')
    contactsWrapRemove()
}
$modalAddClose.addEventListener('click', modalAddRemove)
$modalAddBack.addEventListener('click', modalAddRemove)

// modal change 

function contactsWrapRemove() {
    const $formContactsWrap = document.querySelectorAll('.form-contacts-wrap')
    for (let i = 0; i < $formContactsWrap.length; i++) {
        $formContactsWrap[i].remove();
      }
}
        
function modalChangeRemove (){
    $changeModal.classList.remove('open')
    contactsWrapRemove()
    idArray.length = 0
}

$changeBtnClose.addEventListener('click', modalChangeRemove)
$changeBtnDelete.addEventListener('click', modalChangeRemove)


