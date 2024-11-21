import { useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";

const Quotation = () => {
    const [vehicles, setVehicles] = useState([]);
    const [customerInfo, setcustomerInfo] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [tax, setTax] = useState(18); 
    const [discount, setDiscount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            const { data, error } = await supabase.from("vehicles").select();
            if (!error) setVehicles(data);
        };
        fetchVehicles();
        const fetchCustomers = async () => {
            const { data, error } = await supabase.from("customer_requirements").select();
            if (!error) setcustomerInfo(data);
        };
        fetchCustomers();
    }, []);

    const handleVehicleChange = (vehicleId) => {
        const vehicle = vehicles.find((v) => v.id === parseInt(vehicleId));
        setSelectedVehicle(vehicleId);
        setSelectedVehicleDetails(vehicle);
    };

    console.log(customerInfo, "customerInfo")

    const handleGenerate = async () => {
        if (!selectedVehicleDetails) {
            alert("Please select a vehicle.");
            return;
        }

        const vehiclePrice = selectedVehicleDetails.price;
        const taxes = (vehiclePrice * tax) / 100;
        const totalPrice = vehiclePrice + taxes - discount;
        setFinalPrice(totalPrice);

        
        try {
            const { error } = await supabase.from("quotations").insert([
                {
                    vehicle_id: selectedVehicleDetails.id,
                    price: vehiclePrice,
                    taxes,
                    discount,
                    final_price: totalPrice,
                },
            ]);

            if (error) {
                console.error("Error saving quotation:", error.message);
                alert("Failed to save the quotation. Please try again.");
            } else {
                alert("Quotation saved successfully!");
            }
        } catch (err) {
            console.error("Unexpected error while saving:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    };


    return (
        <div className="h-[500px] flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Generate Quotation</h1>

                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Vehicle</label>
                    <select
                        className="w-full p-2 border rounded"
                        onChange={(e) => handleVehicleChange(e.target.value)}
                    >
                        <option value="">Select Vehicle</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.name} - {vehicle.model} (${vehicle.price})
                            </option>
                        ))}
                    </select>
                </div>

                
                {selectedVehicleDetails && (
                    <div className="mb-4 p-4 bg-gray-100 rounded">
                        <h2 className="text-lg font-semibold mb-2">Vehicle Details</h2>
                        <p><strong>Name:</strong> {selectedVehicleDetails.name}</p>
                        <p><strong>Model:</strong> {selectedVehicleDetails.model}</p>
                        <p><strong>Base Price:</strong> ${selectedVehicleDetails.price}</p>
                    </div>
                )}

                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Percentage (%)</label>
                    <input
                        type="number"
                        value={tax}
                        onChange={(e) => setTax(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Amount ($)</label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                    />
                </div>

               
                <button
                    onClick={handleGenerate}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Generate Quotation
                </button>

                
                {finalPrice > 0 && (
                    <div className="mt-6 p-4 bg-green-100 rounded text-center">
                        <h2 className="text-lg font-bold">Final Quotation</h2>
                        <p><strong>Final Price:</strong> ₹{finalPrice.toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quotation;
