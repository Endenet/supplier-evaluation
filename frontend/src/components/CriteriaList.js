import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCriteria, deleteCriteriaByExternalId } from "../api/criteriaApi";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth context

const CriteriaList = ({ refreshTrigger }) => {
  const [criteriaList, setCriteriaList] = useState([]);
  const { user } = useAuth(); // ✅ Get current user info

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCriteria();
      setCriteriaList(data);
    };
    fetchData();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteCriteriaByExternalId(id);
        setCriteriaList((prev) =>
          prev.filter((item) => item.externalCriteriaId !== id)
        );
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  return (
    <div>
      <h3>Criteria List</h3>
      <table>
        <thead>
          <tr>
            <th>External ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Rating</th>
            {user?.role === "admin" && <th>Actions</th>} {/* ✅ Conditionally render column */}
          </tr>
        </thead>
        <tbody>
          {criteriaList.map((c) => (
            <tr key={c.criteriaID}>
              <td>{c.externalCriteriaId}</td>
              <td>
                <Link to={`/ratings/${c.criteriaID}`}>{c.criteriaName}</Link>
              </td>
              <td>{c.description}</td>
              <td>{c.saat_rating}</td>
              {user?.role === "admin" && (
                <td>
                  <Link to={`/criteria/edit/${c.externalCriteriaId}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(c.externalCriteriaId)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CriteriaList;
