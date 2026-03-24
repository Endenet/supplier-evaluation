import React, { useEffect, useState } from 'react'; 
import { getEvaluationsBySupplierId, addEvaluation, updateEvaluation } from '../api/evaluationApi';
import { fetchCriteria, fetchSupplierById } from '../api/evsupplierApi';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/evaluation.css';
import { useAuth } from '../context/AuthContext'; // ✅ Import Auth context

const EvaluationPage = () => {
  const { user } = useAuth(); // ✅ Get current user
  const { supplierId } = useParams(); 
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [newRatings, setNewRatings] = useState({});
  const [supplierInfo, setSupplierInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  useEffect(() => {
    const loadEvaluationsAndCriteria = async () => {
      try {
        setLoading(true);
        const criteriaData = await fetchCriteria();
        const evaluationData = await getEvaluationsBySupplierId(supplierId);
        const supplierData = await fetchSupplierById(supplierId);

        setCriteria(criteriaData);
        setEvaluations(evaluationData);
        setSupplierInfo(supplierData);
      } catch (error) {
        console.error('Error loading evaluations or criteria:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvaluationsAndCriteria();
  }, [supplierId]);

  const handleRatingChange = (criteriaID, rating) => {
    setNewRatings({ ...newRatings, [criteriaID]: rating });
  };

  const handleSubmit = async () => {
    try {
      for (let criteriaID in newRatings) {
        const existingEvaluation = evaluations.find(
          (evaluation) => evaluation.criteriaID === parseInt(criteriaID)
        );

        if (existingEvaluation) {
          await updateEvaluation(existingEvaluation.evaluationID, {
            rating: newRatings[criteriaID],
          });
        } else {
          await addEvaluation({
            supplierID: supplierId,
            criteriaID: parseInt(criteriaID),
            rating: newRatings[criteriaID],
          });
        }
      }

      const updatedEvaluations = await getEvaluationsBySupplierId(supplierId);
      setEvaluations(updatedEvaluations);
      setNewRatings({});
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 3000);
    } catch (error) {
      console.error('Error submitting evaluations:', error);
    }
  };

  const handleDashboardRedirect = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className="page-container">
      <div className="button-group">
        <button onClick={() => navigate(-1)} className="back-button">⬅ Back</button>
        <button onClick={handleDashboardRedirect} className="dashboard-button">🏠 Main Dashboard</button>
      </div>

      <h1>Evaluate {supplierInfo ? supplierInfo.supplierName : supplierId}</h1>

      {showSavedMessage && (
        <div className="success-message">✅ Ratings saved successfully!</div>
      )}

      {loading ? (
        <p>Loading supplier information...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginRight: '20px' }}>
            <h2>Supplier Information</h2>
            {supplierInfo ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{supplierInfo.supplierName}</td>
                    <td>{supplierInfo.contactEmail}</td>
                    <td>{supplierInfo.address}</td>
                    <td>{supplierInfo.phoneNumber}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No supplier information available.</p>
            )}

            <h2>Supplier Ratings</h2>
            <table>
              <thead>
                <tr>
                  <th>Criteria</th>
                  <th>Current Rating</th>
                  <th>Rating Description</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map((criterion) => {
                  const evaluation = evaluations.find(e => e.criteriaID === criterion.criteriaID);
                  return (
                    <tr key={criterion.criteriaID}>
                      <td>{criterion.criteriaName}</td>
                      <td>{evaluation ? evaluation.rating : 'Not Rated'}</td>
                      <td>{evaluation ? (
                        evaluation.rating === 1 ? 'Poor' :
                        evaluation.rating === 3 ? 'Fair' :
                        evaluation.rating === 5 ? 'Good' :
                        evaluation.rating === 7 ? 'Very Good' :
                        'Excellent'
                      ) : 'N/A'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {user?.role === 'admin' && (
            <div style={{ flex: 1 }}>
              <h2>Supplier Ratings for each Criteria</h2>
              <table>
                <thead>
                  <tr>
                    <th>Criteria</th>
                    <th>Current Rating</th>
                    <th>New Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion) => (
                    <tr key={criterion.criteriaID}>
                      <td>{criterion.criteriaName}</td>
                      <td>
                        {evaluations.find((e) => e.criteriaID === criterion.criteriaID)?.rating || 'Not Rated'}
                      </td>
                      <td>
                        <select
                          onChange={(e) => handleRatingChange(criterion.criteriaID, parseInt(e.target.value))}
                        >
                          <option value="">Select Rating</option>
                          {[1, 3, 5, 7, 9].map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleSubmit} className="rating-button">
                Submit and Save Ratings
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EvaluationPage;
