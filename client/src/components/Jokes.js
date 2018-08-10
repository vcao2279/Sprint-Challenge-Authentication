import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
const jwtDecode = require('jwt-decode');

const Content = styled.div`
    width: 90%;
    margin: auto;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-Size: 14px;
    margin-bottom: 20px;
`

const Table = styled.table`
    // font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
`

const Td = styled.td`
    // border: 1px solid #dddddd;
    border: none;
    text-align: left;
    padding: 8px;
`

const Th = styled.th`
    // border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    // background: #404F50;
    color: #404F50;
    font-size: 18px;
    font-weight: bold;
    // font-family: 'Roboto', Sans-Serif;
`

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #F0F8F8;
    }
    border: none;
`

const Header = styled.h1`
    // font-family: 'Roboto', Sans-Serif;
    font-size: 48px;
    color: #404F50;
`

const Warning = styled.p`
    width: 60%;
    font-size: 16px;
    font-weight: bold;
    color: #E63946;
    margin: 10px auto;
    // font-family: 'Lora', Serif;
    font-Size: 24px;
    text-align: center;
`

const Nav = styled.div`
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    text-align: right;
    background: #404F50;
    color:  #F1FAEE;
    border-radius: 5px;
`
const Button = styled.button`
    background: none;
    color: #F1FAEE;
    border: none;
    cursor: pointer;
    &:hover {
        color: salmon;
    }
    font-weight: bold;
    font-size: 16px;
    font-family: "Comic Sans MS", cursive, sans-serif;
    paddding: 0;
`
class Jokes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            jokes: [],
            isAuthenticated: false
        }
    }

    componentDidMount() {
        this.fetchJokes();
    }

    fetchJokes = async () => {
        const token = localStorage.getItem('token');
        if (!token){
            this.props.history.replace('/login');
        }

        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:5000/api/jokes/',
                headers: { authorization: token }
            });

            const decoded = jwtDecode(token);
            const sortedJokes = response.data.sort((a,b) => a.id - b.id);
            this.setState({
                username: decoded.username,
                jokes: sortedJokes,
                isAuthenticated: true
            });
        } catch (error) {
            this.setState({ isAuthenticated: false });
        }
    }

    onClick = () => {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    render() {
        const jokesTable = (
            <Content>
                <Nav>
                    Welcome! You're logged in as {<span style={{color: '#A8DADC', marginLeft: '4px', marginRight: 'auto'}}>{this.state.username}</span>}
                    <Button onClick = {this.onClick}>Logout</Button>
                </Nav>
                <Header>Jokes List</Header>
                <Table>
                    <thead>
                        <Tr>
                            <Th>No.</Th>
                            <Th>Type</Th>
                            <Th>Setup</Th>
                            <Th>Punchline</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {this.state.jokes.map((joke, index) =>
                            <Tr key={index}>
                                <Td>{joke.id}.</Td>
                                <Td>{joke.type}</Td>
                                <Td>{joke.setup}</Td>
                                <Td>{joke.punchline}</Td>
                            </Tr>)}
                    </tbody>
                </Table>
            </Content>
        );

        const warning = <Warning>
            You are unauthorized to view this content.
            <br />
            Please <Link to='/login' style={{textDecoration: 'none'}}>Sign In</Link>
            </Warning>;

        return (
            <Content>
                {/* {this.state.isAuthenticated ? jokesTable : warning} */}
                {jokesTable}
            </Content>
        );
    }
}

export default Jokes;