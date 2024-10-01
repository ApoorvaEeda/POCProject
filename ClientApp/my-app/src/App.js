import React, { Component } from 'react';
import './MyTableStyles.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tradeItems: [],
      isLoaded: false,
      page: 0,
      rowsPerPage: 10,
      error: null,
      showError: false,
      isPushed: false,
      isSpinner: false
    };
    this.displayTopHundredData = this.displayTopHundredData.bind(this);
    this.pushTopHundredtoDB = this.pushTopHundredtoDB.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  handleChangePage(event, newPage) {
    this.setState({ page: newPage });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: 10, page: this.state.page });
  }

  displayTopHundredData() {
    this.setState({ isSpinner: true })
    fetch('https://localhost:7018/TopHundredTradesController/GetTop')
      .then(res => {
        debugger;
        if (!res.ok) {
          debugger;
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          isLoaded: true,
          showError: false,
          tradeItems: data,
          isSpinner: false
        });
      }).catch(error => {
        this.setState({
          isLoaded: true,
          error: error.message,
          showError: true,
          isSpinner: false
        });
      });
  }

  pushTopHundredtoDB() {
    this.setState({ isSpinner: true })
    fetch('https://localhost:7018/TopHundredTradesController/Add')
      .then(res => {
        if (!res.ok) {
          debugger;
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          isPushed: true,
          showError: false,
          tradeItems: data,
          isSpinner: false
        });
      }).catch(error => {
        this.setState({
          isPushed: false,
          error: error.message,
          showError: true,
          isSpinner: false
        });
      });
  }

  renderErrorPopup() {
    return (
      <div className="errorPopup">
        {this.state.error}
      </div>
    );
  }

  render() {
    const { isLoaded, tradeItems, page, rowsPerPage, isPushed, isSpinner } = this.state;
    if (this.state.showError) {
      return (
        <div>
          {
            this.renderErrorPopup()}
            
          <TableContainer style={{ paddingTop:"3%" }} component={Paper}>
            <Table className="styled-table">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>Could not fetch data to display in table- Please retry once again/Make sure server is running</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }


    if (!isLoaded && !isPushed) {
      return (
        <div>
          <h1 className="styleHeaderElement">Welcome to Top Hundred Trades </h1>
          <h4 className="styleHeaderElement">Click the button to display top hundred trades by Quantity:
            &nbsp;<button className="myButton" variant="contained" onClick={this.displayTopHundredData}>GetTopHundredTradeData</button>
          </h4>
          <h4 className="styleHeaderElement">Click the button to read and insert top hundred trades to Database:
            &nbsp;<button disabled={isPushed} className="myButton" variant="contained" onClick={this.pushTopHundredtoDB}>AddTopHundredTradeData</button>
          </h4>
          {isSpinner ? (<div className="spinner-container">:
            <div className="spinner"></div>
          </div>) : <div></div>}
        </div>
      )
    }

    else {
      return (
        <div>
          <h1 className="styleHeaderElement">Welcome to Top Hundred Trades  </h1>
          {isPushed ? (<h3 className="styleHeaderElement">Data pushed to the database:</h3>) :
            (<h3 className="styleHeaderElement">Todays largest trades by Quantity:</h3>)}
          {isSpinner ? (<div className="spinner-container">:
            <div className="spinner"></div>
          </div>) : <div></div>}

          <TableContainer component={Paper}>
            <Table className="styled-table">
              <TableHead >
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{tradeItems.length > 0 ? (
                tradeItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  <TableRow key={item.Id}>
                    <TableCell>{new Date(item.quote_datetime).toLocaleTimeString([], {
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</TableCell>
                    <TableCell>{item.underlying_symbol}</TableCell>
                    <TableCell>{item.trade_size}</TableCell>
                    <TableCell>{item.trade_price}</TableCell>
                  </TableRow>
                ))) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>No data to display -Push some trade values to DB by clicking PushTopHundredTradeData Button</TableCell>
                </TableRow>
              )
              }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={tradeItems.length}
            page={page}
            onPageChange={this.handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
            rowsPerPageOptions={[10]}
          />
        </div>
      );
    }
  }
}

export default App;
