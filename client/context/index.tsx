import React, {useContext, createContext, ReactNode } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, SmartContract } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext<{
    address: string | undefined;
    contract: SmartContract<ethers.BaseContract> | undefined;
    IssueCertificate: (form: any) => Promise<void>;
  } | undefined>(undefined);

export const StateContextProvider = ( {children} : any) =>{
    const {contract} = useContract('0xC8fd6C46217a92ec2783Bf33b3e3daA2D6016149');
    const { mutateAsync: IssueCertificate } = useContractWrite(contract, 'IssueCertificate');
    
    const address = useAddress();
    const connect = useMetamask();
    
    const PublishCertificate = async (form : any) => {
       try {
        const data = await IssueCertificate({
            args:[
                address,
                form.title,
                form.description,
                form.recipientName
            ]});
    
            console.log(data);
            
       } catch (error) {
        console.log(error);
       } 
    }  

    return (
        <StateContext.Provider 
            value={{
                address,
                contract,
                IssueCertificate : PublishCertificate,
            }}
        >
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);