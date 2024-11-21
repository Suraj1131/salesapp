import { useState } from "react";
import supabase from "../utils/supabaseClient";

const CustomerForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async () => {
    const { error } = await supabase.from("customer_requirements").insert({
      customer_name: customerName,
      contact_info: contactInfo,
      budget,
    });
    if (error) alert(error.message);
    else {
      alert("Customer requirement saved!");
      
      setCustomerName("");
      setContactInfo("");
      setBudget("");
    }
  };

  return (
    <div className="h-[500px] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Log Customer Requirements
        </h1>

        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name
          </label>
          <input
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Info
          </label>
          <input
            type="text"
            placeholder="Enter contact info"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget (₹)
          </label>
          <input
            type="number"
            placeholder="Enter budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save Requirement
        </button>
      </div>
    </div>
  );
};

export default CustomerForm;
