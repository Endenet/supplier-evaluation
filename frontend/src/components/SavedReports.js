import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllReports } from '../api/reportApi'; // ✅ updated to named import

const SavedReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getAllReports(); // ✅ updated function usage
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading saved reports...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Reports</h1>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report) => (
            <li key={report.id} className="border p-4 rounded shadow-sm hover:bg-gray-50">
              <h2 className="text-xl font-semibold">{report.title}</h2>
              <p className="text-sm text-gray-600">Prepared by: {report.prepared_by}</p>
              <p className="text-sm text-gray-600">Date: {report.date}</p>
              <Link
                to={`/reports/${report.id}`}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                View Report →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedReports;
