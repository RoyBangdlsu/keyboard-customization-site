import React from "react";
import Button from "../components/Button";

function Home() {
  return (
    <div className="p-10 bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen flex flex-col justify-center items-center text-center">
      <div className="bg-white shadow-2xl rounded-lg p-10 max-w-3xl border border-gray-200">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Welcome to Keyboard Customizer</h1>
        <p className="text-gray-700 text-lg mb-6">Design your own mechanical keyboard with ease.</p>
        <img src="https://source.unsplash.com/600x300/?keyboard,mechanical" alt="Keyboard" className="rounded-lg shadow-lg mb-6" />
        <Button className="text-xl px-8 py-4">Get Started</Button>
      </div>
    </div>
  );
}

export default Home;