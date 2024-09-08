var _a;
function generateResume() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // Get form data from the HTML elements
    var name = (_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.value;
    var email = (_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value;
    var phone = (_c = document.getElementById("phone")) === null || _c === void 0 ? void 0 : _c.value;
    var profilePictureInput = document.getElementById("profilePicture");
    var education = (_d = document.getElementById("education")) === null || _d === void 0 ? void 0 : _d.value;
    var experience = (_e = document.getElementById("experience")) === null || _e === void 0 ? void 0 : _e.value;
    var skills = (_f = document.getElementById("skills")) === null || _f === void 0 ? void 0 : _f.value;
    var username = (_g = document.getElementById("username")) === null || _g === void 0 ? void 0 : _g.value;
    // Validate if all the fields are filled
    if (!name || !email || !phone || !education || !experience || !skills || !username) {
        alert("Please fill in all fields!");
        return;
    }
    // Handle profile picture
    var profilePictureFile = (_h = profilePictureInput.files) === null || _h === void 0 ? void 0 : _h[0];
    var profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";
    // Create an object based on the interface
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        profilePicture: profilePictureURL,
        education: education,
        experience: experience,
        skills: skills,
    };
    // Display the resume in the "resumeOutput" div
    var resumeOutputDiv = document.getElementById("resumeOutput");
    if (resumeOutputDiv) {
        resumeOutputDiv.innerHTML = "\n      <h2>Generated Resume</h2>\n      <p><strong>Name:</strong> <span id=\"editableName\" contenteditable=\"true\">".concat(resumeData.name, "</span></p>\n      <p><strong>Email:</strong> <span id=\"editableEmail\" contenteditable=\"true\">").concat(resumeData.email, "</span></p>\n      <p><strong>Phone:</strong> <span id=\"editablePhone\" contenteditable=\"true\">").concat(resumeData.phone, "</span></p>\n      ").concat(profilePictureURL
            ? "<img src=\"".concat(profilePictureURL, "\" class=\"profilePicture\" alt=\"Profile Picture\" />")
            : "", "\n      <p><strong>Education:</strong> <span id=\"editableEducation\" contenteditable=\"true\">").concat(resumeData.education, "</span></p>\n      <p><strong>Experience:</strong> <span id=\"editableExperience\" contenteditable=\"true\">").concat(resumeData.experience, "</span></p>\n      <p><strong>Skills:</strong> <span id=\"editableSkills\" contenteditable=\"true\">").concat(resumeData.skills, "</span></p>\n    ");
        // --- Generate sharable link ---
        var sharableLink = "https://yourdomain.com/resumes/".concat(username.replace(/\s+/g, '_'), "_cv.html");
        resumeOutputDiv.innerHTML += "<p>Sharable Link: <a href=\"".concat(sharableLink, "\" target=\"_blank\">").concat(sharableLink, "</a></p>");
        // Generate PDF but don't download yet
        var jsPDF = window['jspdf'].jsPDF;
        var pdf_1 = new jsPDF();
        // Add content to the PDF
        pdf_1.setFontSize(16);
        pdf_1.text('Generated Resume', 10, 10);
        pdf_1.setFontSize(12);
        pdf_1.text("Name: ".concat(resumeData.name), 10, 20);
        pdf_1.text("Email: ".concat(resumeData.email), 10, 30);
        pdf_1.text("Phone: ".concat(resumeData.phone), 10, 40);
        pdf_1.text("Education: ".concat(resumeData.education), 10, 50);
        pdf_1.text("Experience: ".concat(resumeData.experience), 10, 60);
        pdf_1.text("Skills: ".concat(resumeData.skills), 10, 70);
        // Add profile picture to PDF if available
        if (profilePictureURL) {
            var img_1 = new Image();
            img_1.src = profilePictureURL;
            img_1.onload = function () {
                pdf_1.addImage(img_1, 'JPEG', 10, 80, 50, 50);
                showDownloadButton(pdf_1, "".concat(username.replace(/\s+/g, '_'), "_resume.pdf"));
            };
        }
        else {
            showDownloadButton(pdf_1, "".concat(username.replace(/\s+/g, '_'), "_resume.pdf"));
        }
    }
    else {
        console.error("Resume output container not found");
    }
}
// Function to show the download button
function showDownloadButton(pdf, filename) {
    var resumeOutputElement = document.getElementById("resumeOutput");
    var downloadButton = document.createElement("button");
    downloadButton.textContent = "Download PDF";
    downloadButton.style.display = "block";
    downloadButton.style.marginTop = "20px";
    downloadButton.style.padding = "10px";
    downloadButton.style.backgroundColor = "blue";
    downloadButton.style.color = "white";
    downloadButton.style.border = "none";
    downloadButton.style.borderRadius = "5px";
    downloadButton.style.cursor = "pointer";
    downloadButton.addEventListener("click", function () {
        pdf.save(filename);
    });
    if (resumeOutputElement) {
        resumeOutputElement.appendChild(downloadButton);
    }
}
// Event listener to handle form submission
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page
    generateResume(); // Call the resume generation function
});
