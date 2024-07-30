//handles front end comment logic

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#comment-form")) {
    document
      .querySelector("#comment-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const commentText = document
          .querySelector("#comment-text")
          .value.trim();
        const postId = document.querySelector("#post-id").value;

        if (commentText) {
          const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ text: commentText, postId }),
            headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
            document.location.reload();
          } else {
            alert("Failed to add comment");
          }
        }
      });
  }

  document.querySelectorAll(".delete-comment-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const commentId = event.target.getAttribute("data-id");

      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to delete comment");
      }
    });
  });
});
