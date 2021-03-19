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
        <td>{description}</td>
        <td>{name}</td>
        <td>{username}</td>
        <td>{answeredOn}</td>
        <td>
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
          <th scope="col">Question</th>
          <th scope="col">Category</th>
          <th scope="col">Answered By</th>
          <th scope="col">Answered On</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>{answerRows}</tbody>
    </table>
  );
};

export default answersTable;
