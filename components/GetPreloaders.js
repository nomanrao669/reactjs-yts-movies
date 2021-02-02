import React, { Component } from "react";
import AndroidKitkat from "./Preloaders/PreLoaders";

export default class GetPreloaders extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const components = {
            androidkitkat: AndroidKitkat
        }
        let LoaderName = components[this.props.Loader];

        return (
            <div id="AJAXLoader" className={this.props.loader}>
                <LoaderName />
            </div>
        );
    }
}