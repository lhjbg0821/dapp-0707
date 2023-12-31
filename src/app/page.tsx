"use client";

import axios from "axios";
import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { personal } from "./lib/client";
import { v4 as uuidv4 } from "uuid";

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>("");

  // const onSubmitMetamask: FormEventHandler = async (e) => {
  //   try {
  //     e.preventDefault();

  //     if (!email) return;

  //     const accounts = await window.ethereum?.request({
  //       method: "eth_requestAccounts",
  //     });

  //     if (accounts) {
  //       const signedToken = await personal.sign("Hello", accounts[0], "Pass");

  //       //서명을 기준으로 acocount 꺼내오기
  //       const recoverAccount = await personal.ecRecover("Hello", signedToken);
  //       console.log(recoverAccount);

  //       const response = await axios.post("http://localhost:3000/api/user", {
  //         account: accounts[0], //지갑주소
  //         email, //키 : 밸류 // 키와 밸류가 값이 같으면 생략 가능
  //         signedToken,
  //       });

  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmitMetamask: FormEventHandler = async (e) => {
    try {
      e.preventDefault();

      if (!email) return;

      const accounts = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });

      if (accounts) {
        const signedToken = await personal.sign(
          `Welcome!\n\n\n${uuidv4()}`,
          accounts[0],
          "Pass"
        );

        await axios.post(`${process.env.NEXT_PAGE_URL}/api/user`, {
          account: accounts[0],
          email,
          signedToken,
        });

        localStorage.setItem("signedToken", signedToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-red-100 min-h-screen p-24">
      <div>
        <form onSubmit={onSubmitMetamask}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="ml-2 px-2 py-1 border-2 border-black rounded-md"
            type="submit"
            value="메타마스크로그인"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
