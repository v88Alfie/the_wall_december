var currentPostId;
var currentCommentId;

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("create_post_form").addEventListener("submit", submitCreatePostForm);
});

/**
 * DOCU: This function will submit create post form <br>
 * Triggered: document.getElementById("create_post_form").addEventListener("submit", submitCreatePostForm); <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param event
 * @author Alfie
 */
submitCreatePostForm = (event) => {
    event.preventDefault();
    let create_post_form = event.target;
    let create_message_input = create_post_form.querySelector("textarea");

    validateTextareaInput(create_message_input);

    /** if create post form has no error class */
    if(!create_post_form.querySelectorAll(".input_error").length){
        let cloned_post = document.querySelector("#clone_topic_container .topic_post").cloneNode(true);

        /* if currentPostId has no value, post is not under edit state */
        if(currentPostId){
            let topic_container = document.querySelector(`[data-post-id="${currentPostId}"]`);
            topic_container.querySelector(".post_text").innerHTML = topic_content.value;
        }
        else{
            cloned_post.querySelector("p").innerText = create_message_input.value;
            cloned_post.setAttribute("data-post-id", generateId());
            cloned_post.setAttribute("class", "topic_container");
    
            cloned_post.querySelector(".edit_btn").addEventListener("click", editPost);
            cloned_post.querySelector(".delete_btn").addEventListener("click", showDeleteConfirm);
            cloned_post.querySelector(".no_btn").addEventListener("click", deletePost);
            cloned_post.querySelector(".yes_btn").addEventListener("click", deletePost);
            cloned_post.querySelector(".submit_comment_btn").addEventListener("click", addComment);
    
            document.getElementById("topic_lists").append(cloned_post);
        }
        document.querySelector("#blank_topic_container").classList.add("hidden");
    }
    create_post_form.reset();
    currentPostId = "";
}

/**
 * DOCU: This function will edit submitted post <br>
 * Triggered: cloned_post.querySelector(".edit_btn").addEventListener("click", editPost); <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param event
 * @author Alfie
 */
editPost = (event) => {
    event.preventDefault();

    let topic_container = event.target.closest(".topic_container");
    let topic_content = document.querySelector("#topic_content");

    if(event.target.classList.contains("edit_btn")){
        topic_content.value = topic_container.querySelector(".post_text").innerHTML;
        currentPostId = topic_container.dataset.postId;
    }
}

/**
 * DOCU: This function will show delete confirmation <br>
 * Triggered: cloned_post.querySelector(".delete_btn").addEventListener("click", showDeleteConfirm); <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param event
 * @author Alfie
 */
showDeleteConfirm = (event) => {
    event.target.closest(".topic_container").querySelector(".confirm_text").classList.remove("hidden");
}

/**
 * DOCU: This function will delete selected post <br>
 * Triggered: cloned_post.querySelector(".no_btn").addEventListener("click", deletePost); <br>
 * Triggered: cloned_post.querySelector(".yes_btn").addEventListener("click", deletePost); <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param event
 * @author Alfie
 */
deletePost = (event) => {
    let topic_container = event.target.closest(".topic_container");

    if(event.target.classList.contains("no_btn")){
        topic_container.querySelector(".confirm_text").classList.add("hidden");
    }
    else{
        topic_container.remove();
    }
}


/**
 * DOCU: This function will submit comment form <br>
 * Triggered: cloned_post.querySelector(".submit_comment_btn").addEventListener("click", addComment); <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param event
 * @author Alfie
 */
addComment = (event) => {
    event.preventDefault();

    let comment_form = event.target.closest(".topic_container .comment_form");
    let post_topic_id = event.target.closest(".topic_container").dataset.postId;
    let comment_container = event.target.closest(".topic_container .comment_form_container");

    let comment = comment_form.querySelector(".comment");

    validateTextareaInput(comment);

    /** if comment form has no error class */
    if(!comment_form.querySelectorAll(".input_error").length){
        let cloned_comment = document.querySelector("#clone_topic_container .comment_content").cloneNode(true);
        let responses = document.querySelectorAll(`[data-post-id="${post_topic_id}"] .comment_content`).length + 1;

        cloned_comment.setAttribute("class", "comment_content");
        cloned_comment.querySelector(".comment_text").innerHTML = comment.value;
        cloned_comment.setAttribute("data-comment-id", `${post_topic_id}-${generateId()}`);

        cloned_comment.querySelector(".edit_comment_btn").addEventListener("click", editComment);
        cloned_comment.querySelector(".save_comment_btn").addEventListener("click", saveEditComment);
        cloned_comment.querySelector(".delete_comment_btn").addEventListener("click", showDeleteCommentConfirm);
        cloned_comment.querySelector(".no_comment_btn").addEventListener("click", deleteComment);
        cloned_comment.querySelector(".yes_comment_btn").addEventListener("click", deleteComment);

        comment_container.insertAdjacentElement("afterend", cloned_comment);

        getNumberOfResponses(post_topic_id, responses)
        comment_form.reset();
    }
}

