import React, { useState } from 'react';
import { searchSupplierById } from '../api/supplierApi'; // Ensure this API method uses externalSupplierId
import "../styles/SupplierForm.css";

const SearchSupplier = () => {
    const [externalSupplierId, setExternalSupplierId] = useState('');
    const [results, setResults] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setExternalSupplierId(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error message

        searchSupplierById(externalSupplierId) // This function should search by externalSupplierId
            .then(response => {
                setResults(response.data); // Set the results
            })
            .catch(error => {
                console.error('Error searching supplier:', error); // Log the error for debugging
                setResults(null); // Clear results if there's an error
                setErrorMessage('Error occurred while searching supplier. Please try again.'); // Set a user-friendly error message
            });
    };

    return (
        <div>
            <h2>Search Supplier by External ID</h2>
            <form onSubmit={handleSearch}>
                <input 
                    name="externalSupplierId" 
                    placeholder="External Supplier ID" 
                    value={externalSupplierId}
                    onChange={handleChange} 
                />
                <button type="submit">Search</button>
            </form>

            {errorMessage && <p>{errorMessage}</p>}  {/* Display error message if exists */}

            {results ? (
                <table>
                    <thead>
                        <tr>
                            <th>External Supplier ID</th> {/* Updated to External Supplier ID */}
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={results.externalSupplierId}>
                            <td>{results.externalSupplierId}</td>
                            <td>{results.supplierName}</td>
                            <td>{results.contactEmail}</td>
                            <td>{results.phoneNumber}</td>
                            <td>{results.address}</td>
                        </tr>
                    </tbody>
                </table>
            ) : externalSupplierId && !errorMessage && (
                <p>No supplier found.</p>  // Display this if there are no results and no error message
            )}
        </div>
    );
};

export default SearchSupplier;
