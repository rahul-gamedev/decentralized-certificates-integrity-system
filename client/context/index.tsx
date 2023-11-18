import {
  SmartContract,
  useAddress,
  useContract,
  useSwitchAccount,
} from "@thirdweb-dev/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Auth {
  address: string | undefined;
  Contract: SmartContract | undefined;
  IsOrg: boolean;
  loading: boolean;
}

export const AuthContext = createContext<Auth | undefined>(undefined);

export const AuthStateProvider = ({ children }: { children: ReactNode }) => {
  const { contract } = useContract(
    "0xE57c3C0b215e674c2fAD9AD857b8f09D48F30D59"
  );

  const _address: string | undefined = useAddress();
  const [IsOrganization, setIsOrganization] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [auth, setAuth] = useState<Auth>({
    address: _address,
    Contract: contract,
    IsOrg: false,
    loading: false,
  });

  useEffect(() => {
    const getOrganization = async () => {
      try {
        setLoading(true);
        console.log(contract);
        if (contract) {
          const data = await contract.call("isOrganization", [_address]);
          setIsOrganization(data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!IsOrganization) {
      getOrganization();
    }

    setAuth({
      address: _address,
      Contract: contract,
      IsOrg: IsOrganization,
      loading: Loading,
    });
  }, [_address, IsOrganization, contract]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const auth = useContext(AuthContext);

  if (auth == undefined) {
    throw new Error("Auth Object Exists..");
  }

  return auth;
};