/**
 * DOCU: This function will edit submitted comment <br>
 * Triggered: cloned_comment.querySelector(".edit_comment_btn").addEventListener("click", editComment); <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param event
 * @author Alfie
 */
editComment = (event) => {
    event.preventDefault();

    let comment_content = event.target.closest(".comment_content");
    let comment_text = comment_content.querySelector(".comment_text").innerHTML;
    let edit_comment = comment_content.querySelector(".comment_form .edit_comment");

    comment_content.querySelector(".edit_comment_form_container").classList.remove("hidden");
    comment_content.querySelector(".details_container").classList.add("hidden");
    comment_content.querySelector(".comment_text").classList.add("hidden");

    edit_comment.value = comment_text;
    currentCommentId = comment_content.dataset.commentId;
}

/**
 * DOCU: This function will save editted comment <br>
 * Triggered: cloned_comment.querySelector(".save_comment_btn").addEventListener("click", saveEditComment); <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param event
 * @author Alfie
 */
saveEditComment = (event) => {
    event.preventDefault();

    let current_comment = document.querySelector(`[data-comment-id="${currentCommentId}"]`);
    let edit_comment = current_comment.querySelector(".edit_comment");

    current_comment.querySelector(".comment_text").innerHTML = edit_comment.value;
    current_comment.querySelector(".edit_comment_form_container").classList.add("hidden");
    current_comment.querySelector(".details_container").classList.remove("hidden");
    current_comment.querySelector(".comment_text").classList.remove("hidden");
}

/**
 * DOCU: This function will show delete comment confirmation <br>
 * Triggered: cloned_comment.querySelector(".delete_comment_btn").addEventListener("click", showDeleteCommentConfirm); <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param event
 * @author Alfie
 */
showDeleteCommentConfirm = (event) => {
    event.target.closest(".action_group").querySelector(".confirm_text").classList.remove("hidden");
}

/**
 * DOCU: This function will delete selected comment <br>
 * Triggered: cloned_comment.querySelector(".no_comment_btn").addEventListener("click", deleteComment); <br>
 * Triggered: cloned_comment.querySelector(".yes_comment_btn").addEventListener("click", deleteComment); <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param event
 * @author Alfie
 */
deleteComment = (event) => {
    let closest_comment_content = event.target.closest(".comment_content");
    let topic_container = event.target.closest(".topic_container");
    let post_id = topic_container.dataset.postId;
    let comment_count = document.querySelectorAll(`[data-post-id="${post_id}"] .comment_content`).length - 1;
    
    if(event.target.classList.contains("no_comment_btn")){
        closest_comment_content.querySelector(".confirm_text").classList.add("hidden");
    }
    else{
        closest_comment_content.remove();
        getNumberOfResponses(post_id, comment_count);
    }
}

/**
 * DOCU: This function will count number of responses in each post <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param post_id = selected post_id
 * @param number_of_responses = number of responses
 * @author Alfie
 */
getNumberOfResponses = (post_id, number_of_responses) => {
    let post_topic = document.querySelector(`[data-post-id="${post_id}"]`);
    post_topic.querySelector(".responses").innerHTML = `${number_of_responses} Responses`;
}

/**
 * DOCU: This function will generate random unique id <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @author Alfie
 */
generateId = () => {
    return Math.floor(Date.now() + Math.random()); 
}

/**
 * DOCU: This function will validate textarea input <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @param input = selected input
 * @author Alfie
 */
validateTextareaInput = (input) => {
    input.addEventListener("focus", () => {
        input.classList.remove("input_error");
    });

    input.value ? input.classList.remove("input_error") : input.classList.add("input_error");
}