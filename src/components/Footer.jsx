export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      
      <div className="footer-links">
        <a href="https://github.com/beata-teck" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/beata-tefera-kebede" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="mailto:batatefera7@gmail.com">Email</a>
      </div>
    </footer>
  );
}