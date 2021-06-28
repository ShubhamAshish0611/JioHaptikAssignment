import React, { Component } from "react";
import { DeleteSVGIcon, EmptyStarSVGIcon, FilledStarSVGIcon } from "./svgIcon";
import "./index.scss";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsArray: [
        {
          "name": "Shubham",
          "isFav": false
        },
        {
          "name": "Saurav",
          "isFav": false
        },
        {
          "name": "Akanksha",
          "isFav": false
        }
      ],
      currentPage: 1,
      listPerPage: 4,
      cloneList: null
    }
  }

  handlePagination(e, number) {
    this.setState({
      currentPage: Number(number)
    });
  }

  addToList(e) {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0 && e.target.value.trim().length > 0) {
        this.setState(prevState => ({
          friendsArray: [{
            "name": e.target.value.trim(),
            "isFav": false
          },
          ...prevState.friendsArray],
          currentPage: 1
        }), () => {
          e.target.value = "";
        })
      } else {
        alert("Please enter a valid name.");
      }
    }
  }

  addToFav(index) {
    let newIndex = (this.state.currentPage - 1) * this.state.listPerPage + index;
    let tempList = [...this.state.friendsArray];
    if(tempList[newIndex].isFav === false) {
      tempList[newIndex] = { ...tempList[newIndex], "isFav": true };
    } else {
      tempList[newIndex] = { ...tempList[newIndex], "isFav": false };
    }
    tempList.sort((firstItem, secondItem) => secondItem.isFav - firstItem.isFav);
    this.setState({ friendsArray: tempList, currentPage: 1 });
  }

  deleteFriend(index) {
    let newIndex = (this.state.currentPage - 1) * this.state.listPerPage + index;
    let tempList = [...this.state.friendsArray];
    tempList.splice(newIndex, 1);    
    this.setState({ friendsArray: tempList, currentPage: 1 });
  }

  cloneData(e) {
    this.setState({ cloneList: this.state.friendsArray });
  }

  recloneData(e) {
    e.target.value = "";
    this.setState({ friendsArray: this.state.cloneList });
  }

  searchFriends(e) {
    const keyword = e.target.value;
    const data = this.state.cloneList;
    const filtered = data.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));
    this.setState({ friendsArray: filtered })
  }

  render() {
    const { friendsArray, currentPage, listPerPage } = this.state;
    const indexOfLastFriendList = currentPage * listPerPage;
    const indexOfFirstFriendList = indexOfLastFriendList - listPerPage;
    const currentTodos = friendsArray.slice(indexOfFirstFriendList, indexOfLastFriendList);

    const renderFriendList = currentTodos.map((friendsArray, index) => {
      return <div key={`key${index}`} className="float-left w-100 p-8 friendsListItem border-bottom-1 flex-box align-items-center justify-content-between">
        <div className="flex-box flex-column float-left">
          <h6 className="mb-4 float-left">{friendsArray.name}</h6>
          <span className="float-left friendListItemText">is your friend</span>
        </div>
        <div className="float-left flex-box flex-wrap">
          <div className="float-left p-4 flex-box align-items-center justify-content-center mr-10 border-1 startSvg" onClick={() => this.addToFav(index)} >
            {friendsArray.isFav === true ? <FilledStarSVGIcon /> : <EmptyStarSVGIcon />}
          </div>
          <div className="float-left p-4 flex-box align-items-center justify-content-center border-1 deleteSvg"
            onClick={() => this.deleteFriend(index)}>
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
          className={`${this.state.currentPage === number ? "active" : ""} float-left p-10 mr-5 mb-5 border-1`}
          onClick={(e) => this.handlePagination(e, number)}
        >
          {number}
        </li>
      );
    });

    return (
      <div className="float-left w-100 friendsParent border-1">
        <div className="float-left w-100 p-8 friendsHeader">
          <h5 className="m-0 float-left">Friends List</h5>
          <input type="text" placeholder="Search Friend" onBlur={(e) => this.recloneData(e)} onFocus={(e) => this.cloneData(e)} onChange={(e) => this.searchFriends(e)} />
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
        {this.state.friendsArray.length > 4 ?
          <ul className="float-left w-100 p-5 m-0 pageNumbers">
            {renderPageNumbers}
          </ul> : null
        }
      </div>
    )
  }
}

export default FriendList;
