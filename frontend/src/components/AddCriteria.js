import React, { useState } from "react";
import { addCriteria } from "../api/criteriaApi";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth context

const AddCriteria = ({ setActiveTab, onAdd }) => {
  const [criteriaData, setCriteriaData] = useState({
    externalCriteriaId: "",
    criteriaName: "",
    description: "",
    saat_rating: "",
  });

  const { user } = useAuth(); // ✅ Get current user

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteriaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCriteria = await addCriteria(criteriaData);
      onAdd(newCriteria); // notify parent
      setCriteriaData({
        externalCriteriaId: "",
        criteriaName: "",
        description: "",
        saat_rating: "",
      });
      if (setActiveTab) setActiveTab("list");
    } catch (error) {
      console.error("Error adding criteria:", error);
    }
  };

  if (user?.role !== "admin") {
    return (
      <div>
        <h3>Access Denied</h3>
        <p>You do not have permission to add criteria.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Criteria</h3>
      <input
        type="text"
        name="externalCriteriaId"
        placeholder="External Criteria ID"
        value={criteriaData.externalCriteriaId}
        onChange={handleChange}
        required
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
      <button type="submit">Add Criteria</button>
    </form>
  );
};

export default AddCriteria;
