import React from "react";
import TaxForm from "../components/forms/TaxForm";
import "./TaxPage.css";

const TaxPage = () => {
  return (
    <div className="taxPage">
      <div className="heading">
        Manage Tax
      </div>

      <TaxForm />
    </div>
  );
};

export default TaxPage;
