document.getElementById("login").style.visibility = "hidden";
document.getElementById("loginPassword").style.visibility = "hidden";
document.getElementById("loginBtn").style.visibility = "hidden";
document.getElementById("loginp").style.visibility = "hidden";

const web3 = new Web3(window.ethereum);
const contractAddress = "0x54C7BA146A2cF856bd7Fe683E9A3B5353A38A545";
const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "string",
        name: "entered_password_hash",
        type: "string",
      },
    ],
    name: "login",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "user_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "email_address",
            type: "string",
          },
          {
            internalType: "string",
            name: "password_hash",
            type: "string",
          },
        ],
        internalType: "struct Assessment.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "email_address",
        type: "string",
      },
      {
        internalType: "string",
        name: "password_hash",
        type: "string",
      },
    ],
    name: "registerMe",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
async function registration() {
  let pass = document.getElementById("password").value;
  let confirm_pass = document.getElementById("confpass").value;
  if (pass != confirm_pass) {
    alert("Password don't match");
  }
  let name = document.querySelector("#name").value;
  let nameArr = Array.from(name);
  if (nameArr.includes("@", 0)) alert("Invalid Name");
  if (nameArr.includes("#", 0)) alert("Invalid Name");
  if (nameArr.includes("$", 0)) alert("Invalid Name");
  if (nameArr.includes("%", 0)) alert("Invalid Name");
  if (nameArr.includes("^", 0)) alert("Invalid Name");
  if (nameArr.includes("&", 0)) alert("Invalid Name");
  if (nameArr.includes("*", 0)) alert("Invalid Name");
  if (nameArr.includes("(", 0)) alert("Invalid Name");
  if (nameArr.includes(")", 0)) alert("Invalid Name");
  if (nameArr.includes("!", 0)) alert("Invalid Name");

  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const registerEmail = document.getElementById("email").value;
  const userName = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confpass").value;
  const contract = new web3.eth.Contract(ABI, contractAddress);
  contract.methods
    .registerMe(userName, registerEmail, password)
    .send({ from: accounts[0] })
    .then(function (receipt) {
      console.log(receipt);
    });
  document.getElementById("login").style.visibility = "visible";
  document.getElementById("loginPassword").style.visibility = "visible";
  document.getElementById("loginBtn").style.visibility = "visible";
  document.getElementById("loginp").style.visibility = "visible";
}
