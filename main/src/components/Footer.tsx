export default function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; <span id="year">{new Date().getFullYear()}</span> dev.godspell</p>
    </footer>
  );
}