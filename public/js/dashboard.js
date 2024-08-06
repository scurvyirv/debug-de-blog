//this file handles CRUD operations logic for the dashboard that enables user interaction absent in homepage / view only mode

document.addEventListener("DOMContentLoaded", () => {
  // Handle post creation
  const createPostForm = document.getElementById("create-post-form");
  if (createPostForm) {
    createPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = document.getElementById("post-title").value.trim();
      const content = document.getElementById("post-content").value.trim();

      if (title && content) {
        try {
          const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
          });

          if (response.ok) {
            window.location.href = "./dashboard";
          } else {
            const errorText = await response.text();
            throw new Error(errorText);
          }
        } catch (error) {
          console.error("Error creating post:", error);
          document.getElementById("error-message").innerText =
            "Network error. Please try again later.";
        }
      } else {
        document.getElementById("error-message").innerText =
          "Title and content cannot be empty.";
      }
    });
  }

  // Show modal and populate it with post data for editing
  document.querySelectorAll(".edit-post-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const postId = event.target.getAttribute("data-id");
      console.log(`Editing post with ID: ${postId}`); // Debugging post ID

      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post details");

        const postData = await response.json();
        console.log("Fetched post data:", postData); // Debugging fetched data
        document.getElementById("edit-post-id").value = postId;
        document.getElementById("edit-post-title").value = postData.title;
        document.getElementById("edit-post-content").value = postData.content;

        $("#editPostModal").modal("show");
      } catch (error) {
        console.error("Error fetching post details:", error);
        document.getElementById("error-message").innerText =
          "Network error. Please try again later.";
      }
    });
  });

  // Handle edit post form submission
  const editPostForm = document.getElementById("edit-post-form");
  if (editPostForm) {
    editPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const postId = document.getElementById("edit-post-id").value;
      const updatedTitle = document.getElementById("edit-post-title").value;
      const updatedContent = document.getElementById("edit-post-content").value;

      console.log(`Updating post with ID: ${postId}`); // Debugging post ID
      console.log("Updated title:", updatedTitle); // Debugging updated title
      console.log("Updated content:", updatedContent); // Debugging updated content

      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedTitle,
            content: updatedContent,
          }),
        });

        console.log("Update response:", response); // Debugging response

        if (!response.ok) throw new Error("Failed to update post");

        $("#editPostModal").modal("hide");
        window.location.href = "./dashboard";
      } catch (error) {
        console.error("Error updating post:", error);
        document.getElementById("error-message").innerText =
          "Network error. Please try again later.";
      }
    });
  }

  // Handle delete post
  document.querySelectorAll(".delete-post-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const postId = event.target.getAttribute("data-id");

      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      console.log("response", response);
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete post");
      }
    });
  });
});
