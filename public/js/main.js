// Confirmation dialogue for delete buttons
$(document).ready(function(){
  $(".delete").click(function(){
    if (!confirm("Do you want to delete")){
      return false;
    }
  });
});
