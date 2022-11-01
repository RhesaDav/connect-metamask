import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

export default function ConnectMetamask() {
  const {activate, account, active, chainId, deactivate} = useWeb3React()

  const [network,setNetwork] = useState()

  const injector = new InjectedConnector({
    supportedChainIds: [1,3,4]
  })

 const switchNetwork =async () => {
    const toHex = `0x${Number(network).toString(16)}`
    console.log(toHex)
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{chainId: toHex}]
    })
 }

 const handleSelectNetwork = (e) => {
  setNetwork(e.target.value)
 }

  const connectMetamask = async () => {
    await activate(injector)
  }

  const disconnectMetamask = async () => {
    await deactivate(injector)
  }

  return (
    <div>
      {active? (
        <div>
          <div>Account : {account}</div>
          <div>Network: {chainId}</div>
          <button onClick={switchNetwork}>Switch Network</button>
          <select onChange={handleSelectNetwork}>
            <option value="1">Ethereum Mainnet</option>
            <option value="3">Ropsten</option>
            <option value="4">Rinkeby</option>
          </select>
        </div>
      ): (
        <div>
          No Account
        </div>
      )}
      <button onClick={connectMetamask}>Connect</button>
      <button onClick={disconnectMetamask}>DisConnect</button>
    </div>
  )
}
