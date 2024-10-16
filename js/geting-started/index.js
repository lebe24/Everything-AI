// Smart contract analyzer

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1.5,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// Function to perform the audit
async function run(contract) {
    try {
        // Start the chat session with the given prompt
        const chatSession = await model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts:[
                    {text: `Your role and goal is to be an AI Smart Contract Auditor. Your job is to perform an audit on the given smart contract. Here is the smart contract: ${contract}.
          
          Please provide the results in the following array format for easy front-end display:
  
          [
            {
              "section": "Audit Report",
              "details": "A detailed audit report of the smart contract, covering security, performance, and any other relevant aspects."
            },
            {
              "section": "Metric Scores",
              "details": [
                {
                  "metric": "Security",
                  "score": 0-10
                },
                {
                  "metric": "Performance",
                  "score": 0-10
                },
                {
                  "metric": "Other Key Areas",
                  "score": 0-10
                },
                {
                  "metric": "Gas Efficiency",
                  "score": 0-10
                },
                {
                  "metric": "Code Quality",
                  "score": 0-10
                },
                {
                  "metric": "Documentation",
                  "score": 0-10
                }
              ]
            },
            {
              "section": "Suggestions for Improvement",
              "details": "Suggestions for improving the smart contract in terms of security, performance, and any other identified weaknesses."
            }
          ]
          
          Thank you.`}]
                }
            ]
        });

        // Extract and log the response
        const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
        console.log(result.response.text());
    } catch (error) {
        console.error("Error during the smart contract audit:", error);
    }
}

// Example usage:
const contract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuditAI {
    string public name = "AuditAI Token";
    string public symbol = "AAT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** uint256(decimals);
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Allowance exceeded");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
`;

// Run the audit
run(contract);

// async function run() {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
//     const result = await model.generateContent(["Explain how AI works"]);
//     console.log(result.response);
// }




run();

// import OpenAI from "openai"

// const apiKey :any = process.env.NEXT_PUBLIC_API_KEY || "string";

// const openai = new OpenAI({
//     apiKey: apiKey,
//     dangerouslyAllowBrowser:true
// });

// export const chatAudit = async(
//     contract :string,
// ) => await openai.chat.completions.create({
//     messages: [
//         {
//           role: "user",
//           content: `Your role and goal is to be an AI Smart Contract Auditor. Your job is to perform an audit on the given smart contract. Here is the smart contract: ${contract}.
      
//           Please provide the results in the following array format for easy front-end display:
  
//           [
//             {
//               "section": "Audit Report",
//               "details": "A detailed audit report of the smart contract, covering security, performance, and any other relevant aspects."
//             },
//             {
//               "section": "Metric Scores",
//               "details": [
//                 {
//                   "metric": "Security",
//                   "score": 0-10
//                 },
//                 {
//                   "metric": "Performance",
//                   "score": 0-10
//                 },
//                 {
//                   "metric": "Other Key Areas",
//                   "score": 0-10
//                 },
//                 {
//                   "metric": "Gas Efficiency",
//                   "score": 0-10
//                 },
//                 {
//                   "metric": "Code Quality",
//                   "score": 0-10
//                 },
//                 {
//                   "metric": "Documentation",
//                   "score": 0-10
//                 }
//               ]
//             },
//             {
//               "section": "Suggestions for Improvement",
//               "details": "Suggestions for improving the smart contract in terms of security, performance, and any other identified weaknesses."
//             }
//           ]
          
//           Thank you.`,
//         },
//       ],
//       model: "gpt-3.5-turbo",
// })

