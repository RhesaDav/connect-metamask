import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

export default function ConnectMetamask() {
  const { activate, account, active, chainId, deactivate } = useWeb3React();

  const [network, setNetwork] = useState();
  const [showModal, setShowModal] = useState(false);

  const injector = new InjectedConnector({
    supportedChainIds: [1, 3, 4],
  });

  const switchNetwork = async () => {
    const toHex = `0x${Number(network).toString(16)}`;
    console.log(toHex);
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex }],
    });
    setShowModal(false);
  };

  const handleSelectNetwork = (e) => {
    setNetwork(e.target.value);
  };

  const connectMetamask = async () => {
    await activate(injector);
  };

  const disconnectMetamask = async () => {
    await deactivate(injector);
  };

  return (
    <div>
      <div className="flex flex-col items-center py-32 justify-center">
        <div className="border p-10 flex items-center flex-col">
          {active ? (
            <div>
              <table className="table-auto border-collapse">
                <tr>
                  <td className="border border-black p-2">Account : </td>
                  <td className="border border-black p-2">{account}</td>
                </tr>
                <tr>
                  <td className="border border-black p-2">Chain Id : </td>
                  <td className="border border-black p-2">{chainId}</td>
                </tr>
                <tr>
                  <td className="border border-black p-2">Network : </td>
                  <td className="border border-black p-2">
                    {chainId === 1
                      ? "Ethereum Mainnet"
                      : chainId === 3
                      ? "Ropsten"
                      : chainId === 4
                      ? "Rinkenby"
                      : "Not Connected"}
                  </td>
                </tr>
              </table>
            </div>
          ) : (
            <div>Wallet Not Yet Connected, Please Connect Wallet</div>
          )}
          <div className="pt-6">
            {active ? (
              <div>
                <button
                  className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Select Network
                </button>
                <button
                  className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={disconnectMetamask}
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={connectMetamask}
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Select Network</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="flex flex-col justify-center items-center gap-10">
                    <span className="text-xl font-semibold">
                      Your current network is
                      {chainId === 1
                        ? " Ethereum Mainnet"
                        : chainId === 3
                        ? " Ropsten"
                        : chainId === 4
                        ? " Rinkenby"
                        : " Not Connected"}
                    </span>
                    <div className="flex gap-3">
                      <label> Choose Network :</label>
                      <select className="border-b-2 border-gray-500" onChange={handleSelectNetwork}>
                        <option selected hidden value={chainId}>{chainId === 1
                        ? " Ethereum Mainnet"
                        : chainId === 3
                        ? " Ropsten"
                        : chainId === 4
                        ? " Rinkenby"
                        : " Not Connected"}</option>
                      <option value="1">Ethereum Mainnet</option>
                      <option value="3">Ropsten</option>
                      <option value="4">Rinkeby</option>
                    </select>
                    </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={switchNetwork}
                    >
                      Select Network
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  );
}
