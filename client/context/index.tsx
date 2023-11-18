import { SmartContract, useAddress, useContract } from "@thirdweb-dev/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Auth {
  address: string | undefined;
  contract: SmartContract | undefined;
  IsOrg: boolean;
  loading: boolean;
}

export const AuthContext = createContext<Auth | undefined>(undefined);

export const AuthStateProvider = ({ children }) => {
  const _address: string | undefined = useAddress();
  const _contract = useContract(
    "0xe57c3c0b215e674c2fad9ad857b8f09d48f30d59"
  ).contract;

  const [IsOrganization, setIsOrganization] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [auth, setAuth] = useState<Auth>({
    address: "",
    contract: _contract,
    IsOrg: false,
    loading: true,
  });

  useEffect(() => {
    const getOrganization = async () => {
      try {
        setLoading(true);
        const data = await _contract?.call("isOrganization", [_address]);
        setIsOrganization(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getOrganization();

    setAuth({
      address: _address,
      contract: _contract,
      IsOrg: IsOrganization,
      loading: Loading,
    });
  }, [_address, IsOrganization]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const auth = useContext(AuthContext);

  if (auth == undefined) {
    throw new Error("Auth Object Exists..");
  }

  return auth;
};
