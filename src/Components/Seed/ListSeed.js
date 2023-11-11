import React from "react";
import {Link} from "react-router-dom";
import ReactPaginate from 'react-paginate'
import Seed from "./Seed";


class ListSeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 2
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.seeds.length / this.state.size);
        const seeds = this.getSeedPage(offset, nextPageOffset);
        console.log(seeds, pageCount)

        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Seed Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {seeds}
                            </tbody>
                        </table>
                    </div>
                    <div className="col mb-3">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <Link className={"btn btn-block btn-dark"} to={"/seed/add"}>Add new seed</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactPaginate previousLabel={"back"}
                               nextLabel={"next"}
                               breakLabel={<a href="/#">...</a>}
                               breakClassName={"break-me"}
                               pageClassName={"ml-1"}
                               pageCount={pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination m-4 justify-content-center"}
                               activeClassName={"active"}/>
            </div>
        )
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        console.log(selected)
        this.setState({
            page: selected
        })
    }

    getSeedPage = (offset, nextPageOffset) => {
        console.log(offset, nextPageOffset)
        return this.props.seeds.map((term, index) => {
            return (
                <Seed term={term} onEdit={this.props.onEditSeed}/>
            );
        }).filter((seed, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }
};

export default ListSeed;