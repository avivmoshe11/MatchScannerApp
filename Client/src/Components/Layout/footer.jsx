import '../../Styles/footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <span>MATCH SCANNER</span>
      <span className="mx-1">&copy;</span>
      <span>{new Date().getFullYear()}</span>
    </div>
  );
};

export default Footer;
