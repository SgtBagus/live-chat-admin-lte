import React from 'react'
import PropTypes from 'prop-types';

import { CapitalizeFirstLetter } from '../Helper/helper';

const RenderActionButton = (actionButton, data) => {
    const {
        view: { enabled: enabledView, onClick: onClickView },
        edit: { enabled: enabledEdit, onClick: onClickEdit },
        delete: { enabled: enabledDelete, onClick: onClickDelete },
    } = actionButton;

    return (
        <td>
            <div className="btn-group">
                {
                    enabledView && (
                        <button type="button" className="btn btn-primary" onClick={() => onClickView(data)}>
                            <i className="fas fa-eye fa-xs" />
                        </button>
                    )
                }
                {
                    enabledEdit && (
                        <button type="button" className="btn btn-info" onClick={() => onClickEdit(data)}>
                            <i className="fas fa-edit fa-xs" />
                        </button>
                    )
                }
                {
                    enabledDelete && (
                        <button type="button" className="btn btn-danger" onClick={() => onClickDelete(data)}>
                            <i className="fas fa-trash fa-xs" />
                        </button>
                    )
                }
            </div>
        </td>
    )
}

const RenderTableData = (tabelHead, coloumnData, actionButton) => {
    return coloumnData.map((x, idx) => {
        return (
            <tr key={idx}>
                {
                    tabelHead.map(({key, Cell}, indexColoumn) => (
                        <td key={indexColoumn}>
                            {
                                Cell ? (
                                    Cell(x[key])
                                ) : (
                                    x[key]
                                )
                            }
                        </td>
                    ))
                }
                {
                    actionButton && RenderActionButton(actionButton, x)
                }
            </tr>
        )
    })
}

const Tabel = ({
    title, dataMeta: { tabelHead, coloumnData }, actionButton,
}) => {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{ title }</h3>
        </div>

        <div className="card-body table-responsive p-0">
          <table className="table table-head-fixed text-nowrap">
            <thead>
              <tr>
                {
                    tabelHead.map(({ title: tileTabel }, idx) => (
                        <th key={idx}>{CapitalizeFirstLetter(tileTabel)}</th>
                    ))
                }
                {
                    actionButton && (<th>Action</th>)
                }
              </tr>
            </thead>
            <tbody>
                {RenderTableData(tabelHead, coloumnData, actionButton)}
            </tbody>
          </table>
        </div>
      </div>
    );
}

Tabel.propTypes = {
    title: PropTypes.string,
    dataMeta: PropTypes.shape({
        tabelHead: PropTypes.arrayOf(
            PropTypes.shape()
        ),
        coloumnData: PropTypes.arrayOf(
            PropTypes.shape()
        )
    }),
    actionButton: PropTypes.shape({
        view: PropTypes.shape({
            enabled: PropTypes.bool,
            onClick: PropTypes.func,
        }),
        edit: PropTypes.shape({
            enabled: PropTypes.bool,
            onClick: PropTypes.func,
        }),
        delete: PropTypes.shape({
            enabled: PropTypes.bool,
            onClick: PropTypes.func,
        }),
    })
};

Tabel.defaultProps = {
    title: 'Tabel Title',
    dataMeta: {
        tabelHead: [
            {
                key: 'ID',
                title: 'Id',
                Cell: () => {},
            },
            {
                key: 'User',
                title: 'User',
                Cell: () => {},
            },
            {
                key: 'Date',
                title: 'Date',
                Cell: () => {},
            },
            {
                key: 'Status',
                title: 'Status',
                Cell: () => {},
            },
            {
                key: 'Reason',
                title: 'Reason',
                Cell: () => {},
            },
        ],
        coloumnData: [
            {
                ID: '183',
                User: 'John Doe',
                Date: '11-7-2014',
                Status: <span className="badge bg-success">Approved</span>,
                Reason: 'Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.',
            },
        ],
    },
    actionButton: null,
};

export default Tabel;