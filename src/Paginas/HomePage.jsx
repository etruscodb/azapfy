import React from "react";
import "./HomePage.css";
import { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Api from "../Api/Api";
import Modal from "../componentes/modal";
import { getElementError } from "@testing-library/dom";

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      regiao: "",
      paises: [],
      modal: true,
      paisescolhido: [],
      selecionar: [],
    };
    this.pesquisar = this.pesquisar.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.buscar = this.buscar.bind(this);
    this.selecionar = this.selecionar.bind(this);
  }

  componentDidMount() {
    axios.get(`https://restcountries.eu/rest/v2/all`).then((res) => {
      const pais = res.data;
      this.setState({ paises: pais });
    });
  }

  pesquisar(e) {
    if (e.target.value === "") {
      axios.get(`https://restcountries.eu/rest/v2/all`).then((res) => {
        const pais = res.data;
        this.setState({ paises: pais });
      });
    } else {
      const name = e.target.value;

      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}/`)
        .then((res) => {
          const pais = res.data;
          this.setState({ paisescolhido: pais });
        });
    }
  }

  buscar() {
    this.setState({ paises: this.state.paisescolhido });
  }

  selecionar(e) {
    if (e && e.target.value === "") {
      axios.get(`https://restcountries.eu/rest/v2/all`).then((res) => {
        const pais = res.data;
        this.setState({ paises: pais });
      });
    }
    const regiao = this.state.regiao;

    console.log(regiao);
    if (regiao === "") {
      return;
    }
    axios
      .get(`https://restcountries.eu/rest/v2/region/${regiao}`)
      .then((res) => {
        const pais = res.data;
        this.setState({ paises: pais });
      });
  }

  handleSelect(e) {
    this.setState({ regiao: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="Header">
          <h1
            style={{ marginTop: "8px", color: "#4169E1", marginLeft: "30px" }}
          >
            BANCO DE PAÍSES
          </h1>
          <div className="pesquisar">
            <input
              type="text"
              style={{
                marginRight: "10px",
                height: "20px",
                borderRadius: "10px",
              }}
              onChange={(e) => this.pesquisar(e)}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ height: "25px", marginRight: "20px" }}
              onClick={this.buscar}
            >
              PESQUISAR
            </Button>
          </div>

          <div>
            <form className="form" />
            <select name="regioes" onChange={this.handleSelect}>
              <option value="" selected></option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            <input type="submit" value="Enviar" onClick={this.selecionar} />
          </div>
        </div>

        <div className="principal">
          {this.state.paises.map(function (e) {
            return (
              <Card className="card">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Card"
                    height="140"
                    image={e.flag}
                    title="Card"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {e.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    ></Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions></CardActions>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HomePage;
