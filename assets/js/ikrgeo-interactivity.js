const ikrgooMap = document.querySelector(".svg_img_obj");

const tooltip = document.getElementById("tooltip");
const detail = document.getElementById("detail");

const form_inp = document.getElementById("rdata_from");

const map_id = document.getElementById("map_id");

const ikrTitle = document.getElementById("ikrTitle");

const ikrdes = document.getElementById("ikrdes");

const map_details = document.getElementById("map_details");

const plotId = document.getElementById("plotId");
const detail_name = document.getElementById("detail_name");
const detail_des = document.getElementById("detail_des");
const closebtn = document.getElementById("close");

const hovecolor = document.getElementById("hovecolor");
const fill_color = document.getElementById("fill_color");

const typeHovcolor = document.getElementById("typeHovcolor");
const filltype = document.getElementById("filltype");

const rdata_submit_form  = document.getElementById('rdata_submit_form');



// select all edit form input 
const rdata_from_edit = document.getElementById('rdata_from_edit');

const modal_map_id = document.getElementById('modal_map_id');
const modal_ikrTitle = document.getElementById('modal_ikrTitle');

const modal_ikrdes = document.getElementById('modal_ikrdes');

const modal_typeHovcolor = document.getElementById('modal_typeHovcolor');
const modal_hovecolor = document.getElementById('modal_hovecolor');


const modal_filltype = document.getElementById('modal_filltype');
const modal_fill_color = document.getElementById('modal_fill_color');

const ikr_select_img = document.getElementById('ikr_select_img');
const modal_link = document.getElementById('modal_link');


//  get data on load

let tab = [];

