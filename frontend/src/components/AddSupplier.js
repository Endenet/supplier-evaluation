import React, { useState } from 'react';
import { addSupplier } from '../api/supplierApi';
import "../styles/SupplierForm.css";
import { useAuth } from '../context/AuthContext'; // ✅ Import Auth context to check role

const AddSupplier = ({ setActiveTab }) => {
    const { user } = useAuth(); // ✅ Access user info
    const [formData, setFormData] = useState({
        externalSupplierId: '',
        supplierName: '',
        contactEmail: '',
        phoneNumber: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addSupplier(formData)
            .then(response => {
                alert('Supplier added successfully');
                setFormData({
                    externalSupplierId: '',
                    supplierName: '',
                    contactEmail: '',
                    phoneNumber: '',
                    address: ''
                });
                setActiveTab("list"); // 👈 Switch to list tab
            })
            .catch(error => console.error('Error adding supplier:', error));
    };

    // ✅ Restrict access based on user role
    if (user?.role !== 'admin') {
        return <p>You do not have permission to add suppliers.</p>; // Or return null for a silent block
    }

    return (
        <div>
            <h2>Add Supplier</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="externalSupplierId"
                    placeholder="External Supplier ID"
                    onChange={handleChange}
                    value={formData.externalSupplierId}
                    required
                />
                <input
                    name="supplierName"
                    placeholder="Name"
                    onChange={handleChange}
                    value={formData.supplierName}
                    required
                />
                <input
                    name="contactEmail"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.contactEmail}
                />
                <input
                    name="phoneNumber"
                    placeholder="Phone"
                    onChange={handleChange}
                    value={formData.phoneNumber}
                />
                <input
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    value={formData.address}
                />
                <button type="submit">Add Supplier</button>
            </form>
        </div>
    );
};

export default AddSupplier;
