import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSupplierByExternalId, updateSupplierByExternalId } from '../api/supplierApi';
import { useNavigate } from 'react-router-dom';
import "../styles/SupplierForm.css";

const EditSupplier = () => {
    const { externalId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        externalSupplierId: '',  // Include externalSupplierId in the form state
        supplierName: '',
        contactEmail: '',
        phoneNumber: '',
        address: ''
    });

    useEffect(() => {
        getSupplierByExternalId(externalId)
            .then(response => {
                setFormData(response.data);  // Set all the data, including externalSupplierId
            })
            .catch(error => console.error('Error fetching supplier:', error));
    }, [externalId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSupplierByExternalId(externalId, formData)
            .then(() => {
                alert('Supplier updated successfully');
                navigate('/suppliers'); // Redirect to supplier list after update
            })
            .catch(error => console.error('Error updating supplier:', error));
    };

    return (
        <div>
            <h2>Edit Supplier</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    name="externalSupplierId" 
                    value={formData.externalSupplierId} 
                    onChange={handleChange} 
                    required 
                    placeholder="External Supplier ID"  // Allow editing externalSupplierId
                />
                <input 
                    name="supplierName" 
                    value={formData.supplierName} 
                    onChange={handleChange} 
                    required 
                    placeholder="Supplier Name"
                />
                <input 
                    name="contactEmail" 
                    value={formData.contactEmail} 
                    onChange={handleChange} 
                    placeholder="Contact Email"
                />
                <input 
                    name="phoneNumber" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    placeholder="Phone Number"
                />
                <input 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    placeholder="Address"
                />
                <button type="submit">Update Supplier</button>
            </form>
        </div>
    );
};

export default EditSupplier;
