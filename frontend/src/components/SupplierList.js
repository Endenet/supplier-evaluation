import React, { useState, useEffect } from 'react';
import { getAllSuppliers, deleteSupplierById } from '../api/supplierApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Import AuthContext
import "../styles/SupplierForm.css";

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth(); // ✅ Get current user

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await getAllSuppliers();
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleEdit = (supplierId) => {
        navigate(`/edit/${supplierId}`);
    };

    const handleDelete = async (supplierId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this supplier?');
        if (!confirmDelete) return;

        try {
            await deleteSupplierById(supplierId);
            setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.supplierID !== supplierId));
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };

    return (
        <div>
            <h2>Supplier List</h2>
            {suppliers.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>External Supplier ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            {user?.role === "admin" && <th>Actions</th>} {/* ✅ Show Actions only for admin */}
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(supplier => (
                            <tr key={supplier.supplierID}>
                                <td>{supplier.externalSupplierId}</td>
                                <td>{supplier.supplierName}</td>
                                <td>{supplier.contactEmail}</td>
                                <td>{supplier.phoneNumber}</td>
                                <td>{supplier.address}</td>
                                {user?.role === "admin" && (
                                    <td>
                                        <button onClick={() => handleEdit(supplier.supplierID)}>Edit</button>
                                        <button onClick={() => handleDelete(supplier.supplierID)}>Delete</button>
                                    </td>
                                )} {/* ✅ Buttons shown only for admin */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No suppliers found.</p>
            )}
        </div>
    );
};

export default SupplierList;
