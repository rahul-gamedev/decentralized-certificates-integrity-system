// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CertificateManager {

    struct Certificate
    {
        address recipient;
        uint256 key;
        bytes32 id;
        string title;
        string description;
        string recipientName;
    }

    struct Organization
    {
        address owner;
        string name;
        string typeOfOrganization;
        string website;
        string email;
    }


    uint256 certificateCount = 0;
    mapping(bytes32 => Certificate) Certificates;
 
    mapping(address => Organization) Organizations;
    mapping(address => bool) IsOrganizations;

    event CertificateIssued(bytes32 hash);

    function IssueCertificate (address _address, string memory _title, string memory _description, string memory _recipientName)  public returns (bytes32)
    {
        certificateCount++;
        bytes32 hash = sha256(abi.encodePacked(certificateCount));
        Certificates[hash] = Certificate(_address, certificateCount, hash, _title, _description, _recipientName);
        emit CertificateIssued(hash);
        return hash;
    }

    function VerifyCertificate (bytes32 hash) public view returns(bool isVerified, Certificate memory)
    {
        if(Certificates[hash].id > 0)
        {
            return (true, Certificates[hash]);
        }
        else
        {
            return (false, Certificates[hash]);
        }
    }

    function CreateOrganization(address _owner, string memory _name, string memory _typeOfOrganization, string memory _website, string memory _email) public
    {
        Organizations[_owner] = Organization(_owner, _name, _typeOfOrganization, _website, _email);
        IsOrganizations[_owner] = true;
    }

    function isOrganization(address _address) public view returns(bool)
    {
        return IsOrganizations[_address]; 
    }
}