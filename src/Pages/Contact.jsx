import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className="contact-page">
      <h1>Get in Touch</h1>
      <p>
        Have a question, project idea, or just want to say hi? Fill out the form
        below and I’ll get back to you soon.
      </p>

      <p className="contact-note">
        Or reach me directly at{" "}
        <a href="mailto:batatefera7@gmail.com">batatefera7@gmail.com</a> or through
        my socials below!
      </p>

      <div className="socials">
        <a href="https://github.com/beata-teck/" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/beata-tefera-kebede-b23717350/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://t.me/@bata1t" target="_blank" rel="noreferrer">
          Telegram
        </a>
      </div>

      {/* Optional floating stars background */}
      <div className="stars-container">
        <div className="stars"></div>
      </div>

      <ContactForm />
    </div>
  );
}