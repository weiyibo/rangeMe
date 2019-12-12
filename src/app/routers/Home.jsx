import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Home = ({ }) => {
    return (
        <div className="content">

        </div>
    )
}


const mapStoreToProps = (store, props) => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}
export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Home))
