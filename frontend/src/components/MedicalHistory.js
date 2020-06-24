import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'




export default function MedicalHistory({ singleUser }) {

  

  return (
    <React.Fragment>
      <h1 className='title'>Medical History</h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Prescription</TableCell>
            <TableCell>History</TableCell>
            {/* <TableCell align="right"></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {singleUser && singleUser.history.map(history => (
            <TableRow key={history._id}>
              <TableCell>{history.date}</TableCell>
              <TableCell>{history.patient}</TableCell>
              <TableCell>{history.prescription}</TableCell>
              <TableCell>{history.content}</TableCell>
              {/* <TableCell align="right">{row.amount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more history
        </Link>
      </div> */}
    </React.Fragment>
  )
}

