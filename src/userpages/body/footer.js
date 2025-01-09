import React from "react";

function Footer() {
  return (
    <div
      className="bg-[#1F1F1F] text-white p-6 flex flex-col md:flex-row"
      id="contact"
    >
      <div className="flex-1 mb-6 md:mb-0">
        <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
        <ul className="list-none p-0">
          <li>
            <a href="#home" className="footer-link">
              Home
            </a>
          </li>
          <li>
            <a href="#gallery" className="footer-link">
              Gallery
            </a>
          </li>
          <li>
            <a href="#OurRoute" className="footer-link">
              Our Route
            </a>
          </li>
          <li>
            <a href="#contact" className="footer-link">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#terms" className="footer-link">
              Terms & Conditions
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-1 mb-6 md:mb-0">
        <h2 className="text-lg font-semibold mb-2">
          Head Office: Mota devaliya
        </h2>
        <p>Near, Bus Stand, Mota devaliya</p>
        <ul className="list-none p-0">
          <li>
            <a href="tel:9825864672" className="footer-link">
              9825864672
            </a>
          </li>
          <li>
            <a href="tel:9586653535" className="footer-link">
              9586653535
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-1 mb-6 md:mb-0">
        <h2 className="text-lg font-semibold mb-2">Head Office: JASDAN</h2>
        <p>Near, Bus Stand, JASDAN</p>
        <ul className="list-none p-0">
          <li>
            <a href="tel:9909134545" className="footer-link">
              9909134545
            </a>
          </li>
          <li>
            <a href="tel:9879584545" className="footer-link">
              9879584545
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">Head Office: SURAT</h2>
        <p>Shop No.33, Bombay Colony</p>
        <p>Near Valinath Soc, Kapodara-Rachana, Surat</p>
        <ul className="list-none p-0">
          <li>
            <a href="tel:9825450700" className="footer-link">
              9825450700
            </a>
          </li>
          <li>
            <a href="tel:9825805971" className="footer-link">
              9825805971
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
