// ************ Below code is for checking that jQuery is run successfully or not **************************
// $(document).ready(function(){
//     $(selector).action()
//     $("h1").hide();
// });


let URL = "http://localhost:3000/todos"

var editId = null;

// ************* Load data from Free API **************************
// $(document).ready(function(){
//     $("button").click(function(){
//         $("#getApiData p").load(URL);
//     });
// });

// $(document).ready(function () {
//     $("button").click(function () {
//         $.get(URL, function(data, status){
//             // $("#getApiData p").
//         })
//     });
// });


// -4: create "createTable()" function => $("#t-container table tbody").html(tr > td-id td-title td-edit td-delete)

function createTable(data) {
    // console.log("createTable Works");
    let $tr = $("<tr></tr>");
    let $tdId = $("<td class='text-center w5per'>" + data.id + "</td>");
    let $tdTitle = $("<td class='text-center w80per'>" + data.title + "</td>");
    let $tdForBtn = $("<td class='d-flex justify-content-around text-center'></td>");
    let $editBtn = $("<button class='btn btn-primary '>Edit</button>");
    let $deleteBtn = $("<button class='btn btn-danger'>Delete</button>");

    $($tr).append($tdId);
    $($tr).append($tdTitle);
    $($tdForBtn).append($editBtn);
    $($editBtn).attr("id", data.id);
    $($editBtn).click(function () {
        editTitle(data.id, data.title);
        $('#editModal').modal('show');
    });

    $($tdForBtn).append($deleteBtn);
    $($deleteBtn).attr("id", data.id);
    $($deleteBtn).click(function () {
        deleteTitleButton(data.id, data.title);
    });

    $($tr).append($tdForBtn);
    $("#table-container table tbody").append($tr);
}

// **********************GET Data from API*************************
function getDataApi() {
    $("#table-container table tbody").html('');
    $.get(URL, function (data) {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            createTable(data[i]);
        }
    });
}

// **********************Add(POST) new Data in API*************************
function postDataApi(title) {
    // -3: $.post()-declare this
    console.log("postData works");

    // $.post(URL,payload,callback function(){})
    // var body = {"title":title};
    // $.ajax({
    //     type: 'POST',
    //     url: URL,
    //     data: JSON.stringify(body),
    //     success: function(response) {
    //         if(response) {
    //             getData();
    //         }
    //     },
    //     contentType: "application/json",
    //     dataType: 'json'
    // });
    $.post(URL, JSON.stringify(
        {
            title: title
        }),
        function (response, status) {
            // console.log("Title: " + response + "\nStatus: " + status);
            console.log("Response=>", response);
            if (response) {
                getDataApi();
            }
        }
    );

    // -4: pass URL
    // -5: pass title as json (i.e. {title: <title-param>})
    // -6: Check response as success, if so call getData()
}

// **********************Edit Data in API*************************
function putTitleApi(id, title) {
    $.ajax({
        url: URL + '/' + id,
        type: 'PUT',
        data: JSON.stringify({
            title: title
        }),
        success: function (response, status) {
            console.log("Title: " + response + "\nStatus: " + status);
            editId = null;
            if (response) {
                getDataApi();
            }
        }
    });
}

// **********************Delete Data from API*************************
function deleteTitleApi(id) {
    $.ajax({
        url: URL + '/' + id,
        type: 'DELETE',
        success: function (response, status) {
            // console.log("Title: " + response + "\nStatus: " + status);
            editId = null;
            if (response) {
                getDataApi();
            }
        }
    });
}

// **********************When Delete Button Click Function Call*************************
function deleteTitleButton(id, title) {
    console.log("deleteTitleButton works");
    console.log(id, title);
    editId = id;
    deleteTitleApi(editId);
}

// **********************When Edit Button Click Function Call*************************
function editTitle(id, title) {
    console.log("editTitle works");
    console.log(id, title);
    editId = id;
    $("#editTitleInput").val(title);
    console.log("editTitleInput get successfully");
}

// **********************When Save Button Click in Module, Function Call*************************
$("#editTitleBtn").click(function () {
    console.log("Id : ", editId);
    let title = $("#editTitleInput").val();
    console.log("Title : ", title);
    putTitleApi(editId, title);
    console.log("putTitleApi works");
});


// **********************In ADD button, When Save Button Click in Module, Function Call*************************
$("#saveBtn").click(function () {
    // -1: Get title input value
    let titleValue = $("#titleInput").val();
    // console.log("titleValue :", titleValue);

    // -1b: check title value 
    if (titleValue) {
        console.log("Successfully Get Title value");
        postDataApi(titleValue);
    }
    // -2: Pass title value to postData function 
    // postData();
});


// **********************For getting the data of api , getDataApi() function call*************************
getDataApi();

// -5: call createTable() and check the row in inserted or not, if not, check the logic again.


