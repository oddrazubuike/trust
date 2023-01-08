import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Resolution from "@unstoppabledomains/resolution";


const resolution = new Resolution();

const ResolveDomain = () => {

  const [showModal, setShowModal] = useState(false);

  const [beneficiary, setBeneficiary] = useState("");
  const [info, setInfo] = useState("");

  const [submitted, setSubmitted] = useState(false);

  function resolve(domain, currency) {
      resolution
        .addr(domain, currency)
        .then((address) => setInfo(address))
        .catch(console.error);
  }



  const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!beneficiary) return;
    const response = resolve(beneficiary, "ETH");
    setInfo(response);
    // console.log(response);

    setSubmitted(true);
  };

  const clearForm = () => {
    setBeneficiary("");
  };

  const show = () => {
    setShowModal(true);
  };

  const hide = () => {
    setShowModal(false);
  };

  useEffect(() => {
    
  }, [info])
  

  return (
    <>
      <button
        onClick={show}
      >
       Discover Domains
      </button>
      {showModal ? (
        <div className="fixed top-80px left-0  right-0 bg-white/[0.5] flex justify-center text-center z-1">
          <div className="bg-white pt-2 pb-2 px-10 rounded-3xl h-fit text-black self-center">
            <h2 className="text-l font-bold p-5">Enter Domain name</h2>

            <div className="mb-2 flex flex-col">
              <label
                className="label mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 cursor-text text-sm self-start"
              >
               Domain
              </label>
              <input
                className="input border border-gray-400 appearance-none rounded-xl w-full px-3 py-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                id="beneficiary"
                type="text"
                onChange={(e) => setBeneficiary(e.target.value)}
              />
            </div>

            {/* <p className="text-red-400 mb-6 text-xs">Disabled inputs are highlighted in red.</p> */}
            <button
              className="text-lg font-meduim bg-black text-white py-3 px-8 self-start mx-3 mt-4 border-none rounded-full disabled:bg-gray-800 disabled:text-gray-100"
              onClick={(e) => {handleSubmit(e); hide()}}
              disabled={submitted}
            >
              Submit
            </button>
            <button
              className="text-lg font-semibold bg-gray-200 py-3 px-8 self-start mx-3 mt-4 border-none rounded-full disabled:bg-gray-400 disabled:text-gray-800"
              onClick={hide}
              disabled={submitted}
            >
              Close
            </button>
          </div>
        </div>
      ) : (submitted && <div className="fixed top-150px left-0 right-0 bg-white/[0.5] flex justify-center text-center z-1">
            <div className="bg-white pt-2 pb-8 px-10 rounded-3xl h-fit text-black self-center">
              <h2 className="text-l font-bold p-5">Resolve Domain</h2>

              <div className="mb-2 flex flex-col">
      
                <p>{info}</p>
              </div>

              
              <button
                className="text-lg font-semibold bg-gray-200 py-3 px-8 self-start mx-3 mt-4 border-none rounded-full disabled:bg-gray-400 disabled:text-gray-800"
                onClick={() => {setSubmitted(false); hide()}}
              >
                Close
              </button>
            </div>
          </div>)}
      {/* {submitted && (
        <CheckAllowanceAndAddLegacy
          info={info}
        />
      )} */}
    </>
  );
};

export default ResolveDomain;