$(document).ready(function(){
    var idtr= 0;
    $("#todo").click(function(){
        $("#formtodo").show()
        $("#table").hide()
    })
    $("#add").click(function(){
        $("#tbody").append('<tr id = '+idtr+' ><td><button type="button"class="btn btn-primary" id= "update">update</button>&nbsp;            <button type="button"class="btn btn-primary" id= "delete">delete</button>&nbsp;'+$("#inputbox").val()+'&nbsp<button type="button"class="btn btn-primary" id= "doing">Doing</button></td></tr>')
        $("#formtodo").hide()
        $("#table").show()
        $("#inputbox").val(null)
        alert(idtr);
        idtr ++;
    })
});