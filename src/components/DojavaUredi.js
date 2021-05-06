import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import FirebaseService from '../services/FirebaseService';

class DojavaUredi extends Component {

  emptyDojava = {
    key: '',
    vrijeme_dojave: '',
    vrsta_nesrece: '',
    broj_ozljedenih: "",
    broj_mobitela: '',
    ime: '',
    prezime: '',

  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyDojava
    };
  }

  componentDidMount = () => {
    let key = this.props.match.params.key
    if (key !== 'new') {
      FirebaseService.get(key).on("value", this.onDataChange);
    }
  }

  componentWillUnmount = () => {
    FirebaseService.getAll().off("value", this.onDataChange);
  }

  
  onDataChange = (item) => {
    let data = item.val();
    let dojava = {
      key: item.key,
      vrijeme_dojave: data.vrijeme_dojave,
      vrsta_nesrece: data.vrsta_nesrece,
      broj_ozljedenih: data.broj_ozljedenih,
      broj_mobitela: data.broj_mobitela,
      ime: data.ime,
      prezime: data.prezime
      
    };

    this.setState({
      item: dojava,
    });
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {item} = this.state;
    let key = this.props.match.params.key
    if (key !== 'new') {
      FirebaseService.update(key, item);
    } else {
      FirebaseService.addDojava(item);
    }

    this.props.history.push('/dojava');
  };

  render = () => {
    const {item} = this.state;
    const title = <h2>{item.key ? 'Uredi postojeću dojavu' : 'Dodaj dojavu'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="vrijeme_dojave">Vrijeme dojave</Label>
            <Input type="time" name="vrijeme_dojave" id="vrijeme_dojave" value={item.vrijeme_dojave || ''}
                   onChange={this.handleChange} autoComplete="vrijeme_dojave"/>
          </FormGroup>
          <FormGroup>
            <Label for="vrsta_nesrece">Vrsta nesreće</Label>
            <Input type="text" name="vrsta_nesrece" id="vrsta_nesrece" value={item.vrsta_nesrece || ''}
                   onChange={this.handleChange} autoComplete="vrsta_nesrece"/>
          </FormGroup>          
          <FormGroup>
            <Label for="broj_ozljedenih">Broj ozljedenih</Label>
            <Input type="number" name="broj_ozljedenih" id="broj_ozljedenih" value={item.broj_ozljedenih || ''}
                   onChange={this.handleChange} autoComplete="broj_ozljedenih"/>
          </FormGroup>
          <FormGroup>
            <Label for="broj_mobitela">Broj mobitela</Label>
            <Input type="text" name="broj_mobitela" id="broj_mobitela" value={item.broj_mobitela || ''}
                   onChange={this.handleChange} autoComplete="broj_mobitela"/>
          </FormGroup>
          <FormGroup>
            <Label for="ime">Ime</Label>
            <Input type="text" name="ime" id="ime" value={item.ime || ''}
                   onChange={this.handleChange} autoComplete="ime"/>
          </FormGroup>
          <FormGroup>
            <Label for="prezime">Prezime</Label>
            <Input type="text" name="prezime" id="prezime" value={item.prezime || ''}
                   onChange={this.handleChange} autoComplete="prezime"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Spremi</Button>{' '}
            <Button color="secondary" tag={Link} to="/dojava">Odustani</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(DojavaUredi);