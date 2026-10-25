import React from "react";

const supportTopics = [
"Online Account Opening",
"Offline Account Opening",
"Company, Partnership and HUF Account Opening",
"NRI Account Opening",
"Charges at Zerodha",
"Zerodha IDFC FIRST Bank 3-in-1 Account",
"Getting Started",
];

function CreateTicket() {
const topicStyle = {
textDecoration: "none",
lineHeight: "2.5",
color: "#387ed1",
};

return (
<div className="container">
<div className="row p-5 mt-5 mb-5">
<h1 className="fs-2">
To create a ticket, select a relevant topic
</h1>
  {Array.from({ length: 6 }, (_, index) => (
      <div
        className="col-12 col-md-6 col-lg-4 p-4 mt-2 mb-2"
        key={index}
      >
        <h4>
          <i
            className="fa fa-plus-circle"
            aria-hidden="true"
          />{" "}
          Account Opening
        </h4>

        {supportTopics.map((topic) => (
          <React.Fragment key={topic}>
            <span style={topicStyle}>{topic}</span>
            <br />
          </React.Fragment>
        ))}
      </div>
    ))}
  </div>
</div>
);
}

export default CreateTicket;