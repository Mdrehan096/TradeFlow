import React, { useState } from "react";

import Hero from "./Hero";
import CreateTicket from "./CreateTicket";

function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CreateTicket searchQuery={searchQuery} />
    </>
  );
}

export default SupportPage;
