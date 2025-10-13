export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      
      <div className="footer-links">
        <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="mailto:your.email@example.com">Email</a>
      </div>
    </footer>
  );
}