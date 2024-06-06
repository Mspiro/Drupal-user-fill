chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "start_autofill") {
    chrome.runtime.sendMessage({ action: "fetch_data" }, function (response) {
      if (chrome.runtime.lastError) {
        console.error("Error fetching data:", chrome.runtime.lastError.message);
        return;
      }

      const data = response.data;
      if (data && Array.isArray(data)) {
        processUsersSequentially(data);
      } else {
        console.error("Invalid data format received:", data);
      }
    });
  }
});

function processUsersSequentially(users) {
  let index = 0;

  function processNextUser() {
    if (index < users.length) {
      fillFormWithData(users[index]).then(() => {
        index++;
        processNextUser();
      });
    } else {
      console.log("All users processed");
    }
  }

  processNextUser();
}

function fillFormWithData(user) {
  return new Promise((resolve) => {
    const passwordValue = "Syngenta@2014$$";
    const username = document.querySelector(".username");
    username.value = user.username;

    const nameParts = user.name.trim().split(" ");
    const firstNameField = document.querySelector(
      "#edit-main-profiles-0-entity-field-first-name-0-value"
    );
    const lastNameField = document.querySelector(
      "#edit-main-profiles-0-entity-field-last-name-0-value"
    );

    if (firstNameField) {
      if (nameParts.length > 2) {
        firstNameField.value = nameParts.slice(0, 2).join(" "); // First two parts for first name
      } else {
        firstNameField.value = nameParts[0]; // Only one part for first name
      }
    } else {
      console.log("First name field not found");
    }

    if (lastNameField) {
      if (nameParts.length > 2) {
        lastNameField.value = nameParts.slice(2).join(" "); // Remaining parts for last name
      } else if (nameParts.length === 2) {
        lastNameField.value = nameParts[1]; // Second part for last name if there are exactly two parts
      } else {
        lastNameField.value = ""; // No last name
      }
    } else {
      console.log("Last name field not found");
    }

    const emailField = document.querySelector("#edit-mail");
    const confirmeEmailField = document.querySelector("#edit-conf-mail");
    if (emailField) {
      const emailValue = user.email;
      emailField.value = emailValue;
      confirmeEmailField.value = emailValue;
    } else {
      console.log("Email field not found");
    }

    function checkUserRoleBoxes(userRoles) {
      for (const userRole of userRoles) {
        const checkboxId = `edit-role-change-${userRole.toLowerCase().replace(/ /g, '-')}`;
        let role = document.getElementById(checkboxId);
        if (role !== undefined) {
          role.click();
        } else {
          console.log(`Role ${userRole} checkbox not found`);
        }
      }
    }

    if (user.role.length != 0 ) {
    const roles = user.role.split(", "); // spliting roles to find button one by one.
      checkUserRoleBoxes(roles);
    }

    const activeStatus = document.querySelectorAll('input[name="status"]');
    if (activeStatus !== undefined) {
      if (user.status == "Active") {
        activeStatus[1].click();
      } else {
        activeStatus[0].click();
      }
    } else {
      console.log("Status field not found");
    }

    const notify = document.getElementById("edit-notify");
    // notify.click();

    const changePass = document.getElementById("edit-force-password-change");
    if (changePass !== undefined) {
      changePass.click();
    } else {
      console.log("Force password change field not found");
    }

    const password = document.getElementById("edit-pass-pass1");
    if (password !== undefined) {
      password.value = passwordValue;
    } else {
      console.log("Password field not found");
    }

    const ConfirmPassword = document.getElementById("edit-pass-pass2");
    if (ConfirmPassword !== undefined) {
      ConfirmPassword.value = passwordValue;
    } else {
      console.log("Confirm Password field not found");
    }

    const submit = document.getElementById("edit-submit");
    if (submit !== undefined) {
      submit.click();
      const data = { message: "Hello from JavaScript!" };

      fetch("http://127.0.0.1:5000/receive-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("Submit button not found");
    }

    // Use MutationObserver to wait until the document is ready after form submission
    const observer = new MutationObserver((mutations, obs) => {
      // Check if the document is ready for the next user
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        obs.disconnect();
        setTimeout(resolve, 2000);
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  });
}