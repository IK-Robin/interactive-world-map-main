

<!-- Modal -->
<div class="modal fade" id="ikr_map_data_edit" tabindex="-1" aria-labelledby="ikr_map_data_editLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ikr_map_data_editLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
      <form action="" id="rdata_from">

 <?php wp_nonce_field('w_map_form_action', 'w_map_form_nonce'); ?>

     <div id="data-entries">
         <div class="data-entry">
             <label for="id">Map ID</label>
             <input type="text" name="id" class="scratch-data-id" id="modal_map_id" />
             <label for="title">Title</label>
             <input type="text" name="title" placeholder="Insert your title" id="modal_ikrTitle" />
             <label for="des">Description</label>
             <input type="text" name="des" id="modal_ikrdes" placeholder="Insert your description" />
             <label for="hovecolor">Hover Color</label>
             <input type="color" id="modal_typeHovcolor"  value="#0000FF" />

             <input type="text" name="hovecolor" id="modal_hovecolor" value="#0000FF"/>
             
             <label for="fill_color">Fill Color</label>
             <input type="color" id="modal_filltype" value="#0000FF" />

             <input type="text" name="fillcolor" id="modal_fill_color" value="#0000FF" />
             
            
             
         


         </div>
     </div>



      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit " class="btn btn-primary">Save changes</button>
        

        </form>
      </div>
    </div>
  </div>
</div>


<!-- Table for Displaying Entries -->
<table id="mapTable" border="1" class="table mt-4">
    <thead>
        <tr>
            <th>#</th>
            <th>Map ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Hover Color</th>
            <th>Fill Color</th>
            <th>Click Color</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <!-- Rows will be populated by JavaScript -->
    </tbody>
</table>
