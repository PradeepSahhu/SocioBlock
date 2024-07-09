// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FactoryContract {
    struct FriendInfo {
        string name;
        address friendAddress;
        uint age;
        string message;
        string date;
    }

    FriendInfo[] public friends;
    mapping(address => bool) public inFriendList;

    constructor() {}

    function addFriend(
        string memory _date,
        string memory _name,
        address _friendAddress,
        uint age,
        string memory _message
    ) external {
        require(!inFriendList[_friendAddress], "Friend is already added");
        friends.push(FriendInfo(_name, _friendAddress, age, _message, _date));
        inFriendList[_friendAddress] = true;
    }

    function getFriends() external view returns (uint) {
        return friends.length;
    }

    function getAllFriends() external view returns (FriendInfo[] memory) {
        return friends;
    }
}
