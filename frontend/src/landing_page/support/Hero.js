import React from "react";

function Hero() {
return (
<section className="container-fluid" id="supportHero">
<div className="p-5" id="supportWrapper">
<h4>Support Portal</h4>
<button
type="button"
className="btn btn-link p-0"
onClick={() => alert("Ticket tracking is not available yet.")}
>
Track Tickets
</button>
</div>

  <div className="row p-5 m-3">
    <div className="col-6 p-3">
      <h1 className="fs-3">
        Search for an answer or browse help topics to create a ticket
      </h1>

      <input
        type="search"
        placeholder="Eg. how do I activate F&O"
        aria-label="Search support topics"
      />

      <br />

      <button type="button" className="btn btn-link p-0">
        Track account opening
      </button>
      <br />

      <button type="button" className="btn btn-link p-0">
        Track segment activation
      </button>
      <br />

      <button type="button" className="btn btn-link p-0">
        Intraday margins
      </button>
      <br />

      <button type="button" className="btn btn-link p-0">
        Kite user manual
      </button>
    </div>

    <div className="col-6 p-3">
      <h1 className="fs-3">Featured</h1>
      <ol>
        <li>
          Current Takeovers and Delisting - January 2024
        </li>
        <li>
          Latest Intraday leverages - MIS &amp; CO
        </li>
      </ol>
    </div>
  </div>
</section>

);
}

export default Hero;