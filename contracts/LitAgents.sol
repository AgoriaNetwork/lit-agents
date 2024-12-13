// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LitAgents is ERC721 {
    mapping(uint256 => string) public agentAction;
    mapping(uint256 => string) public agentCharacter;
    mapping(uint256 => address) public agentAddress;

    uint256 public agentCount;

    constructor() ERC721("LitAgents", "LITAI") {}

    function upgradeAgentAction(
        uint256 agentId,
        string memory _agentAction
    ) public {
        require(_ownerOf(agentId) == msg.sender, "No owner of agent");
        agentAction[agentId] = _agentAction;
    }

    function upgradeAgentCharacter(
        uint256 agentId,
        string memory _agentCharacter
    ) public {
        require(_ownerOf(agentId) == msg.sender, "No owner of agent");
        agentCharacter[agentId] = _agentCharacter;
    }

    function upgradeAgentAddress(uint256 agentId, address _agentAction) public {
        require(_ownerOf(agentId) == msg.sender, "No owner of agent");
        agentAddress[agentId] = _agentAction;
    }

    function agentInfo(
        uint256 agentId
    ) public view returns (string memory, string memory, address) {
        return (
            agentAction[agentId],
            agentCharacter[agentId],
            agentAddress[agentId]
        );
    }

    function mint(
        string memory _agentAction,
        string memory _agentCharacter,
        address _agentAddress
    ) public {
        uint256 agentId = agentCount++;
        _mint(msg.sender, agentId);
        agentAction[agentId] = _agentAction;
        agentCharacter[agentId] = _agentCharacter;
        agentAddress[agentId] = _agentAddress;
    }
}