// console.log(closebtn)
ikrgooMap.addEventListener("load", (irkcontent) => {
  // get the svg
  const ikrsvgDocc = ikrgooMap.contentDocument;
  const ikrsvg = ikrsvgDocc.querySelector("svg");

  let items = ikrsvg.querySelectorAll("rect,path", "circle", "polygon");

  items.forEach((ev, ind) => {
    let ids = ev.id;
    let id = {
      id: ids,
    };
    tab.push(id);
  });

  // select the svg path
  // console.log(tab)

  // map the item to  the dom and  add event listener

  items.forEach((map_item, index) => {
    map_item.addEventListener("click", (ev) => {
   
      map_click_func(ev);
    })
  });

  
  function map_click_func (event){
    const ct = event.target;  
    // get dataset from the svg path 

    const data_set = ct.dataset;
       // get the id of  the clicked item
       const click_id = ct.id;

       // set the id of the click item id in input fild map_id
       map_id.value = click_id;

    if (Object.keys(data_set).length === 0) {
      ikrTitle.value = '';
      ikrdes.value = '';
      rdata_submit_form.value = "Submit"
  } else {
    // get the data from the dataset
    ikrTitle.value = data_set.title;
    ikrdes.value =  data_set.desc;
    hovecolor.value = data_set.hover;
    typeHovcolor.value = data_set.hover;

    fill_color.value = data_set.fill;
    filltype.value = data_set.fill;

    // change the submit button value 

    rdata_submit_form.value = "Edit"
    

  }



 
  }

  // add form submition  event listener

  // work with form data and changet the color  of the item  based on the selected color input
  function updateColor() {
    var textInput = document.getElementById("hovecolor");
    var colorInput = document.getElementById("typeHovcolor");

    // Get the value from the text input
    var colorValue = textInput.value;
    colorInput.value = colorValue;
    // Check if the input value is a valid hex color code
  }

  const colorTypes = (element, value) => {
    element.addEventListener("change", (ev) => {
      value.value = ev.target.value;
    });
  };

  const checkHexCode = (element, tColor, value) => {
    var isValidHex = /^#[0-9A-F]{6}$/i.test(value);

    if (isValidHex) {
      // Prepend the "#" symbol to the input value
      value = value;
      console.log(value);
      // Set the color input value
      tColor.value = value;
      element.style.backgroundColor = "#fff";
    } else {
      console.log("Not a valid hex color code");

      element.style.backgroundColor = "red";
    }
  };

  // set the color on input filde if the clore is change
  colorTypes(typeHovcolor, hovecolor);
  colorTypes(filltype, fill_color);
  

  const setColorType = (element, setColorTypes) => {
    element.addEventListener("keyup", (ev) => {
      let colorValue = ev.target.value;
      checkHexCode(element, setColorTypes, colorValue);
      // Check if the input value is a valid hex color code
    });
  };

  setColorType(hovecolor, typeHovcolor);
  setColorType(fill_color, filltype);
 

  form_inp.addEventListener("submit", (subEv) => {
    subEv.preventDefault(); // Prevent default form submission



 const  change_color = ikrsvg.querySelector(`#${map_id.value}`);
    change_color.style.fill=fill_color.value;


    // check the value of the submit btn to change the edit or add mode

    if(rdata_submit_form.value == 'Edit'){

      // send request to edit the data 
      worldmp_makeAjaxRequestGlobal(
        form_inp,
        your_ajax_object.edit_data,
        (success) => {
          if (success) {
            console.log("Data successfully sent to the server.");
  
            // Fetch data from the database after the data is sent successfully
            featch_data_from_db();
          } else {
            console.log("Failed to send data.");
          }
        }
      );
    }else{
       // Create a FormData object to capture the form values
    
    worldmp_makeAjaxRequestGlobal(
      form_inp,
      your_ajax_object.action,
      (success) => {
        if (success) {
          console.log("Data successfully sent to the server.");

          // Fetch data from the database after the data is sent successfully
          featch_data_from_db();
        } else {
          console.log("Failed to send data.");
        }
      }
    );
    }


  

    // featch_data_from_db();
  });

//  edit data from list 
  rdata_from_edit.addEventListener('submit',(edtisub )=>{
    edtisub.preventDefault();
     // send request to edit the data 
     console.log('robin')
     const modalElement = document.getElementById('ikr_map_data_edit');

     // Create a Bootstrap modal instance
     bootstrap.Modal.getInstance(document.getElementById('ikr_map_data_edit')).hide();

     
     worldmp_makeAjaxRequestGlobal(
      rdata_from_edit,
      your_ajax_object.edit_data,
      (success) => {
        if (success) {
          console.log("Data successfully sent to the server.");

          // Fetch data from the database after the data is sent successfully
          featch_data_from_db();
        } else {
          console.log("Failed to send data.");
        }
      }
    );
  });

  // get the data asynconalsy

  async function featch_data_from_db() {
    try {
      // fetch the data from the db
      const response = await world_map_fetchAjaxRequest(
        your_ajax_object.feacth,
        your_ajax_object.ajax_url
      );

      console.log(response)
      // check the  response status code

      if (response.length == 0) {
        console.log("No data found");
      } else {
        // set the color of  the map based on the data
        items.forEach((mapId) => {
          response.forEach((data) => {
            if (mapId.id == data.map_id) {
              const setColor = ikrsvg.querySelector(`#${mapId.id}`);
              setColor.setAttribute("data-fill", data.fill_color); 
              setColor.setAttribute("data-hover", data.hov_color); 
              setColor.setAttribute('data-title', data.title);
              setColor.setAttribute('data-desc', data.map_des);
              setColor.style.fill = `${data.fill_color}`;
            }
          });
        });

      // Array of objects for initial population
// Function to populate the table
function populateTable(data) {
  const tableBody = document.querySelector('#mapTable tbody');
  console.log(tableBody)
  tableBody.innerHTML = ''; // Clear existing rows

  data.forEach((item, ind) => {
    const row = document.createElement('tr');
    row.classList.add('shadow', 'my-2');
    
    // Limit content to the first 5 words
    const limitWords = (text, wordLimit) => {
      const words = text.split(' ');
      return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };
    
    row.innerHTML = `
        <td>${ind + 1}</td>
        <td>${item.map_id}</td>
        <td>${limitWords(item.title, 5)}</td>
        <td>${limitWords(item.map_des,4)}</td>
        <td style="background-color: ${item.hov_color};">${item.hov_color}</td>
        <td style="background-color: ${item.fill_color};">${item.fill_color}</td>
      
        <td>
            <button class="edit-btn btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#ikr_map_data_edit" data-id="${item.map_id}" data-edit="ikr_data_edit">Edit</button>
            <button class="delete-btn btn btn-sm btn-danger" data-delete="ikr_data_delete" data-id="${item.map_id}">Delete</button>
        </td>
    `;
    
    tableBody.appendChild(row);
  });
}

// // Show the modal with form data for adding or editing
function showModal(isEdit = false, data = {}) {
  document.getElementById("map_id").value = isEdit ? data.map_id : '';
  document.getElementById("ikrTitle").value = isEdit ? data.title : '';
  document.getElementById("ikrdes").value = isEdit ? data.map_des : '';
  document.getElementById("typeHovcolor").value = isEdit ? data.hov_color : '#0000FF';
  document.getElementById("filltype").value = isEdit ? data.fill_color : '#0000FF';
  document.getElementById("typeClickColor").value = isEdit ? data.click_color : '#0000FF';



  $('#dataModal').modal('show');
}



// Event listener for table actions
// document.addEventListener('click', function(event) {
//   const target = event.target;
//   const id = target.getAttribute('data-id');
  
//   if (target.classList.contains('edit-btn')) {
//       const itemData = mapData.find(item => item.map_id === id);
//       showModal(true, itemData);
//   } else if (target.classList.contains('delete-btn')) {
//       deleteEntry(id);
//   }
// });


// add modal value on click 
// get modal input 
populateTable(response);
const editElements = document.querySelectorAll('[data-edit="ikr_data_edit"]');
console.log(editElements)
// Loop through each selected element
editElements.forEach(edit_ele => {
    // add a click event to get the dataset
    edit_ele.addEventListener('click',(ev)=> {
   
      const id = ev.target.dataset.id;
      // find the existing data 
      const itemData = response.find(item => item.map_id === id);

      modal_map_id.value =itemData.map_id;
      modal_ikrTitle.value = itemData.title;
      modal_ikrdes.value = itemData.map_des;
      modal_typeHovcolor.value = itemData.hov_color;
      modal_hovecolor.value =  itemData.hov_color;
      modal_fill_color.value = itemData.fill_color
      modal_filltype.value = itemData.fill_color;




  
    });

});





      }
    } catch (err) {
      console.log(err);
    }
  }

  featch_data_from_db();
});
