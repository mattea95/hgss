import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';


class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div title>Nazovi 112 ili prijavi nesreću na gumb ispod</div>
          <div className>
            <Button color="danger" tag={Link} to="/dojava/new">Prijavi nesreću</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;