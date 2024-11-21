import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import { jsPDF } from "jspdf";

export default function History() {
  const [history, setHistory] = useState([]);
  const [customerInfo, setcustomerInfo] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null); 

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase.from("quotations").select(`
        id,
        vehicle_id,
        price,
        taxes,
        discount,
        final_price,
        vehicles(name, model)
      `);

      if (data) setHistory(data);
      if (error) console.error(error);
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from("customer_requirements").select();

      if (data) setcustomerInfo(data);
      if (error) console.error(error);
    };

    fetchCustomers();
  }, []);

  const downloadQuotationPDF = (quotation) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Quotation #${quotation.id}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Vehicle: ${quotation.vehicles.name} (${quotation.vehicles?.model})`, 10, 20);
    doc.text(`Base Price: ₹${quotation.price}`, 10, 30);
    doc.text(`Taxes: ₹${quotation.taxes}`, 10, 40);
    doc.text(`Discount: ₹${quotation.discount}`, 10, 50);
    doc.text(`Final Price: ₹${quotation.final_price}`, 10, 60);

    doc.save(`Quotation_${quotation.id}.pdf`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Customer Details</h1>
      {customerInfo.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {customerInfo.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Customer Details {item.id}</h2>
              <p><strong>Customer Name:</strong> {item.customer_name}</p>
              <p><strong>Contact Info:</strong> {item.contact_info}</p>
              <p><strong>Budget:</strong> {item.budget}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No Customer data found.</p>
      )}
      <h1 className="text-3xl font-bold mb-6 mt-5">Quotation History</h1>
      {history.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {history.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md relative">
              <h2 className="text-xl font-semibold mb-2">Quotation #{item.id}</h2>
              <p><strong>Vehicle:</strong> {item.vehicles.name} ({item.vehicles?.model})</p>
              <p><strong>Base Price:</strong> ₹{item.price}</p>
              <p><strong>Taxes:</strong> ₹{item.taxes}</p>
              <p><strong>Discount:</strong> ₹{item.discount}</p>
              <p className="text-lg font-bold mt-2">Final Price: ₹{item.final_price}</p>

              {/* Three dots menu */}
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={() => setMenuOpen(menuOpen === item.id ? null : item.id)}
              >
                &#x22EE; 
              </button>

              {menuOpen === item.id && (
                <div className="absolute top-8 right-2 bg-white border rounded-lg shadow-lg">
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => downloadQuotationPDF(item)}
                  >
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No Quotation data found.</p>
      )}
    </div>
  );
}
