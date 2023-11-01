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

    uint256 certificateCount = 0;

    mapping(bytes32 => Certificate) Certificates;

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
}