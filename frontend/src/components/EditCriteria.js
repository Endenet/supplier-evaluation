import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // To get the externalId from the URL
import { getCriteriaByExternalId, updateCriteriaByExternalId } from '../api/criteriaApi';

const EditCriteria = () => {
  const { externalId } = useParams(); // Get externalId from URL params
  const navigate = useNavigate();
  const [criteriaData, setCriteriaData] = useState({
    externalCriteriaId: '',
    criteriaName: '',
    description: '',
    saat_rating: '',
  });

  // Fetch the criteria data for editing
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const data = await getCriteriaByExternalId(externalId);
        setCriteriaData(data);
      } catch (error) {
        console.error('Error fetching criteria for editing:', error);
      }
    };
    fetchCriteria();
  }, [externalId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteriaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCriteriaByExternalId(externalId, criteriaData);
      navigate('/criteria'); // Redirect to the criteria list after update
    } catch (error) {
      console.error('Error updating criteria:', error);
    }
  };

  return (
    <div>
      <h1>Edit Criteria</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="externalCriteriaId"
          placeholder="External Criteria ID"
          value={criteriaData.externalCriteriaId}
          onChange={handleChange}
          disabled
        />
        <input
          type="text"
          name="criteriaName"
          placeholder="Criteria Name"
          value={criteriaData.criteriaName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={criteriaData.description}
          onChange={handleChange}
          required
        />
        <select
          name="saat_rating"
          value={criteriaData.saat_rating}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Saat Rating</option>
          <option value="1">1: Equal importance</option>
          <option value="3">3: Moderate importance</option>
          <option value="5">5: Strong importance</option>
          <option value="7">7: Very strong importance</option>
          <option value="9">9: Extreme importance</option>
        </select>
        <button type="submit">Update Criteria</button>
      </form>
    </div>
  );
};

export default EditCriteria;
