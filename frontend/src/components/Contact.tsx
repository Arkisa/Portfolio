export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <header className="section-head">
        <h2 className="section-kicker" data-jp="連絡先">Reach Out</h2>
      </header>

      <div className="contact-wrap contact-wrap--info">
        <div className="contact-intro">
          <p>Have a project, a role, or just want to say hello? Reach out through
             any of the channels below!</p>
          <a href="mailto:arquizacrisjoseph@gmail.com" className="btn btn-primary">Email Me</a>
        </div>

        <ul className="contact-meta">
          <li><span>Email</span> <a href="mailto:arquizacrisjoseph@gmail.com">arquizacrisjoseph@gmail.com</a></li>
          <li><span>Location</span> <a href="https://www.google.com/maps/place/Cebu+City,+Cebu,+Philippines" target="_blank" rel="noopener noreferrer">Cebu City, Philippines</a></li>
          <li><span>Available for</span> Freelance &amp; part-time</li>
        </ul>
      </div>
    </section>
  );
}
