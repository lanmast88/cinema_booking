import React from "react";
export default function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Добро пожаловать в кинотеатр!</h1>
      <p className="text-lg text-gray-600 mb-8">Выберите фильм и забронируйте билеты онлайн.</p>
      <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
        Забронировать билеты
      </button>
    </div>
  );
}