import React from "react";

// Test Display
const test = [
  { date: "2020-12-21", comment: "Test1" },
  { date: "2020-12-21", comment: "Test2" },
  { date: "2020-12-21", comment: "Test3" },
];

const ActivityLog = (props) => {
  return (
    <>
      <h2>Activity Log</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {test.map((activity, index) => (
            <tr key={index}>
              <td>{activity.date}</td>
              <td>{activity.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ActivityLog;
