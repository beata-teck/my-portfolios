import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className="contact-page">
      <h1>Get in Touch</h1>
      <p>
        Have a question, project idea, or just want to say hi? Fill out the form
        below and I’ll get back to you soon.
      </p>
      <ContactForm />
    </div>
  );
}