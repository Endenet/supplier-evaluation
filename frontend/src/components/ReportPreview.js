import React from 'react';

const ReportPreview = ({ report }) => {
  if (!report) return <div className="report-preview">No report selected.</div>;

  const {
    title,
    prepared_by,
    purpose,
    objective,
    final_recommendation,
    date,
    evaluation_data,
  } = report;

  return (
    <div className="report-preview">
      <h2>{title}</h2>
      <p><strong>Prepared by:</strong> {prepared_by}</p>
      <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>Purpose:</strong> {purpose}</p>
      <p><strong>Objective:</strong> {objective}</p>
      <p><strong>Final Recommendation:</strong> {final_recommendation}</p>

      {/* Evaluation Data Summary */}
      <h3>Evaluation Data Summary</h3>
      <ul>
        <li><strong>Criteria:</strong> {evaluation_data.criteria?.length}</li>
        <li><strong>Criteria Comparison:</strong> {evaluation_data.criteria_comparison?.length}</li>
        <li><strong>Criteria Weights:</strong> {evaluation_data.criteria_weights?.length}</li>
        <li><strong>Suppliers:</strong> {evaluation_data.suppliers?.length}</li>
        <li><strong>Supplier Evaluations:</strong> {evaluation_data.supplier_evaluations?.length}</li>
        <li><strong>Supplier Comparison:</strong> {evaluation_data.supplier_comparison?.length}</li>
        <li><strong>Supplier Weights:</strong> {evaluation_data.supplier_weights?.length}</li>
        <li><strong>Supplier Scores:</strong> {evaluation_data.supplier_scores?.length}</li>
      </ul>

      {/* Displaying detailed evaluation data */}

      {/* Criteria Details */}
      <h3>Criteria Details</h3>
      <ul>
        {evaluation_data.criteria.map((criteria, index) => (
          <li key={index}>
            <strong>{criteria.criteriaName}</strong>: {criteria.description} <br />
            <em>Rating: {criteria.saat_rating}</em>
          </li>
        ))}
      </ul>

      {/* Criteria Comparison */}
      <h3>Criteria Comparison</h3>
      <ul>
        {evaluation_data.criteria_comparison.map((comparison, index) => (
          <li key={index}>
            <strong>{comparison['criteria Name1']} vs {comparison['criteria Name2']}</strong>: {comparison.comparisonValue}
          </li>
        ))}
      </ul>

      {/* Criteria Weights */}
      <h3>Criteria Weights</h3>
      <ul>
        {evaluation_data.criteria_weights.map((weight, index) => (
          <li key={index}>
            <strong>{weight['Criteria Name']}</strong>: {weight.weight}
          </li>
        ))}
      </ul>

      {/* Supplier Evaluations */}
      <h3>Supplier Evaluations</h3>
      <ul>
        {evaluation_data.supplier_evaluations.map((evaluation, index) => (
          <li key={index}>
            <strong>{evaluation['Supplier Name']}</strong> - {evaluation.criteria}: {evaluation.rating} <br />
            <em>Evaluation Date: {new Date(evaluation.evaluationDate).toLocaleDateString()}</em>
          </li>
        ))}
      </ul>

      {/* Supplier Comparison */}
      <h3>Supplier Comparison</h3>
      <ul>
        {evaluation_data.supplier_comparison.map((comparison, index) => (
          <li key={index}>
            <strong>{comparison['Supplier Name1']} vs {comparison['Supplier Name2']}</strong>: {comparison.comparisonValue} <br />
            <em>Criteria: {comparison.criteria}</em>
          </li>
        ))}
      </ul>

      {/* Supplier Weights */}
      <h3>Supplier Weights</h3>
      <ul>
        {evaluation_data.supplier_weights.map((weight, index) => (
          <li key={index}>
            <strong>{weight['Supplier Name']}</strong> - {weight.criteria}: {weight.weight}
          </li>
        ))}
      </ul>

      {/* Supplier Scores */}
      <h3>Supplier Scores</h3>
      <ul>
        {evaluation_data.supplier_scores.map((score, index) => (
          <li key={index}>
            <strong>{score['Supplier Name']}</strong>: {score.totalScore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportPreview;
