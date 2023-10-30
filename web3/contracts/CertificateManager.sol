// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CertificateManager {

    struct Certificate
    {
        uint256 id;
        string title;
        string description;
        string recipientName;
        uint dateOfIssue;
    }

    uint256 certificateCount = 0;

    mapping(uint256 => Certificate) Certificates;

    function IssueCertificate (string memory _title, string memory _description, string memory _recipientName, uint _dateOfIsse)  public
    {
        certificateCount++;
        Certificates[certificateCount] = Certificate(certificateCount, _title, _description, _recipientName, _dateOfIsse);
    }

    function VerifyCertificate (uint256 _id) public view returns(Certificate memory)
    {
        return Certificates[_id];
    }
}