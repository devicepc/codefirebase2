import {saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js'


// capturar el div del index
const taskContainer = document.getElementById('task-container')


// para saber si esta editando
let editStatus = false;
// guardamos el id para poder editar
let id ='';

// fin de agragad datos al index
window.addEventListener('DOMContentLoaded',  async() => {
    // const datafomDB = await getTask();
    onGetTasks( (datafomDB) => {
        let html ='';
    // para ver todos los doc por consola
    datafomDB.forEach(doc => {
    var datosLibreta =doc.data();
        html +=`
      <div >
      </br>
      <h3 class="h5">N° de libreta : ${datosLibreta.LibIdentificador}</h3>
      <p> Categoria de libreta : ${datosLibreta.LibCategoria}</p>
      <p>Nombre del conductor : ${datosLibreta.LibName}</p>
      <p>Cedula del conductor : ${datosLibreta.LibCedula}</p>
      <p>Vencimiento de la libreta : ${datosLibreta.LibVto}</p>
      <p>Observaciones de la libreta : ${datosLibreta.LibObservaciones}</p>
      <p>Puntos de la libreta : ${datosLibreta.LibPuntos}</p>
      <p>Libreta habilitada : ${datosLibreta.LibStatus}</p>
      <br/>
      <button class='btn-delete' data-id="${doc.id}">Borrar</button>
      <button class='btn-Edit' data-id="${doc.id}">Actualizar</button>
      <div>
        
        
      </div>
    </div>`;
        
        console.log(doc.data());
        initIMG();
    });
    // borar datos

    // ingresar los datos
    taskContainer.innerHTML += html;
    // selecionar todos los botnes delete para borrar
    const btnDelete = taskContainer.querySelectorAll('.btn-delete')
    btnDelete.forEach(btn =>{
         btn.addEventListener('click', ({target:{dataset}})=> {
            deleteTask(dataset.id)
        })
    })
    

    // funcion para editar
 const btnsEdit = taskContainer.querySelectorAll('.btn-Edit')
 btnsEdit.forEach((btn) => {
     btn.addEventListener('click', async(e) =>{
         const doc = await getTask(e.target.dataset.id)
         const  task = doc.data()
         taskForm['Lib-Id'].value = task.LibIdentificador
         taskForm['Lib-Cat'].value = task.LibCategoria
         taskForm['Lib-Name'].value = task.LibName
         taskForm['Lib-Ced'].value = task.LibCedula
         taskForm['Lib-Vto'].value = task.LibVto
         taskForm['Lib-Obser'].value = task.LibObservaciones
         taskForm['Lib-Ptos'].value = task.LibPuntos
         taskForm['Lib-State'].value = task.LibStatus

         editStatus = true;
         id = e.target.dataset.id;

         // cambiar valor de btm save a update
            taskForm['btn-task-form'].innerText = 'UPDATE';

     } )

 })
    
});

})


// guardar datos
const taskForm= document.getElementById('task-form');
taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
   
    const LibIdentificador = document.getElementById("Lib-Id").value;
    const LibCategoria = document.getElementById('Lib-Cat').value;
     const LibName = document.getElementById('Lib-Name').value;
    const LibCedula = document.getElementById('Lib-Ced').value;
    const LibVto = document.getElementById('Lib-Vto').value;
    const LibObservaciones = document.getElementById('Lib-Obser').value;
    const LibPuntos = document.getElementById('Lib-Ptos').value;
    const LibStatus = document.getElementById('Lib-State').value;

    
    // concicion para ver si edita
     if (!editStatus){
       saveTask(LibIdentificador, LibCategoria, LibName, LibCedula, LibVto, LibObservaciones, LibPuntos, LibStatus);
       
    
    initIMG();
    }else{ 
        updateTask(id, {LibIdentificador, LibCategoria, LibName, LibCedula, LibVto, LibObservaciones, LibPuntos, LibStatus})
         editStatus = false;
    initIMG(); 
    }    
    initIMG();
    // resreto de datos de index.html
    taskForm.reset();
    

})


function initIMG(){
    document.getElementById("IMGdata").style.display="block";
};
function initIMG2(){
    document.getElementById("IMGdata2").style.display="block";
};




 
