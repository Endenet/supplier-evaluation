import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReportById } from '../api/reportApi'; // ✅ Correct named import

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReportById(id); // ✅ Correct function usage
        setReport(data);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) return <p>Loading report...</p>;
  if (!report) return <p>Report not found.</p>;

  const {
    title,
    prepared_by,
    purpose,
    objective,
    date,
    final_recommendation,
    evaluation_data
  } = report;

  return (
    <div className="p-6">
      <Link to="/reports" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Reports</Link>

      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-1">Prepared by: {prepared_by}</p>
      <p className="text-gray-600 mb-4">Date: {date}</p>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Purpose</h2>
        <p>{purpose}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Objective</h2>
        <p>{objective}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Final Recommendation</h2>
        <p>{final_recommendation}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-3">Evaluation Data</h2>

        {/* Criteria */}
        {evaluation_data.criteria?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Criteria</h3>
            <ul className="space-y-1">
              {evaluation_data.criteria.map((c, index) => (
                <li key={index} className="bg-gray-50 p-2 rounded">
                  <strong>{c.criteriaName}</strong> — {c.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Criteria Comparison */}
        {evaluation_data.criteria_comparison?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Criteria Comparison</h3>
            <ul className="space-y-1">
              {evaluation_data.criteria_comparison.map((c, index) => (
                <li key={index} className="bg-gray-50 p-2 rounded">
                  {c['criteria Name1']} vs {c['criteria Name2']} — Value: {c.comparisonValue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Criteria Weights */}
        {evaluation_data.criteria_weights?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Criteria Weights</h3>
            <ul className="space-y-1">
              {evaluation_data.criteria_weights.map((w, index) => (
                <li key={index} className="bg-gray-50 p-2 rounded">
                  {w['Criteria Name']}: {w.weight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Supplier Evaluations */}
        {evaluation_data.supplier_evaluations?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Supplier Evaluations</h3>
            <ul className="space-y-1">
              {evaluation_data.supplier_evaluations.map((e, index) => (
                <li key={index} className="bg-gray-50 p-2 rounded">
                  {e['Supplier Name']} | {e.criteria}: {e.rating} (Date: {e.evaluationDate})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Supplier Comparison */}
        {evaluation_data.supplier_comparison?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Supplier Comparison</h3>
            <ul className="space-y-1">
              {evaluation_data.supplier_comparison.map((sc, index) => (
                <li key={index} className="bg-gray-50 p-2 rounded">
                  {sc['Supplier Name1']} vs {sc['Supplier Name2']} ({sc.criteria}) — Value: {sc.comparisonValue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Supplier Weights */}
        {evaluation_data.supplier_weights?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Supplier Weights</h3>
            <ul className="space-y-1">
              {evaluation_data.supplier_weights.map((sw, index) => (
                <li key={index} className="bg-gray-50 p-2 rounded">
                  {sw['Supplier Name']} | {sw.criteria} — Weight: {sw.weight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Supplier Scores */}
        {evaluation_data.supplier_scores?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Final Supplier Scores</h3>
            <ul className="space-y-1">
              {evaluation_data.supplier_scores.map((score, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded">
                  {score['Supplier Name']} — Total Score: {score.totalScore}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
