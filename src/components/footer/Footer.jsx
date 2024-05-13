import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">{year} © Copyright 2024 MyOtobox</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
