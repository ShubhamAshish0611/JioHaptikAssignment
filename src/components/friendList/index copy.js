import React, { Component } from "react";
import { DeleteSVGIcon, EmptyStarSVGIcon } from "./svgIcon";
import "./index.scss";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsArray: ["Shubham", "Saurav", "Akansha"],
      currentPage: 1,
      listPerPage: 4
    }
    // this.handlePagination = this.handlePagination.bind(this);
  }

  handlePagination(e) {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }

  addToList(e) {
    if(e.keyCode === 13) {
      if (e.target.value.length > 0 && e.target.value.trim().length > 0) {
        this.setState(prevState => ({
          friendsArray: [e.target.value.trim(), ...prevState.friendsArray]
        }), () => {
          e.target.value = "";
        })
      } else {
        console.log("Please enter a valid name.");
      }
    }
  }

  searchFriends(e) {
    console.log("e.target.value", e.target.value);
  }

  render() {
    const { friendsArray, currentPage, listPerPage } = this.state;
    const indexOfLastFriendList = currentPage * listPerPage;
    const indexOfFirstFriendList = indexOfLastFriendList - listPerPage;
    const currentTodos = friendsArray.slice(indexOfFirstFriendList, indexOfLastFriendList);

    const renderFriendList = currentTodos.map((friendsArray, index) => {
      return <div key={`key${index}`} className="float-left w-100 p-8 friendsListItem border-bottom-1 flex-box align-items-center justify-content-between">
      <div className="flex-box flex-column float-left">
        <h6 className="mb-4 float-left">{friendsArray}</h6>
        <span className="float-left friendListItemText">is your friend</span>
      </div>
      <div className="float-left flex-box flex-wrap">
        <div className="float-left p-4 flex-box align-items-center justify-content-center mr-10 border-1 startSvg">
          <EmptyStarSVGIcon />
        </div>
        <div className="float-left p-4 flex-box align-items-center justify-content-center border-1 deleteSvg">
          <DeleteSVGIcon />
        </div>
      </div>
    </div>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(friendsArray.length / listPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          className={`${this.state.currentPage === number ? "active" : ""} float-left p-10 mr-5 border-1`}
          onClick={(e) => this.handlePagination(e)}
        >
          {number}
        </li>
      );
    });

    return (
      <div className="float-left w-100 friendsParent border-1">

        <input type="text" placeholder="Search Box" onChange={(e) => this.searchFriends(e)} />

        <div className="float-left w-100 p-8 friendsHeader">
          <h5 className="m-0 float-left">Friends List</h5>
        </div>
        <div className="float-left w-100 p-8 friendsInput border-bottom-1">
          <input type="text" placeholder="Enter your friend's name"
            onKeyDown={(e) => this.addToList(e)}
            className="float-left w-100"
          />
        </div>
        <div className="float-left w-100 friendsList">
          {renderFriendList}
        </div>
        <ul className="float-left w-100 p-5 m-0 pageNumbers">
          {renderPageNumbers}
        </ul>
      </div>
    )
  }
}

export default FriendList;
