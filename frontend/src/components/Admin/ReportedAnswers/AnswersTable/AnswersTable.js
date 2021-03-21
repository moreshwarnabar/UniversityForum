import React from 'react';

const answersTable = props => {
  const answerRows = props.answers?.map(ans => {
    const {
      id,
      question: {
        description,
        category: { name },
      },
      answerBy: { username },
      answeredOn,
    } = ans;
    return (
      <tr key={id}>
        <td className="align-middle">{description}</td>
        <td className="align-middle">{name}</td>
        <td className="align-middle">{username}</td>
        <td className="align-middle">{answeredOn}</td>
        <td className="align-middle">
          <button
            type="button"
            className="btn btn-sm btn-info"
            onClick={props.clicked}
            data-answerid={id}
          >
            View
          </button>
        </td>
      </tr>
    );
  });

  return props.isNoReports ? (
    <p>No answers reported</p>
  ) : (
    <table className="table table-bordered table-hover table-striped table-dark text-center">
      <thead className="thead-light">
        <tr>
          <th scope="col" className="align-middle">Question</th>
          <th scope="col" className="align-middle">Category</th>
          <th scope="col" className="align-middle">Answered By</th>
          <th scope="col" className="align-middle">Answered On</th>
          <th scope="col" className="align-middle">Action</th>
        </tr>
      </thead>
      <tbody>{answerRows}</tbody>
    </table>
  );
};

export default answersTable;
