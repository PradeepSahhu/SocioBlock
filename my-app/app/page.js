"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import factoryABI from "../artifacts/contracts/Factory.sol/FactoryContract.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [socials, setSocials] = useState(undefined);
  const [friendNumber, setFriendNumber] = useState(undefined);

  const [friendList, setFriendList] = useState();

  // for adding friend.

  const [name, setName] = useState();
  const [friendAddress, setAddress] = useState();
  const [age, setAge] = useState();
  const [message, setMessage] = useState();
  const [date, setDate] = useState();

  const socialContractInstance = "0x97346e8420A94fD5bd0f0DFa8cc015e9268384c1";
  const factory = factoryABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getsocialsContract();
  };

  const getsocialsContract = () => {
    // const provider = new ethers.providers.Web3Provider(ethWallet);
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const socialsContract = new ethers.Contract(
      socialContractInstance,
      factory,
      signer
    );

    setSocials(socialsContract);
  };

  const addNewFriend = async () => {
    try {
      if (socials) {
        console.log(name, typeof name);
        console.log(friendAddress, typeof friendAddress);
        console.log(parseInt(age), typeof age);
        console.log(message, typeof message);
        console.log(date, typeof date);
        const tx = await socials.addFriend(
          date,
          name,
          friendAddress,
          parseInt(age),
          message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFriends = async () => {
    try {
      if (socials) {
        const friends = await socials.getAllFriends();
        setFriendList(friends);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFriendcount = async () => {
    try {
      if (socials) {
        const fCount = await socials.getFriends();
        setFriendNumber(fCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this socials.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button
          onClick={connectAccount}
          className="text-xl bg-gradient-to-r from-rose-600 via-indigo-600 to-cyan-500 rounded-xl pt-5 pb-4 px-6"
        >
          Please connect your Metamask wallet
        </button>
      );
    }

    if (friendNumber == undefined) {
      getFriendcount();
    }

    if (friendList == undefined) {
      getFriends();
    }

    return (
      <div className="text-2xl m-8">
        <p className="">
          Your Address :{" "}
          <span className="bg-gradient-to-r from-rose-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            {" "}
            {account}
          </span>
        </p>
        <p className="">
          Contract Address :
          <span className="bg-gradient-to-r from-rose-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            {" "}
            {socialContractInstance}
          </span>
        </p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div>
      <div>
        <p className="justify-center flex font-bold text-4xl  mt-5">
          <span className="bg-gradient-to-r from-rose-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            {" "}
            SocioBlock
          </span>
        </p>
        <p className="flex justify-center m-2 font-thin">
          An Amazing way to Connect with Friends on blockchain
        </p>
      </div>
      <div className="justify-center flex">{initUser()}</div>

      <div className=" bg-black text-white grid grid-cols-2 m-10">
        <form className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
          <div className="flex justify-center mb-5">
            <p className="text-2xl font-bold text-white text-transparent">
              Add Friend
            </p>
          </div>
          <label className="grid col-start-1 col-end-1 ">Enter the Name</label>
          <input
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="grid col-start-1 col-end-1 ">
            Enter Friend Address
          </label>
          <input
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className="grid col-start-1 col-end-1 ">
            Enter Friend Age
          </label>
          <input
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            onChange={(e) => setAge(e.target.value)}
          />
          <label className="grid col-start-1 col-end-1 ">
            Enter the message
          </label>
          <input
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            onChange={(e) => setMessage(e.target.value)}
          />
          <label className="grid col-start-1 col-end-1 ">Enter the date</label>
          <input
            type="Date"
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            onChange={(e) => setDate(e.target.value)}
          />
        </form>

        <div className="flex justify-center col-span-2 items-center py-5 ">
          <button
            className="bg-gradient-to-r from-rose-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent p-5 rounded-xl "
            onClick={() => addNewFriend()}
          >
            Add a New Friend
          </button>
        </div>
      </div>
      <div className="flex  justify-center">
        <button
          className="text-2xl flex justify-center font-extralight py-4 rounded-xl "
          onClick={getFriends}
        >
          Show Friends
        </button>
      </div>

      {friendList && (
        <>
          <div className="mx-auto max-w-7xl pt-40 px-6" id="exchange-section">
            <div className="table-b bg-navyblue p-8 overflow-x-auto">
              <h3 className="text-offwhite text-2xl justify-center flex">
                Friend List
              </h3>
              <table className="table-auto w-full mt-10">
                <thead>
                  <tr className="text-white bg-darkblue rounded-lg">
                    <th className="px-4 py-4 text-start font-normal">S.no</th>
                    <th className="px-4 py-4 text-start font-normal">Name</th>
                    <th className="px-4 py-4 font-normal">Friend Address</th>
                    <th className="px-4 py-4 font-normal">age</th>
                    <th className="px-4 py-4 font-normal">Message</th>
                    <th className="px-4 py-4 font-normal">Added Date</th>
                  </tr>
                </thead>
                <tbody>
                  {friendList.map((eachFriend, i) => (
                    <tr key={i} className="border-b border-b-darkblue">
                      <td className="px-4 py-6 text-center text-white">
                        {i + 1}
                      </td>

                      <td className="px-4 py-6 text-center text-white">
                        {eachFriend.name}
                      </td>
                      <td className={`px-4 py-6 text-center `}>
                        {eachFriend.friendAddress}
                      </td>
                      <td className="px-4 py-6 text-center text-white">
                        {parseInt(eachFriend.age)}
                      </td>
                      <td className={`px-4 py-6 text-center `}>
                        {eachFriend.message}
                      </td>
                      <td className={`px-4 py-6 text-center `}>
                        {eachFriend.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
