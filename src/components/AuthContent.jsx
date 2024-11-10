import * as React from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';

export default class AuthContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    };

    componentDidMount() {
        request("GET", "/messages", {})
            .then((response) => {
                // Verifica si response.data es un array
                if (Array.isArray(response.data)) {
                    this.setState({ data: response.data });
                } else {
                    console.error("La respuesta no es un array:", response.data);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    console.error("Error en la solicitud:", error);
                }
            });
    }
    

    render() {
        const { data } = this.state;
    
        return (
            <div className="row justify-content-md-center">
                <div className="col-4">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Backend response</h5>
                            <p className="card-text">Content:</p>
                            <ul>
                                {Array.isArray(data) ? (
                                    data.map((line) => (
                                        <li key={line}>{line}</li>
                                    ))
                                ) : (
                                    <li>No se encontraron datos.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}