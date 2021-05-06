import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import FirebaseService from '../services/FirebaseService';

class dojavaLista extends Component {

  constructor(props) {
    super(props);
    this.state = {dojava: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  
  componentDidMount = () => {
    FirebaseService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount = () => {
    FirebaseService.getAll().off("value", this.onDataChange);
  }

  onDataChange = (items) => {
    console.log(items);
    let dojava = [];
    items.forEach(item => {
      let data = item.val();
      dojava.push({
        key: item.key,
        vrijeme_dojave: data.vrijeme_dojave,
        vrsta_nesrece: data.vrsta_nesrece,
        broj_ozljedenih: data.broj_ozljedenih,
        broj_mobitela: data.broj_mobitela,
        ime: data.ime,
        prezime: data.prezime
      });
    });

    this.setState({
      dojava: dojava,
      isLoading: false
    });
  }

  async remove(key) {
    FirebaseService.delete(key)
    .then(() => {
      let updatedDojava = [...this.state.dojava].filter(i => i.key !== key);
      this.setState({dojava: updatedDojava});
    });
  }

  render() {
    const {dojava, isLoading} = this.state;

    if (isLoading) {
      return <p>Učitavanje stranice...</p>;
    }

    const dojavaLista = dojava.map(dojava => {
      return <tr key={dojava.key}>
        <td style={{whiteSpace: 'nowrap'}}>{dojava.vrijeme_dojave}</td>
        <td>{dojava.vrsta_nesrece}</td>
        <td>{dojava.broj_ozljedenih}</td>
        <td>{dojava.broj_mobitela}</td>
        <td>{dojava.ime}</td>
        <td>{dojava.prezime}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/dojava/" + dojava.key}>Uredi</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(dojava.key)}>Izbriši</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/dojava/new">Dodaj dojavu</Button>
          </div>
          <h3>Lista dojava</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>Vrijeme dojave</th>
                <th>Vrsta nesrece</th>
                <th> Broj ozljedenih</th>
                <th>Broj mobitela</th>
                <th width="10%">Ime</th>
                <th width="10%">Prezime</th>
                <th width="10%">Akcije</th>
              </tr>
            </thead>
            <tbody>
            {dojavaLista}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default dojavaLista;