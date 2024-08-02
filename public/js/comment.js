//handles front end comment logic

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".comment-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const postId = event.target.getAttribute("data-id");
      document.getElementById("comment-post-id").value = postId;

      try {
        const response = await fetch(`/api/comments?post_id=${postId}`);
        if (response.ok) {
          const comments = await response.json();
          const commentsContainer =
            document.getElementById("comments-container");
          commentsContainer.innerHTML = "";

          comments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment", "mb-3");
            commentElement.innerHTML = `
                <p>${comment.comment_text}</p>
                ${
                  comment.user_id === user_id
                    ? `<button class="btn btn-danger delete-comment-btn" data-id="${comment.id}">Delete Comment</button>`
                    : ""
                }
              `;
            commentsContainer.appendChild(commentElement);
          });

          document
            .querySelectorAll(".delete-comment-btn")
            .forEach((deleteButton) => {
              deleteButton.addEventListener("click", async (event) => {
                const commentId = event.target.getAttribute("data-id");
                try {
                  const response = await fetch(`/api/comments/${commentId}`, {
                    method: "DELETE",
                  });
                  if (response.ok) {
                    document.location.reload();
                  } else {
                    alert("Failed to delete comment");
                  }
                } catch (error) {
                  console.error("Error deleting comment:", error);
                }
              });
            });
        } else {
          alert("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    });
  });

  document
    .getElementById("create-comment-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const commentText = document.getElementById("comment-text").value.trim();
      const postId = document.getElementById("comment-post-id").value;

      if (commentText) {
        try {
          const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
              comment_text: commentText,
              post_id: postId,
            }),
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            document.location.reload();
          } else {
            alert("Failed to add comment");
          }
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    });
});
