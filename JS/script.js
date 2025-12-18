const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(nav => nav.classList.remove("active"));
        link.classList.add("active");
    });
});

function sendEmail() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const time = new Date().toLocaleString();

    console.log("Form values:", { name, email, subject, message });

    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }
    emailjs.send("service_h91tuch","template_r8x3guu",{
        subject: subject,
        name: name,
        time: time,
        message: message,
        email: email,
    }) 
        .then((response) => {
            console.log("Email sent successfully! Response:", response);
            alert("Thank you for contacting me! I will get back to you shortly.");
            document.getElementById("contact-form").reset();
        })
        .catch((error) => {
            console.error("Email sending error:", error);
            alert("Failed to send email. Please check the browser console for details.\nError: " + (error.text || error.message));
        });
}
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    sendEmail();
});
