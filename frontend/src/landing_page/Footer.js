import React from "react";
import { Link } from "react-router-dom";

function Footer() {
const textStyle = {
textDecoration: "none",
color: "#6c757d",
};

const inactiveLinkStyle = {
...textStyle,
display: "inline-block",
lineHeight: "1.8",
};

return (
<footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
<div className="container border-top mt-5">
<div className="row mt-5">
<div className="col">
<img
src="/media/images/logo.svg"
alt="TradeFlow logo"
style={{ width: "50%" }}
/>
<p>
© 2010 - 2024, Not Zerodha Broking Ltd. All rights reserved.
</p>
</div>
<div className="col">
        <p>Company</p>
        <Link to="/about" style={textStyle}>About</Link>
        <br />
        <Link to="/product" style={textStyle}>Products</Link>
        <br />
        <Link to="/pricing" style={textStyle}>Pricing</Link>
        <br />
        <span style={inactiveLinkStyle}>Referral programme</span>
        <br />
        <span style={inactiveLinkStyle}>Careers</span>
        <br />
        <span style={inactiveLinkStyle}>Zerodha.tech</span>
        <br />
        <span style={inactiveLinkStyle}>Press &amp; media</span>
        <br />
        <span style={inactiveLinkStyle}>Zerodha cares (CSR)</span>
      </div>

      <div className="col">
        <p>Support</p>
        <span style={inactiveLinkStyle}>Contact</span>
        <br />
        <Link to="/support" style={textStyle}>Support portal</Link>
        <br />
        <span style={inactiveLinkStyle}>Z-Connect blog</span>
        <br />
        <span style={inactiveLinkStyle}>List of charges</span>
        <br />
        <span style={inactiveLinkStyle}>Downloads &amp; resources</span>
      </div>

      <div className="col">
        <p>Account</p>
        <Link to="/signup" style={textStyle}>Open an account</Link>
        <br />
        <span style={inactiveLinkStyle}>Fund transfer</span>
        <br />
        <span style={inactiveLinkStyle}>60 day challenge</span>
      </div>
    </div>

    <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
      <p>
        Zerodha Broking Ltd.: Member of NSE &amp; BSE – SEBI Registration
        no.: INZ000031633 CDSL: Depository services through Zerodha
        Securities Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015
        Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025
        – SEBI Registration no.: INZ000038238 Registered Address: Zerodha
        Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence
        Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka,
        India. For any complaints pertaining to securities broking please
        write to complaints@zerodha.com, for DP related to dp@zerodha.com.
        Please ensure you carefully read the Risk Disclosure Document as
        prescribed by SEBI | ICF
      </p>

      <p>
        Procedure to file a complaint on SEBI SCORES: Register on SCORES
        portal. Mandatory details for filing complaints on SCORES: Name,
        PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
        Communication, Speedy redressal of the grievances.
      </p>

      <p>
        Investments in securities market are subject to market risks; read
        all the related documents carefully before investing.
      </p>

      <p>
        Prevent unauthorised transactions in your account. Update your
        mobile numbers/email IDs with your stock brokers. Receive
        information of your transactions directly from Exchange on your
        mobile/email at the end of the day. Issued in the interest of
        investors. KYC is one time exercise while dealing in securities
        markets - once KYC is done through a SEBI registered intermediary
        (broker, DP, Mutual Fund etc.), you need not undergo the same
        process again when you approach another intermediary. Dear
        Investor, if you are subscribing to an IPO, there is no need to
        issue a cheque. Please write the Bank account number and sign the
        IPO application form to authorize your bank to make payment in case
        of allotment. In case of non allotment the funds will remain in your
        bank account. As a business we don't give stock tips, and have not
        authorized anyone to trade on behalf of others. If you find anyone
        claiming to be part of Zerodha and offering such services, please
        create a support ticket.
      </p>
    </div>
  </div>
</footer>
);
}

export default Footer;