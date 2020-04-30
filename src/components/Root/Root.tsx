import React from 'react';
// import axios from 'axios';
import { Shell } from '../Shell';

interface IState {
    data: string;
}

export class Root extends React.Component<any, IState> {
    // state = {
    //     data: '',
    // };

    // componentDidMount = () => {
    //     this.getData();
    // };

    // getData = async () => {
    //     const res = await axios.get('https://some-resource.validitylabs.org');
    //     this.setState({ data: res.data });
    // };

    render() {
        // if (this.state.data) {
        //     console.log(this.state.data);
        // }
        return <Shell />;
    }
}
