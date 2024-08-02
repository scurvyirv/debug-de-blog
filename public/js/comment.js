//handles front end comment logic

//modal logic
document.addEventListener("DOMContentLoaded", () => {
  const commentButtons = document.querySelectorAll(".comment-btn");
  const commentModal = new bootstrap.Modal(
    document.getElementById("commentModal")
  );

  //target specific post by ID to render modal
  commentButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const postId = button.getAttribute("data-id");
      document.getElementById("comment-post-id").value = postId;

      //fetch comments tied to specific post ID
      try {
        const response = await fetch(`/api/comments?post_id=${postId}`);
        if (!response.ok) throw new Error("Failed to fetch comments");
        const comments = await response.json();
        console.log("Fetched comments: ", comments);

        const commentsContainer = document.getElementById("comments-container");
        commentsContainer.innerHTML = "";

        comments.forEach((comment) => {
          const commentElement = document.createElement("div");
          commentElement.className = "comment";
          commentElement.innerHTML = `
              <p>${comment.comment_text} - <strong>${
            comment.user.username
          }</strong></p>
              ${
                window.user_id === comment.user_id
                  ? `<button class="delete-comment-btn btn btn-danger" data-id="${comment.id}">Delete</button>`
                  : ""
              }
            `;
          commentsContainer.appendChild(commentElement);
        });

        commentModal.show();
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    });
  });

  //comment form to add new comment
  document
    .getElementById("create-comment-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const postId = document.getElementById("comment-post-id").value;
      const commentText = document.getElementById("comment-text").value.trim();

      if (commentText) {
        try {
          const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
              post_id: postId,
              comment_text: commentText,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) throw new Error("Failed to add comment");
          location.reload();
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    });

  //logic to delete comments
  document
    .getElementById("comments-container")
    .addEventListener("click", async (event) => {
      if (event.target.classList.contains("delete-comment-btn")) {
        const commentId = event.target.getAttribute("data-id");
        try {
          const response = await fetch(`/api/comments/${commentId}`, {
            method: "DELETE",
          });

          if (!response.ok) throw new Error("Failed to delete comment");
          location.reload();
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      }
    });
});
