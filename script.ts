interface ResumeData {
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  education: string;
  experience: string;
  skills: string;
}

function generateResume(): void {
  // Get form data from the HTML elements
  const name = (document.getElementById("name") as HTMLInputElement)?.value;
  const email = (document.getElementById("email") as HTMLInputElement)?.value;
  const phone = (document.getElementById("phone") as HTMLInputElement)?.value;
  const profilePictureInput = document.getElementById(
    "profilePicture"
  ) as HTMLInputElement;
  const education = (
    document.getElementById("education") as HTMLTextAreaElement
  )?.value;
  const experience = (
    document.getElementById("experience") as HTMLTextAreaElement
  )?.value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement)
    ?.value;
  const username = (document.getElementById("username") as HTMLInputElement)
    ?.value;

  // Validate if all the fields are filled
  if (!name || !email || !phone || !education || !experience || !skills || !username) {
    alert("Please fill in all fields!");
    return;
  }

  // Handle profile picture
  const profilePictureFile = profilePictureInput.files?.[0];
  const profilePictureURL = profilePictureFile
    ? URL.createObjectURL(profilePictureFile)
    : "";

  // Create an object based on the interface
  const resumeData: ResumeData = {
    name: name,
    email: email,
    phone: phone,
    profilePicture: profilePictureURL,
    education: education,
    experience: experience,
    skills: skills,
  };

  // Display the resume in the "resumeOutput" div
  const resumeOutputDiv = document.getElementById("resumeOutput");

  if (resumeOutputDiv) {
    resumeOutputDiv.innerHTML = `
      <h2>Generated Resume</h2>
      <p><strong>Name:</strong> <span id="editableName" contenteditable="true">${
        resumeData.name
      }</span></p>
      <p><strong>Email:</strong> <span id="editableEmail" contenteditable="true">${
        resumeData.email
      }</span></p>
      <p><strong>Phone:</strong> <span id="editablePhone" contenteditable="true">${
        resumeData.phone
      }</span></p>
      ${
        profilePictureURL
          ? `<img src="${profilePictureURL}" class="profilePicture" alt="Profile Picture" />`
          : ""
      }
      <p><strong>Education:</strong> <span id="editableEducation" contenteditable="true">${
        resumeData.education
      }</span></p>
      <p><strong>Experience:</strong> <span id="editableExperience" contenteditable="true">${
        resumeData.experience
      }</span></p>
      <p><strong>Skills:</strong> <span id="editableSkills" contenteditable="true">${
        resumeData.skills
      }</span></p>
    `;

    // --- Generate sharable link ---
    const sharableLink = `https://yourdomain.com/resumes/${username.replace(/\s+/g, '_')}_cv.html`;
    resumeOutputDiv.innerHTML += `<p>Sharable Link: <a href="${sharableLink}" target="_blank">${sharableLink}</a></p>`;

    // Generate PDF but don't download yet
    const { jsPDF } = window['jspdf'];

    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.setFontSize(16);
    pdf.text('Generated Resume', 10, 10);

    pdf.setFontSize(12);
    pdf.text(`Name: ${resumeData.name}`, 10, 20);
    pdf.text(`Email: ${resumeData.email}`, 10, 30);
    pdf.text(`Phone: ${resumeData.phone}`, 10, 40);
    pdf.text(`Education: ${resumeData.education}`, 10, 50);
    pdf.text(`Experience: ${resumeData.experience}`, 10, 60);
    pdf.text(`Skills: ${resumeData.skills}`, 10, 70);

    // Add profile picture to PDF if available
    if (profilePictureURL) {
      const img = new Image();
      img.src = profilePictureURL;
      img.onload = () => {
        pdf.addImage(img, 'JPEG', 10, 80, 50, 50);
        showDownloadButton(pdf, `${username.replace(/\s+/g, '_')}_resume.pdf`);
      };
    } else {
      showDownloadButton(pdf, `${username.replace(/\s+/g, '_')}_resume.pdf`);
    }
  } else {
    console.error("Resume output container not found");
  }
}

// Function to show the download button
function showDownloadButton(pdf: any, filename: string) {
  const resumeOutputElement = document.getElementById("resumeOutput");
  const downloadButton = document.createElement("button");
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
document.getElementById("resumeForm")?.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from refreshing the page
  generateResume(); // Call the resume generation function
});
