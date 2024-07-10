let count = 0;
let deleteArray = [];
let editArray = [];

function DeleteFunction(deleteArray) {
    for (let i = 0; i < deleteArray.length; i++) {
        $("#commentThreadContainer").on("click", "#" + deleteArray[i], function() {
    
            let parentDiv = $("#" + deleteArray[i]).parent()[0];
            let commenTopDiv = $(parentDiv).parent()[0];
            let infoCommentDiv = $(commenTopDiv).parent()[0];
            let commentContainerDiv = $(infoCommentDiv).parent()[0];
        
            $(commentContainerDiv).remove();
        
        });
    }
}

function EditFunction(editArray) {
    for (let i = 0; i < editArray.length; i++) {
        
        let parentDiv = $("#" + editArray[i]).parent()[0];
        let commenTopDiv = $(parentDiv).parent()[0];
        let commentBottomDiv = $(commenTopDiv).next();
        let paragraphComment = $(commentBottomDiv).children()[0];

        $("#commentThreadContainer").on("click", "#" + editArray[i], function() {

            if (commentBottomDiv.children()[1] === undefined) {
                $(commentBottomDiv).append("<input class=editCommentBox type=text id=editCommentTextBox value='Edit Your Comment Here' onfocus=this.value=''><label class=editSubmittLabel type=text id=editSubmittLabel>Submit</label>")

                let editCommentBox = $(commentBottomDiv).children()[1];
                let editCommentSubmit = $(commentBottomDiv).children()[2];

                $(editCommentSubmit).on("click", function() {
                    let editCommentBoxValue = $(editCommentBox).val();
                    $(paragraphComment).text(editCommentBoxValue);
                    $(editCommentBox).remove();
                    $(editCommentSubmit).remove();
                });
            }
        });

        editArray.shift();
    }
}

$("#submitCommentButton").on("click", function(){
    let commentValue = $("#commentTextBox").val();
    let displayNameValue = $("#displayNameTextBox").val();
    
    $("#commentThreadContainer").prepend
        ( 
            "<div class=commentContainer>" + 
                "<div class=infoContainer>" +
                    "<div class=commentTop>" +
                        "<h4 class=displayName></h4>" +
                        "<div>" +
                            "<label class=edit type=text id=editComment" + count + ">Edit</label>" +
                            "<label class=delete type=text id=deleteComment" + count + ">Delete</label>" +
                        "</div>" +
                    "</div>" +
                    "<div class=commentBottom>" +
                        "<p class=comment></p>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );


    let commentContainer = $("#commentThreadContainer").children()[0];
    let infoContainer = $(commentContainer).children()[0];
    let commentTop = $(infoContainer).children()[0];
    let headerDisplayName = $(commentTop).children()[0];

    let editAndDeleteDiv = $(commentTop).children()[1];
    let editId = $(editAndDeleteDiv).children()[0];
    let deleteId = $(editAndDeleteDiv).children()[1];

    deleteArray.push($(deleteId).attr("id"));
    editArray.push($(editId).attr("id"));

    DeleteFunction(deleteArray);
    EditFunction(editArray);

    $(headerDisplayName).text(displayNameValue);

    let commentBottom = $(infoContainer).children()[1];
    let paragraphComment = $(commentBottom).children()[0];
    
    $(paragraphComment).text(commentValue);

    count += 1;
});





