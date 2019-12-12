import React from "react"
import {Link, withRouter} from "react-router-dom"
import {connect} from "react-redux";

const Nav = ({ }) => {
    return (
        <nav class="navbar navbar-default">
            <Link to="/" class="navbar-brand">RangeMe</Link>
        </nav>
    );
};
const mapStoreToProps = (store) => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}
export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Nav))


